/**
 * Import returned German translations into Sanity.
 *
 * Writes to DRAFTS ONLY — nothing is published. The owner reviews each document
 * in Studio and publishes when happy. Re-runnable and idempotent, so the
 * translator can deliver in batches.
 *
 * Accepts either the .xlf the translator's CAT tool produces or the .csv
 * companion (detected by extension).
 *
 * Run: npx tsx --env-file=.env.local scripts/i18n-import.ts translations/de-2026-08-29.xlf
 *      npx tsx --env-file=.env.local scripts/i18n-import.ts <file> --write
 */
import { createClient } from "next-sanity"
import { readFileSync } from "node:fs"
import { getAtPath, textToBlock, localizeJsonLd } from "./lib/localized-fields"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "33b6wn5r",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-11-13",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  // "raw" is required to read draft documents by their `drafts.<id>` id.
  // The default perspective filters drafts out of query results entirely —
  // even with a write token — which would make the existing-draft lookup below
  // silently return nothing and clobber the owner's unpublished edits.
  // ("drafts" is not the answer either: it overlays drafts onto the published
  // id, so `_id in path("drafts.**")` still matches nothing.)
  perspective: "raw",
})

const args = process.argv.slice(2)
const write = args.includes("--write")
const file = args.find(a => !a.startsWith("--"))

if (!file) {
  console.error(
    "Usage: npx tsx --env-file=.env.local scripts/i18n-import.ts <file.xlf|file.csv> [--write]",
  )
  process.exit(1)
}

function unescapeXml(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
}

/**
 * Parse our own XLIFF. The target's inner XML is taken verbatim because it is
 * already the internal block-text format: `<g id="N">` tags for marked runs,
 * entities for literal angle brackets.
 */
function parseXliff(xml: string): Map<string, string> {
  const out = new Map<string, string>()
  const unitPattern = /<trans-unit id="([^"]*)"[\s\S]*?<\/trans-unit>/g
  let m: RegExpExecArray | null
  while ((m = unitPattern.exec(xml)) !== null) {
    const id = unescapeXml(m[1])
    const target = m[0].match(/<target[^>]*>([\s\S]*?)<\/target>/)
    if (!target) continue
    const value = target[1].trim()
    if (value) out.set(id, value)
  }
  return out
}

function parseCsv(text: string): Map<string, string> {
  const out = new Map<string, string>()
  const rows: string[][] = []
  let row: string[] = []
  let cell = ""
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') {
        cell += '"'
        i++
      } else if (c === '"') inQuotes = false
      else cell += c
    } else if (c === '"') inQuotes = true
    else if (c === ",") {
      row.push(cell)
      cell = ""
    } else if (c === "\n") {
      row.push(cell)
      rows.push(row)
      row = []
      cell = ""
    } else if (c !== "\r") cell += c
  }
  if (cell || row.length) {
    row.push(cell)
    rows.push(row)
  }

  const header = rows.shift() ?? []
  const idCol = header.indexOf("id")
  const deCol = header.indexOf("german")
  for (const r of rows) {
    const id = r[idCol]
    const de = r[deCol]
    if (id && de?.trim()) out.set(id, de.trim())
  }
  return out
}

async function main() {
  const raw = readFileSync(file!, "utf8")
  const translations = file!.endsWith(".csv") ? parseCsv(raw) : parseXliff(raw)

  if (translations.size === 0) {
    console.error(
      `[i18n-import] No filled-in translations found in ${file}. ` +
        "Every <target> (or `german` column) is empty.",
    )
    process.exit(1)
  }

  // Group by document, then by the localized field the segment belongs to.
  const byDoc = new Map<string, Map<string, Map<string, string>>>()
  for (const [id, value] of translations) {
    const [docId, path, blockKey] = id.split("::")
    if (!docId || !path) continue
    if (!byDoc.has(docId)) byDoc.set(docId, new Map())
    const fields = byDoc.get(docId)!
    if (!fields.has(path)) fields.set(path, new Map())
    fields.get(path)!.set(blockKey ?? "", value)
  }

  // Fetch published documents AND any existing drafts.
  //
  // This matters: German is written onto the draft, and the patch sets whole
  // top-level fields. If the owner already has a draft with unpublished edits,
  // building those fields from the *published* document would silently discard
  // that work. The draft, when it exists, is the correct base.
  const ids = [...byDoc.keys()]
  const draftIds = ids.map(id => `drafts.${id}`)
  const docs: any[] = await client.fetch(`*[_id in $ids || _id in $draftIds]`, {
    ids,
    draftIds,
  })
  const docsById = new Map(docs.map(d => [d._id, d]))

  let fieldsWritten = 0
  let incomplete = 0
  let ontoExistingDrafts = 0
  const touched: {
    id: string
    type: string
    fields: string[]
    hadDraft: boolean
  }[] = []
  const tx = client.transaction()

  for (const [docId, fields] of byDoc) {
    const published = docsById.get(docId)
    if (!published) {
      console.warn(`  ! document not found, skipping: ${docId}`)
      continue
    }

    // Prefer the existing draft as the base so pending edits survive.
    const existingDraft = docsById.get(`drafts.${docId}`)
    if (existingDraft) ontoExistingDrafts++
    const base = existingDraft ?? published

    const clone = JSON.parse(JSON.stringify(base))
    const changedTopLevel = new Set<string>()
    const fieldNames: string[] = []

    for (const [path, values] of fields) {
      const localized = getAtPath(clone, path)
      if (!localized || typeof localized !== "object") continue

      if (Array.isArray(localized.en)) {
        // Portable Text: rebuild the whole array, English block as template.
        const rebuilt: any[] = []
        let missing = false
        for (const block of localized.en) {
          if (block?._type !== "block") {
            rebuilt.push(JSON.parse(JSON.stringify(block)))
            continue
          }
          const translated = values.get(block._key)
          if (translated !== undefined) {
            rebuilt.push(textToBlock(block, translated))
          } else if (!(block.children ?? []).some((c: any) => c.text?.trim())) {
            rebuilt.push(JSON.parse(JSON.stringify(block))) // empty block
          } else {
            missing = true
            break
          }
        }
        if (missing) {
          incomplete++
          continue // leave the field untouched rather than write a half array
        }
        localized.de = rebuilt
      } else if (
        typeof localized.en === "string" &&
        path.endsWith("structuredData")
      ) {
        // JSON-LD: rebuild the blob from the English structure, substituting
        // translated strings at their JSON pointers. Structure, @id, prices and
        // dates are preserved by construction; `url` and `inLanguage` are
        // rewritten for the locale.
        const pointers = new Map([...values].filter(([k]) => k.startsWith("/")))
        if (pointers.size === 0) continue
        const rebuilt = localizeJsonLd(localized.en, pointers, "de")
        if (rebuilt === null) {
          console.warn(
            `  ! ${docId} ${path}: English JSON-LD does not parse — skipped`,
          )
          continue
        }
        // Defensive: the rebuild must still be valid JSON with the same shape.
        const shape = (v: any): any =>
          Array.isArray(v)
            ? v.map(shape)
            : v && typeof v === "object"
              ? Object.fromEntries(
                  Object.keys(v)
                    .sort()
                    .map(k => [k, shape(v[k])]),
                )
              : typeof v
        if (
          JSON.stringify(shape(JSON.parse(rebuilt))) !==
          JSON.stringify(shape(JSON.parse(localized.en)))
        ) {
          console.warn(
            `  ! ${docId} ${path}: rebuilt JSON-LD shape differs — skipped`,
          )
          continue
        }
        localized.de = rebuilt
      } else if (
        localized.en !== null &&
        typeof localized.en === "object" &&
        !Array.isArray(localized.en)
      ) {
        // Object-valued wrapper: seo.meta = { en: { title, description,
        // keywords }, … }. Build `de` leaf by leaf, starting from whatever
        // German already exists so a partial delivery doesn't drop leaves.
        // The sibling `openGraph.image` lives outside `en` and is untouched.
        const de: Record<string, any> = { ...(localized.de ?? {}) }
        let wrote = false
        for (const [leafKey, source] of Object.entries<any>(localized.en)) {
          const translated = values.get(leafKey)
          if (translated === undefined) continue
          // Keywords round-trip as a comma-joined string.
          de[leafKey] = Array.isArray(source)
            ? unescapeXml(translated)
                .split(",")
                .map(k => k.trim())
                .filter(Boolean)
            : unescapeXml(translated)
          wrote = true
        }
        if (!wrote) continue
        localized.de = de
      } else {
        const value = values.get("")
        if (value === undefined) continue
        localized.de = unescapeXml(value)
      }

      changedTopLevel.add(path.split(".")[0].replace(/\[\d+\]$/, ""))
      fieldNames.push(path)
      fieldsWritten++
    }

    if (changedTopLevel.size === 0) continue

    // Set whole top-level fields rather than deep index paths — array indices
    // in patch paths are brittle, and this keeps each write self-consistent.
    const setOps: Record<string, any> = {}
    for (const key of changedTopLevel) setOps[key] = clone[key]

    const draftId = `drafts.${docId}`
    // No-op when a draft already exists; seeds one from published otherwise.
    tx.createIfNotExists({ ...published, _id: draftId })
    tx.patch(draftId, { set: setOps })

    touched.push({
      id: docId,
      type: published._type,
      fields: fieldNames,
      hadDraft: Boolean(existingDraft),
    })
  }

  console.log(
    `[i18n-import] ${translations.size} translated segment(s) -> ` +
      `${fieldsWritten} field(s) across ${touched.length} document(s)`,
  )
  if (incomplete > 0) {
    console.log(
      `  ${incomplete} rich-text field(s) skipped: not every block was ` +
        `translated. Re-export to get just the outstanding blocks.`,
    )
  }
  if (ontoExistingDrafts > 0) {
    console.log(
      `  ${ontoExistingDrafts} document(s) already had a draft — German is ` +
        `merged into it, pending edits preserved (marked * below).`,
    )
  }
  for (const t of touched.slice(0, 15)) {
    console.log(`  ${t.hadDraft ? "*" : " "} ${t.type} ${t.id}`)
    console.log(
      `    ${t.fields.slice(0, 6).join(", ")}${t.fields.length > 6 ? `, +${t.fields.length - 6} more` : ""}`,
    )
  }
  if (touched.length > 15) console.log(`  … and ${touched.length - 15} more`)

  if (!write) {
    console.log("\nDry run. Re-run with --write to create the Sanity drafts.")
    return
  }
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("\nSANITY_API_WRITE_TOKEN is not set — cannot write.")
    process.exit(1)
  }

  await tx.commit()
  console.log(
    `\nWrote ${touched.length} draft(s). Nothing is published — review in ` +
      `Studio at /studio, then publish. Re-run \`npm run verify:de\` before ` +
      `enabling NEXT_PUBLIC_LOCALE_DE_ENABLED.`,
  )
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

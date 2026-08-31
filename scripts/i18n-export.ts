/**
 * Export English service-site copy for translation into another language.
 *
 * Produces two files side by side:
 *   translations/<locale>-<date>.xlf  XLIFF 1.2 — what Trados / memoQ / Phrase expect
 *   translations/<locale>-<date>.csv  the same segments as a spreadsheet, for review
 *
 * Segment ids are stable (`docId::fieldPath` or `docId::fieldPath::blockKey`),
 * so a partial delivery can be imported and the remainder re-exported without
 * anything shifting underneath the translator.
 *
 * Most of the blog is excluded by design: it is translated per-post, so only
 * the shortlist for this locale is exported (TRANSLATED_BLOG_SLUGS). Slugs are
 * excluded too; see scripts/lib/localized-fields.ts.
 *
 * Run: npm run i18n:export -- --locale de
 *      npm run i18n:export -- --locale de --all       (re-export already-translated segments too)
 *      npm run i18n:export -- --locale de --doc <id>  (single document, for round-trip testing)
 */
import { createClient } from "next-sanity"
import { mkdirSync, writeFileSync } from "node:fs"
import {
  collectSegments,
  isExcludedDoc,
  type Segment,
} from "./lib/localized-fields"
import {
  columnFor,
  nameFor,
  parseLocaleArg,
  TRANSLATION_LOCALES,
} from "./lib/translation-locales.mjs"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "33b6wn5r",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-11-13",
  useCdn: false,
})

const args = process.argv.slice(2)
const locale = parseLocaleArg(args)
const includeTranslated = args.includes("--all")
const docFilter = args.includes("--doc")
  ? args[args.indexOf("--doc") + 1]
  : undefined

/** Attribute values: everything must be escaped, quotes included. */
function xmlAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

/** Element text. Quotes are legal here and must NOT be escaped. */
function xmlText(s: string): string {
  return s
    .replace(/&(?!(amp|lt|gt|quot|apos);)/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

/**
 * Source text for a segment.
 *
 * Block segments arrive pre-escaped from blockToText() and carry `<g id="N">`
 * inline tags for marked runs — those are real XLIFF markup and must survive
 * verbatim, so only bare ampersands are touched. Plain strings are raw and
 * need full escaping.
 */
function xmlSource(segment: Segment): string {
  return segment.kind === "block"
    ? segment.source.replace(/&(?!(amp|lt|gt|quot|apos);)/g, "&amp;")
    : xmlText(segment.source)
}

/**
 * `source` already contains `<g id="N">` inline tags for marked runs; those are
 * legal XLIFF inline elements and must NOT be escaped. Everything else was
 * escaped at flatten time.
 */
function toXliff(segments: Segment[], date: string): string {
  const byDoc = new Map<string, Segment[]>()
  for (const s of segments) {
    if (!byDoc.has(s.docId)) byDoc.set(s.docId, [])
    byDoc.get(s.docId)!.push(s)
  }

  const files = [...byDoc.entries()]
    .map(([docId, segs]) => {
      const units = segs
        .map(
          s => `      <trans-unit id="${xmlAttr(s.id)}" resname="${xmlAttr(
            s.path,
          )}">
        <source xml:lang="en">${xmlSource(s)}</source>
        <target xml:lang="${locale}" state="new"></target>
        <note>${xmlText(
          `${s.docType} · ${s.docLabel} · ${s.path}${
            s.kind === "block" ? ` · ${s.style}` : ""
          }`,
        )}</note>
      </trans-unit>`,
        )
        .join("\n")

      return `  <file original="${xmlAttr(docId)}" source-language="en" target-language="${locale}" datatype="plaintext" date="${date}">
    <header>
      <note>${xmlText(`${segs[0].docType}: ${segs[0].docLabel}`)}</note>
    </header>
    <body>
${units}
    </body>
  </file>`
    })
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
${files}
</xliff>
`
}

function toCsv(segments: Segment[]): string {
  const cell = (v: string) => `"${(v ?? "").replace(/"/g, '""')}"`
  const rows = segments.map(s =>
    [s.id, s.docType, s.docLabel, s.path, s.kind, s.style ?? "", s.source, ""]
      .map(cell)
      .join(","),
  )
  return (
    [
      `id,doc_type,document,field,kind,style,english,${columnFor(locale)}`,
      ...rows,
    ].join("\n") + "\n"
  )
}

async function main() {
  const query = docFilter
    ? `*[_id == $docId]`
    : `*[!(_id in path("drafts.**"))]`

  const docs: any[] = await client.fetch(
    query,
    docFilter ? { docId: docFilter } : {},
  )

  const segments = docs
    .filter(d => !isExcludedDoc(d, locale))
    .flatMap(d => collectSegments(d, { locale, includeTranslated }))

  if (segments.length === 0) {
    console.log(
      `[i18n-export] Nothing to export — every field with English content ` +
        `already has ${nameFor(locale)}. (Use --all to re-export translated segments.)`,
    )
    process.exit(0)
  }

  const date = new Date().toISOString().slice(0, 10)
  mkdirSync("translations", { recursive: true })
  const base = `translations/${locale}-${date}${docFilter ? `-${docFilter.slice(0, 8)}` : ""}`

  writeFileSync(`${base}.xlf`, toXliff(segments, date))
  writeFileSync(`${base}.csv`, toCsv(segments))

  const words = segments.reduce(
    (n, s) =>
      n +
      s.source
        .replace(/<[^>]+>/g, " ")
        .split(/\s+/)
        .filter(Boolean).length,
    0,
  )
  const docCount = new Set(segments.map(s => s.docId)).size
  const byKind = segments.reduce<Record<string, number>>((acc, s) => {
    acc[s.kind] = (acc[s.kind] ?? 0) + 1
    return acc
  }, {})

  console.log(
    `[i18n-export] ${segments.length} segments · ${docCount} documents · ~${words.toLocaleString()} words`,
  )
  console.log(
    `  by kind: ${Object.entries(byKind)
      .map(([k, n]) => `${k} ${n}`)
      .join(", ")}`,
  )
  console.log(`  ${base}.xlf`)
  console.log(`  ${base}.csv`)
  console.log(
    `\nTranslator brief (${nameFor(locale)}): ` +
      TRANSLATION_LOCALES[locale].brief +
      ' Inline <g id="N"> tags mark bold/linked runs and must be preserved.',
  )
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

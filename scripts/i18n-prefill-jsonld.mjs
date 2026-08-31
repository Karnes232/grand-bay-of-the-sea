/**
 * Pre-fill JSON-LD strings from translations already published in Sanity.
 *
 * Structured data is supposed to mirror the visible page. Most strings in a
 * JSON-LD blob are duplicates of copy that already exists elsewhere on the same
 * document — a meta description, an FAQ question, a course name. Re-translating
 * them independently would produce copy that says the same thing differently
 * from the rendered page, which Google treats as a quality signal against you.
 *
 * So: for each document, build an English -> target lookup from every localized
 * field it already has, then resolve JSON-LD strings by exact English match.
 * Whatever does not match is left for normal translation.
 *
 * Writes translations/batches-<locale>/50-jsonld-prefill.json.
 *
 * Run: node --env-file=.env.local scripts/i18n-prefill-jsonld.mjs --locale de <exported.csv>
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { createClient } from "next-sanity"
import { nameFor, parseLocaleArg } from "./lib/translation-locales.mjs"

/**
 * `--drafts` overlays draft documents, exactly as verify-locale-content does.
 *
 * This matters for the first language pass: i18n-import writes DRAFTS only, so
 * a freshly imported translation is invisible to the default perspective and
 * the prefill resolves nothing. Reading drafts is what lets the JSON-LD reuse
 * the translation that was just imported, instead of paying to translate the
 * same strings a second time.
 */
const useDrafts = process.argv.includes("--drafts")

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "33b6wn5r",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-11-13",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  // "raw" is the only perspective that returns `drafts.*` documents.
  perspective: "raw",
})

const locale = parseLocaleArg(process.argv.slice(2))
const SOURCE_CSV = process.argv.find(a => a.endsWith(".csv"))
if (!SOURCE_CSV) {
  console.error(
    "Usage: node scripts/i18n-prefill-jsonld.mjs --locale <code> <exported.csv>",
  )
  process.exit(1)
}

function parseCsv(text) {
  const rows = []
  let row = [],
    cell = "",
    inQuotes = false
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
  return rows
}

/** Portable Text -> plain text, so it can be compared with a JSON-LD string. */
function blocksToText(blocks) {
  if (!Array.isArray(blocks)) return null
  return blocks
    .filter(b => b?._type === "block")
    .map(b => (b.children ?? []).map(c => c.text ?? "").join(""))
    .join(" ")
    .trim()
}

/** Collect every English -> target-locale pair a document already carries. */
function buildLookup(doc) {
  const map = new Map()
  const add = (en, de) => {
    if (
      typeof en === "string" &&
      typeof de === "string" &&
      en.trim() &&
      de.trim()
    ) {
      map.set(en.trim(), de.trim())
    }
  }
  const walk = node => {
    if (!node || typeof node !== "object") return
    if (Array.isArray(node)) return node.forEach(walk)
    if ("en" in node && locale in node) {
      add(node.en, node[locale])
      add(blocksToText(node.en), blocksToText(node[locale]))
      // Object-valued wrappers (seo.meta = { en: { title, ... }, de: {...} })
      if (node.en && typeof node.en === "object" && !Array.isArray(node.en)) {
        for (const key of Object.keys(node.en))
          add(node.en[key], node[locale]?.[key])
      }
    }
    for (const [k, v] of Object.entries(node)) {
      if (!k.startsWith("_")) walk(v)
    }
  }
  walk(doc)
  return map
}

const raw = parseCsv(readFileSync(SOURCE_CSV, "utf8"))
const header = raw.shift()
const col = Object.fromEntries(header.map((h, i) => [h, i]))
const rows = raw.filter(r => r[col.id])

// Same-document lookups first, then a global one built from every published
// document. A dive-site description that appears in the Sites page's JSON-LD is
// the same sentence already translated on the diveSite document itself —
// reusing it is both less work and more consistent than translating it twice.
const fetched = await client.fetch(`*[!(_type match "sanity.*")]`)

// Overlay drafts onto their published counterparts when asked, the same way
// verify-locale-content does — a draft is what the page would show if the
// owner hit Publish, and it is where a freshly imported translation lives.
const published = fetched.filter(d => !d._id.startsWith("drafts."))
const drafts = new Map(
  fetched
    .filter(d => d._id.startsWith("drafts."))
    .map(d => [d._id.slice(7), d]),
)
const all = published.map(d =>
  useDrafts && drafts.has(d._id) ? drafts.get(d._id) : d,
)

const lookups = new Map(all.map(d => [d._id, buildLookup(d)]))

const globalLookup = new Map()
for (const doc of all) {
  for (const [en, de] of buildLookup(doc)) {
    if (!globalLookup.has(en)) globalLookup.set(en, de)
  }
}

const out = {}
let filled = 0
const missesByDoc = {}

// JSON-LD segments only. The CSV holds every segment in the document, and
// resolving the visible copy here would let a match from a *different*
// document overwrite the translation written specifically for this one — the
// strings are usually identical, but "usually" is not a good enough reason to
// overwrite hand-written text with a lookup.
const jsonLdRows = rows.filter(r => r[col.field].endsWith("structuredData"))

for (const r of jsonLdRows) {
  const id = r[col.id]
  const docId = id.split("::")[0]
  const english = r[col.english].trim()
  const translated =
    lookups.get(docId)?.get(english) ?? globalLookup.get(english)
  if (translated) {
    out[id] = translated
    filled++
  } else {
    const doc = r[col.document]
    ;(missesByDoc[doc] ??= []).push(english)
  }
}

// Per-locale directory, like every other batch: segment ids are shared across
// languages, so a prefill written to a shared path would be picked up by the
// wrong locale's fill. Numbered 50 to sort after the hand-written batches,
// which take precedence conceptually even though ids do not collide.
const OUT_JSON = `translations/batches-${locale}/50-jsonld-prefill.json`
mkdirSync(`translations/batches-${locale}`, { recursive: true })
writeFileSync(OUT_JSON, JSON.stringify(out, null, 1) + "\n")

const missing = jsonLdRows.length - filled
console.log(
  `[prefill] ${filled}/${jsonLdRows.length} JSON-LD strings resolved from ` +
    `${nameFor(locale)} already published ` +
    `(${((filled / jsonLdRows.length) * 100).toFixed(1)}%)`,
)
console.log(`  global lookup entries: ${globalLookup.size}`)
console.log(`  ${missing} still need translating\n`)
for (const [doc, list] of Object.entries(missesByDoc).sort(
  (a, b) => b[1].length - a[1].length,
)) {
  console.log(`  ${String(list.length).padStart(3)}  ${doc}`)
}
console.log(`\nwrote ${OUT_JSON}`)

/**
 * Pre-fill German JSON-LD strings from German already published in Sanity.
 *
 * Structured data is supposed to mirror the visible page. Most strings in a
 * JSON-LD blob are duplicates of copy that already exists elsewhere on the same
 * document — a meta description, an FAQ question, a course name. Re-translating
 * them independently would produce German that says the same thing differently
 * from the rendered page, which Google treats as a quality signal against you.
 *
 * So: for each document, build an English -> German lookup from every localized
 * field it already has, then resolve JSON-LD strings by exact English match.
 * Whatever does not match is left for normal translation.
 *
 * Writes translations/batches/40-jsonld-prefill.json.
 *
 * Run: node --env-file=.env.local scripts/i18n-prefill-jsonld.mjs
 */
import { readFileSync, writeFileSync } from "node:fs"
import { createClient } from "next-sanity"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "33b6wn5r",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-11-13",
  useCdn: false,
})

const SOURCE_CSV = process.argv[2]
if (!SOURCE_CSV) {
  console.error("Usage: node scripts/i18n-prefill-jsonld.mjs <exported.csv>")
  process.exit(1)
}

function parseCsv(text) {
  const rows = []
  let row = [], cell = "", inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++ }
      else if (c === '"') inQuotes = false
      else cell += c
    } else if (c === '"') inQuotes = true
    else if (c === ",") { row.push(cell); cell = "" }
    else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = "" }
    else if (c !== "\r") cell += c
  }
  if (cell || row.length) { row.push(cell); rows.push(row) }
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

/** Collect every English -> German pair a document already carries. */
function buildLookup(doc) {
  const map = new Map()
  const add = (en, de) => {
    if (typeof en === "string" && typeof de === "string" && en.trim() && de.trim()) {
      map.set(en.trim(), de.trim())
    }
  }
  const walk = node => {
    if (!node || typeof node !== "object") return
    if (Array.isArray(node)) return node.forEach(walk)
    if ("en" in node && "de" in node) {
      add(node.en, node.de)
      add(blocksToText(node.en), blocksToText(node.de))
      // Object-valued wrappers (seo.meta = { en: { title, ... }, de: {...} })
      if (node.en && typeof node.en === "object" && !Array.isArray(node.en)) {
        for (const key of Object.keys(node.en)) add(node.en[key], node.de?.[key])
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
const all = await client.fetch(`*[!(_id in path("drafts.**")) && !(_type match "sanity.*")]`)
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

for (const r of rows) {
  const id = r[col.id]
  const docId = id.split("::")[0]
  const english = r[col.english].trim()
  const german = lookups.get(docId)?.get(english) ?? globalLookup.get(english)
  if (german) {
    out[id] = german
    filled++
  } else {
    const doc = r[col.document]
    ;(missesByDoc[doc] ??= []).push(english)
  }
}

writeFileSync(
  "translations/batches/40-jsonld-prefill.json",
  JSON.stringify(out, null, 1) + "\n",
)

const missing = rows.length - filled
console.log(
  `[prefill] ${filled}/${rows.length} JSON-LD strings resolved from German ` +
    `already published (${((filled / rows.length) * 100).toFixed(1)}%)`,
)
console.log(`  global lookup entries: ${globalLookup.size}`)
console.log(`  ${missing} still need translating\n`)
for (const [doc, list] of Object.entries(missesByDoc).sort(
  (a, b) => b[1].length - a[1].length,
)) {
  console.log(`  ${String(list.length).padStart(3)}  ${doc}`)
}
console.log("\nwrote translations/batches/40-jsonld-prefill.json")

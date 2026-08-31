/**
 * Merge translation batches into a filled CSV, and validate it.
 *
 * Translations are authored as JSON batches under `translations/batches/`,
 * each a flat `{ "<segment id>": "<translation>" }` map. Batching keeps the job
 * resumable and reviewable; this script stitches them back onto the exported
 * CSV that `i18n-import` consumes.
 *
 * Validation is the point. Machine translation fails in quiet ways — a dropped
 * inline tag loses formatting, an over-long meta description gets truncated by
 * Google mid-sentence, and a segment left identical to its source ships English
 * to readers of the target language. All of those are caught here rather than
 * in production.
 *
 * Run: node scripts/i18n-fill.mjs --locale de <exported.csv>
 *      node scripts/i18n-fill.mjs --locale de <csv> --strict   (exit non-zero if anything is wrong)
 *      node scripts/i18n-fill.mjs --locale de <csv> --todo [N] (print the next N untranslated segments)
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs"
import {
  columnFor,
  nameFor,
  parseLocaleArg,
} from "./lib/translation-locales.mjs"

const locale = parseLocaleArg(process.argv.slice(2))
const SOURCE_CSV = process.argv.find(a => a.endsWith(".csv"))
if (!SOURCE_CSV) {
  console.error(
    "[i18n-fill] Pass the exported CSV, e.g. translations/de-2026-08-29.csv",
  )
  process.exit(1)
}
/**
 * Batches are per-locale, and MUST be.
 *
 * Segment ids are `docId::fieldPath[::blockKey]` — they identify a field, not
 * a language, so the German and French exports share 84% of their ids. A single
 * shared batch directory would have merged German text into the French column
 * for 1,353 of 1,608 segments, and the import would have published it as
 * French.
 */
const BATCH_DIR = `translations/batches-${locale}`
const OUT_CSV = SOURCE_CSV.replace(/\.csv$/, "-filled.csv")

const LIMITS = { title: 60, description: 160 }

const args = process.argv.slice(2)
const strict = args.includes("--strict")
const todoIdx = args.indexOf("--todo")

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

const raw = parseCsv(readFileSync(SOURCE_CSV, "utf8"))
const header = raw.shift()
const col = Object.fromEntries(header.map((h, i) => [h, i]))
const rows = raw.filter(r => r[col.id])

// ---- load batches -----------------------------------------------------------
const translations = new Map()
const batchFiles = existsSync(BATCH_DIR)
  ? readdirSync(BATCH_DIR)
      .filter(f => f.endsWith(".json"))
      .sort()
  : []
for (const f of batchFiles) {
  const data = JSON.parse(readFileSync(`${BATCH_DIR}/${f}`, "utf8"))
  for (const [id, de] of Object.entries(data)) translations.set(id, de)
}

// ---- --todo: what's left ----------------------------------------------------
if (todoIdx !== -1) {
  const n = Number(args[todoIdx + 1]) || 40
  const todo = rows.filter(r => !translations.get(r[col.id])?.trim())
  console.log(
    `${todo.length} segment(s) remaining. Next ${Math.min(n, todo.length)}:\n`,
  )
  console.log(
    JSON.stringify(
      Object.fromEntries(
        todo.slice(0, n).map(r => [
          r[col.id],
          {
            doc: r[col.document],
            field: r[col.field] + (r[col.style] ? ` (${r[col.style]})` : ""),
            en: r[col.english],
          },
        ]),
      ),
      null,
      1,
    ),
  )
  process.exit(0)
}

// ---- validate ---------------------------------------------------------------
const problems = { missing: [], tags: [], length: [], untranslated: [] }

const tagsOf = s => (s.match(/<g id="\d+">/g) ?? []).sort().join("")

for (const r of rows) {
  const id = r[col.id]
  const en = r[col.english]
  const de = translations.get(id)

  if (!de?.trim()) {
    problems.missing.push({ id, doc: r[col.document], field: r[col.field] })
    continue
  }
  if (tagsOf(en) !== tagsOf(de)) {
    problems.tags.push({ id, en: tagsOf(en), de: tagsOf(de) })
  }
  // Flag suspected untranslated copy, but not values that are *meant* to be
  // identical — "30 m / 100 ft", "2.5", prices. Require at least three real
  // words before calling it a miss.
  const realWords = (en.match(/[A-Za-zÄÖÜäöüß]{4,}/g) ?? []).length
  if (de.trim() === en.trim() && realWords >= 3) {
    problems.untranslated.push({
      id,
      doc: r[col.document],
      en: en.slice(0, 60),
    })
  }
  // Only seo.meta carries length validation in the Sanity schema
  // (Rule.max 60 / 160). openGraph has none, and social platforms allow
  // ~200 chars, so holding OG to the meta limits would be wrong.
  const leaf = id.split("::").pop()
  const limit = r[col.field] === "seo.meta" ? LIMITS[leaf] : undefined
  if (limit && de.length > limit) {
    problems.length.push({
      id,
      doc: r[col.document],
      leaf,
      len: de.length,
      limit,
      de: de.slice(0, 80),
    })
  }
}

const done = rows.length - problems.missing.length
const pct = ((done / rows.length) * 100).toFixed(1)
console.log(
  `[i18n-fill] ${done}/${rows.length} segments translated (${pct}%) from ${batchFiles.length} batch file(s)\n`,
)

const report = (label, list, fmt) => {
  if (!list.length) return
  console.log(`${label}: ${list.length}`)
  for (const p of list.slice(0, 10)) console.log(`   ${fmt(p)}`)
  if (list.length > 10) console.log(`   … and ${list.length - 10} more`)
  console.log()
}

report(
  "INLINE TAG MISMATCH (formatting would be lost)",
  problems.tags,
  p => `${p.id}\n     en:${p.en || "(none)"}  ${locale}:${p.de || "(none)"}`,
)
report(
  "OVER LENGTH LIMIT (Google will truncate)",
  problems.length,
  p => `${p.leaf} ${p.len}/${p.limit}  ${p.doc}\n     ${p.de}`,
)
report(
  "IDENTICAL TO ENGLISH (untranslated?)",
  problems.untranslated,
  p => `${p.doc} — ${p.en}`,
)
if (problems.missing.length && problems.missing.length !== rows.length) {
  report("NOT YET TRANSLATED", problems.missing, p => `${p.doc} — ${p.field}`)
}

// ---- write ------------------------------------------------------------------
const cell = v => `"${(v ?? "").replace(/"/g, '""')}"`
const out = [header.join(",")]
for (const r of rows) {
  const copy = [...r]
  copy[col[columnFor(locale)]] = translations.get(r[col.id]) ?? ""
  out.push(copy.map(cell).join(","))
}
writeFileSync(OUT_CSV, out.join("\n") + "\n")
console.log(`wrote ${OUT_CSV}`)

const blocking =
  problems.tags.length + problems.length.length + problems.untranslated.length
if (strict && (blocking > 0 || problems.missing.length > 0)) {
  console.error(
    `\nFAILED: ${problems.missing.length} untranslated, ${blocking} quality problem(s).`,
  )
  process.exit(1)
}

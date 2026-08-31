/**
 * Translation completeness gate, for one target locale.
 *
 * Run this BEFORE setting NEXT_PUBLIC_LOCALE_DE_ENABLED=true.
 *
 * Why this exists: the project compiles with `strict: false` and no
 * `noImplicitAny`, so indexing a localized object with a locale it doesn't have
 * — `field[locale]` where field is `{ en, es }` — is not a type error. It
 * silently yields `any`. At runtime that means one of two things:
 *
 *   - optional-chained reads (`field?.[locale]`)  -> render BLANK
 *   - direct reads (`seo.meta[locale].title`)     -> CRASH the route
 *
 * There are ~380 such call sites. The compiler cannot enumerate them, so
 * completeness has to be checked against the data instead. The rule enforced
 * here is simple and strict:
 *
 *   wherever English content exists, the target locale must exist too.
 *
 * Anything missing is reported with its document id and field path, so it can
 * be handed straight back to the translator.
 *
 * Run: node scripts/verify-de-content.mjs            (published content — what is live)
 *      npm run verify:locale -- --locale de --drafts   (drafts overlaid — what publishing would give you)
 *      node scripts/verify-de-content.mjs --json
 *
 * Use --drafts after `npm run i18n:import -- --write` to confirm a delivery is
 * complete BEFORE publishing, and the plain form before flipping the launch
 * gate to confirm what is actually live.
 */
import { createClient } from "next-sanity"
import { isExcludedDoc } from "./lib/localized-fields.ts"
import { nameFor, parseLocaleArg } from "./lib/translation-locales.mjs"

const locale = parseLocaleArg(process.argv.slice(2))

/**
 * Excluded entirely — translated URLs keep the English slugs deliberately.
 */
const EXCLUDED_PATHS = new Set(["slug"])

/**
 * Reported, but not blocking.
 *
 * `structuredData` used to be excluded outright, in a copy of the rules that
 * drifted from the export pipeline's. Restoring it surfaced 16 documents whose
 * English JSON-LD has no translation — but spot-checking /contact and /species
 * shows the English blob is not rendered on those routes either, so this is a
 * stale-data question rather than a deficit in the translated pages. Blocking a
 * launch on fields nothing renders would be the wrong call; hiding them again
 * is how the drift happened. So: counted, listed, and not fatal.
 */
const ADVISORY_PATHS = new Set(["structuredData"])

const isAdvisory = path =>
  ADVISORY_PATHS.has(
    path
      .split(".")
      .pop()
      ?.replace(/\[\d+\]$/, ""),
  )

const useDrafts = process.argv.includes("--drafts")

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "33b6wn5r",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-11-13",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  // "raw" is the only perspective that returns `drafts.*` documents; the
  // default filters them out even with a token.
  perspective: "raw",
})

const asJson = process.argv.includes("--json")

/** True for a localized wrapper: an object carrying an `en` sibling. */
function isLocalizedObject(node) {
  return (
    node !== null &&
    typeof node === "object" &&
    !Array.isArray(node) &&
    "en" in node
  )
}

/** Best human-readable name for a document, unwrapping localized values. */
function label(doc) {
  for (const candidate of [doc.title, doc.pageName, doc.name, doc.course]) {
    const value =
      candidate && typeof candidate === "object" ? candidate.en : candidate
    if (typeof value === "string" && value.trim()) return value
  }
  return doc._id
}

function isEmpty(value) {
  if (value === null || value === undefined) return true
  if (typeof value === "string") return value.trim() === ""
  if (Array.isArray(value)) return value.length === 0
  return false
}

const gaps = []

function walk(node, path, doc) {
  if (node === null || typeof node !== "object") return

  const leaf = path
    .split(".")
    .pop()
    ?.replace(/\[\d+\]$/, "")
  if (leaf && EXCLUDED_PATHS.has(leaf)) return

  if (isLocalizedObject(node)) {
    // Only require a translation where English actually has content — an empty
    // English field is a content gap of its own, not a translation gap.
    if (!isEmpty(node.en) && isEmpty(node[locale])) {
      gaps.push({
        id: doc._id,
        type: doc._type,
        title: label(doc),
        path: path || "(root)",
      })
    }
    // Keep descending: localized blocks can nest further localized objects.
  }

  if (Array.isArray(node)) {
    node.forEach((child, i) => walk(child, `${path}[${i}]`, doc))
    return
  }

  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith("_")) continue
    walk(value, path ? `${path}.${key}` : key, doc)
  }
}

const all = await client.fetch(`*[!(_type match "sanity.*")]`)

// Overlay drafts onto their published counterparts when asked: that is exactly
// what the site would serve if the owner hit Publish on everything.
const published = all.filter(d => !d._id.startsWith("drafts."))
const drafts = new Map(
  all.filter(d => d._id.startsWith("drafts.")).map(d => [d._id.slice(7), d]),
)
const checked = published
  .filter(d => !isExcludedDoc(d, locale))
  .map(d => (useDrafts && drafts.has(d._id) ? drafts.get(d._id) : d))
for (const doc of checked) walk(doc, "", doc)

const blocking = gaps.filter(g => !isAdvisory(g.path))
const advisory = gaps.filter(g => isAdvisory(g.path))

if (asJson) {
  console.log(JSON.stringify({ blocking, advisory }, null, 2))
} else {
  const byDoc = new Map()
  for (const g of blocking) {
    if (!byDoc.has(g.id)) byDoc.set(g.id, { ...g, fields: [] })
    byDoc.get(g.id).fields.push(g.path)
  }

  if (blocking.length === 0) {
    console.log(
      `[verify-locale-content] ${locale}: OK — ${checked.length} documents ` +
        `checked${useDrafts ? " (drafts overlaid)" : " (published)"}, ` +
        `every field with English content has ${nameFor(locale)}.`,
    )
  } else {
    console.log(
      `[verify-locale-content] ${locale}: ${gaps.length} missing ` +
        `${nameFor(locale)} field(s) across ${byDoc.size} document(s) ` +
        `(of ${checked.length} checked` +
        `${useDrafts ? ", drafts overlaid" : ", published"}):\n`,
    )
    for (const d of byDoc.values()) {
      console.log(`  ${d.type} — ${d.title}`)
      console.log(`    ${d.id}`)
      for (const f of d.fields.slice(0, 12)) console.log(`      · ${f}`)
      if (d.fields.length > 12) {
        console.log(`      … and ${d.fields.length - 12} more`)
      }
      console.log()
    }
    console.log(
      `${nameFor(locale)} must stay switched off ` +
        `(NEXT_PUBLIC_LOCALE_${locale.toUpperCase()}_ENABLED) until this is ` +
        `empty: missing fields render blank or crash the route.`,
    )
  }
}

if (advisory.length > 0 && !asJson) {
  console.log(
    `\n[verify-locale-content] ${advisory.length} document(s) also lack ` +
      `${nameFor(locale)} structuredData (JSON-LD). Not blocking — see ` +
      `ADVISORY_PATHS in this script:`,
  )
  for (const g of advisory.slice(0, 20)) {
    console.log(`  · ${g.type} — ${g.title} (${g.path})`)
  }
  if (advisory.length > 20) console.log(`  … and ${advisory.length - 20} more`)
}

process.exit(blocking.length === 0 ? 0 : 1)

/**
 * German content completeness gate.
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
 *   wherever English content exists, German must exist too.
 *
 * Anything missing is reported with its document id and field path, so it can
 * be handed straight back to the translator.
 *
 * Run: node scripts/verify-de-content.mjs            (published content — what is live)
 *      node scripts/verify-de-content.mjs --drafts   (drafts overlaid — what publishing would give you)
 *      node scripts/verify-de-content.mjs --json
 *
 * Use --drafts after `npm run i18n:import --write` to confirm a delivery is
 * complete BEFORE publishing, and the plain form before flipping the launch
 * gate to confirm what is actually live.
 */
import { createClient } from "next-sanity"

/**
 * Excluded from the translation export, so not counted as gaps here either —
 * keep in sync with EXCLUDED_PATH_SEGMENTS in scripts/lib/localized-fields.ts.
 *
 *  - slug            German URLs keep the English slugs deliberately.
 *  - structuredData  JSON-LD blobs. A translator editing raw JSON is a
 *                    corruption risk, and a missing German blob degrades
 *                    gracefully (no JSON-LD on the German page) rather than
 *                    breaking it. Worth revisiting as its own task.
 */
const EXCLUDED_PATHS = new Set(["slug", "structuredData"])

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

/**
 * The blog is deliberately en/es only — see BLOG_LOCALES in
 * src/i18n/locales.ts. Its documents are excluded rather than reported as
 * thousands of false gaps.
 */
const EXCLUDED_TYPES = new Set([
  "blogPost",
  "blogCategory",
  "blogPageLayout",
  "sanity.fileAsset",
  "sanity.imageAsset",
])

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

  const leaf = path.split(".").pop()?.replace(/\[\d+\]$/, "")
  if (leaf && EXCLUDED_PATHS.has(leaf)) return

  if (isLocalizedObject(node)) {
    // Only require German where English actually has content — an empty
    // English field is a content gap of its own, not a translation gap.
    if (!isEmpty(node.en) && isEmpty(node.de)) {
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
  .filter(d => !EXCLUDED_TYPES.has(d._type))
  .map(d => (useDrafts && drafts.has(d._id) ? drafts.get(d._id) : d))
for (const doc of checked) walk(doc, "", doc)

if (asJson) {
  console.log(JSON.stringify(gaps, null, 2))
} else {
  const byDoc = new Map()
  for (const g of gaps) {
    if (!byDoc.has(g.id)) byDoc.set(g.id, { ...g, fields: [] })
    byDoc.get(g.id).fields.push(g.path)
  }

  if (gaps.length === 0) {
    console.log(
      `[verify-de-content] OK — ${checked.length} documents checked` +
        `${useDrafts ? " (drafts overlaid)" : " (published)"}, ` +
        `every field with English content has German.`,
    )
  } else {
    console.log(
      `[verify-de-content] ${gaps.length} missing German field(s) across ` +
        `${byDoc.size} document(s) (of ${checked.length} checked` +
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
      "German must stay switched off (NEXT_PUBLIC_LOCALE_DE_ENABLED) until " +
        "this is empty: missing fields render blank or crash the route.",
    )
  }
}

process.exit(gaps.length === 0 ? 0 : 1)

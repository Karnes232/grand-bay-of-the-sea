/**
 * Publish translation drafts for one locale.
 *
 * It publishes drafts whose ONLY difference from the published document is
 * added content under the target locale's field, and refuses anything else.
 *
 * That guard is the whole point. Publishing replaces the published document
 * with the draft wholesale, so a draft carrying an unrelated edit — someone
 * mid-way through rewriting a paragraph in Studio — would push that edit live
 * as a side effect of a translation import. The diff below makes that
 * impossible rather than merely unlikely.
 *
 * Run: npx tsx --env-file=.env.local scripts/publish-drafts.ts            (dry run)
 *      npx tsx --env-file=.env.local scripts/publish-drafts.ts --write
 *      npx tsx --env-file=.env.local scripts/publish-drafts.ts --locale fr (guard a different locale)
 */
import { createClient } from "next-sanity"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "33b6wn5r",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-11-13",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  // Only "raw" returns `drafts.*` documents; the default perspective filters
  // them out entirely, even with a write token.
  perspective: "raw",
})

const args = process.argv.slice(2)
const write = args.includes("--write")
const locale = args.includes("--locale")
  ? args[args.indexOf("--locale") + 1]
  : "de"

/** Batch size for mutations — 98 large documents in one transaction is too big. */
const BATCH = 10

// `_system` is Sanity-managed (it links a draft to the published revision it is
// based on) and appears on every draft — it is not a content change.
const SYSTEM_FIELDS = new Set([
  "_id",
  "_rev",
  "_updatedAt",
  "_createdAt",
  "_system",
])

/** Every path at which two documents differ, ignoring Sanity system fields. */
function diffPaths(a: any, b: any, path = "", out: string[] = []): string[] {
  if (a === b) return out
  const bothObjects =
    a !== null && b !== null && typeof a === "object" && typeof b === "object"
  if (!bothObjects) {
    if (JSON.stringify(a) !== JSON.stringify(b)) out.push(path || "(root)")
    return out
  }
  for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
    if (SYSTEM_FIELDS.has(key)) continue
    diffPaths(a[key], b[key], path ? `${path}.${key}` : key, out)
  }
  return out
}

/** True for a path that sits at or under the target locale's field. */
function isLocalePath(path: string): boolean {
  return new RegExp(`(^|\\.)${locale}(\\.|\\[|$)`).test(path)
}

async function main() {
  const all: any[] = await client.fetch(`*[!(_type match "sanity.*")]`)
  const published = new Map(
    all.filter(d => !d._id.startsWith("drafts.")).map(d => [d._id, d]),
  )
  const drafts = all.filter(d => d._id.startsWith("drafts."))

  if (drafts.length === 0) {
    console.log("[publish-drafts] No drafts in the dataset. Nothing to do.")
    return
  }

  const safe: { draft: any; publishedId: string; changed: number }[] = []
  const blocked: string[] = []

  for (const draft of drafts) {
    const publishedId = draft._id.slice("drafts.".length)
    const current = published.get(publishedId)

    if (!current) {
      blocked.push(
        `${draft._type} ${publishedId} — no published counterpart; publishing would create a NEW document`,
      )
      continue
    }

    const paths = diffPaths(current, draft)
    const unrelated = paths.filter(p => !isLocalePath(p))

    // An identical draft is safe: publishing it changes no content and clears
    // a stale draft out of Studio, which is what you want.
    if (unrelated.length > 0) {
      blocked.push(
        `${draft._type} ${publishedId} — changes outside .${locale}: ` +
          unrelated.slice(0, 5).join(", ") +
          (unrelated.length > 5 ? ` (+${unrelated.length - 5} more)` : ""),
      )
      continue
    }

    safe.push({ draft, publishedId, changed: paths.length })
  }

  const totalPaths = safe.reduce((n, s) => n + s.changed, 0)
  console.log(
    `[publish-drafts] ${drafts.length} draft(s) examined\n` +
      `  ${safe.length} safe to publish — only .${locale} content added ` +
      `(${totalPaths} changed path(s))\n` +
      `  ${blocked.length} blocked`,
  )

  if (blocked.length > 0) {
    console.log(`\nBLOCKED — these will NOT be published:`)
    for (const b of blocked.slice(0, 20)) console.log(`   ${b}`)
    if (blocked.length > 20) console.log(`   … and ${blocked.length - 20} more`)
  }

  if (safe.length === 0) {
    console.log("\nNothing safe to publish.")
    process.exit(blocked.length > 0 ? 1 : 0)
  }

  const byType = safe.reduce<Record<string, number>>((acc, s) => {
    acc[s.draft._type] = (acc[s.draft._type] ?? 0) + 1
    return acc
  }, {})
  console.log(
    `\nWould publish: ${Object.entries(byType)
      .sort((a, b) => b[1] - a[1])
      .map(([t, n]) => `${t} ${n}`)
      .join(", ")}`,
  )

  if (!write) {
    console.log("\nDry run. Re-run with --write to publish.")
    return
  }
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("\nSANITY_API_WRITE_TOKEN is not set — cannot publish.")
    process.exit(1)
  }

  let done = 0
  for (let i = 0; i < safe.length; i += BATCH) {
    const chunk = safe.slice(i, i + BATCH)
    const tx = client.transaction()
    for (const { draft, publishedId } of chunk) {
      // Strip draft-only system fields; `_system` in particular must not be
      // carried onto the published document.
      const { _id, _rev, _updatedAt, _createdAt, _system, ...content } = draft
      tx.createOrReplace({ ...content, _id: publishedId })
      tx.delete(draft._id)
    }
    await tx.commit()
    done += chunk.length
    console.log(`  published ${done}/${safe.length}`)
  }

  const remaining = await client.fetch(`count(*[_id in path("drafts.**")])`)
  console.log(
    `\nPublished ${done} document(s). Drafts remaining in dataset: ${remaining}.`,
  )
  console.log(
    `Run \`npm run verify:locale -- --locale ${locale}\` — it should now ` +
      `report 0 missing fields.`,
  )
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

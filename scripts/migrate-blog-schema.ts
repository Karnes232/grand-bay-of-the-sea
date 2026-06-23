/**
 * Blog BlogPosting JSON-LD migration.
 *
 * For every `blogPost` document, rewrites `seo.structuredData.en` and `.es`:
 *   - author Organization  ->  Person "Grand Bay Dive Team" (worksFor -> #business)
 *   - adds datePublished (from publishDate) and dateModified (from _updatedAt)
 *   - publisher -> reference to the canonical #business entity
 *
 * Writes to DRAFTS only (drafts.<id>) — published documents are never touched.
 * The draft is seeded from the published doc (createIfNotExists) and then only the
 * structuredData fields are patched, so unrelated draft edits are preserved.
 *
 * Idempotent. Dry-run by default; pass `--apply` to write.
 *
 *   tsx --env-file=.env.local scripts/migrate-blog-schema.ts          # dry run
 *   tsx --env-file=.env.local scripts/migrate-blog-schema.ts --apply  # write drafts
 */
import { createClient } from "@sanity/client"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env vars. Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN.",
  )
  process.exit(1)
}

const APPLY = process.argv.includes("--apply")
const SITE_URL = "https://www.grandbay-puntacana.com"
const AUTHOR = {
  "@type": "Person",
  name: "Grand Bay Dive Team",
  worksFor: { "@id": `${SITE_URL}/#business` },
}
const PUBLISHER = { "@id": `${SITE_URL}/#business` }

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-11-13",
  token,
  useCdn: false,
})

interface BlogDoc {
  _id: string
  _type: string
  publishDate?: string
  _updatedAt?: string
  seo?: { structuredData?: { en?: string; es?: string } }
  [key: string]: unknown
}

/** Transform one structuredData JSON string. Returns the new string, or null if unchanged/not applicable. */
function transform(
  raw: string | undefined,
  publishDate: string | undefined,
  updatedAt: string | undefined,
): { next: string | null; reason?: string } {
  if (!raw || !raw.trim()) return { next: null, reason: "empty" }
  let data: any
  try {
    data = JSON.parse(raw)
  } catch {
    return { next: null, reason: "unparseable" }
  }

  // The BlogPosting may be the root object or a node inside an @graph array.
  const node =
    data?.["@type"] === "BlogPosting"
      ? data
      : Array.isArray(data?.["@graph"])
        ? data["@graph"].find((n: any) => n?.["@type"] === "BlogPosting")
        : undefined

  if (!node) {
    return { next: null, reason: `no BlogPosting node (@type=${data?.["@type"]})` }
  }

  node.author = AUTHOR
  node.publisher = PUBLISHER
  // Only add dates when missing — never overwrite dates a post already declares.
  if (!node.datePublished && publishDate) node.datePublished = publishDate
  if (!node.dateModified && updatedAt) node.dateModified = updatedAt

  const next = JSON.stringify(data, null, 2)
  return { next: next === raw ? null : next }
}

async function main() {
  console.log(
    `\nBlog schema migration — ${APPLY ? "APPLY (writing drafts)" : "DRY RUN (no writes)"}\n`,
  )

  // Full documents are needed so a draft can be seeded (createIfNotExists) with its content.
  const docs: BlogDoc[] = await client.fetch(`*[_type == "blogPost"]`)
  console.log(`Fetched ${docs.length} blogPost documents.\n`)

  let changed = 0
  let skipped = 0
  let errored = 0

  for (const doc of docs) {
    const id = doc._id.replace(/^drafts\./, "")
    const draftId = `drafts.${id}`
    try {
      const en = transform(doc.seo?.structuredData?.en, doc.publishDate, doc._updatedAt)
      const es = transform(doc.seo?.structuredData?.es, doc.publishDate, doc._updatedAt)

      const sets: Record<string, string> = {}
      if (en.next) sets["seo.structuredData.en"] = en.next
      if (es.next) sets["seo.structuredData.es"] = es.next

      if (Object.keys(sets).length === 0) {
        skipped++
        console.log(`• skip   ${id}  (en: ${en.reason ?? "no change"}, es: ${es.reason ?? "no change"})`)
        continue
      }

      if (APPLY) {
        // Seed the draft as a full copy of the published doc (minus read-only
        // system fields) if no draft exists yet, then patch only structuredData.
        const { _rev, _createdAt, _updatedAt, ...content } = doc as Record<string, unknown>
        const draftSeed = { ...content, _id: draftId }
        await client
          .transaction()
          .createIfNotExists(draftSeed as { _id: string; _type: string })
          .patch(draftId, (p) => p.set(sets))
          .commit({ visibility: "async" })
      }
      changed++
      console.log(`✓ ${APPLY ? "draft" : "would"}  ${id}  (${Object.keys(sets).map((k) => k.split(".").pop()).join(", ")})`)
    } catch (e: any) {
      errored++
      console.error(`✗ error  ${id}: ${e?.message ?? e}`)
    }
  }

  console.log(
    `\nDone. ${changed} ${APPLY ? "drafts written" : "would change"}, ${skipped} skipped, ${errored} errored, ${docs.length} total.`,
  )
  if (!APPLY) console.log("Re-run with --apply to write drafts.")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

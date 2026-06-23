/**
 * Course CourseInstance JSON-LD migration (individualCourse.seo.structuredData).
 *
 * Each course ships a CourseInstance with fixed startDate 2025-06-01 / endDate
 * 2025-12-31 — now expired, so Google reads the course as no longer offered.
 * This rewrites every individualCourse (en + es):
 *   - removes the fixed startDate / endDate  -> rolling/ongoing availability
 *   - adds offers.priceValidUntil = end of the current year
 *
 * Writes to DRAFTS only. Idempotent. Dry-run by default; pass `--apply` to write.
 *
 *   tsx --env-file=.env.local scripts/migrate-course-schema.ts
 *   tsx --env-file=.env.local scripts/migrate-course-schema.ts --apply
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
const PRICE_VALID_UNTIL = `${new Date().getFullYear()}-12-31`

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-11-13",
  token,
  useCdn: false,
})

interface CourseDoc {
  _id: string
  _type: string
  seo?: { structuredData?: { en?: string; es?: string } }
  [key: string]: unknown
}

function transform(raw: string | undefined): { next: string | null; reason?: string } {
  if (!raw || !raw.trim()) return { next: null, reason: "empty" }
  let data: any
  try {
    data = JSON.parse(raw)
  } catch {
    return { next: null, reason: "unparseable" }
  }
  if (data?.["@type"] !== "Course" || !data.hasCourseInstance) {
    return { next: null, reason: `no Course/CourseInstance (@type=${data?.["@type"]})` }
  }

  const instances = Array.isArray(data.hasCourseInstance)
    ? data.hasCourseInstance
    : [data.hasCourseInstance]
  for (const ci of instances) {
    if (!ci || typeof ci !== "object") continue
    delete ci.startDate
    delete ci.endDate
    const offers = Array.isArray(ci.offers) ? ci.offers : ci.offers ? [ci.offers] : []
    for (const o of offers) {
      if (o && typeof o === "object") o.priceValidUntil = PRICE_VALID_UNTIL
    }
  }

  const next = JSON.stringify(data, null, 4)
  return { next: next === raw ? null : next }
}

async function main() {
  console.log(
    `\nCourse schema migration — ${APPLY ? "APPLY (writing drafts)" : "DRY RUN"} — priceValidUntil=${PRICE_VALID_UNTIL}\n`,
  )
  const docs: CourseDoc[] = await client.fetch(`*[_type == "individualCourse"]`)
  console.log(`Fetched ${docs.length} individualCourse documents.\n`)

  let changed = 0
  let skipped = 0
  let errored = 0

  for (const doc of docs) {
    const id = doc._id.replace(/^drafts\./, "")
    const draftId = `drafts.${id}`
    try {
      const en = transform(doc.seo?.structuredData?.en)
      const es = transform(doc.seo?.structuredData?.es)
      const sets: Record<string, string> = {}
      if (en.next) sets["seo.structuredData.en"] = en.next
      if (es.next) sets["seo.structuredData.es"] = es.next

      if (Object.keys(sets).length === 0) {
        skipped++
        console.log(`• skip   ${id}  (en: ${en.reason ?? "no change"}, es: ${es.reason ?? "no change"})`)
        continue
      }
      if (APPLY) {
        const { _rev, _createdAt, _updatedAt, ...content } = doc as Record<string, unknown>
        await client
          .transaction()
          .createIfNotExists({ ...content, _id: draftId } as { _id: string; _type: string })
          .patch(draftId, (p) => p.set(sets))
          .commit({ visibility: "async" })
      }
      changed++
      console.log(`✓ ${APPLY ? "draft" : "would"}  ${id}`)
    } catch (e: any) {
      errored++
      console.error(`✗ error  ${id}: ${e?.message ?? e}`)
    }
  }

  console.log(
    `\nDone. ${changed} ${APPLY ? "drafts written" : "would change"}, ${skipped} skipped, ${errored} errored, ${docs.length} total.`,
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

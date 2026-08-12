/**
 * Step 2 of the media rename workflow: apply approved name proposals to the
 * image asset documents (originalFilename, title, altText).
 *
 * Dry-run by default; pass --apply to write.
 *
 * Run: npx tsx --env-file=.env.local scripts/media-rename/2-apply-names.ts <proposals.json> [--apply]
 *
 * proposals.json: [{ "assetId": "...", "filename": "...", "title": "...", "altText": "..." }]
 * The CDN URL of each asset is content-hash based and does not change; this
 * only renames what the Studio media library displays and makes it searchable.
 */
import { createClient } from "@sanity/client"
import { readFileSync } from "fs"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env vars: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN"
  )
  process.exit(1)
}

const args = process.argv.slice(2)
const apply = args.includes("--apply")
const proposalsPath = args.find(a => !a.startsWith("--"))

if (!proposalsPath) {
  console.error(
    "Usage: npx tsx --env-file=.env.local scripts/media-rename/2-apply-names.ts <proposals.json> [--apply]"
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-11-13",
  token,
  useCdn: false,
})

type Proposal = {
  assetId: string
  filename: string
  title: string
  altText: string
}

async function main() {
  const proposals: Proposal[] = JSON.parse(readFileSync(proposalsPath!, "utf8"))
  console.log(
    `${proposals.length} proposals loaded. Mode: ${apply ? "APPLY" : "dry-run (pass --apply to write)"}`
  )

  const filenames = new Set<string>()
  for (const p of proposals) {
    if (!p.assetId || !p.filename || !p.title || !p.altText) {
      console.error(`[invalid] missing field in proposal: ${JSON.stringify(p)}`)
      process.exit(1)
    }
    if (filenames.has(p.filename)) {
      console.error(`[invalid] duplicate filename: ${p.filename}`)
      process.exit(1)
    }
    filenames.add(p.filename)
  }

  const current = await client.fetch<
    { _id: string; originalFilename?: string; title?: string; altText?: string }[]
  >(
    `*[_type == "sanity.imageAsset" && _id in $ids]{_id, originalFilename, title, altText}`,
    { ids: proposals.map(p => p.assetId) }
  )
  const currentById = new Map(current.map(a => [a._id, a]))

  let toChange = 0
  let skipped = 0
  let missing = 0
  const BATCH = 50
  let txn = client.transaction()
  let inTxn = 0

  for (const p of proposals) {
    const cur = currentById.get(p.assetId)
    if (!cur) {
      console.warn(`[missing] asset not found: ${p.assetId}`)
      missing++
      continue
    }
    if (
      cur.originalFilename === p.filename &&
      cur.title === p.title &&
      cur.altText === p.altText
    ) {
      skipped++
      continue
    }
    toChange++
    if (apply) {
      txn = txn.patch(p.assetId, patch =>
        patch.set({
          originalFilename: p.filename,
          title: p.title,
          altText: p.altText,
        })
      )
      inTxn++
      if (inTxn >= BATCH) {
        await txn.commit()
        console.log(`  committed batch of ${inTxn}`)
        txn = client.transaction()
        inTxn = 0
      }
    } else {
      console.log(
        `[would rename] ${cur.originalFilename ?? "(none)"} -> ${p.filename}`
      )
    }
  }

  if (apply && inTxn > 0) {
    await txn.commit()
    console.log(`  committed batch of ${inTxn}`)
  }

  console.log(
    `\nDone. ${apply ? "changed" : "would change"}=${toChange} unchanged=${skipped} missing=${missing}`
  )
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

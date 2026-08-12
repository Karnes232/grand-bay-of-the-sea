/**
 * Step 1 of the media rename workflow: export all image assets with usage
 * context and download small thumbnails for review/AI naming.
 *
 * Run: npx tsx --env-file=.env.local scripts/media-rename/1-export-assets.ts --out <dir>
 *
 * Writes <dir>/manifest.json and <dir>/thumbs/<assetId>.<ext>.
 * The manifest preserves each asset's current originalFilename/title/altText,
 * so it doubles as an undo backup.
 */
import { createClient } from "@sanity/client"
import { mkdirSync, writeFileSync, existsSync } from "fs"
import { join } from "path"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env vars: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN"
  )
  process.exit(1)
}

const outFlag = process.argv.indexOf("--out")
const outDir =
  outFlag !== -1 && process.argv[outFlag + 1]
    ? process.argv[outFlag + 1]
    : "./media-rename-out"

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-11-13",
  token,
  useCdn: false,
  perspective: "raw",
})

type Asset = {
  _id: string
  originalFilename?: string
  title?: string
  altText?: string
  url: string
  mimeType: string
  w?: number
  h?: number
  size: number
}

type Usage = {
  docId: string
  docType: string
  docLabel: string
  alt?: string
}

/** Recursively walk a document; collect {assetRef, alt sibling} pairs. */
function collectAssetRefs(
  node: unknown,
  found: { ref: string; alt?: string }[]
) {
  if (Array.isArray(node)) {
    for (const item of node) collectAssetRefs(item, found)
    return
  }
  if (node && typeof node === "object") {
    const obj = node as Record<string, unknown>
    const asset = obj.asset as Record<string, unknown> | undefined
    if (asset && typeof asset._ref === "string") {
      found.push({
        ref: asset._ref,
        alt: typeof obj.alt === "string" && obj.alt.trim() ? obj.alt : undefined,
      })
    }
    for (const key of Object.keys(obj)) {
      if (key === "asset") continue
      collectAssetRefs(obj[key], found)
    }
  }
}

function docLabel(doc: Record<string, unknown>): string {
  const cands = [
    doc.course,
    doc.trip,
    doc.name,
    (doc.title as Record<string, unknown> | undefined)?.en,
    doc.title,
    (doc.slug as Record<string, unknown> | undefined)?.current,
  ]
  for (const c of cands) {
    if (typeof c === "string" && c.trim()) return c
  }
  return ""
}

async function downloadThumb(url: string, dest: string) {
  const res = await fetch(`${url}?w=200&auto=format`)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const contentType = res.headers.get("content-type") || ""
  const ext = contentType.includes("png")
    ? "png"
    : contentType.includes("webp")
      ? "webp"
      : contentType.includes("gif")
        ? "gif"
        : "jpg"
  const buffer = Buffer.from(await res.arrayBuffer())
  const path = `${dest}.${ext}`
  writeFileSync(path, buffer)
  return path
}

async function main() {
  mkdirSync(join(outDir, "thumbs"), { recursive: true })

  console.log("Fetching image assets…")
  const assets = await client.fetch<Asset[]>(
    `*[_type == "sanity.imageAsset"]{
      _id, originalFilename, title, altText, url, mimeType, size,
      "w": metadata.dimensions.width, "h": metadata.dimensions.height
    } | order(_createdAt asc)`
  )
  console.log(`  ${assets.length} assets`)

  console.log("Fetching content documents for usage mapping…")
  const docs = await client.fetch<Record<string, unknown>[]>(
    `*[!(_type match "sanity.**") && !(_id in path("drafts.**"))]`
  )
  console.log(`  ${docs.length} documents`)

  const usageByAsset = new Map<string, Usage[]>()
  for (const doc of docs) {
    const found: { ref: string; alt?: string }[] = []
    collectAssetRefs(doc, found)
    for (const f of found) {
      const list = usageByAsset.get(f.ref) ?? []
      list.push({
        docId: doc._id as string,
        docType: doc._type as string,
        docLabel: docLabel(doc),
        alt: f.alt,
      })
      usageByAsset.set(f.ref, list)
    }
  }

  console.log("Downloading thumbnails…")
  const manifest: unknown[] = []
  let done = 0
  const queue = [...assets]
  const workers = Array.from({ length: 8 }, async () => {
    while (queue.length) {
      const asset = queue.shift()!
      let thumbPath: string | null = null
      try {
        thumbPath = await downloadThumb(
          asset.url,
          join(outDir, "thumbs", asset._id)
        )
      } catch (err) {
        console.warn(`  [thumb failed] ${asset._id}: ${(err as Error).message}`)
      }
      manifest.push({
        assetId: asset._id,
        currentFilename: asset.originalFilename ?? null,
        currentTitle: asset.title ?? null,
        currentAltText: asset.altText ?? null,
        url: asset.url,
        mimeType: asset.mimeType,
        width: asset.w,
        height: asset.h,
        size: asset.size,
        thumb: thumbPath,
        usage: usageByAsset.get(asset._id) ?? [],
      })
      done++
      if (done % 50 === 0) console.log(`  ${done}/${assets.length}`)
    }
  })
  await Promise.all(workers)

  const manifestPath = join(outDir, "manifest.json")
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
  const used = manifest.filter(m => (m as { usage: Usage[] }).usage.length > 0)
  console.log(
    `\nDone. ${manifest.length} assets exported (${used.length} referenced by documents, ${
      manifest.length - used.length
    } unused).`
  )
  console.log(`Manifest: ${manifestPath}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

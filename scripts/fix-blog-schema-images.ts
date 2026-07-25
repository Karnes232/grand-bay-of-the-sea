/**
 * One-off migration (2026-07-25, GEO audit High item): blog posts' structuredData
 * JSON still referenced images.ctfassets.net (Contentful) — a ticking 404 once the
 * Contentful account is deleted. Replaces every ctfassets URL in each post's
 * seo.structuredData.{en,es} with that post's own Sanity hero image
 * (backgroundImages[0]) at w=1200, falling back to the site logo if a post has
 * no hero. Validates that JSON strings that parsed before still parse after.
 *
 * Run: npx tsx --env-file=.env.local scripts/fix-blog-schema-images.ts          (dry)
 *      npx tsx --env-file=.env.local scripts/fix-blog-schema-images.ts --write
 */
import { createClient } from "next-sanity"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "33b6wn5r",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-11-13",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const SANITY_LOGO =
  "https://cdn.sanity.io/images/33b6wn5r/production/d716adb82827e51188be53d82df1bab3b0eae4a2-493x427.png?w=640&q=75&auto=format"

// Matches both the plain CDN form and the percent-encoded form wrapped in a
// Next.js optimizer URL: /_next/image?url=https%3A%2F%2Fimages.ctfassets.net...
const CTF_RX =
  /https:\/\/(?:www\.grandbay-puntacana\.com\/_next\/image\?url=https%3A%2F%2Fimages\.ctfassets\.net|images\.ctfassets\.net)[^"\\]*/g

const write = process.argv.includes("--write")

const parses = (s: string) => {
  try {
    JSON.parse(s)
    return true
  } catch {
    return false
  }
}

async function run() {
  if (write && !process.env.SANITY_API_WRITE_TOKEN) throw new Error("SANITY_API_WRITE_TOKEN missing")
  const docs: {
    _id: string
    slug: string
    sdEn?: string
    sdEs?: string
    heroUrl?: string
  }[] = await client.fetch(
    `*[_type == "blogPost" && (seo.structuredData.en match "*ctfassets*" || seo.structuredData.es match "*ctfassets*")]{
      _id,
      "slug": slug.current,
      "sdEn": seo.structuredData.en,
      "sdEs": seo.structuredData.es,
      "heroUrl": backgroundImages[0].asset->url
    } | order(slug)`,
  )
  console.log(`${docs.length} blog posts with ctfassets URLs`)
  let patched = 0
  for (const doc of docs) {
    const repl = doc.heroUrl ? `${doc.heroUrl}?w=1200&q=75&auto=format` : SANITY_LOGO
    const changes: Record<string, string> = {}
    for (const [field, val] of [
      ["seo.structuredData.en", doc.sdEn],
      ["seo.structuredData.es", doc.sdEs],
    ] as const) {
      if (!val || !val.includes("images.ctfassets.net")) continue
      const next = val.replace(CTF_RX, repl)
      if (parses(val) && !parses(next)) {
        console.log(`!! ${doc.slug} ${field}: replacement would break JSON — SKIPPED`)
        continue
      }
      changes[field] = next
    }
    const n = Object.keys(changes).length
    const hero = doc.heroUrl ? "own hero" : "LOGO FALLBACK"
    console.log(`${doc.slug}: ${n} field(s) → ${hero}${doc.heroUrl ? "" : " ⚠"}`)
    if (write && n > 0) {
      await client.patch(doc._id).set(changes).commit()
      patched++
    }
  }
  if (write) {
    console.log(`\n✔ patched ${patched} docs`)
    const left = await client.fetch(
      `count(*[seo.structuredData.en match "*ctfassets*" || seo.structuredData.es match "*ctfassets*" || structuredData.en match "*ctfassets*" || structuredData.es match "*ctfassets*"])`,
    )
    console.log(`Post-check: ${left} docs still contain ctfassets in structuredData (expect 0)`)
  } else {
    console.log("\nDry run — re-run with --write to apply.")
  }
}

run().catch(e => {
  console.error(e)
  process.exit(1)
})

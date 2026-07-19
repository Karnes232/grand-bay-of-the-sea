/**
 * Contentful → Sanity migration for the shared-shell brand data.
 *
 * Reads the Contentful `layout` entry (logo, facebook, instagram, email,
 * padiLogo, padiLogoDark) via the plain CDN REST API (no `contentful` package,
 * so this script keeps working after the SDK is uninstalled), uploads the three
 * images to Sanity, and createOrReplace's the `siteSettings` singleton with a
 * plain _id (= published immediately).
 *
 * Prints the uploaded cdn.sanity.io URLs — needed for the hardcoded logo
 * references in StructuredData.tsx and the email templates.
 *
 * Dry-run by default; pass `--apply` to write.
 *
 *   tsx --env-file=.env.local scripts/migrate-site-settings.ts
 *   tsx --env-file=.env.local scripts/migrate-site-settings.ts --apply
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

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-11-13",
  token,
  useCdn: false,
})

type BrandData = {
  facebook: string
  instagram: string
  email: string
  logoUrl: string
  padiLogoUrl: string
  padiLogoDarkUrl: string
}

// Snapshot of the Contentful layout entry, used when the CONTENTFUL_* env vars
// are already gone (values captured from a dry run on 2026-07-19).
const FALLBACK: BrandData = {
  facebook: "https://www.facebook.com/grandbaydivecenter/",
  instagram: "https://www.instagram.com/grandbayoftheseard/",
  email: "grandbayofthesea@gmail.com",
  logoUrl:
    "https://images.ctfassets.net/iqfmqk4smewk/4AKIgOA6drFSpgIoRpPPu3/6b8b92af64259355d55d245dbe71b0cc/logo.png",
  padiLogoUrl:
    "https://images.ctfassets.net/iqfmqk4smewk/7M3S48CSO4kEzFmF4ZzTX7/13d575c32c7dc87383a4035088fc306c/padi-banner.png",
  padiLogoDarkUrl:
    "https://images.ctfassets.net/iqfmqk4smewk/7feT4fJJw7wXuKehTG3Pz3/24a9af04a6119d6ac56396ee5549f830/padi-banner-dark.png",
}

const absolutize = (url: string) =>
  url.startsWith("http") ? url : `https:${url}`

async function fetchFromContentful(): Promise<BrandData | null> {
  const space = process.env.CONTENTFUL_SPACE_ID
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN
  if (!space || !accessToken) return null

  const url =
    `https://cdn.contentful.com/spaces/${space}/environments/master/entries` +
    `?content_type=layout&fields.companyName=${encodeURIComponent("Grand Bay of the Sea")}` +
    `&access_token=${accessToken}`
  const res = await fetch(url)
  if (!res.ok) {
    console.error(`Contentful fetch failed: ${res.status} ${res.statusText}`)
    return null
  }
  const data = await res.json()
  const entry = data.items?.[0]
  if (!entry) return null

  const assetById = new Map<string, any>(
    (data.includes?.Asset ?? []).map((a: any) => [a.sys.id, a]),
  )
  const assetUrl = (link: any): string => {
    const asset = assetById.get(link?.sys?.id)
    const raw = asset?.fields?.file?.url
    return raw ? absolutize(raw) : ""
  }

  return {
    facebook: entry.fields.facebook ?? "",
    instagram: entry.fields.instagram ?? "",
    email: entry.fields.email ?? "",
    logoUrl: assetUrl(entry.fields.logo),
    padiLogoUrl: assetUrl(entry.fields.padiLogo),
    padiLogoDarkUrl: assetUrl(entry.fields.padiLogoDark),
  }
}

async function uploadImage(url: string, filename: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed (${res.status}): ${url}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const asset = await client.assets.upload("image", buffer, { filename })
  console.log(`  uploaded ${filename} -> ${asset._id}`)
  console.log(`    ${asset.url}`)
  return asset
}

async function main() {
  const brand = await fetchFromContentful()
  if (!brand) {
    console.error(
      "Could not read the Contentful layout entry (missing CONTENTFUL_* env vars or entry gone).\n" +
        "Only the logo fallback URL is known; fill in the FALLBACK constant from a previous dry-run output before retrying.",
    )
    if (!FALLBACK.facebook) process.exit(1)
  }
  const data = (brand ?? FALLBACK) as BrandData

  console.log(`${APPLY ? "APPLY" : "DRY-RUN"} — resolved brand data:`)
  console.log(JSON.stringify(data, null, 2))

  for (const key of [
    "facebook",
    "instagram",
    "email",
    "logoUrl",
    "padiLogoUrl",
    "padiLogoDarkUrl",
  ] as const) {
    if (!data[key]) {
      console.error(`Missing value for ${key} — aborting.`)
      process.exit(1)
    }
  }

  if (!APPLY) {
    console.log("\nDry run only. Re-run with --apply to upload + write.")
    return
  }

  console.log("\nUploading images to Sanity…")
  const [logo, padiLogo, padiLogoDark] = [
    await uploadImage(data.logoUrl, "logo.png"),
    await uploadImage(data.padiLogoUrl, "padi-logo.png"),
    await uploadImage(data.padiLogoDarkUrl, "padi-logo-dark.png"),
  ]

  const imageField = (assetId: string, alt: string) => ({
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    alt,
  })

  const doc = {
    _id: "siteSettings",
    _type: "siteSettings",
    logo: imageField(logo._id, "Grand Bay of the Sea logo"),
    facebook: data.facebook,
    instagram: data.instagram,
    email: data.email,
    padiLogo: imageField(padiLogo._id, "PADI Logo"),
    padiLogoDark: imageField(padiLogoDark._id, "PADI Logo"),
  }

  await client.createOrReplace(doc)
  console.log('\nPublished siteSettings doc (_id: "siteSettings").')
  console.log("\ncdn.sanity.io URLs (for hardcoded references):")
  console.log(`  logo:         ${logo.url}`)
  console.log(`  padiLogo:     ${padiLogo.url}`)
  console.log(`  padiLogoDark: ${padiLogoDark.url}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

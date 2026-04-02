import { Entry } from "contentful"
import * as contentful from "contentful"
import { unstable_cache } from "next/cache"

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
})

export async function getAllEntries(contentType: string, locale?: string) {
  const entries = await client.getEntries({
    content_type: contentType,
    locale: locale || "en",
  })
  return entries.items
}

export async function getEntry(entryId: string) {
  try {
    const entry = await client.getEntry(entryId)
    return entry
  } catch (error) {
    console.error("Error fetching entry:", error)
    return undefined
  }
}

export async function searchEntries(
  contentType: string,
  query: object,
  select?: string[],
  excludeSlugs?: string[],
  locale?: string,
) {
  const queryParams: any = {
    content_type: contentType,
    ...query,
  }

  if (select && select.length > 0) {
    queryParams.select = ["sys.id", ...select].join(",")
  }

  if (excludeSlugs && excludeSlugs.length > 0) {
    queryParams["fields.slug[nin]"] = excludeSlugs.join(",")
  }

  if (locale) {
    queryParams["locale"] = locale || "en"
  }

  const entries = await client.getEntries(queryParams)
  return entries
}

export async function getAllEntriesExcludingSlugs(
  contentType: string,
  excludeSlugs: string[] = [],
) {
  const queryParams: any = {
    content_type: contentType,
  }

  // Add the exclude slugs parameter if there are slugs to exclude
  if (excludeSlugs && excludeSlugs.length > 0) {
    queryParams["fields.slug[nin]"] = excludeSlugs.join(",")
  }

  const entries = await client.getEntries(queryParams)
  return entries.items
}

export async function getAllEntrySlugs(contentType: string, locale?: string) {
  const entries = await client.getEntries({
    content_type: contentType,
    select: ["fields.slug"],
    locale: locale || "en",
  })
  return entries.items.map((entry: any) => entry.fields.slug)
}

export async function getAllEntrySlugsWithCategory(
  contentType: string,
  locale?: string,
) {
  const entries = await client.getEntries({
    content_type: contentType,
    select: ["fields.slug", "fields.blogCategory"],
    locale: locale || "en",
  })
  return entries.items.map((entry: any) => ({
    slug: entry.fields.slug,
    category: entry.fields.blogCategory,
  }))
}

export type CachedLayoutLogo = {
  src: string
  intrinsicWidth: number
  intrinsicHeight: number
} | null

/** Cached so the header does not block streaming on every request. */
export async function getCachedGrandBayLogoLayout(): Promise<CachedLayoutLogo> {
  return getGrandBayLogoLayoutCached()
}

const getGrandBayLogoLayoutCached = unstable_cache(
  async (): Promise<CachedLayoutLogo> => {
    const searchResults = await searchEntries(
      "layout",
      {
        "fields.companyName": "Grand Bay of the Sea",
      },
      ["fields.logo"],
    )

    const file = (searchResults.items[0] as any)?.fields?.logo?.fields?.file
    if (!file?.url) return null

    const rawUrl = file.url as string
    const src = rawUrl.startsWith("http") ? rawUrl : `https:${rawUrl}`
    const intrinsicWidth = file.details?.image?.width ?? 493
    const intrinsicHeight = file.details?.image?.height ?? 427

    return { src, intrinsicWidth, intrinsicHeight }
  },
  ["contentful-layout-logo-grand-bay-of-the-sea"],
  { revalidate: 3600 },
)

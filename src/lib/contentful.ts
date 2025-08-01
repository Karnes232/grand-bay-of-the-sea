import { Entry } from "contentful"
import * as contentful from "contentful"

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
})

export async function getAllEntries(contentType: string) {
  const entries = await client.getEntries({
    content_type: contentType,
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

import { Entry } from "contentful"
import * as contentful from "contentful"

let client = contentful.createClient({
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
) {
  let queryParams: any = {
    content_type: contentType,
    ...query,
  }

  if (select && select.length > 0) {
    queryParams.select = ["sys.id", ...select].join(",")
  }

  const entries = await client.getEntries(queryParams)
  return entries
}

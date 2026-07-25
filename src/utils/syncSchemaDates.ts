/**
 * Overwrite datePublished/dateModified on any BlogPosting/Article node inside a
 * raw JSON-LD string with the post's real dates — the same `publishDate` and
 * `_updatedAt` fields the visible byline renders — so the schema and the page
 * can never disagree (the stored Sanity strings carry stale hardcoded dates).
 * Returns the input unchanged if it isn't parseable JSON.
 */
export function syncSchemaDates(
  raw: string | undefined,
  publishDate?: string,
  updatedAt?: string,
): string | undefined {
  if (!raw || (!publishDate && !updatedAt)) return raw
  try {
    const data = JSON.parse(raw)
    const ARTICLE_TYPES = ["BlogPosting", "Article", "NewsArticle"]
    const walk = (node: unknown): void => {
      if (Array.isArray(node)) {
        node.forEach(walk)
        return
      }
      if (!node || typeof node !== "object") return
      const obj = node as Record<string, unknown>
      const t = obj["@type"]
      const types = Array.isArray(t) ? t : [t]
      if (types.some(x => ARTICLE_TYPES.includes(x as string))) {
        if (publishDate) obj.datePublished = new Date(publishDate).toISOString()
        if (updatedAt) obj.dateModified = new Date(updatedAt).toISOString()
      }
      Object.values(obj).forEach(walk)
    }
    walk(data)
    return JSON.stringify(data)
  } catch {
    return raw
  }
}

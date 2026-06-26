import React from "react"

/**
 * Renders one `<script type="application/ld+json">` per JSON-LD object.
 *
 * Sanity stores page structured data as a raw JSON *string* that may be either a
 * single object or an *array* of objects. Google's parser ignores a JSON array
 * placed inside a single `<script>` tag, so we parse the string and emit one tag
 * per object. Empty or meaningless objects (`{}` or an object whose values are all
 * empty strings) are skipped so we never publish a nameless "ghost" entity that
 * trips Search Console errors.
 */

const isNonEmptyString = (value: unknown): boolean =>
  typeof value === "string" && value.trim() !== ""

const isMeaningful = (node: unknown): boolean => {
  if (node === null || typeof node !== "object" || Array.isArray(node)) {
    return false
  }
  const obj = node as Record<string, unknown>
  // An entity that declares an empty `name` is a broken/"ghost" node (e.g. an
  // Organization with `name: ""`), even if it carries populated nested fields
  // like `address`. Skip it — unless it's a bare `@id` reference (which has no
  // `name` key) or otherwise points at a canonical entity via `@id`.
  if (
    "name" in obj &&
    !isNonEmptyString(obj.name) &&
    !isNonEmptyString(obj["@id"])
  ) {
    return false
  }
  // A node is meaningful if it carries at least one populated property beyond
  // the bare `@context` / `@type` scaffolding. `@id` reference nodes count.
  return Object.keys(obj).some(key => {
    if (key === "@context" || key === "@type") return false
    const value = obj[key]
    if (typeof value === "string") return value.trim() !== ""
    if (typeof value === "number" || typeof value === "boolean") return true
    if (Array.isArray(value)) {
      return value.some(v =>
        typeof v === "string" ? v.trim() !== "" : v !== null && v !== undefined,
      )
    }
    if (value && typeof value === "object") {
      return Object.keys(value).length > 0
    }
    return false
  })
}

/** Escape `<` so a `</script>` sequence in the data can't break out of the tag. */
const serialize = (node: unknown): string =>
  JSON.stringify(node).replace(/</g, "\\u003c")

const JsonLd = ({ raw }: { raw?: string | null }) => {
  if (!raw) return null

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return null
  }

  const nodes = (Array.isArray(parsed) ? parsed : [parsed]).filter(isMeaningful)
  if (nodes.length === 0) return null

  return (
    <>
      {nodes.map((node, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialize(node) }}
        />
      ))}
    </>
  )
}

export default JsonLd

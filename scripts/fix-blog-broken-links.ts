/**
 * One-off content fix (2026-09-22): repoint stale internal links in blog
 * bodies. Ahrefs reported 57 internal links to 404s, all inside Portable Text
 * `markDefs` in Sanity — six posts were given longer slugs at some point and
 * ~20 other posts still link to the short form, in English and Spanish (and
 * two German/French bodies inherited the same links). A full GROQ audit of
 * every internal href across all four locale bodies found exactly these, plus
 * three self-referential `?utm_source=chatgpt.com` links, one href with a
 * trailing `"` and one with a trailing space.
 *
 * Every rewrite comes from the REWRITES table below — the script never
 * guesses a slug. Anything internal it cannot resolve is logged and left.
 *
 * Run: npx tsx --env-file=.env.local scripts/fix-blog-broken-links.ts          (dry)
 *      npx tsx --env-file=.env.local scripts/fix-blog-broken-links.ts --write
 */
import { createClient } from "next-sanity"
import { LOCALES, LOCALE_PREFIX_PATTERN, stripLocalePrefix } from "../src/i18n/locales"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "33b6wn5r",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-11-13",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const write = process.argv.includes("--write")

/** Locale-stripped old path → new path. Keep in step with LEGACY_PATHS in src/middleware.ts. */
const REWRITES: Readonly<Record<string, string>> = {
  "/blog/conservation-ocean-awareness/sustainable-diving":
    "/blog/conservation-ocean-awareness/sustainable-diving-punta-cana",
  "/blog/travel-tips/getting-around-punta-cana":
    "/blog/travel-tips/getting-around-punta-cana-transportation",
  "/blog/marine-life/what-are-corals":
    "/blog/marine-life/what-are-corals-plants-or-animals",
  "/blog/diving-tips/whats-included":
    "/blog/diving-tips/whats-included-punta-cana-dive-package",
  "/blog/travel-tips/non-dive-days-punta-cana":
    "/blog/travel-tips/non-dive-days-punta-cana-mixed-itinerary",
  "/blog/diving-tips/ear-equalization-problems":
    "/blog/diving-tips/ear-equalization-problems-scuba-diving",
}

const INTERNAL = /^https?:\/\/(www\.)?grandbay-puntacana\.com/i

type MarkDef = { _key: string; _type: string; href?: string }
type Block = { _key: string; _type: string; markDefs?: MarkDef[] }
type Post = {
  _id: string
  slug: string
  blogBody: Partial<Record<(typeof LOCALES)[number], Block[]>>
}

/** Returns the corrected href, or null when nothing needs to change. */
function fixHref(raw: string): string | null {
  if (!INTERNAL.test(raw.trim())) return null
  let url: URL
  try {
    url = new URL(raw.trim())
  } catch {
    return null
  }
  let changed = raw !== raw.trim()

  // Malformed: a stray quote glued onto the path.
  if (url.pathname.endsWith('"') || url.pathname.endsWith("%22")) {
    url.pathname = url.pathname.replace(/(%22|")$/, "")
    changed = true
  }
  // Self-referential UTM on an internal link only breaks attribution.
  if (url.searchParams.has("utm_source")) {
    for (const k of [...url.searchParams.keys()]) {
      if (k.startsWith("utm_")) url.searchParams.delete(k)
    }
    changed = true
  }
  // Retired slug → current slug, preserving the locale prefix.
  const prefix = url.pathname.match(LOCALE_PREFIX_PATTERN)?.[1]
  const target = REWRITES[stripLocalePrefix(url.pathname)]
  if (target) {
    url.pathname = prefix ? `/${prefix}${target}` : target
    changed = true
  }
  return changed ? url.toString() : null
}

async function main() {
  const posts: Post[] = await client.fetch(
    `*[_type == "blogPost" && !(_id in path("drafts.**"))]{ _id, "slug": slug.current, blogBody }`,
  )
  let hrefs = 0
  let docs = 0
  for (const post of posts) {
    const changes: Record<string, string> = {}
    const lines: string[] = []
    for (const locale of LOCALES) {
      for (const block of post.blogBody?.[locale] ?? []) {
        for (const def of block.markDefs ?? []) {
          if (!def.href) continue
          const next = fixHref(def.href)
          if (!next) continue
          changes[
            `blogBody.${locale}[_key=="${block._key}"].markDefs[_key=="${def._key}"].href`
          ] = next
          lines.push(`   ${locale}  ${def.href}\n       → ${next}`)
        }
      }
    }
    if (!lines.length) continue
    docs++
    hrefs += lines.length
    console.log(`\n${post.slug} (${post._id})`)
    console.log(lines.join("\n"))
    if (write) await client.patch(post._id).set(changes).commit()
  }
  console.log(
    `\n${write ? "Rewrote" : "Would rewrite"} ${hrefs} href(s) in ${docs} post(s).` +
      (write ? "" : " Re-run with --write to apply."),
  )
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

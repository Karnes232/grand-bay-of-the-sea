/**
 * One-off migration (2026-07-31): all 39 blog posts carried a raw
 * https://wa.me/... link in both EN and ES bodies ("message us on WhatsApp").
 * Those bypass /api/wa tracking and the owner wants the contact form instead.
 *
 * Per post & locale, the block containing the wa.me markDef is rewritten:
 *  - If the same block already links grandbay-puntacana.com/contact
 *    ("...contact page or on WhatsApp") → drop the WhatsApp link, its span,
 *    and the "or on" connector, keeping the existing contact-page link.
 *  - Otherwise → repoint the markDef at /contact (locale-aware) and rewrite
 *    the sentence: "message us on WhatsApp" → "message us through our
 *    contact form" / "escríbenos por WhatsApp" → "escríbenos a través de
 *    nuestro formulario de contacto".
 *  - Two posts with unique phrasing (dr-web-studio…, punta-cana-excursions…)
 *    get bespoke rewrites below.
 * Any block that doesn't match a known pattern is logged and left untouched.
 *
 * Run: npx tsx --env-file=.env.local scripts/fix-blog-whatsapp-links.ts          (dry)
 *      npx tsx --env-file=.env.local scripts/fix-blog-whatsapp-links.ts --write
 */
import { createClient } from "next-sanity"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "33b6wn5r",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-11-13",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const write = process.argv.includes("--write")

type Locale = "en" | "es"
type Span = { _key: string; _type: string; text: string; marks?: string[] }
type MarkDef = { _key: string; _type: string; href?: string }
type Block = {
  _key: string
  _type: string
  children?: Span[]
  markDefs?: MarkDef[]
  [k: string]: unknown
}

const CONTACT_URL: Record<Locale, string> = {
  en: "https://www.grandbay-puntacana.com/contact",
  es: "https://www.grandbay-puntacana.com/es/contact",
}
const LINK_TEXT: Record<Locale, string> = {
  en: "contact form",
  es: "formulario de contacto",
}

// Case A ("...contact page or on WhatsApp"): connector phrases to delete
// along with the WhatsApp span. Longest first.
const CONNECTORS: Record<Locale, string[]> = {
  en: [" or message us directly on ", " or message us on ", " or on "],
  es: [
    " o escribirnos directamente por ",
    " o escríbenos por ",
    " o directamente por ",
    " o por ",
  ],
}

// Case B (WhatsApp is the only link): suffix rewrites for the span preceding
// the link. Longest first, case-sensitive.
const PREV_REWRITES: Record<Locale, [string, string][]> = {
  en: [
    ["message us on ", "message us through our "],
    ["Message us on ", "Message us through our "],
    ["reach out on ", "reach out through our "],
    ["Reach out on ", "Reach out through our "],
    ["Reach us on ", "Reach us through our "],
  ],
  es: [
    ["escríbenos por ", "escríbenos a través de nuestro "],
    ["Escríbenos por ", "Escríbenos a través de nuestro "],
  ],
}

const renderBlock = (b: Block) =>
  (b.children ?? [])
    .map(s => {
      const link = (b.markDefs ?? []).find(d => s.marks?.includes(d._key) && d.href)
      return link ? `[${s.text}](${link.href})` : s.text
    })
    .join("")

/** Rewrites the block in place. Returns a case label, or an error string starting with "!". */
function transformBlock(block: Block, locale: Locale, slug: string): string {
  const markDefs = block.markDefs ?? []
  const children = block.children ?? []
  const waDefs = markDefs.filter(d => d.href?.includes("wa.me"))
  if (waDefs.length !== 1) return `! expected 1 wa.me markDef, found ${waDefs.length}`
  const waDef = waDefs[0]
  const waIdx = children.findIndex(s => s.marks?.includes(waDef._key))
  if (waIdx < 1) return "! no span carries the wa.me mark (or it is block-initial)"
  const waSpan = children[waIdx]
  const prev = children[waIdx - 1]
  const next = children[waIdx + 1]
  const isPlain = (s?: Span) => !!s && (!s.marks || s.marks.length === 0)

  // Bespoke: "…which is more relevant for your trip, WhatsApp us — …"
  if (slug === "punta-cana-excursions-by-grand-bay") {
    if (locale === "en") {
      if (!isPlain(prev) || !prev.text.endsWith("for your trip, ") || !next?.text.startsWith(" us"))
        return "! bespoke pattern mismatch"
      prev.text += "message us through our "
      next.text = next.text.slice(" us".length)
    } else {
      if (!isPlain(prev) || !prev.text.endsWith("para tu viaje, "))
        return "! bespoke pattern mismatch"
      prev.text += "escríbenos a través de nuestro "
    }
    waDef.href = CONTACT_URL[locale]
    waSpan.text = LINK_TEXT[locale]
    return "bespoke (verb form)"
  }

  // Bespoke: "…the fastest channel is WhatsApp — …"
  if (slug === "dr-web-studio-punta-cana-website-design") {
    const expected = locale === "en" ? "the fastest channel is " : "el canal más rápido es "
    if (!isPlain(prev) || !prev.text.endsWith(expected)) return "! bespoke pattern mismatch"
    waDef.href = CONTACT_URL[locale]
    waSpan.text = locale === "en" ? "our contact form" : "nuestro formulario de contacto"
    return "bespoke (fastest channel)"
  }

  const hasGrandBayContact = markDefs.some(
    d => d.href && /grandbay-puntacana\.com\/(es\/)?contact/.test(d.href),
  )

  if (hasGrandBayContact) {
    // Case A: drop the WhatsApp link and its connector, keep the contact link.
    if (!isPlain(prev)) return "! case A: span before WhatsApp link is not plain text"
    const connector = CONNECTORS[locale].find(c => prev.text.endsWith(c))
    if (!connector) return `! case A: no known connector before WhatsApp span ("…${prev.text.slice(-40)}")`
    block.markDefs = markDefs.filter(d => d._key !== waDef._key)
    if (prev.text === connector) {
      block.children = children.filter((_, i) => i !== waIdx - 1 && i !== waIdx)
    } else {
      prev.text = prev.text.slice(0, -connector.length)
      block.children = children.filter((_, i) => i !== waIdx)
    }
    return "removed (contact link already present)"
  }

  // Case B: repoint the link at the contact form and fix the wording.
  if (!isPlain(prev)) return "! case B: span before WhatsApp link is not plain text"
  if (waSpan.text !== "WhatsApp") return `! case B: unexpected link text "${waSpan.text}"`
  const rewrite = PREV_REWRITES[locale].find(([from]) => prev.text.endsWith(from))
  if (!rewrite) return `! case B: no known phrase before WhatsApp span ("…${prev.text.slice(-40)}")`
  prev.text = prev.text.slice(0, -rewrite[0].length) + rewrite[1]
  waDef.href = CONTACT_URL[locale]
  waSpan.text = LINK_TEXT[locale]
  return "converted to contact form"
}

async function run() {
  if (write && !process.env.SANITY_API_WRITE_TOKEN) throw new Error("SANITY_API_WRITE_TOKEN missing")
  const docs: { _id: string; slug: string; en?: Block[]; es?: Block[] }[] = await client.fetch(
    `*[_type == "blogPost" && (
       count(blogBody.en[].markDefs[href match "*wa.me*"]) > 0 ||
       count(blogBody.es[].markDefs[href match "*wa.me*"]) > 0
     )]{ _id, "slug": slug.current, "en": blogBody.en, "es": blogBody.es } | order(slug)`,
  )
  console.log(`${docs.length} blog posts with wa.me links in the body\n`)
  let patched = 0
  let warnings = 0
  for (const doc of docs) {
    const changes: Record<string, Block[]> = {}
    for (const locale of ["en", "es"] as const) {
      const blocks: Block[] = structuredClone(doc[locale] ?? [])
      let localeChanged = false
      for (const block of blocks) {
        if (!(block.markDefs ?? []).some(d => d.href?.includes("wa.me"))) continue
        const before = renderBlock(block)
        const result = transformBlock(block, locale, doc.slug)
        if (result.startsWith("!")) {
          warnings++
          console.log(`⚠ ${doc.slug} [${locale}] ${result} — left untouched`)
          console.log(`    ${before}\n`)
          continue
        }
        localeChanged = true
        console.log(`${doc.slug} [${locale}] ${result}`)
        console.log(`  - …${before.slice(-160)}`)
        console.log(`  + …${renderBlock(block).slice(-160)}\n`)
      }
      if (localeChanged) changes[`blogBody.${locale}`] = blocks
    }
    if (write && Object.keys(changes).length > 0) {
      await client.patch(doc._id).set(changes).commit()
      patched++
    }
  }
  if (warnings) console.log(`⚠ ${warnings} block(s) left untouched — resolve manually or extend patterns`)
  if (write) {
    console.log(`\n✔ patched ${patched} docs`)
    const left = await client.fetch(
      `count(*[_type == "blogPost" && (
         count(blogBody.en[].markDefs[href match "*wa.me*"]) > 0 ||
         count(blogBody.es[].markDefs[href match "*wa.me*"]) > 0
       )])`,
    )
    console.log(`Post-check: ${left} posts still have wa.me links in the body (expect 0)`)
    const textLeft = await client.fetch(
      `count(*[_type == "blogPost" && (
         count(blogBody.en[].children[text match "*WhatsApp*"]) > 0 ||
         count(blogBody.es[].children[text match "*WhatsApp*"]) > 0
       )])`,
    )
    console.log(`Post-check: ${textLeft} posts still say "WhatsApp" in body text (expect 0)`)
  } else {
    console.log("\nDry run — re-run with --write to apply.")
  }
}

run().catch(e => {
  console.error(e)
  process.exit(1)
})

/**
 * Assert every Offer price in a document's JSON-LD is a price that document
 * actually quotes.
 *
 * This is the check that would have caught the Saona trip, whose structured data
 * advertised a $220/$110 group excursion for months after the page had been
 * converted to a private-charter-only product at $250/$150. Hand-authored JSON-LD
 * sitting beside the content it describes drifts silently; nothing rendered the
 * discrepancy, so nothing surfaced it.
 *
 * A price passes if it equals the document's own `price`/`padiPrice` field, or
 * appears verbatim in the document's visible copy (paragraphs, FAQs, stats).
 *
 * Run: node --env-file=.env.local scripts/verify-offer-prices.mjs
 */
import { createClient } from "next-sanity"
const c = createClient({projectId:"33b6wn5r",dataset:"production",apiVersion:"2025-11-13",useCdn:false})

/** Every string in a document, so a price quoted in body copy counts as "quoted". */
function allText(node, out = []) {
  if (typeof node === "string") out.push(node)
  else if (Array.isArray(node)) node.forEach(n => allText(n, out))
  else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      if (k === "seo") continue // don't let the schema justify itself
      allText(v, out)
    }
  }
  return out
}

function offersIn(raw) {
  const out = []
  let parsed
  try { parsed = JSON.parse(raw) } catch { return out }
  const walk = n => {
    if (Array.isArray(n)) return n.forEach(walk)
    if (n && typeof n === "object") {
      if (n["@type"] === "Offer" && n.price != null) out.push({ price: String(n.price), name: n.name ?? "(unnamed)" })
      Object.values(n).forEach(walk)
    }
  }
  walk(parsed)
  return out
}

// Hub pages (pageSeo) carry no body copy of their own — the content lives in a
// separate document — so they are validated against the set of prices the site
// genuinely charges anywhere, rather than against their own (empty) text.
const priced = await c.fetch(`*[!(_id in path("drafts.**")) && (defined(price) || defined(padiPrice))]{price,padiPrice}`)
const AUTHORITATIVE = new Set(priced.flatMap(d => [d.price, d.padiPrice]).filter(v => v != null).map(String))
// Rates with no priced document behind them: local 2-tank dives are not a Sanity
// product, and the multi-day ($120/day) and 4-tank ($240) rates are derived from
// it. Keep this list short — every entry is a price nothing else can verify.
;["135", "120", "240", "100", "150"].forEach(v => AUTHORITATIVE.add(v))

const docs = await c.fetch(`*[!(_id in path("drafts.**")) && defined(seo.structuredData)]{_id,_type,"slug":slug.current,price,padiPrice,...}`)
let problems = 0, checked = 0
for (const d of docs) {
  const own = new Set([d.price, d.padiPrice].filter(v => v != null).map(String))
  const haystack = allText(d).join(" ")
  for (const loc of ["en", "es", "de"]) {
    const raw = d.seo?.structuredData?.[loc]
    if (!raw) continue
    for (const { price, name } of offersIn(raw)) {
      checked++
      if (own.has(price)) continue
      if (new RegExp(`\\$\\s?${price}\\b|\\b${price}\\s?(USD|US\\$)`).test(haystack)) continue
      // A hub page legitimately lists many products' prices.
      if (d._type === "pageSeo" && AUTHORITATIVE.has(price)) continue
      const id = typeof d.slug === "string" ? d.slug : (d.pageName ?? d._id)
      console.log(`  ✗ ${d._type}/${id} [${loc}]  $${price} — "${name}" is not a price this document charges`)
      problems++
    }
  }
}
console.log(`\n[verify-offer-prices] ${checked} offer price(s) checked, ${problems} unsupported.`)
process.exit(problems ? 1 : 0)

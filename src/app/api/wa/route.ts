import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabaseServer"
import { BUSINESS } from "@/lib/business"

// Link-preview fetchers and crawlers hit this URL too (WhatsApp itself
// previews it when the link is shared) — redirect them, but don't log.
const BOT_UA = /bot|crawler|spider|preview|facebookexternalhit|whatsapp/i

const MESSAGES = {
  en: "Hi! I'd like more information about diving.",
  es: "¡Hola! Me gustaría más información sobre el buceo.",
} as const

const FROM_LABEL = { en: "from", es: "de" } as const

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const source = searchParams.get("src") || "unknown"
  const locale = searchParams.get("locale") === "es" ? "es" : "en"
  const userAgent = request.headers.get("user-agent") || ""

  let page = searchParams.get("page") || ""
  if (!page) {
    const referer = request.headers.get("referer")
    if (referer) {
      try {
        page = new URL(referer).pathname
      } catch {
        // ignore malformed referer
      }
    }
  }
  if (!page.startsWith("/")) page = ""
  page = page.slice(0, 200)

  // Netlify's CDN geolocates every request; the header shape has varied
  // between plain and base64-encoded JSON across runtime versions.
  let geo: { country?: { code?: string } | string; city?: string } = {}
  const rawGeo = request.headers.get("x-nf-geo")
  if (rawGeo) {
    try {
      geo = JSON.parse(rawGeo)
    } catch {
      try {
        geo = JSON.parse(Buffer.from(rawGeo, "base64").toString())
      } catch {
        // leave geo empty
      }
    }
  }
  const country =
    (typeof geo.country === "object" ? geo.country?.code : geo.country) ||
    request.headers.get("x-country") ||
    ""
  const city = geo.city || ""
  const browserLanguage = (request.headers.get("accept-language") || "")
    .split(",")[0]
    .trim()
    .slice(0, 35)
  const device = /Mobi|Android|iPhone|iPad/i.test(userAgent)
    ? "mobile"
    : "desktop"

  if (!BOT_UA.test(userAgent)) {
    const { error } = await supabaseServer.from("whatsapp_clicks").insert([
      {
        source,
        page,
        locale,
        user_agent: userAgent.slice(0, 500),
        country: country.slice(0, 10),
        city: city.slice(0, 100),
        browser_language: browserLanguage,
        device,
      },
    ])
    if (error) {
      console.error("Failed to log WhatsApp click.", error)
    }
  }

  let text = MESSAGES[locale]
  if (page && page !== "/") {
    text += ` (${FROM_LABEL[locale]}: ${page})`
  }

  const params = new URLSearchParams({ text })
  return NextResponse.redirect(
    `https://wa.me/${BUSINESS.phoneE164.replace("+", "")}?${params}`,
    302,
  )
}

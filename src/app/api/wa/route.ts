import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabaseServer"
import { BUSINESS } from "@/lib/business"
import { toLocale, type Localized } from "@/i18n/locales"

// Link-preview fetchers and crawlers hit this URL too (WhatsApp itself
// previews it when the link is shared) — redirect them, but don't log.
// UA sniffing can't catch scrapers with ordinary Chrome UAs, so logging also
// requires c=1, which TrackedWhatsAppLink appends only at interaction time.
const BOT_UA =
  /bot|crawler|spider|preview|facebookexternalhit|whatsapp|googleother|headless|python|curl|wget|scrapy|okhttp|go-http|axios|node-fetch|java\//i

// The message WhatsApp opens pre-filled. Typed `Localized<string>` rather than
// `as const`, so adding a locale is a compile error here instead of silently
// greeting a German reader in English.
const MESSAGES: Localized<string> = {
  en: "Hi! I'd like more information about diving.",
  es: "¡Hola! Me gustaría más información sobre el buceo.",
  de: "Hallo! Ich hätte gerne mehr Informationen zum Tauchen.",
  fr: "Bonjour ! Je souhaiterais plus d'informations sur la plongée.",
}

const FROM_LABEL: Localized<string> = {
  en: "from",
  es: "de",
  de: "von",
  fr: "de",
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const source = searchParams.get("src") || "unknown"
  const locale = toLocale(searchParams.get("locale"))
  const clicked = searchParams.get("c") === "1"
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

  if (clicked && !BOT_UA.test(userAgent)) {
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

import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "es"],

  // Used when no locale matches
  defaultLocale: "en",
  localePrefix: "as-needed",

  // Don't set the NEXT_LOCALE cookie from middleware. Writing a cookie forces
  // dynamic rendering, which made the HTML uncacheable (cache-control: no-store)
  // despite ISR `revalidate`, hurting TTFB/LCP. Locale still resolves from the
  // URL (/es) and Accept-Language; the language switcher navigates by URL.
  localeCookie: false,

  // Don't redirect `/` to `/es` based on the browser's Accept-Language header.
  // Google advises against automatic language redirects on hreflang sites: the
  // redirect stopped crawlers (and users) reaching the English home page, and
  // Ahrefs showed `/es` ranking for English queries ("scuba diving punta cana",
  // "diving punta cana") as a result. hreflang already routes search traffic to
  // the right locale, so detection buys nothing here and costs the EN ranking.
  // Bonus: `/` no longer varies on a request header, so it stays fully
  // CDN-cacheable — same reasoning as `localeCookie: false` above.
  localeDetection: false,
})

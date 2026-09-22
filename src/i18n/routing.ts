import { defineRouting } from "next-intl/routing"

import { ACTIVE_LOCALES, DEFAULT_LOCALE } from "./locales"

export const routing = defineRouting({
  // A list of all locales that are supported. Sourced from ./locales so the
  // list lives in exactly one place — see that file for LOCALES vs ACTIVE_LOCALES.
  locales: ACTIVE_LOCALES,

  // Used when no locale matches
  defaultLocale: DEFAULT_LOCALE,
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

  // Don't set the `Link: <…>; rel="alternate"; hreflang=…` response header.
  // Every page already declares its own hreflang in metadata, and only the
  // page knows which locales really exist: the blog is per-post for de/fr,
  // so the header promised /de/… and /fr/… for untranslated posts (which 307
  // to English) and stamped a full set of alternates onto every 404. Ahrefs
  // (2026-09-22) reported 210 hreflang links to 404 pages from that alone.
  alternateLinks: false,
})

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
})

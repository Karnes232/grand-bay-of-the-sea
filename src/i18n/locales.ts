/**
 * Single source of truth for the site's locales.
 *
 * Before this file the locale list was duplicated in seven places (routing,
 * settings, languageUtils, LanguageSwitcher, the layout's generateStaticParams,
 * hreflang, and two path regexes) plus a literal locale union in 46 files.
 * Adding a third language meant finding all of them. Everything now derives
 * from `LOCALES` / `ACTIVE_LOCALES` below.
 *
 * Two lists, deliberately:
 *
 * - `LOCALES` — every locale the *code* supports. Widening this is what makes
 *   TypeScript flag the places that need per-locale content (page code indexes
 *   Sanity directly, e.g. `pageSeo.seo.meta[locale].title`, so a locale with no
 *   corresponding Sanity field is a runtime crash, not a blank). Let the
 *   compiler drive that work rather than hunting for it.
 *
 * - `ACTIVE_LOCALES` — the locales actually exposed to users and crawlers:
 *   routing, hreflang, the sitemap, and the language switcher. A locale can sit
 *   in `LOCALES` (plumbing built, schema fields present) while its translation
 *   is still being produced, without leaking half-translated pages.
 *
 * NOT derived from here: the `config.matcher` regex in `src/middleware.ts`.
 * Next.js statically analyses that value at build time, so it has to stay a
 * literal — update it by hand when this list changes.
 */

/** Every locale the codebase supports. */
export const LOCALES = ["en", "es"] as const

export type Locale = (typeof LOCALES)[number]

/** Used when no locale matches, and the locale with no URL prefix. */
export const DEFAULT_LOCALE: Locale = "en"

/**
 * Locales exposed publicly. Kept separate from `LOCALES` so a language can be
 * built and reviewed before launch, and switched off again without a code
 * change if something is wrong with it.
 */
export const ACTIVE_LOCALES: readonly Locale[] = LOCALES

export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" && (LOCALES as readonly string[]).includes(value)
  )
}

/**
 * Coerce anything (a route param, a cookie, user input) to a usable locale.
 */
export function toLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE
}

/**
 * Matches a leading `/en` / `/es` … segment, e.g. for stripping the prefix
 * before switching languages. Built from `LOCALES` so it can never drift.
 *
 * The `(?=/|$)` lookahead matters: without it the old hand-written
 * `/^\/(en|es)/` would turn a path like `/enriched-air` into `riched-air`.
 */
export const LOCALE_PREFIX_PATTERN = new RegExp(
  `^/(${LOCALES.join("|")})(?=/|$)`,
)

/** Strip the locale prefix from a pathname, always returning a rooted path. */
export function stripLocalePrefix(pathname: string): string {
  return pathname.replace(LOCALE_PREFIX_PATTERN, "") || "/"
}

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
 * - `LOCALES` — every locale the *code* supports. Widening it widens every
 *   `Localized<T>` at once. Be clear about what that does and does not buy:
 *   because `tsconfig.json` sets `strict: false`, the compiler catches object
 *   *literals* that are missing the new locale, but NOT reads of data that
 *   lacks it — `field?.[locale]` renders blank and `seo.meta[locale].title`
 *   crashes the route, both silently. `scripts/verify-<locale>-content.mjs` is
 *   the check that actually covers reads; it exists precisely because the
 *   compiler cannot.
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
export const LOCALES = ["en", "es", "de"] as const

export type Locale = (typeof LOCALES)[number]

/**
 * A value that exists in every locale — the shape Sanity's localized fields
 * return, and the shape page code indexes with `field[locale]`.
 *
 * Use this rather than writing `{ en: T; es: T; de: T }` inline. Two reasons:
 *
 *  - Adding a locale to `LOCALES` widens every one of these at once. The inline
 *    form had to be edited in ~200 places when German was added, and
 *    `tsconfig.json` sets `strict: false`, so the compiler flagged exactly one
 *    of them — which is how 18 query files were missed and `/de/species`
 *    shipped broken.
 *  - `Record<Locale, T>` is exhaustive, so an object *literal* missing a locale
 *    is a compile error even under `strict: false`. Reads still widen silently
 *    (nothing can fix that short of `strict`), but every place that constructs
 *    a localized value is now checked.
 */
export type Localized<T> = Record<Locale, T>

/** Used when no locale matches, and the locale with no URL prefix. */
export const DEFAULT_LOCALE: Locale = "en"

/**
 * BCP-47 tag per locale, for anything that needs a real language tag rather
 * than our short code: `Intl` formatters and schema.org `inLanguage`.
 *
 * Typed `Localized<string>`, so adding a locale to `LOCALES` makes this a
 * compile error until the tag is filled in — one of the few locale-dependent
 * values the compiler can enforce under `strict: false`, because it is an
 * object literal rather than a read.
 *
 * Before this existed the site tested `locale === "es" ? "es-ES" : "en-US"` in
 * `formatDate` and in the tour date picker, so German dates rendered in US
 * format ("August 31, 2026" rather than "31. August 2026").
 */
export const LOCALE_TAG: Localized<string> = {
  en: "en-US",
  es: "es-ES",
  de: "de-DE",
}

/**
 * Locales exposed publicly. Kept separate from `LOCALES` so a language can be
 * built and reviewed before launch, and switched off again without a code
 * change if something is wrong with it.
 */
const DE_ENABLED = process.env.NEXT_PUBLIC_LOCALE_DE_ENABLED === "true"

export const ACTIVE_LOCALES: readonly Locale[] = LOCALES.filter(
  locale => locale !== "de" || DE_ENABLED,
)

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

/**
 * How the blog is translated, per locale.
 *
 * The service site is translated wholesale into every locale. The blog cannot
 * be: it is 151 posts and ~190k words, so a full translation is out of
 * proportion to what a fourth or fifth language is worth. So each locale is one
 * of two kinds, and this is the only place that says which:
 *
 *  - **Wholesale** (`BLOG_LOCALES`) — every post exists. English and Spanish.
 *  - **Per-post** (`PER_POST_BLOG_LOCALES`) — a post that carries a translation
 *    gets a real URL, an hreflang alternate and a sitemap entry; everything
 *    else redirects to English. German, and French when it lands.
 *
 * Which kind a locale is is an editorial decision — whether the whole blog is
 * worth translating — so it cannot be derived from anything. Adding a locale to
 * `PER_POST_BLOG` below is the whole change; `src/utils/blogLocales.ts` and the
 * GROQ availability projection both build themselves from these two lists.
 */
const PER_POST_BLOG: readonly string[] = ["de"]

/** Locales in which *every* blog post exists. */
export const BLOG_LOCALES: readonly Locale[] = ACTIVE_LOCALES.filter(
  locale => !PER_POST_BLOG.includes(locale),
)

/** Locales in which the blog is translated a post at a time. */
export const PER_POST_BLOG_LOCALES: readonly Locale[] = ACTIVE_LOCALES.filter(
  locale => PER_POST_BLOG.includes(locale),
)

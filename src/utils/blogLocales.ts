import {
  ACTIVE_LOCALES,
  BLOG_LOCALES,
  DEFAULT_LOCALE,
  type Locale,
} from "@/i18n/locales"

/**
 * Per-post locale availability for the blog.
 *
 * The blog is 151 posts / ~190k words, so translating it wholesale for every
 * language is out of proportion to what each one is worth. Locales are
 * therefore split in two by the registry (see `PER_POST_BLOG` in
 * `src/i18n/locales.ts`): some have every post, the rest are per-post — a
 * translated post gets a real URL, an hreflang alternate and a sitemap entry,
 * and an untranslated one redirects to English.
 *
 * Two rules hold this together:
 *
 *  - An hreflang alternate is a promise the translation exists, so it is only
 *    emitted for posts that actually have it.
 *  - The fallback is a REDIRECT, never the English article served at a
 *    translated URL. Serving English at `/de/blog/x` would create a second URL
 *    for identical content and lean on a canonical to undo it.
 *
 * Nothing here names a language. Everything reads the registry and the
 * `blogLocales` map projected by the blog GROQ queries, so a new locale is
 * one line in `PER_POST_BLOG` and no change at all in this file.
 */

/** Anything carrying the `blogLocales` map projected by the blog queries. */
type MaybeTranslated =
  | { blogLocales?: Partial<Record<Locale, boolean>> | null }
  | null
  | undefined

/** True when this post genuinely exists in the given locale. */
export function postHasLocale(post: MaybeTranslated, locale: string): boolean {
  // Wholesale locales have every post, translated or not.
  if ((BLOG_LOCALES as readonly string[]).includes(locale)) return true
  return Boolean(post?.blogLocales?.[locale as Locale])
}

/** True when at least one post in a listing exists in the given locale. */
export function listHasLocale(
  posts: readonly MaybeTranslated[],
  locale: string,
): boolean {
  if ((BLOG_LOCALES as readonly string[]).includes(locale)) return true
  return posts.some(post => postHasLocale(post, locale))
}

/**
 * The locales to advertise as hreflang alternates for one post — the wholesale
 * locales, plus any per-post locale this post is actually translated into.
 */
export function localesForPost(post: MaybeTranslated): readonly Locale[] {
  return ACTIVE_LOCALES.filter(locale => postHasLocale(post, locale))
}

/** The locales to advertise for a listing page, given the posts it holds. */
export function localesForPostList(
  posts: readonly MaybeTranslated[],
): readonly Locale[] {
  return ACTIVE_LOCALES.filter(locale => listHasLocale(posts, locale))
}

/**
 * Where to send a request for `locale` that has no content.
 *
 * Returns the default-locale URL, or null when the request can be served.
 * Callers pass this to `redirect()`, which issues a temporary redirect —
 * deliberately not permanent, since any of these URLs may become a real
 * translated page once its post is translated, and a 301 would be hard-cached
 * by browsers.
 */
export function fallbackPath(
  locale: string,
  path: string,
  available: boolean,
): string | null {
  if (available) return null
  if (locale === DEFAULT_LOCALE) return null
  return `/${path.replace(/^\//, "")}`
}

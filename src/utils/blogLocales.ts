import { BLOG_LOCALES, DEFAULT_LOCALE, type Locale } from "@/i18n/locales"

/**
 * Per-post locale availability for the blog.
 *
 * The blog is 151 posts / ~190k words, so translating it wholesale is out of
 * proportion to the German market. German is therefore per-post: a translated
 * post gets a real `/de/` URL, an hreflang alternate and a sitemap entry; an
 * untranslated one redirects to English.
 *
 * Two rules hold this together:
 *
 *  - An hreflang alternate is a promise the translation exists, so it is only
 *    emitted for posts that actually have German.
 *  - The fallback is a REDIRECT, never the English article served at a German
 *    URL. Serving English at `/de/blog/x` would create a second URL for
 *    identical content and lean on a canonical to undo it.
 */

/** Anything carrying the `hasDe` flag projected by the blog GROQ queries. */
type MaybeTranslated = { hasDe?: boolean } | null | undefined

/** True when this post genuinely exists in the given locale. */
export function postHasLocale(post: MaybeTranslated, locale: string): boolean {
  if (locale === "de") return Boolean(post?.hasDe)
  // English and Spanish exist for every post.
  return (BLOG_LOCALES as readonly string[]).includes(locale)
}

/**
 * The locales to advertise as hreflang alternates for one post. German is
 * included only when the post is actually translated.
 */
export function localesForPost(post: MaybeTranslated): readonly Locale[] {
  const base = BLOG_LOCALES.filter(l => l !== "de")
  return post?.hasDe ? [...base, "de" as Locale] : base
}

/** The locales to advertise for a listing page, given the posts it holds. */
export function localesForPostList(
  posts: readonly MaybeTranslated[],
): readonly Locale[] {
  const base = BLOG_LOCALES.filter(l => l !== "de")
  return posts.some(p => p?.hasDe) ? [...base, "de" as Locale] : base
}

/**
 * Where to send a request for `locale` that has no content.
 *
 * Returns the default-locale URL, or null when the request can be served.
 * Callers pass this to `redirect()`, which issues a temporary redirect —
 * deliberately not permanent, since any of these URLs may become a real German
 * page once its post is translated, and a 301 would be hard-cached by browsers.
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

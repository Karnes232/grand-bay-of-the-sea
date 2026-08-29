import { ACTIVE_LOCALES, DEFAULT_LOCALE, type Locale } from "@/i18n/locales"

const BASE_URL = "https://www.grandbay-puntacana.com"

/**
 * Build the public URL for a path in a given locale.
 *
 * `localePrefix: "as-needed"` means the default locale has no prefix, so `/`
 * and `/es` are the home pages but `/en` is not a URL.
 */
function localeUrl(cleanPath: string, locale: Locale): string {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`
  return cleanPath
    ? `${BASE_URL}${prefix}/${cleanPath}`
    : `${BASE_URL}${prefix}`
}

/**
 * hreflang URL map for a path.
 *
 * `locales` defaults to every publicly active locale. Pass a narrower list for
 * routes that deliberately don't exist in every language — the blog is en/es
 * only, so its pages must not advertise a German alternate that 404s.
 *
 * Emitting an hreflang for a locale whose content is missing is the failure
 * that had `/es` ranking for English queries before the `localeDetection` fix;
 * an alternate is a promise that the translation exists.
 */
export function generateHreflangUrls(
  path: string,
  locale: string,
  locales: readonly Locale[] = ACTIVE_LOCALES,
) {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path

  const urls: Record<string, string> = {}
  for (const l of locales) {
    urls[l] = localeUrl(cleanPath, l)
  }
  // x-default points at the default locale, which is also the unprefixed URL.
  urls["x-default"] = localeUrl(cleanPath, DEFAULT_LOCALE)

  return urls
}

export function getHreflangAlternates(
  path: string,
  locale: string,
  locales: readonly Locale[] = ACTIVE_LOCALES,
) {
  const urls = generateHreflangUrls(path, locale, locales)
  const cleanPath = path.startsWith("/") ? path.slice(1) : path

  // Self-canonical: the current locale's own URL, never another language's.
  const current = (locales as readonly string[]).includes(locale)
    ? (locale as Locale)
    : DEFAULT_LOCALE

  return {
    canonical: localeUrl(cleanPath, current),
    languages: urls,
  }
}

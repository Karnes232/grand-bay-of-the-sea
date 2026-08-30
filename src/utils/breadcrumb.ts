import { DEFAULT_LOCALE, toLocale } from "@/i18n/locales"

const BASE_URL = "https://www.grandbay-puntacana.com"

export interface BreadcrumbItem {
  /** Human-readable name for the crumb. */
  name: string
  /** Path without locale prefix or domain, e.g. "" (home), "/blog", "/courses/openwater". */
  path: string
}

/**
 * Build a BreadcrumbList JSON-LD string for injection via a <script type="application/ld+json">.
 *
 * URLs are locale-aware. The prefix is derived from the locale registry rather
 * than hardcoded: this function previously tested `locale === "es"`, which meant
 * every German page emitted breadcrumb URLs pointing at the *English* pages from
 * the day German launched. Deriving it from `DEFAULT_LOCALE` means a fourth
 * locale cannot reintroduce that.
 */
export function breadcrumbJsonLd(
  items: BreadcrumbItem[],
  locale: string,
): string {
  // toLocale() coerces anything unrecognised to the default rather than
  // emitting a prefix for a locale that does not exist.
  const resolved = toLocale(locale)
  const prefix = resolved === DEFAULT_LOCALE ? "" : `/${resolved}`
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${prefix}${item.path}`,
    })),
  })
}

/** "travel-tips" -> "Travel Tips" */
export function humanizeSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

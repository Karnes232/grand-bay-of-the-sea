const BASE_URL = "https://www.grandbay-puntacana.com"

export interface BreadcrumbItem {
  /** Human-readable name for the crumb. */
  name: string
  /** Path without locale prefix or domain, e.g. "" (home), "/blog", "/courses/openwater". */
  path: string
}

/**
 * Build a BreadcrumbList JSON-LD string for injection via a <script type="application/ld+json">.
 * URLs are locale-aware: Spanish pages get the /es prefix (English has none, matching
 * next-intl's `localePrefix: "as-needed"`).
 */
export function breadcrumbJsonLd(
  items: BreadcrumbItem[],
  locale: string,
): string {
  const prefix = locale === "es" ? "/es" : ""
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
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

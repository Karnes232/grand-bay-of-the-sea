import { DEFAULT_LOCALE, toLocale } from "@/i18n/locales"
import { BUSINESS } from "@/lib/business"

/**
 * JSON-LD builders for pages whose structured data is derived, not hand-authored.
 *
 * Nine pages — including `/trips` and `/species`, the two commercial pages with
 * the most US impressions — shipped no page-level schema at all: Sanity held an
 * empty `Organization` stub (`name: ""`) that `JsonLd.isMeaningful()` correctly
 * discarded, so the CMS looked populated while the page emitted nothing.
 *
 * Rather than hand-author replacements, these build the markup from the same data
 * the page already renders. A JSON string typed into Sanity beside the fields it
 * describes drifts silently: the Saona trip advertised a $220 group excursion for
 * months after the page had become a $250 private charter, and nothing surfaced it
 * because nothing rendered it. Derived schema cannot drift.
 *
 * Follows the `breadcrumbJsonLd` convention in ./breadcrumb.ts — a pure function
 * returning a JSON string for injection via <script type="application/ld+json">.
 */

const BASE_URL = "https://www.grandbay-puntacana.com"

/** Absolute, locale-correct URL for a site-relative path. */
export function localeUrl(path: string, locale: string): string {
  const resolved = toLocale(locale)
  const prefix = resolved === DEFAULT_LOCALE ? "" : `/${resolved}`
  return `${BASE_URL}${prefix}${path}`
}

/** The canonical business node, referenced by @id rather than repeated. */
const businessRef = { "@type": "LocalBusiness", "@id": `${BASE_URL}/#business` }

export interface ListItem {
  name: string
  path: string
  description?: string
  image?: string
  /** Price in USD. Omit for items that are not directly bookable. */
  price?: number | string
}

/**
 * An `ItemList` of the offerings a hub page lists, in the order shown.
 *
 * `itemType` becomes each entry's `@type` — `TouristTrip` for /trips, `Thing` for
 * a species guide. Entries carrying a `price` also get an `Offer`, so a hub page
 * states the same prices its cards display.
 */
export function itemListJsonLd(
  items: ListItem[],
  locale: string,
  { itemType = "Thing", listName }: { itemType?: string; listName?: string } = {},
): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    ...(listName ? { name: listName } : {}),
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": itemType,
        name: item.name,
        url: localeUrl(item.path, locale),
        ...(item.description ? { description: item.description } : {}),
        ...(item.image ? { image: item.image } : {}),
        ...(item.price != null
          ? {
              offers: {
                "@type": "Offer",
                price: String(item.price),
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                url: localeUrl(item.path, locale),
                seller: businessRef,
              },
            }
          : {}),
      },
    })),
  })
}

export interface DiveSitePlace {
  name: string
  path: string
  description?: string
  image?: string
  /** Maximum depth. */
  meters?: number
  feet?: number
  /** Certification level required, e.g. "Advanced". */
  level?: string
  /** Nearest town, e.g. "Bayahibe". */
  location?: string
}

/**
 * A dive site as a `TouristAttraction`.
 *
 * The 12 `/sites/[site]` pages previously emitted only a `BreadcrumbList`, despite
 * ranking for site-name queries (`wreck st george punta cana` sits at 6.9). Depth
 * and required certification are the facts a diver is actually searching for, so
 * they go in as `additionalProperty` rather than being left in prose only.
 */
export function diveSiteJsonLd(site: DiveSitePlace, locale: string): string {
  const properties = [
    site.meters != null && {
      "@type": "PropertyValue",
      name: "Maximum depth",
      value: `${site.meters} m${site.feet != null ? ` (${site.feet} ft)` : ""}`,
    },
    site.level && {
      "@type": "PropertyValue",
      name: "Certification level",
      value: site.level,
    },
  ].filter(Boolean)

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: site.name,
    url: localeUrl(site.path, locale),
    ...(site.description ? { description: site.description } : {}),
    ...(site.image ? { image: site.image } : {}),
    ...(site.location
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: site.location,
            addressCountry: "DO",
          },
        }
      : {}),
    // Site-level coordinates are not held per document; the operator's are the
    // closest true value and anchor the attraction to the right region.
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    ...(properties.length ? { additionalProperty: properties } : {}),
    isAccessibleForFree: false,
    provider: businessRef,
  })
}

/** A single bookable service with one price, e.g. deep-sea fishing. */
export function serviceJsonLd(
  {
    name,
    path,
    description,
    price,
  }: { name: string; path: string; description?: string; price?: number },
  locale: string,
): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    url: localeUrl(path, locale),
    ...(description ? { description } : {}),
    provider: businessRef,
    areaServed: "Punta Cana",
    ...(price != null
      ? {
          offers: {
            "@type": "Offer",
            price: String(price),
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: localeUrl(path, locale),
            seller: businessRef,
          },
        }
      : {}),
  })
}

import { BUSINESS } from "@/lib/business"

const SITE_URL = "https://www.grandbay-puntacana.com"

/**
 * Single canonical business entity for the whole site (`#business`).
 * Injected site-wide in the <head> via (root)/[locale]/layout.tsx so every page
 * references the same LocalBusiness identity (avoids a split entity graph).
 *
 * NAP/geo values come from `@/lib/business` (shared with the visible
 * ContactInfo component); `NEXT_PUBLIC_BUSINESS_*` env vars override there.
 */
const lat = BUSINESS.latitude
const lng = BUSINESS.longitude

export function generateStructuredData(locale: string = "en") {
  const geo =
    lat && lng && !Number.isNaN(Number(lat)) && !Number.isNaN(Number(lng))
      ? {
          "@type": "GeoCoordinates" as const,
          latitude: Number(lat),
          longitude: Number(lng),
        }
      : undefined

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SportsActivityLocation"],
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS.name,
    alternateName: BUSINESS.alternateName,
    description:
      locale === "es"
        ? "Centro de buceo PADI en Punta Cana, República Dominicana, que ofrece Discover Scuba Diving para principiantes, cursos de certificación PADI y buceo guiado en arrecifes, pecios y con tiburones."
        : "PADI dive center in Punta Cana, Dominican Republic offering Discover Scuba Diving for beginners, PADI certification courses, and guided reef, wreck, and shark diving experiences.",
    url: `${SITE_URL}/`,
    inLanguage: locale,
    logo: "https://images.ctfassets.net/iqfmqk4smewk/4AKIgOA6drFSpgIoRpPPu3/6b8b92af64259355d55d245dbe71b0cc/logo.png",
    image:
      "https://images.ctfassets.net/iqfmqk4smewk/4CYN3rPs0ryO4Gi4JDPm8e/156feb808cdad566332c11071dac1e09/pexels-leonardo-lamas-7001709.webp",
    telephone: BUSINESS.phoneSchema,
    email: BUSINESS.email,
    foundingDate: "2016",
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card",
    knowsLanguage: ["en", "es", "fr"],
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.addressCountry,
    },
    ...(geo ? { geo } : {}),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: BUSINESS.hours.opens,
        closes: BUSINESS.hours.closes,
      },
    ],
    hasMap: BUSINESS.mapUrl,
    areaServed: [
      { "@type": "City", name: "Punta Cana" },
      { "@type": "City", name: "Bávaro" },
      { "@type": "City", name: "Cap Cana" },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: BUSINESS.phoneSchema,
        contactType: "customer service",
        availableLanguage: ["en", "es", "fr"],
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS.rating.value,
      reviewCount: BUSINESS.rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    identifier: {
      "@type": "PropertyValue",
      name: "PADI Store Number",
      value: "27147",
    },
    sameAs: [
      "https://www.facebook.com/grandbaydivecenter/",
      "https://www.instagram.com/grandbayoftheseard/",
      "https://twitter.com/GrandBayOfTheS1",
      "https://www.youtube.com/channel/UCpYWOhIwbVVLGYOxL0UAtTw",
      "https://maps.app.goo.gl/tAB86MjFxiF7Hefj7",
      "https://www.tripadvisor.com/Attraction_Review-g147293-d23313894-Reviews-Grand_Bay_Of_The_Sea-Punta_Cana_La_Altagracia_Province_Dominican_Republic.html",
      "https://travel.padi.com/dive-center/dominican-republic/grand-bay-of-the-sea/",
    ],
  }
}

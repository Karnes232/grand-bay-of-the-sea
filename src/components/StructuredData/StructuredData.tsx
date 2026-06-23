const SITE_URL = "https://www.grandbay-puntacana.com"

/**
 * Single canonical business entity for the whole site (`#business`).
 * Injected site-wide in the <head> via (root)/[locale]/layout.tsx so every page
 * references the same LocalBusiness identity (avoids a split entity graph).
 *
 * Verified NAP/geo defaults are baked in; `NEXT_PUBLIC_BUSINESS_*` env vars, if set,
 * override them.
 */
const streetAddress =
  process.env.NEXT_PUBLIC_BUSINESS_STREET_ADDRESS?.trim() ||
  "Carretera Cabeza de Toro"
const postalCode =
  process.env.NEXT_PUBLIC_BUSINESS_POSTAL_CODE?.trim() || "23000"
const lat = process.env.NEXT_PUBLIC_BUSINESS_LATITUDE || "18.64857"
const lng = process.env.NEXT_PUBLIC_BUSINESS_LONGITUDE || "-68.358637"

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
    name: "Grand Bay of the Sea",
    alternateName: "Grand Bay of the Sea Dive Center",
    description:
      "PADI dive center in Punta Cana, Dominican Republic offering Discover Scuba Diving for beginners, PADI certification courses, and guided reef, wreck, and shark diving experiences.",
    url: `${SITE_URL}/`,
    inLanguage: locale,
    logo: "https://images.ctfassets.net/iqfmqk4smewk/4AKIgOA6drFSpgIoRpPPu3/6b8b92af64259355d55d245dbe71b0cc/logo.png",
    image:
      "https://images.ctfassets.net/iqfmqk4smewk/4CYN3rPs0ryO4Gi4JDPm8e/156feb808cdad566332c11071dac1e09/pexels-leonardo-lamas-7001709.webp",
    telephone: "+1-829-723-9338",
    email: "grandbayofthesea@gmail.com",
    foundingDate: "2016",
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card",
    knowsLanguage: ["en", "es", "fr"],
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality: "Punta Cana",
      addressRegion: "La Altagracia",
      postalCode,
      addressCountry: "DO",
    },
    ...(geo ? { geo } : {}),
    hasMap: "https://maps.app.goo.gl/tAB86MjFxiF7Hefj7",
    areaServed: [
      { "@type": "City", name: "Punta Cana" },
      { "@type": "City", name: "Bávaro" },
      { "@type": "City", name: "Cap Cana" },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-829-723-9338",
        contactType: "customer service",
        availableLanguage: ["en", "es", "fr"],
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      reviewCount: "138",
      bestRating: "5",
      worstRating: "1",
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

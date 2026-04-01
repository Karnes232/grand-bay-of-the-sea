const SITE_URL = "https://www.grandbay-puntacana.com"

/** Optional overrides via env — set in `.env.local` for full NAP in search. */
const streetAddress =
  process.env.NEXT_PUBLIC_BUSINESS_STREET_ADDRESS?.trim() ?? ""
const postalCode = process.env.NEXT_PUBLIC_BUSINESS_POSTAL_CODE?.trim() ?? ""
const lat = process.env.NEXT_PUBLIC_BUSINESS_LATITUDE
const lng = process.env.NEXT_PUBLIC_BUSINESS_LONGITUDE

export function generateStructuredData() {
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
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: "Grand Bay of the Sea",
    image:
      "https://images.ctfassets.net/iqfmqk4smewk/4CYN3rPs0ryO4Gi4JDPm8e/156feb808cdad566332c11071dac1e09/pexels-leonardo-lamas-7001709.webp?h=250",
    url: `${SITE_URL}/`,
    telephone: "+18297239338",
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality: "Punta Cana",
      postalCode,
      addressCountry: "DO",
    },
    ...(geo ? { geo } : {}),
    sameAs: [
      "https://www.facebook.com/grandbaydivecenter/",
      "https://www.instagram.com/grandbayoftheseard/",
      "https://twitter.com/GrandBayOfTheS1",
      "https://www.youtube.com/channel/UCpYWOhIwbVVLGYOxL0UAtTw",
    ],
  }
}

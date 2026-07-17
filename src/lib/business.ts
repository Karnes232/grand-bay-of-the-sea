/**
 * Single source of truth for the business NAP (name/address/phone).
 * Consumed by both the site-wide JSON-LD (StructuredData.tsx) and the visible
 * ContactInfo component so the two can never drift.
 *
 * `NEXT_PUBLIC_BUSINESS_*` env vars, if set, override the baked-in defaults
 * (a no-deploy lever if the street address is ever corrected).
 */
export const BUSINESS = {
  name: "Grand Bay of the Sea",
  alternateName: "Grand Bay of the Sea Dive Center",
  streetAddress:
    process.env.NEXT_PUBLIC_BUSINESS_STREET_ADDRESS?.trim() ||
    "Carretera Cabeza de Toro",
  addressLocality: "Punta Cana",
  addressRegion: "La Altagracia",
  postalCode: process.env.NEXT_PUBLIC_BUSINESS_POSTAL_CODE?.trim() || "23000",
  addressCountry: "DO",
  /** JSON-LD format (keep byte-identical with the historical schema output) */
  phoneSchema: "+1-829-723-9338",
  /** Human-readable format for visible text */
  phoneDisplay: "+1 (829) 723-9338",
  /** E.164, for tel: and wa.me links */
  phoneE164: "+18297239338",
  email: "grandbayofthesea@gmail.com",
  hours: { opens: "08:30", closes: "17:00" },
  mapUrl: "https://maps.app.goo.gl/tAB86MjFxiF7Hefj7",
  /**
   * Google Business Profile rating (single verifiable source; the site embeds
   * the Google reviews widget). Snapshot as of 2026-07-11 — refresh
   * periodically against the live GBP listing.
   */
  rating: { value: 4.8, count: 151, source: "Google" },
  latitude: process.env.NEXT_PUBLIC_BUSINESS_LATITUDE || "18.64857",
  longitude: process.env.NEXT_PUBLIC_BUSINESS_LONGITUDE || "-68.358637",
  /** PADI dive-center registration — surfaced in the hero badge, stats bar, and trust badges. */
  padiNumber: "27147",
  padiUrl:
    "https://travel.padi.com/dive-center/dominican-republic/grand-bay-of-the-sea/",
} as const

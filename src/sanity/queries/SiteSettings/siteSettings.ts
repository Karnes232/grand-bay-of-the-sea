import { unstable_cache } from "next/cache"

import { client } from "@/sanity/lib/client"

export interface SiteSettings {
  logo: {
    asset: {
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt?: string
  }
  facebook: string
  instagram: string
  email: string
  padiLogo?: { asset: { url: string }; alt?: string }
  padiLogoDark?: { asset: { url: string }; alt?: string }
}

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  logo {
    asset -> {
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  facebook,
  instagram,
  email,
  padiLogo { asset -> { url }, alt },
  padiLogoDark { asset -> { url }, alt }
}`

export const getSiteSettings = async (): Promise<SiteSettings> => {
  return await client.fetch(siteSettingsQuery)
}

export type CachedSiteLogo = {
  src: string
  intrinsicWidth: number
  intrinsicHeight: number
} | null

/** Cached so the header does not block streaming on every request. */
export async function getCachedSiteLogo(): Promise<CachedSiteLogo> {
  return getSiteLogoCached()
}

const getSiteLogoCached = unstable_cache(
  async (): Promise<CachedSiteLogo> => {
    const settings = await client.fetch<SiteSettings | null>(siteSettingsQuery)
    const logo = settings?.logo
    if (!logo?.asset?.url) return null

    return {
      src: logo.asset.url,
      intrinsicWidth: logo.asset.metadata?.dimensions?.width ?? 493,
      intrinsicHeight: logo.asset.metadata?.dimensions?.height ?? 427,
    }
  },
  ["sanity-site-settings-logo"],
  // Must be >= the route-level `revalidate` (7 days) — the lowest revalidate
  // touched during a render caps the whole route's ISR window.
  { revalidate: 604800 },
)

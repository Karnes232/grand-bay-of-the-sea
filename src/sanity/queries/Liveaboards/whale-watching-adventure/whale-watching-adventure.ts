import { client } from "@/sanity/lib/client"
import { type Localized } from "@/i18n/locales"

export interface WhaleWatchingAdventureSEO {
  seo: {
    meta: {
      en: {
        title: string
        description: string
        keywords: string[]
      }
      es: {
        title: string
        description: string
        keywords: string[]
      },
      de: {
        title: string
        description: string
        keywords: string[]
      }
    }
    openGraph: {
      en: {
        title: string
        description: string
      }
      es: {
        title: string
        description: string
      },
      de: {
        title: string
        description: string
      }
      image: {
        url: string
        alt?: string
        width?: number
        height?: number
      }
    }
    noIndex: boolean
    noFollow: boolean
  }
}

export const whaleWatchingAdventureSEOQuery = `*[_type == "whale-watching-adventure"][0] {
    seo {
        meta,
  // Open Graph data
  openGraph {
    ...,
    "image": {
      "url": image.asset->url,
      "alt": image.alt,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
    }
  },
  // Other SEO settings
  noIndex,
  noFollow
    }
}`

export async function getWhaleWatchingAdventureSEO(): Promise<WhaleWatchingAdventureSEO> {
  const whaleWatchingAdventureSEO = await client.fetch(
    whaleWatchingAdventureSEOQuery,
  )
  return whaleWatchingAdventureSEO
}

export interface WhaleWatchingAdventureStructuredData {
  seo: {
    structuredData: Localized<string>
  }
}

export const whaleWatchingAdventureStructuredDataQuery = `*[_type == "whale-watching-adventure"][0] {
    seo {
        structuredData
    }
}`

export async function getWhaleWatchingAdventureStructuredData(): Promise<WhaleWatchingAdventureStructuredData> {
  const whaleWatchingAdventureStructuredData = await client.fetch(
    whaleWatchingAdventureStructuredDataQuery,
  )
  return whaleWatchingAdventureStructuredData
}

export interface WhaleWatchingAdventure {
  titleEn?: string
  titleEs?: string
  paragraph1: Localized<any[]>
  paragraph2: Localized<any[]>
  paragraph3: Localized<any[]>
  paragraph4: Localized<any[]>
  photoList: {
    asset: {
      url: string
      metadata: {
        lqip?: string
        dimensions: {
          width: number
          height: number
        }
      }
    }
    ref?: string
    crop?: unknown
    hotspot?: { x: number; y: number } | null
    alt: string
  }[]
}

export const whaleWatchingAdventureQuery = `*[_type == "whale-watching-adventure"][0] {
    "titleEn": pt::text(paragraph1.en[0]),
    "titleEs": pt::text(paragraph1.es[0]),
    paragraph1,
    paragraph2,
    paragraph3,
    paragraph4,
    photoList[] {
        asset -> {
            url,
            metadata {
                lqip,
                dimensions {
                    width,
                    height
                }
            }
        },
        "ref": asset._ref,
        crop,
        hotspot,
        alt
    }
}`

export async function getWhaleWatchingAdventure(): Promise<WhaleWatchingAdventure> {
  const whaleWatchingAdventure = await client.fetch(whaleWatchingAdventureQuery)
  return whaleWatchingAdventure
}

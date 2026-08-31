import { client } from "@/sanity/lib/client"
import { type Localized } from "@/i18n/locales"

export interface Fishes {
  name: Localized<string>
  description: Localized<string>
  image: {
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
  }
  blogReference: {
    slug: string
  } | null
}

export const fishesQuery = `*[_type == "fishes"] {
  name {
    en,
    es,
    de
  },
  description {
    en,
    es,
    de
  },
  image {
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
  },
  blogReference -> {
    slug
  }
}`

export async function getFishes(): Promise<Fishes[]> {
  return await client.fetch(fishesQuery)
}

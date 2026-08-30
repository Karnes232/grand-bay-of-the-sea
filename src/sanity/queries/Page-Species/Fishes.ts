import { client } from "@/sanity/lib/client"

export interface Fishes {
  name: {
    en: string
    es: string
    de: string
  }
  description: {
    en: string
    es: string
    de: string
  }
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

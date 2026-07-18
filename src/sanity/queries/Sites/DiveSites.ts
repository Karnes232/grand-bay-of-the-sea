import { client } from "@/sanity/lib/client"

export interface DiveSites {
  name: string
  description: {
    en: any[]
    es: any[]
  }
  cardDescription?: {
    en: string
    es: string
  }
  level?: string
  location?: string
  image: {
    asset: {
      url: string
      metadata: {
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
  meters: number
  feet: number
}

export const diveSitesQuery = `*[_type == "diveSite"] {
  name,
  description {
    en,
    es
  },
  cardDescription {
    en,
    es
  },
  level,
  location,
  image {
    asset -> {
      url,
      metadata {
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
  meters,
  feet
}`

export const getDiveSites = async (): Promise<DiveSites[]> => {
  const diveSites = await client.fetch(diveSitesQuery)
  return diveSites
}

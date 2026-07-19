import { client } from "@/sanity/lib/client"

export interface DiveSites {
  name: string
  slug?: string
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
  meters: number
  feet: number
}

const diveSiteImageProjection = `image {
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
  }`

// The card-shaped fields (matches the `DiveSites` interface + `DiveSiteCard`).
const diveSiteCardProjection = `
  name,
  "slug": slug.current,
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
  ${diveSiteImageProjection},
  meters,
  feet`

export const diveSitesQuery = `*[_type == "diveSite"] {${diveSiteCardProjection}
}`

export const getDiveSites = async (): Promise<DiveSites[]> => {
  const diveSites = await client.fetch(diveSitesQuery)
  return diveSites
}

export interface IndividualDiveSite {
  name: string
  slug: string
  description: { en: string; es: string }
  cardDescription?: { en: string; es: string }
  level?: string
  location?: string
  image: DiveSites["image"]
  meters: number
  feet: number
  nearbySites?: DiveSites[]
}

export const individualDiveSiteQuery = `*[_type == "diveSite" && slug.current == $slug][0] {${diveSiteCardProjection},
  "nearbySites": nearbySites[]->{${diveSiteCardProjection}
  }
}`

export const getDiveSite = async (
  slug: string,
): Promise<IndividualDiveSite | null> => {
  return await client.fetch(individualDiveSiteQuery, { slug })
}

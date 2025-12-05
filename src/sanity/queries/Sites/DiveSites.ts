import { client } from "@/sanity/lib/client"

export interface DiveSites {
  name: string
  description: {
    en: any[]
    es: any[]
  }
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
    alt
  },
  meters,
  feet
}`

export const getDiveSites = async (): Promise<DiveSites[]> => {
  const diveSites = await client.fetch(diveSitesQuery)
  return diveSites
}

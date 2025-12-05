import { client } from "@/sanity/lib/client"

export interface DiveTripsPage {
  page: string
  paragraph1: {
    en: any[]
    es: any[]
  }
  heroImage: {
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
}

export const diveTripsPageQuery = `*[_type == "diveTripsPage"][0] {
  page,
  paragraph1 {
    en,
    es
  },
  heroImage {
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
  }
}`

export const getDiveTripsPage = async (): Promise<DiveTripsPage> => {
  const diveTripsPage = await client.fetch(diveTripsPageQuery)
  return diveTripsPage
}

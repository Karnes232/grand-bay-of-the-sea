import { client } from "@/sanity/lib/client"

export interface Fishing {
  page: string
  paragraph1: {
    en: any[]
    es: any[]
  }
  paragraph2: {
    en: any[]
    es: any[]
  }
  paragraph3: {
    en: any[]
    es: any[]
  }
  photoList: {
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
  }[]
  price: number
  spectatorPrice: number
  privateCharter: number
  duration: string
  depositPrice: number
}

export const fishingQuery = `*[_type == "fishing"][0] {
  page,
  paragraph1 {
    en,
    es
  },
  paragraph2 {
    en,
    es
  },
  paragraph3 {
    en,
    es
  },
  photoList[] {
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
  price,
  spectatorPrice,
  privateCharter,
  duration,
  depositPrice
}`

export async function getFishing(): Promise<Fishing> {
  return await client.fetch(fishingQuery)
}

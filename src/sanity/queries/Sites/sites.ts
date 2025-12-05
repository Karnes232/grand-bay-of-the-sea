import { client } from "@/sanity/lib/client"

export interface Sites {
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
  paragraph1: {
    en: any[]
    es: any[]
  }
  packageTitle: {
    en: string
    es: string
  }
  twoTankDive: number
  fourTankPackage: number
  depositPrice: number
  duration: {
    en: string
    es: string
  }
}

export const sitesQuery = `*[_type == "sites"][0] {
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
  },
  paragraph1 {
    en,
    es
  },
  packageTitle {
    en,
    es
  },
  twoTankDive,
  fourTankPackage,
  depositPrice,
  duration {
    en,
    es
  }
}`

export const getSites = async (): Promise<Sites> => {
  const sites = await client.fetch(sitesQuery)
  return sites
}

export interface SharkDivePrice {
  price: number
}

export const sharkDivePriceQuery = `*[_type == "sharkDive"][0] {
  price
}`

export const getSharkDivePrice = async (): Promise<SharkDivePrice> => {
  const sharkDivePrice = await client.fetch(sharkDivePriceQuery)
  return sharkDivePrice
}

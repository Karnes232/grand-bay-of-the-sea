import { client } from "@/sanity/lib/client"
import { type Localized } from "@/i18n/locales"

export interface Sites {
  heroTitle?: Localized<string>
  heroSubtitle?: Localized<string>
  heroTrustLine?: Localized<string>
  gridHeading?: Localized<string>
  gridIntro?: Localized<string>
  heroCta?: {
    label?: Localized<string>
    link?: string
  }
  heroImage: {
    asset: {
      url: string
      metadata: {
        lqip: string
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
  paragraph1: Localized<any[]>
  packageTitle: Localized<string>
  twoTankDive: number
  fourTankPackage: number
  depositPrice: number
  duration: Localized<string>
  faqs?: {
    _key: string
    question: Localized<string>
    answer: Localized<any[]>
  }[]
  structuredData?: Localized<string>
}

export const sitesQuery = `*[_type == "sites"][0] {
  heroTitle,
  heroSubtitle,
  heroTrustLine,
  gridHeading,
  gridIntro,
  heroCta {
    label,
    link
  },
  heroImage {
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
  paragraph1,
  packageTitle,
  twoTankDive,
  fourTankPackage,
  depositPrice,
  duration,
  faqs[] {
    _key,
    question,
    answer
  },
  structuredData
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

import { client } from "@/sanity/lib/client"

export interface Sites {
  heroTitle?: {
    en: string
    es: string
    de: string
  }
  heroSubtitle?: {
    en: string
    es: string
    de: string
  }
  heroTrustLine?: { en: string; es: string; de: string }
  gridHeading?: { en: string; es: string; de: string }
  gridIntro?: { en: string; es: string; de: string }
  heroCta?: {
    label?: {
      en: string
      es: string
      de: string
    }
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
  paragraph1: {
    en: any[]
    es: any[]
    de: any[]
  }
  packageTitle: {
    en: string
    es: string
    de: string
  }
  twoTankDive: number
  fourTankPackage: number
  depositPrice: number
  duration: {
    en: string
    es: string
    de: string
  }
  faqs?: {
    _key: string
    question: { en: string; es: string; de: string }
    answer: { en: any[]; es: any[]; de: any[] }
  }[]
  structuredData?: {
    en: string
    es: string
    de: string
  }
}

export const sitesQuery = `*[_type == "sites"][0] {
  heroTitle {
    en,
    es,
    de
  },
  heroSubtitle {
    en,
    es,
    de
  },
  heroTrustLine { en, es },
  gridHeading { en, es },
  gridIntro { en, es },
  heroCta {
    label {
      en,
      es,
      de
    },
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
  paragraph1 {
    en,
    es,
    de
  },
  packageTitle {
    en,
    es,
    de
  },
  twoTankDive,
  fourTankPackage,
  depositPrice,
  duration {
    en,
    es,
    de
  },
  faqs[] {
    _key,
    question {
      en,
      es,
      de
    },
    answer {
      en,
      es,
      de
    }
  },
  structuredData {
    en,
    es,
    de
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

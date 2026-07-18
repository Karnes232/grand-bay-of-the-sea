import { client } from "@/sanity/lib/client"

export interface Sites {
  heroTitle?: {
    en: string
    es: string
  }
  heroSubtitle?: {
    en: string
    es: string
  }
  heroTrustLine?: { en: string; es: string }
  gridHeading?: { en: string; es: string }
  gridIntro?: { en: string; es: string }
  heroCta?: {
    label?: {
      en: string
      es: string
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
  faqs?: {
    _key: string
    question: { en: string; es: string }
    answer: { en: any[]; es: any[] }
  }[]
  structuredData?: {
    en: string
    es: string
  }
}

export const sitesQuery = `*[_type == "sites"][0] {
  heroTitle {
    en,
    es
  },
  heroSubtitle {
    en,
    es
  },
  heroTrustLine { en, es },
  gridHeading { en, es },
  gridIntro { en, es },
  heroCta {
    label {
      en,
      es
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
  },
  faqs[] {
    _key,
    question {
      en,
      es
    },
    answer {
      en,
      es
    }
  },
  structuredData {
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

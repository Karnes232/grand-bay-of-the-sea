import { client } from "@/sanity/lib/client"

type LocalizedString = { en: string; es: string }

export interface Fishing {
  page: string
  heroEyebrow?: LocalizedString
  heroTitle?: LocalizedString
  heroSubtitle?: LocalizedString
  bookEyebrow?: LocalizedString
  factDuration?: LocalizedString
  galleryHeading?: LocalizedString
  ctaHeading?: LocalizedString
  ctaBody?: LocalizedString
  ctaLabel?: LocalizedString
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
    ref?: string
    crop?: unknown
    hotspot?: { x: number; y: number } | null
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
  heroEyebrow { en, es },
  heroTitle { en, es },
  heroSubtitle { en, es },
  bookEyebrow { en, es },
  factDuration { en, es },
  galleryHeading { en, es },
  ctaHeading { en, es },
  ctaBody { en, es },
  ctaLabel { en, es },
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
    "ref": asset._ref,
    crop,
    hotspot,
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

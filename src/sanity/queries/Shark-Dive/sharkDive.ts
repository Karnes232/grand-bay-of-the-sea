import { client } from "@/sanity/lib/client"
import { type Localized } from "@/i18n/locales"

type Loc = Localized<string>

export interface SharkDive {
  page: string
  title?: Loc
  heroSubtitle?: Loc
  experienceEyebrow?: Loc
  galleryHeading?: Loc
  featuredIn?: Loc
  notReadyEyebrow?: Loc
  exploreAdvanced?: Loc
  ctaHeading?: Loc
  ctaBody?: Loc
  ctaLabel?: Loc
  factFormat?: Loc
  factFormatValue?: Loc
  factDuration?: Loc
  factMaxDepth?: Loc
  factLevel?: Loc
  paragraph1: Localized<any[]>
  paragraph2: Localized<any[]>
  paragraph3: Localized<any[]>
  paragraph4: Localized<any[]>
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
  depositPrice: number
  duration: Localized<string>
  level?: Localized<string>
  maxDepth?: Localized<string>
  extras: Localized<string>[]
  faqs: {
    _key: string
    question: Localized<string>
    answer: Localized<any[]>
  }[]
}

export const sharkDiveQuery = `*[_type == "sharkDive"][0] {
  page,
  title { en, es },
  heroSubtitle { en, es },
  experienceEyebrow { en, es },
  galleryHeading { en, es },
  featuredIn { en, es },
  notReadyEyebrow { en, es },
  exploreAdvanced { en, es },
  ctaHeading { en, es },
  ctaBody { en, es },
  ctaLabel { en, es },
  factFormat { en, es },
  factFormatValue { en, es },
  factDuration { en, es },
  factMaxDepth { en, es },
  factLevel { en, es },
  paragraph1 {
    en,
    es,
    de
  },
  paragraph2 {
    en,
    es,
    de
  },
  paragraph3 {
    en,
    es,
    de
  },
  paragraph4 {
    en,
    es,
    de
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
  depositPrice,
  duration {
    en,
    es,
    de
  },
  level {
    en,
    es,
    de
  },
  maxDepth {
    en,
    es,
    de
  },
  extras[] {
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
  }
}`

export const getSharkDive = async (): Promise<SharkDive> => {
  return await client.fetch(sharkDiveQuery)
}

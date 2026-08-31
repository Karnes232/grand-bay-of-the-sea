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
  title,
  heroSubtitle,
  experienceEyebrow,
  galleryHeading,
  featuredIn,
  notReadyEyebrow,
  exploreAdvanced,
  ctaHeading,
  ctaBody,
  ctaLabel,
  factFormat,
  factFormatValue,
  factDuration,
  factMaxDepth,
  factLevel,
  paragraph1,
  paragraph2,
  paragraph3,
  paragraph4,
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
  duration,
  level,
  maxDepth,
  extras[],
  faqs[] {
    _key,
    question,
    answer
  }
}`

export const getSharkDive = async (): Promise<SharkDive> => {
  return await client.fetch(sharkDiveQuery)
}

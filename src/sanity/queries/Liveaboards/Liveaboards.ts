import { client } from "@/sanity/lib/client"
import { type Localized } from "@/i18n/locales"

type Loc = Localized<string>

interface CroppableImg {
  asset: {
    url: string
    metadata: {
      lqip?: string
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

export interface Liveaboards {
  page: string
  paragraph1: Localized<any[]>
  titleEn?: string
  titleEs?: string
  heroEyebrow?: Loc
  heroSubtitle?: Loc
  stats?: { value?: Loc; label?: Loc }[]
  ctaHeading?: Loc
  ctaBody?: Loc
  ctaLabel?: Loc
  faqs?: {
    _key: string
    question: Loc
    answer: Localized<any[]>
  }[]
  heroImage: CroppableImg
  silverBankExpeditionImage: CroppableImg
  silverBankExpeditionParagraph: Localized<any[]>
  whaleWatchingAdventureImage: CroppableImg
  whaleWatchingAdventureParagraph: Localized<any[]>
  photoList: CroppableImg[]
}

export const liveaboardsQuery = `*[_type == "liveaboards"][0] {
  page,
  paragraph1,
  "titleEn": pt::text(paragraph1.en[0]),
  "titleEs": pt::text(paragraph1.es[0]),
  heroEyebrow,
  heroSubtitle,
  stats[] {
    value,
    label
  },
  ctaHeading,
  ctaBody,
  ctaLabel,
  faqs[] {
    _key,
    question,
    answer
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
  silverBankExpeditionImage {
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
  silverBankExpeditionParagraph,
  whaleWatchingAdventureImage {
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
  whaleWatchingAdventureParagraph,
  photoList[] {
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
  }
}`

export const getLiveaboards = async (): Promise<Liveaboards> => {
  return await client.fetch(liveaboardsQuery)
}

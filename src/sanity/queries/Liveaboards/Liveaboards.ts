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
  paragraph1 {
    en,
    es,
    de
  },
  "titleEn": pt::text(paragraph1.en[0]),
  "titleEs": pt::text(paragraph1.es[0]),
  heroEyebrow { en, es },
  heroSubtitle { en, es },
  stats[] {
    value { en, es },
    label { en, es }
  },
  ctaHeading { en, es },
  ctaBody { en, es },
  ctaLabel { en, es },
  faqs[] {
    _key,
    question { en, es },
    answer { en, es }
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
  silverBankExpeditionParagraph {
    en,
    es,
    de
  },
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
  whaleWatchingAdventureParagraph {
    en,
    es,
    de
  },
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

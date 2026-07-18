import { client } from "@/sanity/lib/client"

export interface DiveTripsPage {
  page: string
  heroTitle?: {
    en: string
    es: string
  }
  heroSubtitle?: {
    en: string
    es: string
  }
  heroCta?: {
    label?: {
      en: string
      es: string
    }
    link?: string
  }
  paragraph1: {
    en: any[]
    es: any[]
  }
  paragraph2?: {
    en: any[]
    es: any[]
  }
  tripDaySteps?: {
    stepTitle?: { en: string; es: string }
    stepBody?: { en: string; es: string }
  }[]
  tripDayNote?: {
    en: string
    es: string
  }
  tripDayHeading?: { en: string; es: string }
  tripDayIntro?: { en: string; es: string }
  ctaHeading?: { en: string; es: string }
  ctaBody?: { en: string; es: string }
  ctaLabel?: { en: string; es: string }
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
}

export const diveTripsPageQuery = `*[_type == "diveTripsPage"][0] {
  page,
  heroTitle {
    en,
    es
  },
  heroSubtitle {
    en,
    es
  },
  heroCta {
    label {
      en,
      es
    },
    link
  },
  paragraph1 {
    en,
    es
  },
  paragraph2 {
    en,
    es
  },
  tripDaySteps[] {
    stepTitle {
      en,
      es
    },
    stepBody {
      en,
      es
    }
  },
  tripDayNote {
    en,
    es
  },
  tripDayHeading { en, es },
  tripDayIntro { en, es },
  ctaHeading { en, es },
  ctaBody { en, es },
  ctaLabel { en, es },
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
  }
}`

export const getDiveTripsPage = async (): Promise<DiveTripsPage> => {
  const diveTripsPage = await client.fetch(diveTripsPageQuery)
  return diveTripsPage
}

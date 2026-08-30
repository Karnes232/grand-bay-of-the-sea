import { client } from "@/sanity/lib/client"

export interface DiveTripsPage {
  page: string
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
  heroCta?: {
    label?: {
      en: string
      es: string
      de: string
    }
    link?: string
  }
  paragraph1: {
    en: any[]
    es: any[]
    de: any[]
  }
  paragraph2?: {
    en: any[]
    es: any[]
    de: any[]
  }
  tripDaySteps?: {
    stepTitle?: { en: string; es: string; de: string }
    stepBody?: { en: string; es: string; de: string }
  }[]
  tripDayNote?: {
    en: string
    es: string
    de: string
  }
  tripDayHeading?: { en: string; es: string; de: string }
  tripDayIntro?: { en: string; es: string; de: string }
  ctaHeading?: { en: string; es: string; de: string }
  ctaBody?: { en: string; es: string; de: string }
  ctaLabel?: { en: string; es: string; de: string }
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
    es,
    de
  },
  heroSubtitle {
    en,
    es,
    de
  },
  heroCta {
    label {
      en,
      es,
      de
    },
    link
  },
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
  tripDaySteps[] {
    stepTitle {
      en,
      es,
      de
    },
    stepBody {
      en,
      es,
      de
    }
  },
  tripDayNote {
    en,
    es,
    de
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

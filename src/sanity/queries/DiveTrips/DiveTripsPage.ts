import { client } from "@/sanity/lib/client"
import { type Localized } from "@/i18n/locales"

export interface DiveTripsPage {
  page: string
  heroTitle?: Localized<string>
  heroSubtitle?: Localized<string>
  heroCta?: {
    label?: Localized<string>
    link?: string
  }
  paragraph1: Localized<any[]>
  paragraph2?: Localized<any[]>
  tripDaySteps?: {
    stepTitle?: Localized<string>
    stepBody?: Localized<string>
  }[]
  tripDayNote?: Localized<string>
  tripDayHeading?: Localized<string>
  tripDayIntro?: Localized<string>
  ctaHeading?: Localized<string>
  ctaBody?: Localized<string>
  ctaLabel?: Localized<string>
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
  heroTitle,
  heroSubtitle,
  heroCta {
    label,
    link
  },
  paragraph1,
  paragraph2,
  tripDaySteps[] {
    stepTitle,
    stepBody
  },
  tripDayNote,
  tripDayHeading,
  tripDayIntro,
  ctaHeading,
  ctaBody,
  ctaLabel,
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

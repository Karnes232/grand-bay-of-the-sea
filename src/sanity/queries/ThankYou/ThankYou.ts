import { client } from "@/sanity/lib/client"
import { type Localized } from "@/i18n/locales"

export interface ThankYou {
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
  heroEyebrow?: Localized<string>
  heroTitle?: Localized<string>
  heroSubtitle?: Localized<string>
}

export const thankYouQuery = `*[_type == "thankYou"][0] {
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
  heroEyebrow { en, es },
  heroTitle { en, es },
  heroSubtitle { en, es }
}`

export const getThankYou = async (): Promise<ThankYou> => {
  return await client.fetch(thankYouQuery)
}

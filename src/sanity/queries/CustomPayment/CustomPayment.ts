import { client } from "@/sanity/lib/client"
import { type Localized } from "@/i18n/locales"

export interface CustomPayment {
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
  paragraph1: Localized<any[]>
}

export const customPaymentQuery = `*[_type == "customPayment"][0] {
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
  heroSubtitle { en, es },
  paragraph1 {
    en,
    es,
    de
  }
}`

export const getCustomPayment = async (): Promise<CustomPayment> => {
  return await client.fetch(customPaymentQuery)
}

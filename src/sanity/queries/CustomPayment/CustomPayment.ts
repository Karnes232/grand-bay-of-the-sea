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
  heroEyebrow,
  heroTitle,
  heroSubtitle,
  paragraph1
}`

export const getCustomPayment = async (): Promise<CustomPayment> => {
  return await client.fetch(customPaymentQuery)
}

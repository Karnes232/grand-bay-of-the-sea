import { client } from "@/sanity/lib/client"

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
  heroEyebrow?: { en: string; es: string; de: string }
  heroTitle?: { en: string; es: string; de: string }
  heroSubtitle?: { en: string; es: string; de: string }
  paragraph1: {
    en: any[]
    es: any[]
    de: any[]
  }
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

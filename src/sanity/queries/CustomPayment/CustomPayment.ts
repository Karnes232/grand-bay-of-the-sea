import { client } from "@/sanity/lib/client"

export interface CustomPayment {
  heroImage: {
    asset: {
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt: string
  }
  paragraph1: {
    en: any[]
    es: any[]
  }
}

export const customPaymentQuery = `*[_type == "customPayment"][0] {
  heroImage {
    asset -> {
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  paragraph1 {
    en,
    es
  }
}`

export const getCustomPayment = async (): Promise<CustomPayment> => {
  return await client.fetch(customPaymentQuery)
}

import { client } from "@/sanity/lib/client"

export interface Contact {
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
  visitHeading?: { en: string; es: string; de: string }
  hoursEyebrow?: { en: string; es: string; de: string }
  hoursValue?: { en: string; es: string; de: string }
  hoursDesc?: { en: string; es: string; de: string }
}

export const contactQuery = `*[_type == "contact"][0] {
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
  visitHeading { en, es },
  hoursEyebrow { en, es },
  hoursValue { en, es },
  hoursDesc { en, es }
}`

export const getContact = async (): Promise<Contact> => {
  return await client.fetch(contactQuery)
}

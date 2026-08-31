import { client } from "@/sanity/lib/client"
import { type Localized } from "@/i18n/locales"

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
  heroEyebrow?: Localized<string>
  heroTitle?: Localized<string>
  heroSubtitle?: Localized<string>
  visitHeading?: Localized<string>
  hoursEyebrow?: Localized<string>
  hoursValue?: Localized<string>
  hoursDesc?: Localized<string>
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

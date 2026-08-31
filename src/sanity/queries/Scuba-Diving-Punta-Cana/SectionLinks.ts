import { client } from "@/sanity/lib/client"
import { type Localized } from "@/i18n/locales"

export interface SectionLinks {
  title: Localized<string>
  url: string
  description: Localized<string>
  image: {
    asset: {
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    ref?: string
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    } | null
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    } | null
    alt: string
  }
}

export const sectionLinksQuery = `*[_type == "sectionLinks"] {
  title,
  url,
  description,
  image {
    asset -> {
      url,
      metadata {
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

export const getSectionLinks = async (): Promise<SectionLinks[]> => {
  return await client.fetch(sectionLinksQuery)
}

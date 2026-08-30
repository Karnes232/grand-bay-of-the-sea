import { client } from "@/sanity/lib/client"

export interface SectionLinks {
  title: {
    en: string
    es: string
    de: string
  }
  url: string
  description: {
    en: string
    es: string
    de: string
  }
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
  title {
    en,
    es,
    de
  },
  url,
  description {
    en,
    es,
    de
  },
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

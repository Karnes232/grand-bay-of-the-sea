import { client } from "@/sanity/lib/client"

export interface SectionLinks {
  title: {
    en: string
    es: string
  }
  url: string
  description: {
    en: string
    es: string
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
    alt: string
  }
}

export const sectionLinksQuery = `*[_type == "sectionLinks"] {
  title {
    en,
    es
  },
  url,
  description {
    en,
    es
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
    alt
  }
}`

export const getSectionLinks = async (): Promise<SectionLinks[]> => {
  return await client.fetch(sectionLinksQuery)
}

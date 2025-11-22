import { client } from "@/sanity/lib/client"

export interface SpeciesPageContent {
  title: {
    en: string
    es: string
  }
  content: {
    en: string
    es: string
  }
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
}

export const speciesPageContentQuery = `*[_type == "speciesPageContent"] {
    title {
        en,
        es
    },
    content {
        en,
        es
    },
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
    }

  }`

export async function getSpeciesPageContent(): Promise<SpeciesPageContent> {
  return await client.fetch(speciesPageContentQuery)
}

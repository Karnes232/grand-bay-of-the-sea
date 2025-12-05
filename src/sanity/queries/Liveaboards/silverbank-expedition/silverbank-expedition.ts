import { client } from "@/sanity/lib/client"

export interface SilverbankSEO {
  seo: {
    meta: {
      en: {
        title: string
        description: string
        keywords: string[]
      }
      es: {
        title: string
        description: string
        keywords: string[]
      }
    }
    openGraph: {
      en: {
        title: string
        description: string
      }
      es: {
        title: string
        description: string
      }
      image: {
        url: string
        alt?: string
        width?: number
        height?: number
      }
    }
    noIndex: boolean
    noFollow: boolean
  }
}

export const silverbankExpeditionSEOQuery = `*[_type == "silverbank-expedition"][0] {
    seo {
        meta {
    en {
      title,
      description,
      keywords
    },
    es {
      title,
      description,
      keywords
    }
  },
  // Open Graph data
  openGraph {
    en {
      title,
      description
    },
    es {
      title,
      description
    },
    "image": {
      "url": image.asset->url,
      "alt": image.alt,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
    }
  },
  // Other SEO settings
  noIndex,
  noFollow
    }
}`

export async function getSilverbankExpeditionSEO(): Promise<SilverbankSEO> {
  const silverbankExpeditionSEO = await client.fetch(
    silverbankExpeditionSEOQuery,
  )
  return silverbankExpeditionSEO
}

export interface SilverbankExpeditionStructuredData {
  seo: {
    structuredData: {
      en: string
      es: string
    }
  }
}

export const silverbankExpeditionStructuredDataQuery = `*[_type == "silverbank-expedition"][0] {
    seo {
        structuredData {
            en,
            es
        }
    }
}`

export async function getSilverbankExpeditionStructuredData(): Promise<SilverbankExpeditionStructuredData> {
  const silverbankExpeditionStructuredData = await client.fetch(
    silverbankExpeditionStructuredDataQuery,
  )
  return silverbankExpeditionStructuredData
}

export interface SilverbankExpedition {
  paragraph1: {
    en: any[]
    es: any[]
  }
  paragraph2: {
    en: any[]
    es: any[]
  }
  paragraph3: {
    en: any[]
    es: any[]
  }
  paragraph4: {
    en: any[]
    es: any[]
  }
  photoList: {
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
  }[]
}

export const silverbankExpeditionQuery = `*[_type == "silverbank-expedition"][0] {
    paragraph1 {
        en,
        es
    },
    paragraph2 {
        en,
        es
    },
    paragraph3 {
        en,
        es
    },
    paragraph4 {
        en,
        es
    },
    photoList[] {
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

export async function getSilverbankExpedition(): Promise<SilverbankExpedition> {
  const silverbankExpedition = await client.fetch(silverbankExpeditionQuery)
  return silverbankExpedition
}

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
      },
      de: {
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
      },
      de: {
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
    },
    de {
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
    de {
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
      de: string
    }
  }
}

export const silverbankExpeditionStructuredDataQuery = `*[_type == "silverbank-expedition"][0] {
    seo {
        structuredData {
            en,
            es,
            de
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
  titleEn?: string
  titleEs?: string
  paragraph1: {
    en: any[]
    es: any[]
    de: any[]
  }
  paragraph2: {
    en: any[]
    es: any[]
    de: any[]
  }
  paragraph3: {
    en: any[]
    es: any[]
    de: any[]
  }
  paragraph4: {
    en: any[]
    es: any[]
    de: any[]
  }
  photoList: {
    asset: {
      url: string
      metadata: {
        lqip?: string
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
  }[]
}

export const silverbankExpeditionQuery = `*[_type == "silverbank-expedition"][0] {
    "titleEn": pt::text(paragraph1.en[0]),
    "titleEs": pt::text(paragraph1.es[0]),
    paragraph1 {
        en,
        es,
        de
    },
    paragraph2 {
        en,
        es,
        de
    },
    paragraph3 {
        en,
        es,
        de
    },
    paragraph4 {
        en,
        es,
        de
    },
    photoList[] {
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
    }
}`

export async function getSilverbankExpedition(): Promise<SilverbankExpedition> {
  const silverbankExpedition = await client.fetch(silverbankExpeditionQuery)
  return silverbankExpedition
}

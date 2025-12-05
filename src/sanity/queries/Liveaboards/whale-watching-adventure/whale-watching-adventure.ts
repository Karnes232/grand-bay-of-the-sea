import { client } from "@/sanity/lib/client"

export interface WhaleWatchingAdventureSEO {
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

export const whaleWatchingAdventureSEOQuery = `*[_type == "whale-watching-adventure"][0] {
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

export async function getWhaleWatchingAdventureSEO(): Promise<WhaleWatchingAdventureSEO> {
  const whaleWatchingAdventureSEO = await client.fetch(
    whaleWatchingAdventureSEOQuery,
  )
  return whaleWatchingAdventureSEO
}

export interface WhaleWatchingAdventureStructuredData {
  seo: {
    structuredData: {
      en: string
      es: string
    }
  }
}

export const whaleWatchingAdventureStructuredDataQuery = `*[_type == "whale-watching-adventure"][0] {
    seo {
        structuredData {
            en,
            es
        }
    }
}`

export async function getWhaleWatchingAdventureStructuredData(): Promise<WhaleWatchingAdventureStructuredData> {
  const whaleWatchingAdventureStructuredData = await client.fetch(
    whaleWatchingAdventureStructuredDataQuery,
  )
  return whaleWatchingAdventureStructuredData
}

export interface WhaleWatchingAdventure {
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

export const whaleWatchingAdventureQuery = `*[_type == "whale-watching-adventure"][0] {
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

export async function getWhaleWatchingAdventure(): Promise<WhaleWatchingAdventure> {
  const whaleWatchingAdventure = await client.fetch(whaleWatchingAdventureQuery)
  return whaleWatchingAdventure
}

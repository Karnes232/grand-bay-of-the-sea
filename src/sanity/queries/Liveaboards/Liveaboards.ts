import { client } from "@/sanity/lib/client"

export interface Liveaboards {
  page: string
  paragraph1: {
    en: any[]
    es: any[]
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
  silverBankExpeditionImage: {
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
  silverBankExpeditionParagraph: {
    en: any[]
    es: any[]
  }
  whaleWatchingAdventureImage: {
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
  whaleWatchingAdventureParagraph: {
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

export const liveaboardsQuery = `*[_type == "liveaboards"][0] {
  page,
  paragraph1 {
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
  },
  silverBankExpeditionImage {
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
  silverBankExpeditionParagraph {
    en,
    es
  },
  whaleWatchingAdventureImage {
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
  whaleWatchingAdventureParagraph {
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

export const getLiveaboards = async (): Promise<Liveaboards> => {
  return await client.fetch(liveaboardsQuery)
}

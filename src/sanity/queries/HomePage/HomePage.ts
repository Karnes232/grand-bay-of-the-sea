import { client } from "@/sanity/lib/client"

export interface HomePage {
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
    alt: string
  }
  secondaryHeroImage: {
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
  tertiaryHeroImage: {
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
  heroTitle?: {
    en: string
    es: string
  }
  heroSubtitle?: {
    en: string
    es: string
  }
  heroCta?: {
    label?: {
      en: string
      es: string
    }
    link?: string
  }
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
}

export const homePageQuery = `*[_type == "homePage"][0] {
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
    alt
  },
  secondaryHeroImage {
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
  tertiaryHeroImage {
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
  heroTitle {
    en,
    es
  },
  heroSubtitle {
    en,
    es
  },
  heroCta {
    label {
      en,
      es
    },
    link
  },
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
  }
}`

export const getHomePage = async (): Promise<HomePage> => {
  return await client.fetch(homePageQuery)
}

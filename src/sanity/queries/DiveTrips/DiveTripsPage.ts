import { client } from "@/sanity/lib/client"

export interface DiveTripsPage {
  page: string
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
  paragraph2?: {
    en: any[]
    es: any[]
  }
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
}

export const diveTripsPageQuery = `*[_type == "diveTripsPage"][0] {
  page,
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
  }
}`

export const getDiveTripsPage = async (): Promise<DiveTripsPage> => {
  const diveTripsPage = await client.fetch(diveTripsPageQuery)
  return diveTripsPage
}

import { client } from "@/sanity/lib/client"

export interface SharkDive {
  page: string
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
  price: number
  depositPrice: number
  duration: {
    en: string
    es: string
  }
  extras: {
    en: string
    es: string
  }[]
}

export const sharkDiveQuery = `*[_type == "sharkDive"][0] {
  page,
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
  },
  price,
  depositPrice,
  duration {
    en,
    es
  },
  extras[] {
    en,
    es
  }
}`

export const getSharkDive = async (): Promise<SharkDive> => {
  return await client.fetch(sharkDiveQuery)
}

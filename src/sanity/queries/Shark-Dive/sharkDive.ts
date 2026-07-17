import { client } from "@/sanity/lib/client"

export interface SharkDive {
  page: string
  title?: {
    en: string
    es: string
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
    ref?: string
    crop?: unknown
    hotspot?: { x: number; y: number } | null
    alt: string
  }[]
  price: number
  depositPrice: number
  duration: {
    en: string
    es: string
  }
  level?: {
    en: string
    es: string
  }
  maxDepth?: {
    en: string
    es: string
  }
  extras: {
    en: string
    es: string
  }[]
  faqs: {
    _key: string
    question: {
      en: string
      es: string
    }
    answer: {
      en: any[]
      es: any[]
    }
  }[]
}

export const sharkDiveQuery = `*[_type == "sharkDive"][0] {
  page,
  title {
    en,
    es
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
    "ref": asset._ref,
    crop,
    hotspot,
    alt
  },
  price,
  depositPrice,
  duration {
    en,
    es
  },
  level {
    en,
    es
  },
  maxDepth {
    en,
    es
  },
  extras[] {
    en,
    es
  },
  faqs[] {
    _key,
    question {
      en,
      es
    },
    answer {
      en,
      es
    }
  }
}`

export const getSharkDive = async (): Promise<SharkDive> => {
  return await client.fetch(sharkDiveQuery)
}

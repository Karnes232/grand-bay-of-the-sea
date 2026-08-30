import { client } from "@/sanity/lib/client"

export interface ScubaDivingPuntaCana {
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
    ref?: string
    crop?: unknown
    hotspot?: { x: number; y: number } | null
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
    ref?: string
    crop?: unknown
    hotspot?: { x: number; y: number } | null
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
    ref?: string
    crop?: unknown
    hotspot?: { x: number; y: number } | null
    alt: string
  }
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
  faqs: {
    _key: string
    question: {
      en: string
      es: string
      de: string
    }
    answer: {
      en: any[]
      es: any[]
      de: any[]
    }
  }[]
}

export const scubaDivingPuntaCanaQuery = `*[_type == "scubaDivingPuntaCana"][0] {
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
    "ref": asset._ref,
    crop,
    hotspot,
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
    "ref": asset._ref,
    crop,
    hotspot,
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
    "ref": asset._ref,
    crop,
    hotspot,
    alt
  },
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
  faqs[] {
    _key,
    question {
      en,
      es,
      de
    },
    answer {
      en,
      es,
      de
    }
  }
}`

export const getScubaDivingPuntaCana =
  async (): Promise<ScubaDivingPuntaCana> => {
    return await client.fetch(scubaDivingPuntaCanaQuery)
  }

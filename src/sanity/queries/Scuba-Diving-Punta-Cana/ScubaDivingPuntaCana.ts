import { client } from "@/sanity/lib/client"

export interface ScubaDivingPuntaCana {
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

export const scubaDivingPuntaCanaQuery = `*[_type == "scubaDivingPuntaCana"][0] {
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

export const getScubaDivingPuntaCana =
  async (): Promise<ScubaDivingPuntaCana> => {
    return await client.fetch(scubaDivingPuntaCanaQuery)
  }

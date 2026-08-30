import { client } from "@/sanity/lib/client"

type Loc = { en: string; es: string; de: string }

export interface SpeciesPageContent {
  title: Loc
  heroEyebrow?: Loc
  heroSubtitle?: Loc
  ctaHeading?: Loc
  ctaBody?: Loc
  ctaLabel?: Loc
  content: {
    en: any[]
    es: any[]
    de: any[]
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
    ref?: string
    crop?: unknown
    hotspot?: { x: number; y: number } | null
    alt: string
  }
}

export const speciesPageContentQuery = `*[_type == "speciesPageContent"] {
    title {
        en,
        es,
        de
    },
    heroEyebrow { en, es },
    heroSubtitle { en, es },
    ctaHeading { en, es },
    ctaBody { en, es },
    ctaLabel { en, es },
    content {
        en,
        es,
        de
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
        "ref": asset._ref,
        crop,
        hotspot,
        alt
    }

  }`

export async function getSpeciesPageContent(): Promise<SpeciesPageContent[]> {
  return await client.fetch(speciesPageContentQuery)
}

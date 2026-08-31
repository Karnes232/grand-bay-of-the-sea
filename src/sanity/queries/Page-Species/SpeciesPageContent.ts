import { client } from "@/sanity/lib/client"
import { type Localized } from "@/i18n/locales"

type Loc = Localized<string>

export interface SpeciesPageContent {
  title: Loc
  heroEyebrow?: Loc
  heroSubtitle?: Loc
  ctaHeading?: Loc
  ctaBody?: Loc
  ctaLabel?: Loc
  content: Localized<any[]>
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
    title,
    heroEyebrow,
    heroSubtitle,
    ctaHeading,
    ctaBody,
    ctaLabel,
    content,
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

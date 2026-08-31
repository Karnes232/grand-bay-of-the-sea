import { client } from "@/sanity/lib/client"
import { type Localized } from "@/i18n/locales"

type Loc = Localized<string>

export interface BlogPageLayout {
  title: Loc
  heroEyebrow?: Loc
  ctaHeading?: Loc
  ctaBody?: Loc
  ctaLabel?: Loc
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
  paragraph: Localized<any[]>
}

export const blogPageLayoutQuery = `*[_type == "blogPageLayout"][0] {
    title {
        en,
        es,
        de
    },
    heroEyebrow { en, es },
    ctaHeading { en, es },
    ctaBody { en, es },
    ctaLabel { en, es },
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
    paragraph {
        en,
        es,
        de
    }
}`

export async function getBlogPageLayout(): Promise<BlogPageLayout> {
  return await client.fetch(blogPageLayoutQuery)
}

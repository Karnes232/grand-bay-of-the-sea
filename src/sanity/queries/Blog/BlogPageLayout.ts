import { client } from "@/sanity/lib/client"

export interface BlogPageLayout {
  title: {
    en: string
    es: string
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
  paragraph: {
    en: string
    es: string
  }
}

export const blogPageLayoutQuery = `*[_type == "blogPageLayout"][0] {
    title {
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
    paragraph {
        en,
        es
    }
}`

export async function getBlogPageLayout(): Promise<BlogPageLayout> {
  return await client.fetch(blogPageLayoutQuery)
}

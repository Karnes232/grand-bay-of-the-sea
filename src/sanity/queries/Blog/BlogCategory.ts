import { client } from "@/sanity/lib/client"
import { type Localized } from "@/i18n/locales"

export interface BlogCategory {
  blogCategory: Localized<string>
  slug: {
    current: string
  }
  descEn?: string
  descEs?: string
  cardImage: {
    asset: {
      url: string
      metadata: {
        lqip?: string
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
  _updatedAt?: string
}

export const blogCategoryQuery = `*[_type == "blogCategory"] {
    blogCategory,
    slug {
        current
    },
    "descEn": pt::text(description.en),
    "descEs": pt::text(description.es),
    _updatedAt,
    cardImage {
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

export async function getBlogCategory(): Promise<BlogCategory[]> {
  return await client.fetch(blogCategoryQuery)
}

export interface individualBlogCategory {
  blogCategory: Localized<string>
  slug: string
  heroImage: {
    asset: {
      url: string
      metadata: {
        lqip: string
      }
    }
    ref?: string
    crop?: unknown
    hotspot?: { x: number; y: number } | null
    alt: string
  }
  description: Localized<string>
  seo: {
    structuredData: Localized<string>
  }
}

export const individualBlogCategoryQuery = `*[_type == "blogCategory" && slug.current == $slug][0] {
    blogCategory,
    slug,
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
    description,
    seo {
        structuredData
    }
}`

export async function getIndividualBlogCategory(
  slug: string,
): Promise<individualBlogCategory> {
  return await client.fetch(individualBlogCategoryQuery, { slug })
}

export interface individualBlogCategorySEO {
  seo: {
    meta: {
      en: {
        title: string
        description: string
        keywords: string[]
      }
      es: {
        title: string
        description: string
        keywords: string[]
      },
      de: {
        title: string
        description: string
        keywords: string[]
      }
    }
    openGraph: {
      en: {
        title: string
        description: string
      }
      es: {
        title: string
        description: string
      },
      de: {
        title: string
        description: string
      }
      image: {
        url: string
        alt?: string
        width?: number
        height?: number
      }
    }
    noIndex: boolean
    noFollow: boolean
  }
}

export const individualBlogCategorySEOQuery = `*[_type == "blogCategory" && slug.current == $slug][0] {
seo {
        meta,
  // Open Graph data
  openGraph {
    ...,
    "image": {
      "url": image.asset->url,
      "alt": image.alt,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
    }
  },
  // Other SEO settings
  noIndex,
  noFollow
    }
}`

export async function getIndividualBlogCategorySEO(
  slug: string,
): Promise<individualBlogCategorySEO> {
  return await client.fetch(individualBlogCategorySEOQuery, { slug })
}

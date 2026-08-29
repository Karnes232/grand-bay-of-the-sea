import { client } from "@/sanity/lib/client"

export interface BlogCategory {
  blogCategory: {
    en: string
    es: string
    de: string
  }
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
    blogCategory {
        en,
        es,
        de
    },
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
  blogCategory: {
    en: string
    es: string
    de: string
  }
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
  description: {
    en: string
    es: string
    de: string
  }
  seo: {
    structuredData: {
      en: string
      es: string
      de: string
    }
  }
}

export const individualBlogCategoryQuery = `*[_type == "blogCategory" && slug.current == $slug][0] {
    blogCategory {
        en,
        es,
        de
    },
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
    description {
        en,
        es,
        de
    },
    seo {
        structuredData {
            en,
            es,
            de
        }
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
        meta {
    en {
      title,
      description,
      keywords
    },
    es {
      title,
      description,
      keywords
    },
    de {
      title,
      description,
      keywords
    }
  },
  // Open Graph data
  openGraph {
    en {
      title,
      description
    },
    es {
      title,
      description
    },
    de {
      title,
      description
    },
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

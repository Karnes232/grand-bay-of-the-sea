import { client } from "@/sanity/lib/client"

export interface BlogCategory {
  blogCategory: {
    en: string
    es: string
  }
  slug: {
    current: string
  }
  cardImage: {
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
}

export const blogCategoryQuery = `*[_type == "blogCategory"] {
    blogCategory {
        en,
        es
    },
    slug {
        current
    },
    cardImage {
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
    }
}`

export async function getBlogCategory(): Promise<BlogCategory[]> {
  return await client.fetch(blogCategoryQuery)
}

export interface individualBlogCategory {
  blogCategory: {
    en: string
    es: string
  }
  slug: string
  heroImage: {
    asset: {
      url: string
    }
    alt: string
  }
  description: {
    en: string
    es: string
  }
  seo: {
    structuredData: {
      en: string
      es: string
    }
  }
}

export const individualBlogCategoryQuery = `*[_type == "blogCategory" && slug.current == $slug][0] {
    blogCategory {
        en,
        es
    },
    slug,
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
    description {
        en,
        es
    },
    seo {
        structuredData {
            en,
            es
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

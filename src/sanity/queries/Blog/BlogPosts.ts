import { client } from "@/sanity/lib/client"

export interface BlogPostsCards {
  title: {
    en: string
    es: string
    de: string
  }
  slug: {
    current: string
  }
  description: {
    en: string
    es: string
    de: string
  }
  publishDate: string
  backgroundImages: {
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
  blogCategory: {
    slug: string
  }
}

export const blogPostsCardsQuery = `*[_type == "blogPost" && blogCategory->slug.current == $slug] | order(publishDate desc) {
  title {
    en,
    es,
    de
  },
  slug,
  description {
    en,
    es,
    de
  },
  publishDate,
  backgroundImages[0] {
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
  blogCategory -> {
    slug
  }
}`

export async function getBlogPostsCards(
  slug: string,
): Promise<BlogPostsCards[]> {
  return await client.fetch(blogPostsCardsQuery, { slug })
}

export interface BlogPost {
  title: {
    en: string
    es: string
    de: string
  }
  description: {
    en: string
    es: string
    de: string
  }
  publishDate: string
  _updatedAt?: string
  backgroundImages: {
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
    alt?: string
  }[]
  blogCategory: {
    slug: {
      current: string
    }
  }
  blogBody: {
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

export const individualBlogPostQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  title {
    en,
    es,
    de
  },
  description {
    en,
    es,
    de
  },
  publishDate,
  _updatedAt,
  backgroundImages[] {
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
  blogCategory -> {
    slug
  },
  blogBody {
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

export async function getIndividualBlogPost(
  slug: string,
): Promise<BlogPost | null> {
  return await client.fetch(individualBlogPostQuery, { slug })
}

export interface IndividualBlogPostSEO {
  publishDate?: string
  _updatedAt?: string
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

export const individualBlogPostSEOQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  publishDate,
  _updatedAt,
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

export async function getIndividualBlogPostSEO(
  slug: string,
): Promise<IndividualBlogPostSEO> {
  return await client.fetch(individualBlogPostSEOQuery, { slug })
}

export interface BlogPosts {
  slug: {
    current: string
  }
  blogCategory: {
    slug: {
      current: string
    }
  }
  _updatedAt?: string
}

export const blogPostsQuery = `*[_type == "blogPost"] {
  slug {
    current
  },
  blogCategory -> {
    slug {
      current
    }
  },
  _updatedAt
}`

export async function getBlogPosts(): Promise<BlogPosts[]> {
  return await client.fetch(blogPostsQuery)
}

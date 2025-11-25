import { client } from "@/sanity/lib/client"

export interface BlogPostsCards {
  title: {
    en: string
    es: string
  }
  slug: {
    current: string
  }
  description: {
    en: string
    es: string
  }
  publishDate: string
  backgroundImages: {
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
  blogCategory: {
    slug: string
  }
}

export const blogPostsCardsQuery = `*[_type == "blogPost" && blogCategory->slug.current == $slug] | order(publishDate desc) {
  title {
    en,
    es
  },
  slug,
  description {
    en,
    es
  },
  publishDate,
  backgroundImages[0] {
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
  }
  description: {
    en: string
    es: string
  }
  publishDate: string
  backgroundImages: {
    asset: {
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
  }[]
  blogCategory: {
    slug: {
      current: string
    }
  }
  blogBody: {
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

export const individualBlogPostQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  title {
    en,
    es
  },
  description {
    en,
    es
  },
  publishDate,
  backgroundImages[] {
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
  blogCategory -> {
    slug
  },
  blogBody {
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

export async function getIndividualBlogPost(slug: string): Promise<BlogPost> {
  return await client.fetch(individualBlogPostQuery, { slug })
}

export interface IndividualBlogPostSEO {
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

export const individualBlogPostSEOQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
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

export async function getIndividualBlogPostSEO(
  slug: string,
): Promise<IndividualBlogPostSEO> {
  return await client.fetch(individualBlogPostSEOQuery, { slug })
}

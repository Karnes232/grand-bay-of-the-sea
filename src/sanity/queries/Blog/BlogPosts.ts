import { client } from "@/sanity/lib/client"
import {
  PER_POST_BLOG_LOCALES,
  type Locale,
  type Localized,
} from "@/i18n/locales"

export interface BlogPostsCards {
  title: Localized<string>
  slug: {
    current: string
  }
  description: Localized<string>
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
  /** Which per-post locales this post is actually translated into. */
  blogLocales?: Partial<Record<Locale, boolean>> | null
}

/**
 * Projects per-post translation availability as
 * `"blogLocales": { "de": true, … }` — one boolean per per-post locale, built
 * from the registry so a new language needs no edit here.
 *
 * A post counts as translated only when BOTH its title and its body are. A
 * translated title over an English body is worse than no page at all: it
 * promises a translation that isn't there.
 *
 * `null` when no locale is per-post (e.g. the German gate is off) — an empty
 * GROQ projection is not valid, and `blogLocales?.[locale]` then reads falsy,
 * which is the right answer.
 */
const blogLocalesProjection = PER_POST_BLOG_LOCALES.length
  ? `"blogLocales": {${PER_POST_BLOG_LOCALES.map(
      locale =>
        `"${locale}": defined(title.${locale}) && count(blogBody.${locale}) > 0`,
    ).join(", ")}}`
  : `"blogLocales": null`

export const blogPostsCardsQuery = `*[_type == "blogPost" && blogCategory->slug.current == $slug] | order(publishDate desc) {
  ${blogLocalesProjection},
  title,
  slug,
  description,
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
  title: Localized<string>
  description: Localized<string>
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
  blogBody: Localized<string>
  seo: {
    structuredData: Localized<string>
  }
  /** Which per-post locales this post is actually translated into. */
  blogLocales?: Partial<Record<Locale, boolean>> | null
}

export const individualBlogPostQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  ${blogLocalesProjection},
  title,
  description,
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
  blogBody,
  seo {
    structuredData
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
      }
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
      }
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
  /** Which per-post locales this post is actually translated into. */
  blogLocales?: Partial<Record<Locale, boolean>> | null
}

export const individualBlogPostSEOQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  ${blogLocalesProjection},
  publishDate,
  _updatedAt,
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
  /** Which per-post locales this post is actually translated into. */
  blogLocales?: Partial<Record<Locale, boolean>> | null
}

export const blogPostsQuery = `*[_type == "blogPost"] {
  ${blogLocalesProjection},
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

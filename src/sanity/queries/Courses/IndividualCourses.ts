import { client } from "@/sanity/lib/client"
import { type Localized } from "@/i18n/locales"

export interface IndividualCourseCard {
  course: string
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
      alt: string
    }
  }
  cardDescription: Localized<string>
  padiPrice?: number
  cardHashTags: string[]
  courseLevel: string
  order: number
}

export const individualCoursesCardsQuery = `*[_type == "individualCourse" && courseLevel == $courseLevel] | order(order asc) {
  course,
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
      },
      alt
    }
  },
  cardDescription,
  cardHashTags,
  courseLevel,
  padiPrice,
  order
}`

/** Lean projection for the sitemap — every course slug with its real lastmod. */
export const courseSlugsQuery = `*[_type == "individualCourse"]{
  "slug": slug.current,
  _updatedAt
}`

export const getCourseSlugs = async (): Promise<
  { slug: string; _updatedAt: string }[]
> => {
  return await client.fetch(courseSlugsQuery)
}

export const getIndividualCoursesCards = async (
  courseLevel: string,
): Promise<IndividualCourseCard[]> => {
  return await client.fetch(individualCoursesCardsQuery, { courseLevel })
}

export interface IndividualStucturedData {
  seo: {
    structuredData: Localized<string>
  }
}

export const individualCourseStructuredDataQuery = `*[_type == "individualCourse" && slug.current == $slug][0] {
  seo {
    structuredData
  }
}`

export const getIndividualCourseStructuredData = async (
  slug: string,
): Promise<IndividualStucturedData> => {
  return await client.fetch(individualCourseStructuredDataQuery, { slug })
}

export interface IndividualCourseSEO {
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
}

export const individualCourseSEOQuery = `*[_type == "individualCourse" && slug.current == $slug][0] {
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

export const getIndividualCourseSEO = async (
  slug: string,
): Promise<IndividualCourseSEO> => {
  return await client.fetch(individualCourseSEOQuery, { slug })
}

export interface IndividualCourse {
  course: string
  title?: Localized<string>
  slug: {
    current: string
  }
  videoId: string
  paragraph1: Localized<any[]>
  paragraph2: Localized<any[]>
  paragraph3?: Localized<any[]>
  paragraph4?: Localized<any[]>
  paragraph5?: Localized<any[]>
  paragraph6?: Localized<any[]>
  photoList: {
    asset: {
      url: string
      metadata: {
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
  }[]
  cardImage?: {
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
  }
  cardDescription?: Localized<string>
  cardHashTags?: string[]
  level: Localized<string>
  padiPrice: number
  duration: Localized<string>
  dives?: Localized<string>
  maxDepth?: Localized<string>
  extraInfo?: Localized<string>
  faqs?: {
    _key: string
    question: Localized<string>
    answer: Localized<any[]>
  }[]
  structuredData?: Localized<string>
}

export const individualCourseQuery = `*[_type == "individualCourse" && slug.current == $slug][0] {
  course,
  title,
  slug {
    current
  },
  videoId,
  paragraph1,
  paragraph2,
  paragraph3,
  paragraph4,
  paragraph5,
  paragraph6,
  photoList[] {
    asset -> {
      url,
      metadata {
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
  },
  cardDescription,
  cardHashTags,
  level,
  padiPrice,
  duration,
  dives,
  maxDepth,
  extraInfo,
  faqs[] {
    _key,
    question,
    answer
  },
  structuredData
}`

export const getIndividualCourse = async (
  slug: string,
): Promise<IndividualCourse> => {
  return await client.fetch(individualCourseQuery, { slug })
}

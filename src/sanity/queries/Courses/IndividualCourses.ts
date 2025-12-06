import { client } from "@/sanity/lib/client"

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
  cardDescription: {
    en: string
    es: string
  }
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
  cardDescription {
    en,
    es
  },
  cardHashTags,
  courseLevel,
  order
}`

export const getIndividualCoursesCards = async (
  courseLevel: string,
): Promise<IndividualCourseCard[]> => {
  return await client.fetch(individualCoursesCardsQuery, { courseLevel })
}

export interface IndividualStucturedData {
  seo: {
    structuredData: {
      en: string
      es: string
    }
  }
}

export const individualCourseStructuredDataQuery = `*[_type == "individualCourse" && slug.current == $slug][0] {
  seo {
    structuredData {
      en,
      es
    }
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

export const individualCourseSEOQuery = `*[_type == "individualCourse" && slug.current == $slug][0] {
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

export const getIndividualCourseSEO = async (
  slug: string,
): Promise<IndividualCourseSEO> => {
  return await client.fetch(individualCourseSEOQuery, { slug })
}

export interface IndividualCourse {
  course: string
  slug: {
    current: string
  }
  videoId: string
  paragraph1: {
    en: any[]
    es: any[]
  }
  paragraph2: {
    en: any[]
    es: any[]
  }
  paragraph3?: {
    en: any[]
    es: any[]
  }
  paragraph4?: {
    en: any[]
    es: any[]
  }
  paragraph5?: {
    en: any[]
    es: any[]
  }
  paragraph6?: {
    en: any[]
    es: any[]
  }
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
    alt: string
  }[]
}

export const individualCourseQuery = `*[_type == "individualCourse" && slug.current == $slug][0] {
  course,
  slug {
    current
  },
  videoId,
  paragraph1 {
    en,
    es
  },
  paragraph2 {
    en,
    es
  },
  paragraph3 {
    en,
    es
  },
  paragraph4 {
    en,
    es
  },
  paragraph5 {
    en,
    es
  },
  paragraph6 {
    en,
    es
  },
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
    alt
  }
}`

export const getIndividualCourse = async (
  slug: string,
): Promise<IndividualCourse> => {
  return await client.fetch(individualCourseQuery, { slug })
}

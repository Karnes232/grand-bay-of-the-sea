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

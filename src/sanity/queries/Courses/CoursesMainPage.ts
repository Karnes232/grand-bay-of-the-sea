import { client } from "@/sanity/lib/client"

export interface CoursesMainPage {
  title: string
  heroImage: {
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
  paragraph1: {
    en: any[]
    es: any[]
  }
  paragraph2: {
    en: any[]
    es: any[]
  }
  paragraph3: {
    en: any[]
    es: any[]
  }
}

export const coursesMainPageQuery = `*[_type == "coursesMainPage"][0] {
  title,
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
  }
}`

export const getCoursesMainPage = async (): Promise<CoursesMainPage> => {
  const coursesMainPage = await client.fetch(coursesMainPageQuery)
  return coursesMainPage
}

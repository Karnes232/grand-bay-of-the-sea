import { client } from "@/sanity/lib/client"

export interface CoursesMainPage {
  title: string
  heroTitle?: {
    en: string
    es: string
  }
  heroSubtitle?: {
    en: string
    es: string
  }
  heroCta?: {
    label?: {
      en: string
      es: string
    }
    link?: string
  }
  heroImage: {
    asset: {
      url: string
      metadata: {
        lqip: string
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
  heroTitle {
    en,
    es
  },
  heroSubtitle {
    en,
    es
  },
  heroCta {
    label {
      en,
      es
    },
    link
  },
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

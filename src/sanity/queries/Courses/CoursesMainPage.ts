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
    ref?: string
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    } | null
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    } | null
    alt?: string
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
  introHeading?: { en: string; es: string }
  beginnerEyebrow?: { en: string; es: string }
  beginnerHeading?: { en: string; es: string }
  advancedHeading?: { en: string; es: string }
  specialtyEyebrow?: { en: string; es: string }
  courseCta?: {
    heading?: { en: string; es: string }
    body?: { en: string; es: string }
    ctaLabel?: { en: string; es: string }
    ctaLink?: string
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
    "ref": asset._ref,
    crop,
    hotspot,
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
  },
  introHeading {
    en,
    es
  },
  beginnerEyebrow {
    en,
    es
  },
  beginnerHeading {
    en,
    es
  },
  advancedHeading {
    en,
    es
  },
  specialtyEyebrow {
    en,
    es
  },
  courseCta {
    heading {
      en,
      es
    },
    body {
      en,
      es
    },
    ctaLabel {
      en,
      es
    },
    ctaLink
  }
}`

export const getCoursesMainPage = async (): Promise<CoursesMainPage> => {
  const coursesMainPage = await client.fetch(coursesMainPageQuery)
  return coursesMainPage
}

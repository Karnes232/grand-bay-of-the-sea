import { client } from "@/sanity/lib/client"

export interface CoursesMainPage {
  title: string
  heroTitle?: {
    en: string
    es: string
    de: string
  }
  heroSubtitle?: {
    en: string
    es: string
    de: string
  }
  heroCta?: {
    label?: {
      en: string
      es: string
      de: string
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
    de: any[]
  }
  paragraph2: {
    en: any[]
    es: any[]
    de: any[]
  }
  paragraph3: {
    en: any[]
    es: any[]
    de: any[]
  }
  introHeading?: { en: string; es: string; de: string }
  beginnerEyebrow?: { en: string; es: string; de: string }
  beginnerHeading?: { en: string; es: string; de: string }
  advancedHeading?: { en: string; es: string; de: string }
  specialtyEyebrow?: { en: string; es: string; de: string }
  courseCta?: {
    heading?: { en: string; es: string; de: string }
    body?: { en: string; es: string; de: string }
    ctaLabel?: { en: string; es: string; de: string }
    ctaLink?: string
  }
}

export const coursesMainPageQuery = `*[_type == "coursesMainPage"][0] {
  title,
  heroTitle {
    en,
    es,
    de
  },
  heroSubtitle {
    en,
    es,
    de
  },
  heroCta {
    label {
      en,
      es,
      de
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
    es,
    de
  },
  paragraph2 {
    en,
    es,
    de
  },
  paragraph3 {
    en,
    es,
    de
  },
  introHeading {
    en,
    es,
    de
  },
  beginnerEyebrow {
    en,
    es,
    de
  },
  beginnerHeading {
    en,
    es,
    de
  },
  advancedHeading {
    en,
    es,
    de
  },
  specialtyEyebrow {
    en,
    es,
    de
  },
  courseCta {
    heading {
      en,
      es,
      de
    },
    body {
      en,
      es,
      de
    },
    ctaLabel {
      en,
      es,
      de
    },
    ctaLink
  }
}`

export const getCoursesMainPage = async (): Promise<CoursesMainPage> => {
  const coursesMainPage = await client.fetch(coursesMainPageQuery)
  return coursesMainPage
}

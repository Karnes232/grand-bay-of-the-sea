import { client } from "@/sanity/lib/client"
import { type Localized } from "@/i18n/locales"

export interface CoursesMainPage {
  title: string
  heroTitle?: Localized<string>
  heroSubtitle?: Localized<string>
  heroCta?: {
    label?: Localized<string>
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
  paragraph1: Localized<any[]>
  paragraph2: Localized<any[]>
  paragraph3: Localized<any[]>
  introHeading?: Localized<string>
  beginnerEyebrow?: Localized<string>
  beginnerHeading?: Localized<string>
  advancedHeading?: Localized<string>
  specialtyEyebrow?: Localized<string>
  courseCta?: {
    heading?: Localized<string>
    body?: Localized<string>
    ctaLabel?: Localized<string>
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

import { client } from "@/sanity/lib/client"
import { type Localized } from "@/i18n/locales"

interface Crop {
  top: number
  bottom: number
  left: number
  right: number
}
interface Hotspot {
  x: number
  y: number
  height: number
  width: number
}

export interface HomePage {
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
    }
    ref?: string
    crop?: Crop | null
    hotspot?: Hotspot | null
    alt: string
  }
  secondaryHeroImage: {
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
    crop?: Crop | null
    hotspot?: Hotspot | null
    alt: string
  }
  tertiaryHeroImage: {
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
    crop?: Crop | null
    hotspot?: Hotspot | null
    alt: string
  }
  heroTitle?: Localized<string>
  heroSubtitle?: Localized<string>
  heroCta?: {
    label?: Localized<string>
    link?: string
  }
  paragraph1: Localized<any[]>
  paragraph2: Localized<any[]>
  paragraph3: Localized<any[]>
  stats?: {
    value?: Localized<string>
    label?: Localized<string>
  }[]
  whyUniqueHeading?: Localized<string>
  sharkBanner?: {
    eyebrow?: Localized<string>
    heading?: Localized<string>
    body?: Localized<string>
    ctaLabel?: Localized<string>
    ctaLink?: string
  }
  courseHighlights?: {
    badge?: Localized<string>
    title?: Localized<string>
    blurb?: Localized<string>
    href?: string
  }[]
  bookingSection?: {
    eyebrow?: Localized<string>
    heading?: Localized<string>
    body?: Localized<string>
  }
  bookingBenefits?: Localized<string>[]
}

export const homePageQuery = `*[_type == "homePage"][0] {
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
  secondaryHeroImage {
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
  tertiaryHeroImage {
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
  stats[] {
    value {
      en,
      es,
      de
    },
    label {
      en,
      es,
      de
    }
  },
  whyUniqueHeading {
    en,
    es,
    de
  },
  sharkBanner {
    eyebrow {
      en,
      es,
      de
    },
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
  },
  courseHighlights[] {
    badge {
      en,
      es,
      de
    },
    title {
      en,
      es,
      de
    },
    blurb {
      en,
      es,
      de
    },
    href
  },
  bookingSection {
    eyebrow {
      en,
      es,
      de
    },
    heading {
      en,
      es,
      de
    },
    body {
      en,
      es,
      de
    }
  },
  bookingBenefits[] {
    en,
    es,
    de
  }
}`

export const getHomePage = async (): Promise<HomePage> => {
  return await client.fetch(homePageQuery)
}

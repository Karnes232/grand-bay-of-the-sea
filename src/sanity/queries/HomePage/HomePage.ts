import { client } from "@/sanity/lib/client"

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
  stats?: {
    value?: { en: string; es: string }
    label?: { en: string; es: string }
  }[]
  whyUniqueHeading?: {
    en: string
    es: string
  }
  sharkBanner?: {
    eyebrow?: { en: string; es: string }
    heading?: { en: string; es: string }
    body?: { en: string; es: string }
    ctaLabel?: { en: string; es: string }
    ctaLink?: string
  }
  courseHighlights?: {
    badge?: { en: string; es: string }
    title?: { en: string; es: string }
    blurb?: { en: string; es: string }
    href?: string
  }[]
  bookingSection?: {
    eyebrow?: { en: string; es: string }
    heading?: { en: string; es: string }
    body?: { en: string; es: string }
  }
  bookingBenefits?: {
    en: string
    es: string
  }[]
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
  stats[] {
    value {
      en,
      es
    },
    label {
      en,
      es
    }
  },
  whyUniqueHeading {
    en,
    es
  },
  sharkBanner {
    eyebrow {
      en,
      es
    },
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
  },
  courseHighlights[] {
    badge {
      en,
      es
    },
    title {
      en,
      es
    },
    blurb {
      en,
      es
    },
    href
  },
  bookingSection {
    eyebrow {
      en,
      es
    },
    heading {
      en,
      es
    },
    body {
      en,
      es
    }
  },
  bookingBenefits[] {
    en,
    es
  }
}`

export const getHomePage = async (): Promise<HomePage> => {
  return await client.fetch(homePageQuery)
}

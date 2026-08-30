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
  stats?: {
    value?: { en: string; es: string; de: string }
    label?: { en: string; es: string; de: string }
  }[]
  whyUniqueHeading?: {
    en: string
    es: string
    de: string
  }
  sharkBanner?: {
    eyebrow?: { en: string; es: string; de: string }
    heading?: { en: string; es: string; de: string }
    body?: { en: string; es: string; de: string }
    ctaLabel?: { en: string; es: string; de: string }
    ctaLink?: string
  }
  courseHighlights?: {
    badge?: { en: string; es: string; de: string }
    title?: { en: string; es: string; de: string }
    blurb?: { en: string; es: string; de: string }
    href?: string
  }[]
  bookingSection?: {
    eyebrow?: { en: string; es: string; de: string }
    heading?: { en: string; es: string; de: string }
    body?: { en: string; es: string; de: string }
  }
  bookingBenefits?: {
    en: string
    es: string
    de: string
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

import { client } from "@/sanity/lib/client"

export interface TripCards {
  page: string
  slug: {
    current: string
  }
  price?: number
  privateOnly?: boolean
  cardTitle: {
    en: string
    es: string
    de: string
  }
  cardDescription: {
    en: string
    es: string
    de: string
  }
  cardImage: {
    asset: {
      url: string
      metadata: {
        lqip?: string
        dimensions: {
          width: number
          height: number
        }
      }
    }
    ref?: string
    crop?: unknown
    hotspot?: { x: number; y: number } | null
    alt: string
  }
  duration?: {
    en: string
    es: string
    de: string
  }
  extras?: {
    en: string
    es: string
    de: string
  }[]
}

export const tripsQuery = `*[_type == "trips"] {
  page,
  slug,
  price,
  privateOnly,
  cardTitle {
    en,
    es,
    de
  },
  cardDescription {
    en,
    es,
    de
  },
  cardImage {
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
  duration {
    en,
    es,
    de
  },
  extras[] {
    en,
    es,
    de
  }
}`

export const getTripCards = async (): Promise<TripCards[]> => {
  const trips = await client.fetch(tripsQuery)
  return trips
}

/** Lean projection for the sitemap — every trip slug with its real lastmod. */
export const tripSlugsQuery = `*[_type == "trips"]{
  "slug": slug.current,
  _updatedAt
}`

export const getTripSlugs = async (): Promise<
  { slug: string; _updatedAt: string }[]
> => {
  return await client.fetch(tripSlugsQuery)
}

export interface Trip {
  page: string
  title?: {
    en: string
    es: string
    de: string
  }
  slug: {
    current: string
  }
  videoId: string
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
  paragraph4?: {
    en: any[]
    es: any[]
    de: any[]
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
    ref?: string
    crop?: unknown
    hotspot?: { x: number; y: number } | null
    alt: string
  }[]
  cardDescription?: {
    en: string
    es: string
    de: string
  }
  price: number
  spectatorSnorkel: number
  duration: {
    en: string
    es: string
    de: string
  }
  extras: {
    en: string
    es: string
    de: string
  }[]
  tripDaySteps?: {
    stepTitle?: { en: string; es: string; de: string }
    stepBody?: { en: string; es: string; de: string }
  }[]
  tripDayNote?: {
    en: string
    es: string
    de: string
  }
  depositPrice: number
  faqs?: {
    _key: string
    question: {
      en: string
      es: string
      de: string
    }
    answer: {
      en: any[]
      es: any[]
      de: any[]
    }
  }[]
}

export const individualTripQuery = `*[_type == "trips" && slug.current == $slug][0] {
  page,
  title {
    en,
    es,
    de
  },
  slug,
  videoId,
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
  paragraph4 {
    en,
    es,
    de
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
    "ref": asset._ref,
    crop,
    hotspot,
    alt
  },
  cardDescription {
    en,
    es,
    de
  },
  price,
  spectatorSnorkel,
  duration,
  extras[] {
    en,
    es,
    de
  },
  tripDaySteps[] {
    stepTitle {
      en,
      es,
      de
    },
    stepBody {
      en,
      es,
      de
    }
  },
  tripDayNote {
    en,
    es,
    de
  },
  depositPrice,
  faqs[] {
    _key,
    question {
      en,
      es,
      de
    },
    answer {
      en,
      es,
      de
    }
  }
}`

export const getIndividualTrip = async (slug: string): Promise<Trip> => {
  const trip = await client.fetch(individualTripQuery, { slug })
  return trip
}

export interface TripStructuredData {
  seo: {
    structuredData: {
      en: string
      es: string
      de: string
    }
  }
}

export const tripStructuredDataQuery = `*[_type == "trips" && slug.current == $slug][0] {
  seo {
    structuredData {
      en,
      es,
      de
    }
  }
}`

export const getTripStructuredData = async (
  slug: string,
): Promise<TripStructuredData> => {
  const tripStructuredData = await client.fetch(tripStructuredDataQuery, {
    slug,
  })
  return tripStructuredData
}

export interface TripSeo {
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
      de: {
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
      de: {
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

export const tripSeoQuery = `*[_type == "trips" && slug.current == $slug][0] {
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
    },
    de {
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
    de {
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

export const getTripSeo = async (slug: string): Promise<TripSeo> => {
  const tripSeo = await client.fetch(tripSeoQuery, { slug })
  return tripSeo
}

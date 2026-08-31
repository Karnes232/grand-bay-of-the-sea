import { client } from "@/sanity/lib/client"
import { type Localized } from "@/i18n/locales"

export interface TripCards {
  page: string
  slug: {
    current: string
  }
  price?: number
  privateOnly?: boolean
  cardTitle: Localized<string>
  cardDescription: Localized<string>
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
  duration?: Localized<string>
  extras?: Localized<string>[]
}

export const tripsQuery = `*[_type == "trips"] {
  page,
  slug,
  price,
  privateOnly,
  cardTitle,
  cardDescription,
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
  duration,
  extras[]
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
  title?: Localized<string>
  slug: {
    current: string
  }
  videoId: string
  paragraph1: Localized<any[]>
  paragraph2: Localized<any[]>
  paragraph3: Localized<any[]>
  paragraph4?: Localized<any[]>
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
  cardDescription?: Localized<string>
  price: number
  spectatorSnorkel: number
  duration: Localized<string>
  extras: Localized<string>[]
  tripDaySteps?: {
    stepTitle?: Localized<string>
    stepBody?: Localized<string>
  }[]
  tripDayNote?: Localized<string>
  depositPrice: number
  faqs?: {
    _key: string
    question: Localized<string>
    answer: Localized<any[]>
  }[]
}

export const individualTripQuery = `*[_type == "trips" && slug.current == $slug][0] {
  page,
  title,
  slug,
  videoId,
  paragraph1,
  paragraph2,
  paragraph3,
  paragraph4,
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
  cardDescription,
  price,
  spectatorSnorkel,
  duration,
  extras[],
  tripDaySteps[] {
    stepTitle,
    stepBody
  },
  tripDayNote,
  depositPrice,
  faqs[] {
    _key,
    question,
    answer
  }
}`

export const getIndividualTrip = async (slug: string): Promise<Trip> => {
  const trip = await client.fetch(individualTripQuery, { slug })
  return trip
}

export interface TripStructuredData {
  seo: {
    structuredData: Localized<string>
  }
}

export const tripStructuredDataQuery = `*[_type == "trips" && slug.current == $slug][0] {
  seo {
    structuredData
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
        meta,
  // Open Graph data
  openGraph {
    ...,
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

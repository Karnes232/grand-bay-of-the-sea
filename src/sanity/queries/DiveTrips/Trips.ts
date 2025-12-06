import { client } from "@/sanity/lib/client"

export interface TripCards {
  title: string
  slug: {
    current: string
  }
  cardTitle: {
    en: string
    es: string
  }
  cardDescription: {
    en: string
    es: string
  }
  cardImage: {
    asset: {
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt: string
  }
}

export const tripsQuery = `*[_type == "trips"] {
  title,
  slug,
  cardTitle {
    en,
    es
  },
  cardDescription {
    en,
    es
  },
  cardImage {
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
  }
}`

export const getTripCards = async (): Promise<TripCards[]> => {
  const trips = await client.fetch(tripsQuery)
  return trips
}

export interface Trip {
  title: string
  slug: {
    current: string
  }
  videoId: string
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
    alt: string
  }[]
}

export const individualTripQuery = `*[_type == "trips" && slug.current == $slug][0] {
  title,
  slug,
  videoId,
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
    alt
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
    }
  }
}

export const tripStructuredDataQuery = `*[_type == "trips" && slug.current == $slug][0] {
  seo {
    structuredData {
      en,
      es
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

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
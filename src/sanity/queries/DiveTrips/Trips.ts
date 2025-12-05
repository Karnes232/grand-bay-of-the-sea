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

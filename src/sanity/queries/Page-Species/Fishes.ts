import { client } from "@/sanity/lib/client"

export interface Fishes {
  name: {
    en: string
    es: string
  }
  description: {
    en: string
    es: string
  }
  image: {
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
  blogReference: {
    slug: string
  } | null
}

export const fishesQuery = `*[_type == "fishes"] {
  name {
    en,
    es
  },
  description {
    en,
    es
  },
  image {
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
  },
  blogReference -> {
    slug
  }
}`

export async function getFishes(): Promise<Fishes[]> {
  return await client.fetch(fishesQuery)
}
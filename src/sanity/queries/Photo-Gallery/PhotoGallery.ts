import { client } from "@/sanity/lib/client"

export interface PhotoGallery {
  title: {
    en: string
    es: string
  }
  heroEyebrow?: { en: string; es: string }
  heroSubtitle?: { en: string; es: string }
  mainImage: {
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
    crop?: unknown
    hotspot?: { x: number; y: number } | null
    alt: string
  }
  photoList: {
    _key?: string
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
    categories?: string[]
    alt: string
  }[]
}

export const photoGalleryQuery = `*[_type == "photoGallery"][0] {
  title {
    en,
    es
  },
  heroEyebrow { en, es },
  heroSubtitle { en, es },
  mainImage {
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
  photoList[] {
    _key,
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
    categories,
    alt
  }
}`

export async function getPhotoGallery(): Promise<PhotoGallery> {
  return await client.fetch(photoGalleryQuery)
}

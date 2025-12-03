import { client } from "@/sanity/lib/client"

export interface PhotoGallery {
  title: {
    en: string
    es: string
  }
  mainImage: {
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

export const photoGalleryQuery = `*[_type == "photoGallery"][0] {
  title {
    en,
    es
  },
  mainImage {
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

export async function getPhotoGallery(): Promise<PhotoGallery> {
  return await client.fetch(photoGalleryQuery)
}

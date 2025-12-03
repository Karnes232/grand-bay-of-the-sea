import { client } from "@/sanity/lib/client"

export interface Contact {
  heroImage: {
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

export const contactQuery = `*[_type == "contact"][0] {
  heroImage {
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

export const getContact = async (): Promise<Contact> => {
  return await client.fetch(contactQuery)
}
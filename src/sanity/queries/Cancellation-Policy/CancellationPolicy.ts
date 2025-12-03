import { client } from "@/sanity/lib/client"

export interface CancellationPolicy {
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
  content: {
    en: any[]
    es: any[]
  }
}

export const cancellationPolicyQuery = `*[_type == "cancellationPolicy"][0] {
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
  },
  content {
    en,
    es
  }
}`

export const getCancellationPolicy = async (): Promise<CancellationPolicy> => {
  return await client.fetch(cancellationPolicyQuery)
}

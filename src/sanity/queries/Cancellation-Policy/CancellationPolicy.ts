import { client } from "@/sanity/lib/client"

export interface CancellationPolicy {
  heroImage: {
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
        lqip,
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

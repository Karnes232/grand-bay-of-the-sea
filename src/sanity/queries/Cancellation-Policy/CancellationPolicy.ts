import { client } from "@/sanity/lib/client"
import { type Localized } from "@/i18n/locales"

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
    ref?: string
    crop?: unknown
    hotspot?: { x: number; y: number } | null
    alt: string
  }
  content: Localized<any[]>
  eyebrow?: Localized<string>
  contactPrompt?: Localized<string>
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
    "ref": asset._ref,
    crop,
    hotspot,
    alt
  },
  content,
  eyebrow,
  contactPrompt
}`

export const getCancellationPolicy = async (): Promise<CancellationPolicy> => {
  return await client.fetch(cancellationPolicyQuery)
}

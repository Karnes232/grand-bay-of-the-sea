import { client } from "@/sanity/lib/client"

export interface PrivacyPolicy {
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
  content: {
    en: any[]
    es: any[]
  }
  eyebrow?: { en: string; es: string }
  contactPrompt?: { en: string; es: string }
}

export const privacyPolicyQuery = `*[_type == "privacyPolicy"][0] {
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
  content {
    en,
    es
  },
  eyebrow { en, es },
  contactPrompt { en, es }
}`

export const getPrivacyPolicy = async (): Promise<PrivacyPolicy> => {
  return await client.fetch(privacyPolicyQuery)
}

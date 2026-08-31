import { client } from "@/sanity/lib/client"
import { type Localized } from "@/i18n/locales"

export interface PageSeo {
  pageName: string
  seo: {
    meta: {
      en: {
        title: string
        description: string
        keywords: string[]
      }
      es: {
        title: string
        description: string
        keywords: string[]
      },
      de: {
        title: string
        description: string
        keywords: string[]
      }
    }
    openGraph: {
      en: {
        title: string
        description: string
      }
      es: {
        title: string
        description: string
      },
      de: {
        title: string
        description: string
      }
      image: {
        url: string
        alt?: string
        width?: number
        height?: number
      }
    }
    noIndex: boolean
    noFollow: boolean
  }
}
export const seoQuery = `*[_type == "pageSeo" && pageName == $pageName][0] {
    pageName,
    seo {
        meta,
  // Open Graph data
  openGraph {
    ...,
    "image": {
      "url": image.asset->url,
      "alt": image.alt,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
    }
  },
  // Other SEO settings
  noIndex,
  noFollow
    }
}`

export async function getPageSeo(pageName: string): Promise<PageSeo> {
  const pageSeo = await client.fetch(seoQuery, { pageName })
  return pageSeo
}

export const structuredDataQuery = `*[_type == "pageSeo" && pageName == $pageName][0] {
    pageName,
    seo {
        structuredData
    }
}`

export interface structuredData {
  pageName: string
  seo: {
    structuredData: Localized<string>
  }
}

export const getStructuredData = async (
  pageName: string,
): Promise<structuredData> => {
  const structuredData = await client.fetch(structuredDataQuery, { pageName })
  return structuredData
}

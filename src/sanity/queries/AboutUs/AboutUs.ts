import { client } from "@/sanity/lib/client"
import { type Localized } from "@/i18n/locales"

type L = Localized<string>

export interface AboutImage {
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
  alt?: string
}

export interface TeamMember {
  photo?: AboutImage
  name?: string
  role?: L
  bio?: L
}

export interface AboutValue {
  icon?: string
  title?: L
  body?: L
}

export interface AboutUs {
  heroImage: AboutImage
  heroEyebrow?: L
  heroTitle?: L
  heroSubtitle?: L
  stats?: { value?: L; label?: L }[]
  storyEyebrow?: L
  storyHeading?: L
  storyBody?: Localized<any[]>
  storyImage?: AboutImage
  teamEyebrow?: L
  teamHeading?: L
  teamIntro?: L
  teamMembers?: TeamMember[]
  valuesEyebrow?: L
  valuesHeading?: L
  values?: AboutValue[]
  ctaImage?: AboutImage
  ctaHeading?: L
  ctaBody?: L
  ctaLabel?: L
  cta2Label?: L
}

const imageProjection = `{
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
}`

export const aboutUsQuery = `*[_type == "aboutUs"][0] {
  heroImage ${imageProjection},
  heroEyebrow,
  heroTitle,
  heroSubtitle,
  stats[] {
    value,
    label
  },
  storyEyebrow,
  storyHeading,
  storyBody,
  storyImage ${imageProjection},
  teamEyebrow,
  teamHeading,
  teamIntro,
  teamMembers[] {
    photo ${imageProjection},
    name,
    role,
    bio
  },
  valuesEyebrow,
  valuesHeading,
  values[] {
    icon,
    title,
    body
  },
  ctaImage ${imageProjection},
  ctaHeading,
  ctaBody,
  ctaLabel,
  cta2Label
}`

export const getAboutUs = async (): Promise<AboutUs> => {
  return await client.fetch(aboutUsQuery)
}

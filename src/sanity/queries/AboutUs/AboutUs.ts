import { client } from "@/sanity/lib/client"

type L = { en: string; es: string }

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
  storyBody?: { en: any[]; es: any[] }
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
  heroEyebrow { en, es },
  heroTitle { en, es },
  heroSubtitle { en, es },
  stats[] {
    value { en, es },
    label { en, es }
  },
  storyEyebrow { en, es },
  storyHeading { en, es },
  storyBody { en, es },
  storyImage ${imageProjection},
  teamEyebrow { en, es },
  teamHeading { en, es },
  teamIntro { en, es },
  teamMembers[] {
    photo ${imageProjection},
    name,
    role { en, es },
    bio { en, es }
  },
  valuesEyebrow { en, es },
  valuesHeading { en, es },
  values[] {
    icon,
    title { en, es },
    body { en, es }
  },
  ctaImage ${imageProjection},
  ctaHeading { en, es },
  ctaBody { en, es },
  ctaLabel { en, es },
  cta2Label { en, es }
}`

export const getAboutUs = async (): Promise<AboutUs> => {
  return await client.fetch(aboutUsQuery)
}

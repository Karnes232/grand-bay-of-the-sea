import CloudinaryBackgroundVideo from "@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"
// Update the import path if HeroStaticComponent is in a different location
import HeroStaticComponent from "@/components/HeroComponent/HeroStaticComponent"
import RichText from "@/components/RichTextComponents/RichText"
import TripCards from "@/components/TourOverviews/TripCards"
import { searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"
import { getPlaiceholder } from "plaiceholder" // Import getPlaiceholder

// Add this line to explicitly force static rendering
export const dynamic = "force-static"

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const seoSearchResults = await searchEntries("seo", {
    "fields.page": "Trips",
  })
  return {
    title: String(seoSearchResults.items[0].fields.title),
    description: String(seoSearchResults.items[0].fields.description),
    keywords: seoSearchResults.items[0].fields.keywords as string[],
    openGraph: {
      url: "https://www.grandbay-puntacana.com/trips",
      type: "website",
      title: String(seoSearchResults.items[0].fields.title),
      description: String(seoSearchResults.items[0].fields.description),
      images: [
        {
          url: `https:${(seoSearchResults.items[0] as any).fields.image.fields.file.url}`,
          width: (seoSearchResults.items[0] as any).fields.image.fields.file
            .details.image.width,
          height: (seoSearchResults.items[0] as any).fields.image.fields.file
            .details.image.height,
          alt: (seoSearchResults.items[0] as any).fields.image.fields.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: String(seoSearchResults.items[0].fields.title),
      description: String(seoSearchResults.items[0].fields.description),
      creator: "@grandbay",
      site: "@grandbay",
      images: [
        {
          url: `https:${(seoSearchResults.items[0] as any).fields.image.fields.file.url}`,
          width: (seoSearchResults.items[0] as any).fields.image.fields.file
            .details.image.width,
          height: (seoSearchResults.items[0] as any).fields.image.fields.file
            .details.image.height,
          alt: (seoSearchResults.items[0] as any).fields.image.fields.title,
        },
      ],
    },
    alternates: {
      canonical: "https://www.grandbay-puntacana.com/trips/",
    },
  }
}

export default async function Page() {
  const pageLayout = await searchEntries("pageLayout", {
    "fields.page": "Trips",
  })

  // Get the hero image URL from Contentful
  const heroImageUrl = `https:${(pageLayout.items[0] as any).fields.heroImage.fields.file.url}`

  // Generate blurDataURL for the hero image at build time
  const buffer = await fetch(heroImageUrl).then(async res => {
    return Buffer.from(await res.arrayBuffer())
  })
  const { base64: heroImageBlurDataURL } = await getPlaiceholder(buffer)

  return (
    <main>
      <HeroStaticComponent // Use HeroStaticComponent
        heroImage={heroImageUrl}
        blurDataURL={heroImageBlurDataURL} // Pass the generated blurDataURL
      />
      <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />
      <RichText context={pageLayout.items[0].fields.paragraph1} />
      <CloudinaryBackgroundVideo
        className="xl:min-h-[80vh] [clip-path:polygon(0%_5vh,100%_0%,100%_35vh,0%_100%)] lg:[clip-path:polygon(0%_5vh,100%_0%,100%_55vh,0%_100%)] xl:[clip-path:polygon(0%_5vh,100%_0%,100%_75vh,0%_100%)]"
        videoId={"scubaHero_wzvqdg"}
      />
      <TripCards
        image1={(pageLayout.items[0] as any).fields.linkImage1.fields}
        image2={(pageLayout.items[0] as any).fields.linkImage2.fields}
        image3={(pageLayout.items[0] as any).fields.linkImage3.fields}
      />
    </main>
  )
}
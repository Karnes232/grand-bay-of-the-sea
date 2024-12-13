import SwiperCarousel from "@/components/BackgroundCarouselComponents/SwiperCarousel"
import BackgroundVideo from "@/components/BackgroundVideoComponent/BackgroundVideo"
import RichText from "@/components/RichTextComponents/RichText"
import TuiBayahibeOverview from "@/components/TuiComponents/TuiBayahibeOverview"
import { searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const seoSearchResults = await searchEntries(
    "tours",
    {
      "fields.slug": "bayahibe",
    },
    [
      "fields.seoTitle",
      "fields.seoDescription",
      "fields.seoKeywords",
      "fields.seoImage",
    ],
    ["fishing-punta-cana", "shark-dive-punta-cana"],
  )

  return {
    title: String(seoSearchResults.items[0].fields.seoTitle),
    description: String(seoSearchResults.items[0].fields.seoDescription),
    keywords: seoSearchResults.items[0].fields.seoKeywords as string[],
    openGraph: {
      url: `https://www.grandbay-puntacana.com/tui/bayahibe`,
      type: "website",
      title: String(seoSearchResults.items[0].fields.seoTitle),
      description: String(seoSearchResults.items[0].fields.seoDescription),
      images: [
        {
          url: `https:${(seoSearchResults.items[0] as any).fields.seoImage.fields.file.url}`,
          width: (seoSearchResults.items[0] as any).fields.seoImage.fields.file
            .details.image.width,
          height: (seoSearchResults.items[0] as any).fields.seoImage.fields.file
            .details.image.height,
          alt: (seoSearchResults.items[0] as any).fields.seoImage.fields.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: String(seoSearchResults.items[0].fields.seoTitle),
      description: String(seoSearchResults.items[0].fields.seoDescription),
      creator: "@grandbay",
      site: "@grandbay",
      images: [
        {
          url: `https:${(seoSearchResults.items[0] as any).fields.seoImage.fields.file.url}`,
          width: (seoSearchResults.items[0] as any).fields.seoImage.fields.file
            .details.image.width,
          height: (seoSearchResults.items[0] as any).fields.seoImage.fields.file
            .details.image.height,
          alt: (seoSearchResults.items[0] as any).fields.seoImage.fields.title,
        },
      ],
    },
    alternates: {
      canonical: `https://www.grandbay-puntacana.com/tui/bayahibe/`,
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const tour = await searchEntries(
    "tours",
    {
      "fields.slug": "bayahibe",
    },
    undefined,
    ["fishing-punta-cana", "shark-dive-punta-cana"],
  )

  return (
    <main>
      <BackgroundVideo
        video={(tour.items[0] as any).fields.videoHero.fields.file.url}
        className={`-mt-20 md:-mt-40 [clip-path:polygon(0_0,100%_0,100%_35vh,0%_100%)] lg:[clip-path:polygon(0_0,100%_0,100%_55vh,0%_100%)]`}
      />
      <div className="mb-5">
        <div className="flex flex-col lg:flex-row lg:mx-auto max-w-6xl xl:h-[20rem] justify-center">
          <div className="my-5 lg:flex lg:flex-col lg:justify-start lg:mt-5 xl:min-h-full xl:justify-center xl:mt-0">
            <RichText context={tour.items[0].fields.paragraph1} />
          </div>
        </div>
        <SwiperCarousel
          photoList={(tour.items[0] as any).fields.photoList}
          className={`mt-5 [clip-path:polygon(0_5vh,100%_0,100%_30vh,0%_100%)] md:[clip-path:polygon(0_5vh,100%_0,100%_40vh,0%_100%)] lg:[clip-path:polygon(0_5vh,100%_0,100%_50vh,0%_100%)] xl:[clip-path:polygon(0_5vh,100%_0,100%_60vh,0%_100%)]`}
        />
        <div className="flex flex-col lg:flex-row lg:mx-auto max-w-6xl lg:h-[35rem]">
          <div className="lg:flex lg:flex-col lg:justify-start xl:min-h-full xl:justify-center xl:mt-0">
            <RichText context={tour.items[0].fields.paragraph2} />
          </div>
          <div className="lg:w-[45rem] xl:mx-10 lg:min-h-full lg:flex lg:flex-col lg:justify-center">
            <TuiBayahibeOverview />
          </div>
          <div className="lg:flex lg:flex-col lg:justify-start xl:min-h-full xl:justify-center xl:mt-0">
            <RichText context={tour.items[0].fields.paragraph3} />
          </div>
        </div>
      </div>
    </main>
  )
}

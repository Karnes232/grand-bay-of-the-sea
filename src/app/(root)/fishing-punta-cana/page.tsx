import SwiperCarousel from "@/components/BackgroundCarouselComponents/SwiperCarousel"
import BackgroundVideo from "@/components/BackgroundVideoComponent/BackgroundVideo"
import RichText from "@/components/RichTextComponents/RichText"
import FishingOverview from "@/components/TourOverviews/FishingOverview"
import { searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const seoSearchResults = await searchEntries("seo", {
    "fields.page": "Fishing Punta Cana",
  })
  return {
    title: String(seoSearchResults.items[0].fields.title),
    description: String(seoSearchResults.items[0].fields.description),
    keywords: seoSearchResults.items[0].fields.keywords as string[],
    openGraph: {
      url: "https://www.grandbay-puntacana.com/fishing-punta-cana",
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
      canonical: "https://www.grandbay-puntacana.com/fishing-punta-cana/",
    },
  }
}

export default async function Home(props: any) {
  const pageLayout = await searchEntries("tours", {
    "fields.page": "Fishing Punta Cana",
  })

  return (
    <main>
      <BackgroundVideo
        video={(pageLayout.items[0] as any).fields.videoHero.fields.file.url}
        className={`-mt-20 md:-mt-40 xl:h-[80vh] [clip-path:polygon(0_0,100%_0,100%_35vh,0%_100%)] lg:[clip-path:polygon(0_0,100%_0,100%_55vh,0%_100%)] xl:[clip-path:polygon(0_0,100%_0,100%_70vh,0%_100%)]`}
      />
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:mx-auto max-w-6xl xl:h-[35rem]">
          <div className="lg:flex lg:flex-col lg:justify-start lg:mt-5 xl:min-h-full xl:justify-center xl:mt-0">
            <RichText context={pageLayout.items[0].fields.paragraph1} />
          </div>
          <div className="lg:w-[45rem] xl:mx-10 lg:min-h-full lg:flex lg:flex-col md:justify-center">
            <FishingOverview tour={pageLayout.items[0].fields as any} />
          </div>
          <div className="lg:flex lg:flex-col lg:justify-start lg:mt-5 xl:min-h-full xl:justify-center xl:mt-0">
            <RichText context={pageLayout.items[0].fields.paragraph2} />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:mx-auto max-w-6xl mb-10">
          <RichText context={pageLayout.items[0].fields.paragraph3} />
        </div>
        <SwiperCarousel
          photoList={(pageLayout.items[0] as any).fields.photoList}
          className={`mt-5 -mb-6 [clip-path:polygon(0_5vh,100%_0,100%_35vh,0%_100%)] md:[clip-path:polygon(0_5vh,100%_0,100%_45vh,0%_100%)] lg:[clip-path:polygon(0_5vh,100%_0,100%_55vh,0%_100%)] xl:[clip-path:polygon(0_5vh,100%_0,100%_65vh,0%_100%)]`}
          height={`h-[35vh] md:h-[45vh] lg:h-[55vh] xl:h-[65vh]`}
        />
      </div>
    </main>
  )
}

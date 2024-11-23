import SwiperCarousel from "@/components/BackgroundCarouselComponents/SwiperCarousel"
import BackgroundImage from "@/components/BackgroundImageComponent/BackgroundImage"
import BackgroundVideo from "@/components/BackgroundVideoComponent/BackgroundVideo"
import DivingOrganizations from "@/components/DivingOrganizations/DivingOrganizations"
import GoogleMaps from "@/components/GoogleMapsComponent/GoogleMaps"
import HeroComponent from "@/components/HeroComponent/HeroComponent"
import RichText from "@/components/RichTextComponents/RichText"
import SelectionComponent from "@/components/SelectionComponents/SelectionComponent"
import TripOverview from "@/components/TourOverviews/TripOverview"
import { getAllEntries, searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const seoSearchResults = await searchEntries(
    "tours",
    {
      "fields.slug": "shark-dive-punta-cana",
    },
    [
      "fields.seoTitle",
      "fields.seoDescription",
      "fields.seoKeywords",
      "fields.seoImage",
    ],
    ["fishing-punta-cana"],
  )

  return {
    title: String(seoSearchResults.items[0].fields.seoTitle),
    description: String(seoSearchResults.items[0].fields.description),
    keywords: seoSearchResults.items[0].fields.seoKeywords as string[],
    openGraph: {
      url: "https://www.grandbay-puntacana.com/shark-dive-punta-cana",
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
      canonical: "https://www.grandbay-puntacana.com/shark-dive-punta-cana/",
    },
  }
}

export default async function Home(props: any) {
  const pageLayout = await searchEntries("tours", {
    "fields.page": "Shark Dive Punta Cana",
  })
  return (
    <main>
      <BackgroundVideo
        video={(pageLayout.items[0] as any).fields.videoHero.fields.file.url}
        className={`-mt-20 md:-mt-40 [clip-path:polygon(0_0,100%_0,100%_35vh,0%_100%)] lg:[clip-path:polygon(0_0,100%_0,100%_55vh,0%_100%)]`}
      />
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:mx-auto max-w-6xl xl:h-[35rem]">
          <div className="lg:flex lg:flex-col lg:justify-start lg:mt-5 xl:min-h-full xl:justify-center xl:mt-0">
            <RichText context={pageLayout.items[0].fields.paragraph1} />
          </div>
          <div className="lg:w-[45rem] xl:mx-10 lg:min-h-full lg:flex lg:flex-col md:justify-start md:mt-2 lg:mt-7 2xl:mt-14">
            <TripOverview tour={pageLayout.items[0].fields} />
          </div>
          <div className="lg:flex lg:flex-col lg:justify-start lg:mt-5 xl:min-h-full xl:justify-center xl:mt-0">
            <RichText context={pageLayout.items[0].fields.paragraph2} />
          </div>
        </div>
        <SwiperCarousel
          photoList={(pageLayout.items[0] as any).fields.photoList}
          className={`mt-5 [clip-path:polygon(0_5vh,100%_0,100%_30vh,0%_100%)] md:[clip-path:polygon(0_5vh,100%_0,100%_40vh,0%_100%)] lg:[clip-path:polygon(0_5vh,100%_0,100%_50vh,0%_100%)] xl:[clip-path:polygon(0_5vh,100%_0,100%_60vh,0%_100%)]`}
        />
        <div className="flex flex-col justify-center items-center xl:my-10">
          <div className="flex flex-col max-w-6xl">
            <div className="lg:flex items-center xl:space-x-4">
              <RichText context={pageLayout.items[0].fields.paragraph3} />

              <RichText context={pageLayout.items[0].fields.paragraph4} />
            </div>
          </div>
        </div>
      </div>
      <BackgroundVideo
        video={
          (pageLayout.items[0] as any).fields.secondaryVideo.fields.file.url
        }
        className={`[clip-path:polygon(0_5vh,100%_0,100%_40vh,0%_100%)] lg:[clip-path:polygon(0_5vh,100%_0,100%_60vh,0%_100%)]`}
      />
    </main>
  )
}

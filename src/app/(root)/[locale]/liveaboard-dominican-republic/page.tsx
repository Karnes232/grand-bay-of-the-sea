import SwiperCarousel from "@/components/BackgroundCarouselComponents/SwiperCarousel"
import HeroComponent from "@/components/HeroComponent/HeroComponent"
import RichText from "@/components/RichTextComponents/RichText"
import TextComponent from "@/components/RichTextComponents/TextComponent"
import { searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"
import { getHreflangAlternates } from "@/utils/hreflang"
import Image from "next/image"
import Link from "next/link"

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string; locale: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params
  const seoSearchResults = await searchEntries("seo", {
    "fields.page": "Liveaboard",
    locale: locale || "en",
  })
  return {
    title: String(seoSearchResults.items[0].fields.title),
    description: String(seoSearchResults.items[0].fields.description),
    keywords: seoSearchResults.items[0].fields.keywords as string[],
    openGraph: {
      url:
        locale === "es"
          ? "https://www.grandbay-puntacana.com/es/liveaboard-dominican-republic"
          : "https://www.grandbay-puntacana.com/liveaboard-dominican-republic",
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
    alternates: getHreflangAlternates("liveaboard-dominican-republic", locale),
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const pageLayout = await searchEntries("pageLayout", {
    "fields.page": "Liveaboard",
    locale: locale,
  })

  return (
    <main>
      <HeroComponent
        heroImage={`https:${(pageLayout.items[0] as any).fields.heroImage.fields.file.url}`}
      />
      <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />
      <RichText context={pageLayout.items[0].fields.paragraph1} />
      <SwiperCarousel
        photoList={(pageLayout.items[0] as any).fields.photoList}
        className={`mt-5 [clip-path:polygon(0_5vh,100%_0,100%_30vh,0%_100%)] md:[clip-path:polygon(0_5vh,100%_0,100%_40vh,0%_100%)] lg:[clip-path:polygon(0_5vh,100%_0,100%_60vh,0%_100%)] xl:[clip-path:polygon(0_5vh,100%_0,100%_70vh,0%_100%)]`}
        height={`h-[35vh] md:h-[45vh] lg:h-[65vh] xl:h-[75vh]`}
      />
      <div className="flex flex-col lg:flex-row lg:mx-auto max-w-6xl mb-10">
        <div className="lg:flex lg:flex-col lg:justify-start xl:min-h-full xl:mt-0">
          <Link
            href="/liveaboard-dominican-republic/silverbank-expedition"
            className="no-underline flex flex-col justify-between items-center cursor-pointer text-center"
          >
            <TextComponent
              title="SILVERBANK EXPEDITION"
              heading="h2"
              className="my-5 2xl:mb-2 2xl:mt-10 text-2xl md:text-3xl text-center"
            />
            <div className="flex justify-center items-center">
              <Image
                src={`https:${(pageLayout.items[0] as any).fields.linkImage1.fields.file.url}`}
                alt={
                  (pageLayout.items[0] as any).fields.linkImage1.fields.title
                }
                width={300}
                height={300}
                className="object-cover rounded-full h-40 w-40 md:h-60 md:w-60 xl:h-72 xl:w-72"
                priority
                quality={75}
              />
            </div>
          </Link>
          <RichText context={pageLayout.items[0].fields.paragraph2} />
        </div>
        <div className="lg:flex lg:flex-col lg:justify-start xl:min-h-full xl:mt-0">
          <Link
            href="/liveaboard-dominican-republic/whale-watching-adventure"
            className="no-underline flex flex-col justify-between items-center cursor-pointer text-center"
          >
            <TextComponent
              title="WHALE WATCHING ADVENTURE"
              heading="h2"
              className="my-5 2xl:mb-2 2xl:mt-10 text-2xl md:text-3xl text-center"
            />
            <div className="flex justify-center items-center">
              <Image
                src={`https:${(pageLayout.items[0] as any).fields.linkImage2.fields.file.url}`}
                alt={
                  (pageLayout.items[0] as any).fields.linkImage2.fields.title
                }
                width={300}
                height={300}
                className="object-cover rounded-full h-40 w-40 md:h-60 md:w-60 xl:h-72 xl:w-72"
                priority
                quality={75}
              />
            </div>
          </Link>
          <RichText context={pageLayout.items[0].fields.paragraph3} />
        </div>
      </div>
      {/* <BackgroundVideo
        className="xl:min-h-[80vh] [clip-path:polygon(0%_5vh,100%_0%,100%_35vh,0%_100%)] lg:[clip-path:polygon(0%_5vh,100%_0%,100%_55vh,0%_100%)] xl:[clip-path:polygon(0%_5vh,100%_0%,100%_75vh,0%_100%)]"
        video={(pageLayout.items[0] as any).fields.videoHero.fields.file.url}
      />
      <TripCards
        image1={(pageLayout.items[0] as any).fields.linkImage1.fields}
        image2={(pageLayout.items[0] as any).fields.linkImage2.fields}
        image3={(pageLayout.items[0] as any).fields.linkImage3.fields}
      /> */}
    </main>
  )
}

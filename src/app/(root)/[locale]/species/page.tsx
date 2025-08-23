import BackgroundVideo from "@/components/BackgroundVideoComponent/BackgroundVideo"
import DiveSites from "@/components/DiveSitesComponents/DiveSites"
import Fishes from "@/components/DiveSitesComponents/Fishes"
import HeroComponent from "@/components/HeroComponent/HeroComponent"
import RichText from "@/components/RichTextComponents/RichText"
import LocalDivesOverview from "@/components/TourOverviews/LocalDivesOverview"
import { getAllEntries, searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"
import { getHreflangAlternates } from "@/utils/hreflang"

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string; locale: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params
  const seoSearchResults = await searchEntries("seo", {
    "fields.page": "Species",
    locale: locale || "en",
  })
  return {
    title: String(seoSearchResults.items[0].fields.title),
    description: String(seoSearchResults.items[0].fields.description),
    keywords: seoSearchResults.items[0].fields.keywords as string[],
    openGraph: {
      url:
        locale === "es"
          ? "https://www.grandbay-puntacana.com/es/species"
          : "https://www.grandbay-puntacana.com/species",
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
    alternates: getHreflangAlternates("species", locale),
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const pageLayout = await searchEntries("pageLayout", {
    "fields.page": "Species",
    locale: locale,
  })

  return (
    <main className="bg-gradient-to-b from-sky-50 via-slate-100 to-cyan-50">
      <HeroComponent
        heroImage={`https:${(pageLayout.items[0] as any).fields.heroImage.fields.file.url}`}
      />
      <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />

      <div className="max-w-6xl my-5 xl:my-14 flex flex-col justify-center items-center lg:flex-row mx-5 lg:mx-auto">
        <RichText context={pageLayout.items[0].fields.paragraph1} />
      </div>
      <Fishes locale={locale} />
    </main>
  )
}

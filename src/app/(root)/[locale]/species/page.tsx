import BackgroundVideo from "@/components/BackgroundVideoComponent/BackgroundVideo"
import DiveSites from "@/components/DiveSitesComponents/DiveSites"
import Fishes from "@/components/DiveSitesComponents/Fishes"
import HeroComponent from "@/components/HeroComponent/HeroComponent"
import RichText from "@/components/RichTextComponents/RichText"
import LocalDivesOverview from "@/components/TourOverviews/LocalDivesOverview"
import { getAllEntries, searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"
import { getHreflangAlternates } from "@/utils/hreflang"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getSpeciesPageContent } from "@/sanity/queries/Page-Species/SpeciesPageContent"
import BlockContent from "@/components/BlockContent/BlockContent"

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: "en" | "es"
  }>
}) {
  const { locale } = await params
  const pageSeo = await getPageSeo("Species")

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.grandbay-puntacana.com/species"
  } else {
    canonicalUrl = "https://www.grandbay-puntacana.com/es/species"
  }

  return {
    title: pageSeo.seo.meta[locale].title,
    description: pageSeo.seo.meta[locale].description,
    keywords: pageSeo.seo.meta[locale].keywords.join(", "),
    url: canonicalUrl,
    openGraph: {
      title: pageSeo.seo.openGraph[locale].title,
      description: pageSeo.seo.openGraph[locale].description,
      images: pageSeo.seo.openGraph.image.url,
      type: "website",
      url: canonicalUrl,
    },
    robots: {
      index: !pageSeo.seo.noIndex,
      follow: !pageSeo.seo.noFollow,
    },
    ...(canonicalUrl && { canonical: canonicalUrl }),
    alternates: getHreflangAlternates("species", locale),
    // other: {
    //   "Cache-Control":
    //     "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
    // },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const [structuredData, speciesPageContent] = await Promise.all([
    getStructuredData("Species"),
    getSpeciesPageContent(),
  ])
  // const pageLayout = await searchEntries("pageLayout", {
  //   "fields.page": "Species",
  //   locale: locale,
  // })

  return (
    <main className="bg-gradient-to-b from-sky-50 via-slate-100 to-cyan-50">
      {structuredData?.seo?.structuredData[locale] && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: structuredData.seo.structuredData[locale],
          }}
        />
      )}
      <HeroComponent
        heroImage={speciesPageContent[0].heroImage.asset.url}
        alt={speciesPageContent[0].heroImage.alt}
      />
      <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />

      <div className="max-w-6xl my-5 xl:my-14 flex flex-col justify-center items-center lg:flex-row mx-5 lg:mx-auto">
        {/* <RichText context={pageLayout.items[0].fields.paragraph1} /> */}
        <BlockContent content={speciesPageContent[0].content} locale={locale} />
      </div>
      <Fishes locale={locale} />
    </main>
  )
}

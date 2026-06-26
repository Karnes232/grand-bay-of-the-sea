import CloudinaryBackgroundVideo from "@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"
import DiveSites from "@/components/DiveSitesComponents/DiveSites"
// Change import from HeroComponent to HeroStaticComponent
import HeroStaticComponent from "@/components/HeroComponent/HeroStaticComponent" // Assuming HeroStaticComponent is in the same path

import LocalDivesOverview from "@/components/TourOverviews/LocalDivesOverview"

import { getHreflangAlternates } from "@/utils/hreflang"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getSharkDivePrice, getSites } from "@/sanity/queries/Sites/sites"
import BlockContent from "@/components/BlockContent/BlockContent"
import Faqs from "@/components/FaqsComponent/Faqs"
import JsonLd from "@/components/StructuredData/JsonLd"

export const revalidate = 3600 // ISR — regenerate hourly (Netlify-compatible)

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: "en" | "es"
  }>
}) {
  const { locale } = await params
  const pageSeo = await getPageSeo("Sites")

  if (!pageSeo) {
    return {}
  }

  const alternates = getHreflangAlternates("sites", locale)

  return {
    title: pageSeo.seo.meta[locale].title,
    description: pageSeo.seo.meta[locale].description,
    keywords: pageSeo.seo.meta[locale].keywords.join(", "),
    openGraph: {
      title: pageSeo.seo.openGraph[locale].title,
      description: pageSeo.seo.openGraph[locale].description,
      images: pageSeo.seo.openGraph.image.url,
      type: "website",
      url: alternates.canonical,
    },
    robots: {
      index: !pageSeo.seo.noIndex,
      follow: !pageSeo.seo.noFollow,
    },
    alternates,
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
  const [structuredData, sitesLayout, sharkDivePrice] = await Promise.all([
    getStructuredData("Sites"),
    getSites(),
    getSharkDivePrice(),
  ])

  const heroImageUrl = sitesLayout.heroImage.asset.url
  // Blur placeholder from Sanity's built-in `lqip` (no network fetch → page
  // stays ISR-cacheable). A bare fetch() here would force dynamic `no-store`.
  const heroImageBlurDataURL = sitesLayout.heroImage.asset.metadata.lqip

  return (
    <main id="main">
      <JsonLd raw={structuredData?.seo?.structuredData[locale]} />
      <HeroStaticComponent // Use HeroStaticComponent
        heroImage={heroImageUrl}
        blurDataURL={heroImageBlurDataURL}
        alt={
          sitesLayout.heroImage.alt || "Dive sites and packages in Punta Cana"
        }
        title={sitesLayout.heroTitle?.[locale]}
        subtitle={sitesLayout.heroSubtitle?.[locale]}
        cta={
          sitesLayout.heroCta?.label?.[locale] && sitesLayout.heroCta?.link
            ? {
                label: sitesLayout.heroCta.label[locale],
                href: sitesLayout.heroCta.link,
              }
            : undefined
        }
      />
      <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />

      <div className="max-w-6xl my-5 xl:my-14 flex flex-col justify-center items-center lg:flex-row mx-5 lg:mx-auto">
        <BlockContent
          content={sitesLayout.paragraph1}
          locale={locale}
          demoteH1
        />
        <div className="lg:w-[45rem]">
          <LocalDivesOverview
            info={sitesLayout}
            sharkPrice={sharkDivePrice.price as number}
            locale={locale}
          />
        </div>
      </div>
      <DiveSites locale={locale} />
      {sitesLayout.faqs?.length ? (
        <div className="mb-10">
          <Faqs
            faqs={sitesLayout.faqs}
            structuredData={sitesLayout.structuredData ?? { en: "", es: "" }}
            locale={locale}
          />
        </div>
      ) : null}
      <CloudinaryBackgroundVideo
        videoId={"greyshark_aowggg"}
        className={`[clip-path:polygon(0_5vh,100%_0,100%_40vh,0%_100%)] lg:[clip-path:polygon(0_5vh,100%_0,100%_60vh,0%_100%)]`}
      />
    </main>
  )
}

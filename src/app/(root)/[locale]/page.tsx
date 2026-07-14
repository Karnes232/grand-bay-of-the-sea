import dynamicImport from "next/dynamic"

import SelectionComponent from "@/components/SelectionComponents/SelectionComponent"
import { getHreflangAlternates } from "@/utils/hreflang"

import HeroStaticComponent from "@/components/HeroComponent/HeroStaticComponent"
import JsonLd from "@/components/StructuredData/JsonLd"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getSectionLinks } from "@/sanity/queries/Scuba-Diving-Punta-Cana/SectionLinks"
import { getHomePage } from "@/sanity/queries/HomePage/HomePage"
import BlockContent from "@/components/BlockContent/BlockContent"
import { getFaqs } from "@/sanity/queries/Faqs/Faqs"
import Faqs from "@/components/FaqsComponent/Faqs"
import { getTranslations } from "next-intl/server"
import { BUSINESS } from "@/lib/business"

const CloudinaryBackgroundVideo = dynamicImport(
  () =>
    import("@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"),
)
const DivingOrganizations = dynamicImport(
  () => import("@/components/DivingOrganizations/DivingOrganizations"),
)
const BackgroundImage = dynamicImport(
  () => import("@/components/BackgroundImageComponent/BackgroundImage"),
)
const GoogleMaps = dynamicImport(
  () => import("@/components/GoogleMapsComponent/GoogleMaps"),
)

// OPTION 1: Remove force-static to allow dynamic rendering for language switching
// export const dynamic = "force-static"

// OPTION 2: Use revalidate for Incremental Static Regeneration (ISR)
export const revalidate = 604800 // ISR 7 days — content refreshes on Netlify redeploy

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: "en" | "es"
  }>
}) {
  const { locale } = await params
  const pageSeo = await getPageSeo("Index")

  if (!pageSeo) {
    return {}
  }

  const alternates = getHreflangAlternates("", locale)

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
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params

  const [structuredData, sectionLinks, homePage, faqs] = await Promise.all([
    getStructuredData("Index"),
    getSectionLinks(),
    getHomePage(),
    getFaqs("Home"),
  ])

  // let pageLayout
  // try {
  //   const pageLayoutResult = await searchEntries("pageLayout", {
  //     "fields.page": "Index",
  //     locale: locale || "en",
  //   })
  //   pageLayout = pageLayoutResult.items[0]
  // } catch (error) {
  //   console.error("Failed to fetch page layout:", error)
  //   return (
  //     <main id="main">
  //       <p>Unable to load content at this time. Please try again later.</p>
  //     </main>
  //   )
  // }

  if (!homePage) {
    return (
      <main id="main">
        <p>Content not found for this page. Please check Contentful.</p>
      </main>
    )
  }

  /**
   * Synchronous: no network fetch. The blur placeholder comes from Sanity's
   * built-in `metadata.lqip` (projected in the GROQ query for the hero image),
   * which keeps the route statically renderable / ISR-cacheable. A bare
   * `fetch()` here would opt the whole page into dynamic `no-store` rendering.
   */
  const getFullImageDetails = (field: any) => {
    if (!field?.asset?.url) return {} as any
    return {
      url: field.asset.url,
      width: field.asset.metadata?.dimensions?.width,
      height: field.asset.metadata?.dimensions?.height,
      alt: field.alt || "",
      base64: field.asset.metadata?.lqip || "",
    }
  }

  const heroImageDetails = getFullImageDetails(homePage.heroImage)
  const secondaryHeroImageDetails = getFullImageDetails(
    homePage.secondaryHeroImage,
  )
  const tertiaryHeroImageDetails = getFullImageDetails(
    homePage.tertiaryHeroImage,
  )

  const tTrust = await getTranslations("TrustLine")
  const trustLine = tTrust("line", {
    rating: BUSINESS.rating.value,
    count: BUSINESS.rating.count,
  })

  return (
    <>
      <JsonLd raw={structuredData?.seo?.structuredData[locale]} />
      <main id="main">
        {heroImageDetails.url && (
          <HeroStaticComponent
            heroImage={heroImageDetails.url}
            blurDataURL={heroImageDetails.base64}
            alt={heroImageDetails.alt || "Scuba diving in Punta Cana"}
            title={homePage.heroTitle?.[locale]}
            subtitle={homePage.heroSubtitle?.[locale]}
            trustLine={trustLine}
            cta={
              homePage.heroCta?.label?.[locale] && homePage.heroCta?.link
                ? {
                    label: homePage.heroCta.label[locale],
                    href: homePage.heroCta.link,
                  }
                : undefined
            }
          />
        )}
        <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />
        <BlockContent content={homePage.paragraph1} locale={locale} demoteH1 />

        <SelectionComponent
          sectionLinks={sectionLinks}
          locale={locale}
          secondaryHeroImage={secondaryHeroImageDetails.url || ""}
        />
        <BlockContent content={homePage.paragraph2} locale={locale} />
        <CloudinaryBackgroundVideo
          className="xl:min-h-[80vh] [clip-path:polygon(0%_5vh,100%_0%,100%_35vh,0%_100%)] lg:[clip-path:polygon(0%_5vh,100%_0%,100%_55vh,0%_100%)] xl:[clip-path:polygon(0%_5vh,100%_0%,100%_75vh,0%_100%)]"
          videoId={"coral-cut_lyykuw"}
        />
        <DivingOrganizations />
        <BlockContent content={homePage.paragraph3} locale={locale} />
        <Faqs
          faqs={faqs.faqs}
          structuredData={faqs.structuredData}
          locale={locale}
        />
        {tertiaryHeroImageDetails.url && (
          <BackgroundImage image={tertiaryHeroImageDetails.url} />
        )}
        <GoogleMaps />
      </main>
    </>
  )
}

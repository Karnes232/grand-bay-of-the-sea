import dynamicImport from "next/dynamic"

import { getHreflangAlternates } from "@/utils/hreflang"

import JsonLd from "@/components/StructuredData/JsonLd"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getSectionLinks } from "@/sanity/queries/Scuba-Diving-Punta-Cana/SectionLinks"
import { getHomePage } from "@/sanity/queries/HomePage/HomePage"
import { getFaqs } from "@/sanity/queries/Faqs/Faqs"
import { getTranslations } from "next-intl/server"
import { BUSINESS } from "@/lib/business"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"

import HomeHero from "@/components/home/HomeHero"
import StatsBar from "@/components/home/StatsBar"
import HomeIntro from "@/components/home/HomeIntro"
import FeatureCards from "@/components/home/FeatureCards"
import WhyUnique from "@/components/home/WhyUnique"
import SharkBanner from "@/components/home/SharkBanner"
import CourseHighlights from "@/components/home/CourseHighlights"
import ImageBand from "@/components/home/ImageBand"
import BookingSection from "@/components/home/BookingSection"
import FaqAccordion from "@/components/home/FaqAccordion"

const GoogleMaps = dynamicImport(
  () => import("@/components/GoogleMapsComponent/GoogleMaps"),
)

// ISR (7 days) — not force-static, so language switching works on Netlify.
export const revalidate = 604800

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

  const [structuredData, sectionLinks, homePage, faqs, tHome, tTrust] =
    await Promise.all([
      getStructuredData("Index"),
      getSectionLinks(),
      getHomePage(),
      getFaqs("Home"),
      getTranslations("Home"),
      getTranslations("TrustLine"),
    ])

  if (!homePage) {
    return (
      <main id="main">
        <p>Content not found for this page. Please check Sanity.</p>
      </main>
    )
  }

  /**
   * Synchronous: no network fetch. The blur placeholder comes from Sanity's
   * built-in `metadata.lqip` (projected in the GROQ query for the hero image),
   * which keeps the route statically renderable / ISR-cacheable.
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

  // Crop + hotspot-aware sources (framing follows Studio). Per-slot target
  // aspect; object-position keeps the hotspot in view when the slot re-crops.
  const heroSrc = sanityCropUrl(homePage.heroImage, 2000, 1333)
  const heroPosition = hotspotPosition(homePage.heroImage)
  const sharkSrc = sanityCropUrl(homePage.secondaryHeroImage, 2000, 900)
  const sharkPosition = hotspotPosition(homePage.secondaryHeroImage)
  const bandSrc = sanityCropUrl(homePage.tertiaryHeroImage, 2000, 760)
  const bandPosition = hotspotPosition(homePage.tertiaryHeroImage)

  const trustLine = tTrust("line", {
    rating: BUSINESS.rating.value,
    count: BUSINESS.rating.count,
  })

  // Secondary hero CTA: prefer the Sanity heroCta, else fall back to courses.
  const secondaryCta =
    homePage.heroCta?.label?.[locale] && homePage.heroCta?.link
      ? { label: homePage.heroCta.label[locale], href: homePage.heroCta.link }
      : { label: tHome("hero.exploreCourses"), href: "/courses" }

  return (
    <>
      <JsonLd raw={structuredData?.seo?.structuredData[locale]} />
      <main id="main">
        {heroImageDetails.url && (
          <HomeHero
            heroImage={heroSrc || heroImageDetails.url}
            objectPosition={heroPosition}
            blurDataURL={heroImageDetails.base64}
            alt={heroImageDetails.alt || "Scuba diving in Punta Cana"}
            title={homePage.heroTitle?.[locale]}
            subtitle={homePage.heroSubtitle?.[locale]}
            trustLine={trustLine}
            bookLabel={tHome("hero.book")}
            secondaryCta={secondaryCta}
          />
        )}

        <StatsBar stats={homePage.stats} locale={locale} />

        <HomeIntro content={homePage.paragraph1} locale={locale} />

        <FeatureCards
          sectionLinks={sectionLinks}
          locale={locale}
          ctaLabel={tHome("cards.cta")}
        />

        <WhyUnique
          heading={homePage.whyUniqueHeading?.[locale]}
          content={homePage.paragraph2}
          locale={locale}
        />

        {secondaryHeroImageDetails.url && (
          <SharkBanner
            banner={homePage.sharkBanner}
            image={sharkSrc || secondaryHeroImageDetails.url}
            objectPosition={sharkPosition}
            alt={secondaryHeroImageDetails.alt || "Shark diving in Punta Cana"}
            locale={locale}
          />
        )}

        <CourseHighlights
          heading={tHome("courses.heading")}
          courses={homePage.courseHighlights}
          paragraph3={homePage.paragraph3}
          locale={locale}
        />

        {tertiaryHeroImageDetails.url && (
          <ImageBand
            image={bandSrc || tertiaryHeroImageDetails.url}
            objectPosition={bandPosition}
            alt={tertiaryHeroImageDetails.alt || "Diving in Punta Cana"}
          />
        )}

        <BookingSection
          booking={homePage.bookingSection}
          benefits={homePage.bookingBenefits}
          locale={locale}
        />

        <FaqAccordion
          faqs={faqs.faqs}
          structuredData={faqs.structuredData}
          locale={locale}
          heading={tHome("faq.heading")}
        />

        <GoogleMaps variant="flat" />
      </main>
    </>
  )
}

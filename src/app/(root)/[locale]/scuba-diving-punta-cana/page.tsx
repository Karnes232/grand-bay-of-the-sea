import dynamicImport from "next/dynamic"

import { getHreflangAlternates } from "@/utils/hreflang"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getScubaDivingPuntaCana } from "@/sanity/queries/Scuba-Diving-Punta-Cana/ScubaDivingPuntaCana"
import { getSectionLinks } from "@/sanity/queries/Scuba-Diving-Punta-Cana/SectionLinks"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"
import { getTranslations } from "next-intl/server"
import { BUSINESS } from "@/lib/business"

import JsonLd from "@/components/StructuredData/JsonLd"
import HomeHero from "@/components/home/HomeHero"
import HomeIntro from "@/components/home/HomeIntro"
import FeatureCards from "@/components/home/FeatureCards"
import WhyUnique from "@/components/home/WhyUnique"
import ImageBand from "@/components/home/ImageBand"
import FaqAccordion from "@/components/home/FaqAccordion"
import DivingOrganizations from "@/components/DivingOrganizations/DivingOrganizations"

const GoogleMaps = dynamicImport(
  () => import("@/components/GoogleMapsComponent/GoogleMaps"),
)

// ISR (7 days) — matches the home page; keeps language switching working on Netlify.
export const revalidate = 604800

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: "en" | "es"
  }>
}) {
  const { locale } = await params
  const pageSeo = await getPageSeo("Scuba Diving Punta Cana")

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
      index: false,
      follow: !pageSeo.seo.noFollow,
    },
    alternates,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const [structuredData, scuba, sectionLinks, tHome, tTrust, tCourses] =
    await Promise.all([
      getStructuredData("Scuba Diving Punta Cana"),
      getScubaDivingPuntaCana(),
      getSectionLinks(),
      getTranslations("Home"),
      getTranslations("TrustLine"),
      getTranslations("Courses"),
    ])

  const heroImg = scuba.heroImage
  const secondaryImg = scuba.secondaryHeroImage
  const tertiaryImg = scuba.tertiaryHeroImage

  // Lift paragraph1's leading H1 into the hero (so the hero has a title without
  // inventing copy); render the rest of paragraph1 as the intro. Falls back to
  // an image-only hero + the full paragraph if the first block isn't an H1.
  const p1 = scuba.paragraph1
  const firstIsH1 = p1?.[locale]?.[0]?.style === "h1"
  const heroTitle = firstIsH1
    ? (p1[locale][0]?.children?.[0]?.text as string | undefined)
    : undefined
  const introContent = firstIsH1
    ? { en: p1.en.slice(1), es: p1.es.slice(1) }
    : p1

  const trustLine = tTrust("line", {
    rating: BUSINESS.rating.value,
    count: BUSINESS.rating.count,
  })

  return (
    <>
      <JsonLd raw={structuredData?.seo?.structuredData[locale]} />
      <main id="main">
        <HomeHero
          heroImage={sanityCropUrl(heroImg, 2000, 1333) || heroImg.asset.url}
          objectPosition={hotspotPosition(heroImg)}
          blurDataURL={heroImg.asset.metadata.lqip}
          alt={heroImg.alt || "Scuba diving in Punta Cana"}
          title={heroTitle}
          trustLine={trustLine}
          bookLabel={tHome("hero.book")}
          secondaryCta={{
            label: tHome("hero.exploreCourses"),
            href: "/courses",
          }}
        />

        <HomeIntro content={introContent} locale={locale} />

        <FeatureCards
          sectionLinks={sectionLinks}
          locale={locale}
          ctaLabel={tHome("cards.cta")}
        />

        <ImageBand
          image={
            sanityCropUrl(secondaryImg, 2000, 900) || secondaryImg.asset.url
          }
          objectPosition={hotspotPosition(secondaryImg)}
          alt={secondaryImg.alt || "Scuba diving in Punta Cana"}
        />

        {/* paragraph2 + the coral-cut video are rendered together by WhyUnique */}
        <WhyUnique content={scuba.paragraph2} locale={locale} />

        <DivingOrganizations />

        <HomeIntro content={scuba.paragraph3} locale={locale} />

        {scuba.faqs?.length ? (
          <FaqAccordion
            faqs={scuba.faqs}
            structuredData={{ en: "", es: "" }}
            locale={locale}
            heading={tCourses("faqHeading")}
          />
        ) : null}

        <ImageBand
          image={sanityCropUrl(tertiaryImg, 2000, 760) || tertiaryImg.asset.url}
          objectPosition={hotspotPosition(tertiaryImg)}
          alt={tertiaryImg.alt || "Diving in Punta Cana"}
        />
<div className="-mt-8">
        <GoogleMaps variant="flat" /></div>
      </main>
    </>
  )
}

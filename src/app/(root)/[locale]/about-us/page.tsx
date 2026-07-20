import JsonLd from "@/components/StructuredData/JsonLd"
import CoursesHero from "@/components/courses/CoursesHero"
import StatsBar from "@/components/home/StatsBar"
import SharkBanner from "@/components/home/SharkBanner"
import StorySplit from "@/components/about/StorySplit"
import TeamGrid from "@/components/about/TeamGrid"
import ValuesGrid from "@/components/about/ValuesGrid"
import { getHreflangAlternates } from "@/utils/hreflang"
import { breadcrumbJsonLd } from "@/utils/breadcrumb"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getAboutUs } from "@/sanity/queries/AboutUs/AboutUs"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"

// ISR 7 days — not force-static, so language switching works on Netlify.
export const revalidate = 604800

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: "en" | "es"
  }>
}) {
  const { locale } = await params
  const pageSeo = await getPageSeo("About Us")

  if (!pageSeo) {
    // Never ship a page with a blank <head>: fail the build (or the single
    // ISR regeneration) loudly instead of silently caching empty metadata.
    throw new Error(
      "[metadata] SEO data came back empty for /about-us. " +
        "Check the Sanity pageSeo 'About Us' document.",
    )
  }

  const alternates = getHreflangAlternates("about-us", locale)

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

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const [structuredData, about] = await Promise.all([
    getStructuredData("About Us"),
    getAboutUs(),
  ])

  const heroImg = about.heroImage
  const heroSrc = sanityCropUrl(heroImg, 2000, 1200) || heroImg?.asset?.url || ""
  const heroPosition = hotspotPosition(heroImg)

  const ctaImg = about.ctaImage
  const ctaSrc = sanityCropUrl(ctaImg, 2400, 1200) || ctaImg?.asset?.url || ""

  return (
    <main id="main">
      <JsonLd raw={structuredData?.seo?.structuredData[locale]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd(
            [
              { name: "Home", path: "" },
              { name: "About Us", path: "/about-us" },
            ],
            locale,
          ),
        }}
      />

      {heroSrc && (
        <CoursesHero
          heroImage={heroSrc}
          objectPosition={heroPosition}
          blurDataURL={heroImg?.asset?.metadata?.lqip || ""}
          alt={heroImg?.alt || "The Grand Bay of the Sea dive team"}
          title={about.heroTitle?.[locale] ?? ""}
          subtitle={about.heroSubtitle?.[locale]}
          trustLine={about.heroEyebrow?.[locale]}
        />
      )}

      <StatsBar stats={about.stats} locale={locale} />

      <StorySplit
        eyebrow={about.storyEyebrow}
        heading={about.storyHeading}
        body={about.storyBody}
        image={about.storyImage}
        locale={locale}
      />

      <TeamGrid
        eyebrow={about.teamEyebrow}
        heading={about.teamHeading}
        intro={about.teamIntro}
        members={about.teamMembers}
        locale={locale}
      />

      <ValuesGrid
        eyebrow={about.valuesEyebrow}
        heading={about.valuesHeading}
        values={about.values}
        locale={locale}
      />

      {ctaSrc && (
        <div className="mt-16">
          <SharkBanner
            banner={{
              heading: about.ctaHeading,
              body: about.ctaBody,
              ctaLabel: about.ctaLabel,
              ctaLink: "/contact",
            }}
            image={ctaSrc}
            objectPosition={hotspotPosition(ctaImg)}
            alt={ctaImg?.alt || "Diving with Grand Bay of the Sea"}
            locale={locale}
            secondCta={{ label: about.cta2Label, href: "/courses" }}
          />
        </div>
      )}
    </main>
  )
}

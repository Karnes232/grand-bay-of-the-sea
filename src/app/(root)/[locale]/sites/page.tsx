import dynamicImport from "next/dynamic"

import { getHreflangAlternates } from "@/utils/hreflang"
import { breadcrumbJsonLd } from "@/utils/breadcrumb"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getSharkDivePrice, getSites } from "@/sanity/queries/Sites/sites"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"
import { getTranslations } from "next-intl/server"

import BlockContent from "@/components/BlockContent/BlockContent"
import JsonLd from "@/components/StructuredData/JsonLd"
import FaqAccordion from "@/components/home/FaqAccordion"
import CoursesHero from "@/components/courses/CoursesHero"
import DiveSites from "@/components/DiveSitesComponents/DiveSites"
import LocalDivesOverview from "@/components/TourOverviews/LocalDivesOverview"

const CloudinaryBackgroundVideo = dynamicImport(
  () =>
    import("@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"),
)

export const revalidate = 604800 // ISR 7 days — content refreshes on Netlify redeploy

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
    // Never ship a page with a blank <head>: fail the build (or the single
    // ISR regeneration) loudly instead of silently caching empty metadata.
    throw new Error(
      "[metadata] SEO data came back empty for /sites. " +
        "Check the Sanity document's seo fields and the fetch above.",
    )
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
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const [structuredData, sitesLayout, sharkDivePrice, tCourses] =
    await Promise.all([
      getStructuredData("Sites"),
      getSites(),
      getSharkDivePrice(),
      getTranslations("Courses"),
    ])

  const heroImg = sitesLayout.heroImage
  const heroSrc = sanityCropUrl(heroImg, 2000, 1200) || heroImg?.asset?.url || ""
  const heroPosition = hotspotPosition(heroImg)

  const heroCta =
    sitesLayout.heroCta?.label?.[locale] && sitesLayout.heroCta?.link
      ? {
          label: sitesLayout.heroCta.label[locale],
          href: sitesLayout.heroCta.link,
        }
      : undefined

  return (
    <main id="main">
      <JsonLd raw={structuredData?.seo?.structuredData[locale]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd(
            [
              { name: "Home", path: "" },
              { name: "Dive Sites", path: "/sites" },
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
          alt={
            heroImg?.alt || "Dive sites and packages in Punta Cana"
          }
          title={sitesLayout.heroTitle?.[locale]}
          subtitle={sitesLayout.heroSubtitle?.[locale]}
          trustLine={sitesLayout.heroTrustLine?.[locale]?.replace(
            "{price}",
            String(sitesLayout.twoTankDive),
          )}
          cta={heroCta}
        />
      )}

      {/* Intro — "What can you see while diving in Punta Cana?" */}
      <section className="mx-auto max-w-[1280px] px-6 pb-2 pt-[88px]">
        <BlockContent
          content={sitesLayout.paragraph1}
          locale={locale}
          variant="prose"
          demoteH1
          wrapperClassName="md:columns-2 md:gap-14 [&_p]:break-inside-avoid [&_h2]:[column-span:all] [&_h2]:mt-0"
        />
      </section>

      {/* Dive packages + booking (PayPal / Contact / PADI) */}
      <section
        id="packages"
        className="mx-auto max-w-[1280px] scroll-mt-20 px-6 pb-2 pt-14"
      >
        <LocalDivesOverview
          info={sitesLayout}
          sharkPrice={sharkDivePrice.price as number}
          locale={locale}
        />
      </section>

      {/* Dive sites grid */}
      <DiveSites
        locale={locale}
        heading={sitesLayout.gridHeading?.[locale]}
        intro={sitesLayout.gridIntro?.[locale]}
      />

      {/* Grey-shark video band */}
      <section className="mx-auto max-w-[1280px] px-6 pb-2 pt-10">
        <div className="relative aspect-[21/9] overflow-hidden rounded-[24px]">
          <CloudinaryBackgroundVideo
            className="!absolute inset-0 !min-h-full"
            videoId="greyshark_aowggg"
          />
        </div>
      </section>

      {sitesLayout.faqs?.length ? (
        <FaqAccordion
          faqs={sitesLayout.faqs}
          structuredData={sitesLayout.structuredData ?? { en: "", es: "" }}
          locale={locale}
          heading={tCourses("faqHeading")}
        />
      ) : null}
    </main>
  )
}

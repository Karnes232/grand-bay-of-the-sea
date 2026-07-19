import { getTranslations } from "next-intl/server"

import JsonLd from "@/components/StructuredData/JsonLd"
import CoursesHero from "@/components/courses/CoursesHero"
import { getHreflangAlternates } from "@/utils/hreflang"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getThankYou } from "@/sanity/queries/ThankYou/ThankYou"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"
import { BUSINESS } from "@/lib/business"

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
  const pageSeo = await getPageSeo("Thank You")

  if (!pageSeo) {
    // Never ship a page with a blank <head>: fail the build (or the single
    // ISR regeneration) loudly instead of silently caching empty metadata.
    throw new Error(
      "[metadata] SEO data came back empty for /thankyou. " +
        "Check the Sanity document's seo fields and the fetch above.",
    )
  }

  const alternates = getHreflangAlternates("thankyou", locale)

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
  searchParams,
}: {
  params: Promise<{ locale: "en" | "es" }>
  searchParams: Promise<{ name?: string }>
}) {
  const { locale } = await params
  const [{ name }, structuredData, thankYou, t] = await Promise.all([
    searchParams,
    getStructuredData("Thank You"),
    getThankYou(),
    getTranslations("ThankYou"),
  ])

  const heroImg = thankYou.heroImage
  const heroSrc = sanityCropUrl(heroImg, 2000, 1200) || heroImg?.asset?.url || ""
  const heroPosition = hotspotPosition(heroImg)

  return (
    <main id="main">
      <JsonLd raw={structuredData?.seo?.structuredData[locale]} />

      {heroSrc && (
        <CoursesHero
          heroImage={heroSrc}
          objectPosition={heroPosition}
          blurDataURL={heroImg?.asset?.metadata?.lqip || ""}
          alt={heroImg?.alt || "Grand Bay of the Sea dive boat"}
          title={thankYou.heroTitle?.[locale] ?? ""}
          subtitle={thankYou.heroSubtitle?.[locale]}
          trustLine={thankYou.heroEyebrow?.[locale]}
        />
      )}

      <section className="mx-auto max-w-[1280px] px-6 pb-24 pt-14">
        <div className="mx-auto max-w-[640px] rounded-[20px] border border-line bg-card p-7 text-center md:p-10">
          <h2 className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-bold tracking-[-0.02em] text-fg">
            {t("thankYou")}
            {name ? ` ${name}` : ""}, {t("ourTeamWillReachOut")}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            {t("pleaseFeelFreeTo")}{" "}
            <a
              href={`mailto:${BUSINESS.email}`}
              className="border-b-[1.5px] border-moss/30 font-semibold text-moss"
            >
              {t("contactUs")}
            </a>{" "}
            {t("withAnyQuestionsOrConcerns")}
          </p>
        </div>
      </section>
    </main>
  )
}

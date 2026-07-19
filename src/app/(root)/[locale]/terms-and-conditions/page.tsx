import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"

import JsonLd from "@/components/StructuredData/JsonLd"
import BlockContent from "@/components/BlockContent/BlockContent"
import CoursesHero from "@/components/courses/CoursesHero"
import { getHreflangAlternates } from "@/utils/hreflang"
import { breadcrumbJsonLd } from "@/utils/breadcrumb"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getCancellationPolicy } from "@/sanity/queries/Cancellation-Policy/CancellationPolicy"
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
  const pageSeo = await getPageSeo("Cancellation Policy")

  if (!pageSeo) {
    // Never ship a page with a blank <head>: fail the build (or the single
    // ISR regeneration) loudly instead of silently caching empty metadata.
    throw new Error(
      "[metadata] SEO data came back empty for /terms-and-conditions. " +
        "Check the Sanity document's seo fields and the fetch above.",
    )
  }

  const alternates = getHreflangAlternates("terms-and-conditions", locale)

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
  const [structuredData, cancellationPolicy, tNav] = await Promise.all([
    getStructuredData("Cancellation Policy"),
    getCancellationPolicy(),
    getTranslations("Navbar"),
  ])

  const heroImg = cancellationPolicy.heroImage
  const heroSrc = sanityCropUrl(heroImg, 2000, 1200) || heroImg?.asset?.url || ""
  const heroPosition = hotspotPosition(heroImg)

  // The policy's own leading H1 becomes the hero title (so it isn't shown
  // twice); the rest of the blocks render in the article below. Falls back to
  // rendering the full content untouched if the first block isn't an H1.
  const content = cancellationPolicy.content
  const firstIsH1 = content?.[locale]?.[0]?.style === "h1"
  const policyTitle = firstIsH1
    ? (content[locale][0]?.children?.[0]?.text as string | undefined)
    : undefined
  const bodyContent = firstIsH1
    ? { en: content.en.slice(1), es: content.es.slice(1) }
    : content

  return (
    <main id="main">
      <JsonLd raw={structuredData?.seo?.structuredData[locale]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd(
            [
              { name: "Home", path: "" },
              { name: "Cancellation Policy", path: "/terms-and-conditions" },
            ],
            locale,
          ),
        }}
      />

      {/* Full-bleed hero */}
      {heroSrc && (
        <CoursesHero
          heroImage={heroSrc}
          objectPosition={heroPosition}
          blurDataURL={heroImg?.asset?.metadata?.lqip || ""}
          alt={heroImg?.alt || "Terms and conditions"}
          title={policyTitle}
          trustLine={cancellationPolicy.eyebrow?.[locale]}
        />
      )}

      {/* Policy article */}
      <section className="mx-auto max-w-[820px] px-6 pb-24 pt-[88px]">
        <BlockContent content={bodyContent} locale={locale} variant="prose" />

        {/* Contact CTA */}
        <div className="mt-14 border-t border-[#e2e9e9] pt-10">
          <p className="mb-5 text-[16.5px] text-[#3d5459]">
            {cancellationPolicy.contactPrompt?.[locale]}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-ink shadow-[0_10px_26px_rgba(255,106,61,0.28)] transition-transform hover:-translate-y-0.5"
            >
              {tNav("contactUs")}
            </Link>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="rounded-full border border-[#d7e0e0] px-6 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-accent"
            >
              {BUSINESS.email}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

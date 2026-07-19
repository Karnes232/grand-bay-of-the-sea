import JsonLd from "@/components/StructuredData/JsonLd"
import CoursesHero from "@/components/courses/CoursesHero"
import CourseGallery from "@/components/courses/CourseGallery"
import FaqAccordion from "@/components/home/FaqAccordion"
import { getHreflangAlternates } from "@/utils/hreflang"
import { breadcrumbJsonLd } from "@/utils/breadcrumb"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getLiveaboards } from "@/sanity/queries/Liveaboards/Liveaboards"
import BlockContent from "@/components/BlockContent/BlockContent"
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
  const pageSeo = await getPageSeo("Liveaboard")

  if (!pageSeo) {
    // Never ship a page with a blank <head>: fail the build (or the single
    // ISR regeneration) loudly instead of silently caching empty metadata.
    throw new Error(
      "[metadata] SEO data came back empty for /liveaboard-dominican-republic. " +
        "Check the Sanity document's seo fields and the fetch above.",
    )
  }

  const alternates = getHreflangAlternates(
    "liveaboard-dominican-republic",
    locale,
  )

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
  const [structuredData, liveaboards, t] = await Promise.all([
    getStructuredData("Liveaboard"),
    getLiveaboards(),
    getTranslations("Liveaboard"),
  ])

  const heroImg = liveaboards.heroImage
  const heroSrc = sanityCropUrl(heroImg, 2000, 1200) || heroImg.asset.url
  const heroTitle = locale === "es" ? liveaboards.titleEs : liveaboards.titleEn

  // Drop the leading h1 (lifted into the hero) from the intro prose.
  const intro = {
    en: liveaboards.paragraph1.en.slice(1),
    es: liveaboards.paragraph1.es.slice(1),
  }

  const expeditions = [
    {
      title: t("silverbankTitle"),
      image: liveaboards.silverBankExpeditionImage,
      paragraph: liveaboards.silverBankExpeditionParagraph,
      href: "/liveaboard-dominican-republic/silverbank-expedition",
    },
    {
      title: t("whaleTitle"),
      image: liveaboards.whaleWatchingAdventureImage,
      paragraph: liveaboards.whaleWatchingAdventureParagraph,
      href: "/liveaboard-dominican-republic/whale-watching-adventure",
    },
  ]

  return (
    <main id="main">
      <JsonLd raw={structuredData?.seo?.structuredData[locale]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd(
            [
              { name: "Home", path: "" },
              { name: "Liveaboard", path: "/liveaboard-dominican-republic" },
            ],
            locale,
          ),
        }}
      />

      <CoursesHero
        heroImage={heroSrc}
        objectPosition={hotspotPosition(heroImg)}
        blurDataURL={heroImg.asset.metadata.lqip}
        alt={heroImg.alt || heroTitle || "Liveaboard diving"}
        title={heroTitle}
        subtitle={liveaboards.heroSubtitle?.[locale]}
        trustLine={liveaboards.heroEyebrow?.[locale]}
      />

      {/* Intro */}
      <section className="mx-auto max-w-[1080px] px-6 pb-2 pt-[72px]">
        <BlockContent
          content={intro as any}
          locale={locale}
          variant="prose"
          wrapperClassName="max-w-[820px]"
        />
      </section>

      {/* Stats */}
      {liveaboards.stats && liveaboards.stats.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-6 py-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {liveaboards.stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-[18px] border border-[#e2e9e9] bg-white p-6"
              >
                <div className="mb-2 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-moss">
                  {stat.label?.[locale]}
                </div>
                <div className="font-display text-[1.3rem] font-bold tracking-[-0.02em] text-ink">
                  {stat.value?.[locale]}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Expeditions */}
      <section className="mx-auto flex max-w-[1280px] flex-col gap-8 px-6 py-12">
        <div className="max-w-[640px]">
          <span className="mb-3 inline-block text-[13px] font-semibold uppercase tracking-[0.14em] text-moss">
            {t("expeditionsEyebrow")}
          </span>
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.7rem)] font-bold leading-[1.04] tracking-[-0.03em] text-balance text-ink">
            {t("expeditionsHeading")}
          </h2>
        </div>

        {expeditions.map((exp, i) => {
          const src = sanityCropUrl(exp.image, 900, 760) || exp.image.asset.url
          const position = hotspotPosition(exp.image)
          const lqip = exp.image.asset.metadata?.lqip
          return (
            <Link
              key={i}
              href={exp.href}
              aria-label={exp.title}
              className="group grid grid-cols-1 overflow-hidden rounded-[24px] border border-[#e2e9e9] bg-white no-underline transition-shadow duration-300 hover:shadow-[0_22px_48px_rgba(11,33,41,0.13)] lg:grid-cols-2"
            >
              <div
                className={`relative min-h-[300px] overflow-hidden bg-[#dce6e6] lg:min-h-[400px] ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={src}
                  alt={exp.image.alt || exp.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 640px"
                  quality={75}
                  placeholder={lqip ? "blur" : "empty"}
                  blurDataURL={lqip}
                  style={position ? { objectPosition: position } : undefined}
                  className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col p-[clamp(30px,3.5vw,48px)]">
                <h3 className="mb-3 font-display text-[clamp(1.6rem,2.6vw,2.1rem)] font-bold leading-[1.05] tracking-[-0.02em] text-ink">
                  {exp.title}
                </h3>
                <BlockContent
                  content={exp.paragraph as any}
                  locale={locale}
                  variant="prose"
                />
                <span className="mt-auto inline-flex items-center gap-2 pt-4 text-[15.5px] font-semibold text-ink">
                  {t("viewExpedition")} <span className="text-accent">→</span>
                </span>
              </div>
            </Link>
          )
        })}
      </section>

      {/* Gallery — first 5 photos in a bento grid, lightbox for the rest */}
      <CourseGallery
        photoList={liveaboards.photoList}
        heading={t("galleryHeading")}
        viewAllLabel={t("viewGallery")}
      />

      {/* CTA band */}
      <section className="mt-14 bg-ink text-white">
        <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-8 px-6 py-16">
          <div className="max-w-[46ch]">
            <h2 className="mb-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              {liveaboards.ctaHeading?.[locale]}
            </h2>
            <p className="text-[16.5px] leading-relaxed text-white/80">
              {liveaboards.ctaBody?.[locale]}
            </p>
          </div>
          <Link
            href="/contact"
            className="flex-none rounded-full bg-accent px-8 py-4 text-[16.5px] font-bold text-ink shadow-[0_12px_34px_rgba(255,106,61,0.35)] transition-transform hover:-translate-y-[3px] hover:shadow-[0_18px_44px_rgba(255,106,61,0.5)]"
          >
            {liveaboards.ctaLabel?.[locale]} →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <FaqAccordion
        faqs={liveaboards.faqs ?? []}
        structuredData={{ en: "", es: "" }}
        locale={locale}
        heading={t("faqHeading")}
      />
    </main>
  )
}

import dynamicImport from "next/dynamic"
import { getTranslations } from "next-intl/server"

import JsonLd from "@/components/StructuredData/JsonLd"
import CoursesHero from "@/components/courses/CoursesHero"
import ContactForm from "@/components/ContactForm/ContactForm"
import { getHreflangAlternates } from "@/utils/hreflang"
import { breadcrumbJsonLd } from "@/utils/breadcrumb"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getContact } from "@/sanity/queries/Contact/Contact"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"
import { BUSINESS } from "@/lib/business"

const GoogleMaps = dynamicImport(
  () => import("@/components/GoogleMapsComponent/GoogleMaps"),
)

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
  const pageSeo = await getPageSeo("Contact")

  if (!pageSeo) {
    // Never ship a page with a blank <head>: fail the build (or the single
    // ISR regeneration) loudly instead of silently caching empty metadata.
    throw new Error(
      "[metadata] SEO data came back empty for /contact. " +
        "Check the Sanity document's seo fields and the fetch above.",
    )
  }

  const alternates = getHreflangAlternates("contact", locale)

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
  const [structuredData, contact, tInfo] = await Promise.all([
    getStructuredData("Contact"),
    getContact(),
    getTranslations("ContactInfo"),
  ])

  const heroImg = contact.heroImage
  const heroSrc = sanityCropUrl(heroImg, 2000, 1200) || heroImg?.asset?.url || ""
  const heroPosition = hotspotPosition(heroImg)

  return (
    <main id="main">
      <JsonLd raw={structuredData?.seo?.structuredData[locale]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd(
            [
              { name: "Home", path: "" },
              { name: "Contact", path: "/contact" },
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
          alt={heroImg?.alt || "Contact Grand Bay of the Sea"}
          title={contact.heroTitle?.[locale] ?? ""}
          subtitle={contact.heroSubtitle?.[locale]}
          trustLine={contact.heroEyebrow?.[locale]}
        />
      )}

      {/* Form + map */}
      <section
        id="form"
        className="mx-auto max-w-[1280px] scroll-mt-20 px-6 pb-24 pt-14"
      >
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
          <ContactForm />

          <div className="flex flex-col gap-5">
            <div className="overflow-hidden rounded-[20px] border border-line">
              <GoogleMaps variant="card" />
            </div>

            <div className="rounded-[20px] border border-line bg-card p-7">
              <h3 className="mb-4 font-display text-[1.25rem] font-bold tracking-[-0.02em] text-fg">
                {contact.visitHeading?.[locale]}
              </h3>
              <div className="mb-3.5 flex items-start gap-3">
                <span className="mt-0.5 flex-none text-accent">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <p className="text-[15px] leading-relaxed text-muted">
                  {`${BUSINESS.streetAddress}, ${BUSINESS.addressLocality}, ${BUSINESS.addressRegion}, ${tInfo("country")}`}
                </p>
              </div>
              <a
                href={BUSINESS.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block border-b-[1.5px] border-moss/30 text-[14.5px] font-semibold text-moss"
              >
                {tInfo("mapLink")} →
              </a>

              {/* Opening hours */}
              <div className="mt-5 flex items-start gap-3 border-t border-surface-soft pt-5">
                <span className="mt-0.5 flex-none text-accent">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </span>
                <div>
                  <div className="text-[12.5px] font-semibold uppercase tracking-[0.1em] text-moss">
                    {contact.hoursEyebrow?.[locale]}
                  </div>
                  <div className="mt-0.5 text-[15px] font-semibold text-fg">
                    {contact.hoursValue?.[locale]}
                  </div>
                  <div className="mt-0.5 text-[13.5px] leading-relaxed text-muted">
                    {contact.hoursDesc?.[locale]}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <a
                  href={BUSINESS.padiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-surface-soft px-4 py-2.5 text-[13px] font-semibold text-fg"
                >
                  PADI #{BUSINESS.padiNumber}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

import JsonLd from "@/components/StructuredData/JsonLd"
import PhotoGallery from "@/components/PhotoGalleryComponents/PhotoGallery"
import CoursesHero from "@/components/courses/CoursesHero"
import { getHreflangAlternates } from "@/utils/hreflang"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getPhotoGallery } from "@/sanity/queries/Photo-Gallery/PhotoGallery"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"
import { breadcrumbJsonLd } from "@/utils/breadcrumb"

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
  const pageSeo = await getPageSeo("Photo Gallery")

  if (!pageSeo) {
    // Never ship a page with a blank <head>: fail the build (or the single
    // ISR regeneration) loudly instead of silently caching empty metadata.
    throw new Error(
      "[metadata] SEO data came back empty for /photo-gallery. " +
        "Check the Sanity document's seo fields and the fetch above.",
    )
  }

  const alternates = getHreflangAlternates("photo-gallery", locale)

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
  const [structuredData, photoGallery] = await Promise.all([
    getStructuredData("Photo Gallery"),
    getPhotoGallery(),
  ])

  const mainImg = photoGallery.mainImage
  const heroSrc = sanityCropUrl(mainImg, 2000, 1200) || mainImg.asset.url

  return (
    <main id="main">
      <JsonLd raw={structuredData?.seo?.structuredData[locale]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd(
            [
              { name: "Home", path: "" },
              { name: photoGallery.title[locale], path: "/photo-gallery" },
            ],
            locale,
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: photoGallery.title[locale],
            url: `https://www.grandbay-puntacana.com${locale === "es" ? "/es" : ""}/photo-gallery`,
            inLanguage: locale,
            publisher: {
              "@id": "https://www.grandbay-puntacana.com/#business",
            },
            image: photoGallery.photoList.map(p => ({
              "@type": "ImageObject",
              contentUrl: p.asset.url,
              width: p.asset.metadata?.dimensions?.width,
              height: p.asset.metadata?.dimensions?.height,
              caption: p.alt || photoGallery.title[locale],
              creditText: "Grand Bay of the Sea",
              creator: {
                "@id": "https://www.grandbay-puntacana.com/#business",
              },
            })),
          }),
        }}
      />

      <CoursesHero
        heroImage={heroSrc}
        objectPosition={hotspotPosition(mainImg)}
        blurDataURL={mainImg.asset.metadata.lqip}
        alt={mainImg.alt || "Photo gallery"}
        title={photoGallery.title[locale]}
        subtitle={photoGallery.heroSubtitle?.[locale]}
        trustLine={photoGallery.heroEyebrow?.[locale]}
      />

      <div className="pt-14">
        <PhotoGallery photos={photoGallery.photoList} />
      </div>
    </main>
  )
}

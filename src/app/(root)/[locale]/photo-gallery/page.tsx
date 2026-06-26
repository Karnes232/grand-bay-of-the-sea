import HeroStaticComponent from "@/components/HeroComponent/HeroStaticComponent"
import JsonLd from "@/components/StructuredData/JsonLd"
import PhotoGallery from "@/components/PhotoGalleryComponents/PhotoGallery"
import RichText from "@/components/RichTextComponents/RichText"
import { searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"
import { getHreflangAlternates } from "@/utils/hreflang"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getPhotoGallery } from "@/sanity/queries/Photo-Gallery/PhotoGallery"
import TextComponent from "@/components/RichTextComponents/TextComponent"
import { breadcrumbJsonLd } from "@/utils/breadcrumb"

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
    return {}
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
    // other: {
    //   "Cache-Control":
    //     "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
    // },
  }
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const [structuredData, photoGallery] = await Promise.all([
    getStructuredData("Photo Gallery"),
    getPhotoGallery(),
  ])

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
      <HeroStaticComponent
        heroImage={photoGallery.mainImage.asset.url}
        blurDataURL={photoGallery.mainImage.asset.metadata.lqip}
      />
      <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />
      <TextComponent
        title={photoGallery.title[locale]}
        heading="h1"
        className="text-center font-bold md:my-10 xl:mb-20 xl:text-5xl"
      />
      {/* <RichText context={pageLayout.items[0].fields.title} /> */}
      <PhotoGallery
        photos={photoGallery.photoList.sort(() => Math.random() - 0.5)}
      />
    </main>
  )
}

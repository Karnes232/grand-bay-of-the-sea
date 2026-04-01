import HeroComponent from "@/components/HeroComponent/HeroComponent"
import PhotoGallery from "@/components/PhotoGalleryComponents/PhotoGallery"
import RichText from "@/components/RichTextComponents/RichText"
import { searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"
import { getHreflangAlternates } from "@/utils/hreflang"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getPhotoGallery } from "@/sanity/queries/Photo-Gallery/PhotoGallery"
import TextComponent from "@/components/RichTextComponents/TextComponent"

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
    <main>
      {structuredData?.seo?.structuredData[locale] && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: structuredData.seo.structuredData[locale],
          }}
        />
      )}
      <HeroComponent heroImage={photoGallery.mainImage.asset.url} />
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

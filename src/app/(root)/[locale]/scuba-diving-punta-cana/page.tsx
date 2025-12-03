import BackgroundImage from "@/components/BackgroundImageComponent/BackgroundImage"
import CloudinaryBackgroundVideo from "@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"
import DivingOrganizations from "@/components/DivingOrganizations/DivingOrganizations"
import GoogleMaps from "@/components/GoogleMapsComponent/GoogleMaps"
import HeroComponent from "@/components/HeroComponent/HeroComponent"
import RichText from "@/components/RichTextComponents/RichText"
import SelectionComponent from "@/components/SelectionComponents/SelectionComponent"
import { getAllEntries, searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"
import { getHreflangAlternates } from "@/utils/hreflang"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getScubaDivingPuntaCana } from "@/sanity/queries/Scuba-Diving-Punta-Cana/ScubaDivingPuntaCana"
import BlockContent from "@/components/BlockContent/BlockContent"
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

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.grandbay-puntacana.com/scuba-diving-punta-cana"
  } else {
    canonicalUrl =
      "https://www.grandbay-puntacana.com/es/scuba-diving-punta-cana"
  }

  return {
    title: pageSeo.seo.meta[locale].title,
    description: pageSeo.seo.meta[locale].description,
    keywords: pageSeo.seo.meta[locale].keywords.join(", "),
    url: canonicalUrl,
    openGraph: {
      title: pageSeo.seo.openGraph[locale].title,
      description: pageSeo.seo.openGraph[locale].description,
      images: pageSeo.seo.openGraph.image.url,
      type: "website",
      url: canonicalUrl,
    },
    robots: {
      index: !pageSeo.seo.noIndex,
      follow: !pageSeo.seo.noFollow,
    },
    ...(canonicalUrl && { canonical: canonicalUrl }),
    alternates: getHreflangAlternates("scuba-diving-punta-cana", locale),
    // other: {
    //   "Cache-Control":
    //     "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
    // },
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>
}) {
  const { locale } = await params
  const [structuredData, scubaDivingPuntaCana] = await Promise.all([
    getStructuredData("Scuba Diving Punta Cana"),
    getScubaDivingPuntaCana(),
  ])
  const pageLayout = await searchEntries("pageLayout", {
    "fields.page": "Scuba Diving Punta Cana",
    locale: locale,
  })

  console.log(scubaDivingPuntaCana)

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
      <HeroComponent
          heroImage={scubaDivingPuntaCana.heroImage.asset.url}
          alt={scubaDivingPuntaCana.heroImage.alt}
        />
      <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />
      <BlockContent content={scubaDivingPuntaCana.paragraph1} locale={locale} />
      <SelectionComponent
        secondaryHeroImage={scubaDivingPuntaCana.secondaryHeroImage.asset.url}
        linkImage1={(pageLayout.items[0] as any).fields.linkImage1.fields.file}
        linkImage2={(pageLayout.items[0] as any).fields.linkImage2.fields.file}
        linkImage3={(pageLayout.items[0] as any).fields.linkImage3.fields.file}
      />
      <BlockContent content={scubaDivingPuntaCana.paragraph2} locale={locale} />
      <CloudinaryBackgroundVideo
        className="xl:min-h-[80vh] [clip-path:polygon(0%_5vh,100%_0%,100%_35vh,0%_100%)] lg:[clip-path:polygon(0%_5vh,100%_0%,100%_55vh,0%_100%)] xl:[clip-path:polygon(0%_5vh,100%_0%,100%_75vh,0%_100%)]"
        videoId={"coral-cut_lyykuw"}
      />
      <DivingOrganizations />
      <BlockContent content={scubaDivingPuntaCana.paragraph3} locale={locale} />
      <BackgroundImage
        image={scubaDivingPuntaCana.tertiaryHeroImage.asset.url}
      />
      <GoogleMaps />
    </main>
  )
}

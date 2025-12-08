import CloudinaryBackgroundVideo from "@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"
import DiveSites from "@/components/DiveSitesComponents/DiveSites"
// Change import from HeroComponent to HeroStaticComponent
import HeroStaticComponent from "@/components/HeroComponent/HeroStaticComponent" // Assuming HeroStaticComponent is in the same path

import LocalDivesOverview from "@/components/TourOverviews/LocalDivesOverview"

import { getHreflangAlternates } from "@/utils/hreflang"
import { getPlaiceholder } from "plaiceholder" // Import getPlaiceholder
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getSharkDivePrice, getSites } from "@/sanity/queries/Sites/sites"
import BlockContent from "@/components/BlockContent/BlockContent"

// Add this line to explicitly force static rendering
export const dynamic = "force-static"

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
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.grandbay-puntacana.com/sites"
  } else {
    canonicalUrl = "https://www.grandbay-puntacana.com/es/sites"
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
    alternates: getHreflangAlternates("sites", locale),
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
  const [structuredData, sitesLayout, sharkDivePrice] = await Promise.all([
    getStructuredData("Sites"),
    getSites(),
    getSharkDivePrice(),
  ])

  // Fetch hero image URL
  const heroImageUrl = sitesLayout.heroImage.asset.url

  // Generate blurDataURL for the hero image at build time
  const buffer = await fetch(heroImageUrl).then(async res => {
    return Buffer.from(await res.arrayBuffer())
  })
  const { base64: heroImageBlurDataURL } = await getPlaiceholder(buffer)

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
      <HeroStaticComponent // Use HeroStaticComponent
        heroImage={heroImageUrl}
        blurDataURL={heroImageBlurDataURL} // Pass the generated blurDataURL
      />
      <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />

      <div className="max-w-6xl my-5 xl:my-14 flex flex-col justify-center items-center lg:flex-row mx-5 lg:mx-auto">
        <BlockContent content={sitesLayout.paragraph1} locale={locale} />
        <div className="lg:w-[45rem]">
          <LocalDivesOverview
            info={sitesLayout}
            sharkPrice={sharkDivePrice.price as number}
            locale={locale}
          />
        </div>
      </div>
      <DiveSites locale={locale} />

      <CloudinaryBackgroundVideo
        videoId={"greyshark_aowggg"}
        className={`[clip-path:polygon(0_5vh,100%_0,100%_40vh,0%_100%)] lg:[clip-path:polygon(0_5vh,100%_0,100%_60vh,0%_100%)]`}
      />
    </main>
  )
}

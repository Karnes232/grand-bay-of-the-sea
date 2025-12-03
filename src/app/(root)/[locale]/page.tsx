import dynamicImport from "next/dynamic"

import { searchEntries } from "@/lib/contentful"
//import dynamic from "next/dynamic"
//import HeroComponent from "@/components/HeroComponent/HeroComponent"
import RichText from "@/components/RichTextComponents/RichText"
import SelectionComponent from "@/components/SelectionComponents/SelectionComponent"
import { Metadata, ResolvingMetadata } from "next"
import { getHreflangAlternates } from "@/utils/hreflang"
// Remove headers from here, it's a dynamic function and will prevent static rendering
// import { headers } from "next/headers";
// import { isMobile } from "@/utils/isMobile"; // If you need this, use a build-time check or remove

// For image placeholders
import { getPlaiceholder } from "plaiceholder"
import { Buffer } from "buffer" // Node.js Buffer for getPlaiceholder
import HeroStaticComponent from "@/components/HeroComponent/HeroStaticComponent"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getSectionLinks } from "@/sanity/queries/Scuba-Diving-Punta-Cana/SectionLinks"

const CloudinaryBackgroundVideo = dynamicImport(
  () =>
    import("@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"),
)
const DivingOrganizations = dynamicImport(
  () => import("@/components/DivingOrganizations/DivingOrganizations"),
)
const BackgroundImage = dynamicImport(
  () => import("@/components/BackgroundImageComponent/BackgroundImage"),
)
const GoogleMaps = dynamicImport(
  () => import("@/components/GoogleMapsComponent/GoogleMaps"),
)

// OPTION 1: Remove force-static to allow dynamic rendering for language switching
// export const dynamic = "force-static"

// OPTION 2: Use revalidate for Incremental Static Regeneration (ISR)
export const revalidate = 3600 // Regenerate every hour for better Netlify compatibility

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: "en" | "es"
  }>
}) {
  const { locale } = await params
  const pageSeo = await getPageSeo("Index")

  if (!pageSeo) {
    return {}
  }

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.grandbay-puntacana.com"
  } else {
    canonicalUrl = "https://www.grandbay-puntacana.com/es"
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
    alternates: getHreflangAlternates("", locale),
    // other: {
    //   "Cache-Control":
    //     "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
    // },
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const [structuredData, sectionLinks] = await Promise.all([
    getStructuredData("Index"),
    getSectionLinks(),
  ])

  let pageLayout
  try {
    const pageLayoutResult = await searchEntries("pageLayout", {
      "fields.page": "Index",
      locale: locale || "en",
    })
    pageLayout = pageLayoutResult.items[0]
  } catch (error) {
    console.error("Failed to fetch page layout:", error)
    return (
      <main>
        <p>Unable to load content at this time. Please try again later.</p>
      </main>
    )
  }

  if (!pageLayout) {
    return (
      <main>
        <p>Content not found for this page. Please check Contentful.</p>
      </main>
    )
  }

  const getFullImageDetails = async (field: any) => {
    if (!field?.fields?.file) return {}
    const url = `https:${field.fields.file.url}`
    let base64 = ""
    try {
      const buffer = await fetch(url).then(async res =>
        Buffer.from(await res.arrayBuffer()),
      )
      const { base64: plaiceholderBase64 } = await getPlaiceholder(buffer)
      base64 = plaiceholderBase64
    } catch (e) {
      console.error("Error generating plaiceholder for image:", url, e)
      // Continue without base64 if there's an error
    }

    return {
      url: url,
      width: field.fields.file.details.image.width,
      height: field.fields.file.details.image.height,
      alt: field.fields.title || "",
      base64: base64, // Pass base64 to HeroComponent
    }
  }

  // Fetch Hero Image details and base64 at build time
  let heroImageDetails: any = {}
  let secondaryHeroImageDetails: any = {}
  let tertiaryHeroImageDetails: any = {}

  try {
    heroImageDetails = await getFullImageDetails(
      (pageLayout as any).fields.heroImage,
    )
    secondaryHeroImageDetails = await getFullImageDetails(
      (pageLayout as any).fields.secondaryHeroImage,
    )
    tertiaryHeroImageDetails = await getFullImageDetails(
      (pageLayout as any).fields.tertiaryHeroImage,
    )
  } catch (error) {
    console.error("Error processing images:", error)
    // Continue with empty image details if there's an error
  }

  return (
    <>
      {structuredData?.seo?.structuredData[locale] && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: structuredData.seo.structuredData[locale],
          }}
        />
      )}
      <main>
        {heroImageDetails.url && (
          <HeroStaticComponent
            heroImage={heroImageDetails.url}
            blurDataURL={heroImageDetails.base64} // Pass base64 to HeroComponent
            // mobileQuality, desktopQuality could be hardcoded or derived from env at build time
            // If you *must* have device-specific quality, you might need a client-side solution or accept dynamic rendering.
            // For static, a single quality (e.g., 80) is often fine.
          />
        )}
        <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />
        <RichText context={pageLayout.fields.paragraph1} />
        <SelectionComponent
          sectionLinks={sectionLinks}
          locale={locale}
          secondaryHeroImage={secondaryHeroImageDetails.url || ""}
        />
        <RichText context={pageLayout.fields.paragraph2} />
        <CloudinaryBackgroundVideo
          className="xl:min-h-[80vh] [clip-path:polygon(0%_5vh,100%_0%,100%_35vh,0%_100%)] lg:[clip-path:polygon(0%_5vh,100%_0%,100%_55vh,0%_100%)] xl:[clip-path:polygon(0%_5vh,100%_0%,100%_75vh,0%_100%)]"
          videoId={"coral-cut_lyykuw"}
        />
        <DivingOrganizations />
        <RichText context={pageLayout.fields.paragraph3} />
        {tertiaryHeroImageDetails.url && (
          <BackgroundImage image={tertiaryHeroImageDetails.url} />
        )}
        <GoogleMaps />
      </main>
    </>
  )
}

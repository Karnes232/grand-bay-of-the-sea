import ContactForm from "@/components/ContactForm/ContactForm"
import ContactInfo from "@/components/ContactInfo/ContactInfo"
import HeroStaticComponent from "@/components/HeroComponent/HeroStaticComponent"
import JsonLd from "@/components/StructuredData/JsonLd"
import { searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"
import dynamicImport from "next/dynamic"

const GoogleMaps = dynamicImport(
  () => import("@/components/GoogleMapsComponent/GoogleMaps"),
)
import { getHreflangAlternates } from "@/utils/hreflang"
import { breadcrumbJsonLd } from "@/utils/breadcrumb"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getContact } from "@/sanity/queries/Contact/Contact"

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
    return {}
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
  const [structuredData, contact] = await Promise.all([
    getStructuredData("Contact"),
    getContact(),
  ])
  /*const searchResults = await searchEntries(
    "pageLayout",
    {
      "fields.page": "Courses",
    },
    ["fields.heroImage"],
  )
  */
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
      <HeroStaticComponent
        heroImage={contact.heroImage.asset.url}
        alt={contact.heroImage.alt}
        blurDataURL={contact.heroImage.asset.metadata.lqip}
      />
      <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />
      <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start lg:px-8">
        <ContactForm />
        <div>
          <ContactInfo variant="page" />
          <div className="hidden lg:block">
            <GoogleMaps variant="card" />
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <GoogleMaps variant="flat" />
      </div>
    </main>
  )
}

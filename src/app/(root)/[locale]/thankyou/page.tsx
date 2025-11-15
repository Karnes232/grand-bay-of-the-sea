import SwiperCarousel from "@/components/BackgroundCarouselComponents/SwiperCarousel"
import ContactForm from "@/components/ContactForm/ContactForm"
import ThankYou from "@/components/ContactForm/ThankYou"
import HeroComponent from "@/components/HeroComponent/HeroComponent"
import RichText from "@/components/RichTextComponents/RichText"
import { searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"
import { getHreflangAlternates } from "@/utils/hreflang"
import { getPageSeo } from "@/sanity/queries/SEO/seo"

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

  let canonicalUrl
  if (locale === "en") {
    canonicalUrl = "https://www.grandbay-puntacana.com/thankyou"
  } else {
    canonicalUrl = "https://www.grandbay-puntacana.com/es/thankyou"
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
    alternates: getHreflangAlternates("thankyou", locale),
    // other: {
    //   "Cache-Control":
    //     "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
    // },
  }
}

export default async function Home(props: any) {
  const searchResults = await searchEntries(
    "pageLayout",
    {
      "fields.page": "Courses",
    },
    ["fields.heroImage"],
  )
  const email = await searchEntries(
    "layout",
    {
      "fields.companyName": "Grand Bay of the Sea",
    },
    ["fields.email"],
  )

  return (
    <main>
      <HeroComponent
        heroImage={`https:${(searchResults.items[0] as any).fields.heroImage.fields.file.url}`}
      />
      <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />
      {/* <div className="flex flex-col items-center justify-center max-w-xs xl:max-w-sm mx-auto min-h-[40vh] xl:min-h-[50vh]">
        <div className="mb-10">
          <div className="flex flex-col justify-center items-center text-slate-600 ">
            <div className="text-2xl xl:text-4xl font-serif text-center mt-6">
              {t("thankYou")} {props.searchParams.name}, {t("ourTeamWillReachOut")}
            </div>

            <div className="text-center text-sm xl:text-base mt-2 xl:mt-6">
              {t("pleaseFeelFreeTo")}
              <a
                href={`mailto:${email.items[0].fields.email as string}`}
                aria-label="Gmail"
                rel="noreferrer"
                className="underline"
              >
                {t("contactUs")}
              </a>{" "}
              {t("withAnyQuestionsOrConcerns")}
            </div>
          </div>
        </div>
      </div> */}
      <ThankYou
        searchParams={props.searchParams}
        email={email.items[0].fields.email as string}
      />
    </main>
  )
}

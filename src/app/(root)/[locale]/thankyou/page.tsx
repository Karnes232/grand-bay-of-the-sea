import SwiperCarousel from "@/components/BackgroundCarouselComponents/SwiperCarousel"
import ContactForm from "@/components/ContactForm/ContactForm"
import ThankYou from "@/components/ContactForm/ThankYou"
import HeroComponent from "@/components/HeroComponent/HeroComponent"
import RichText from "@/components/RichTextComponents/RichText"
import { searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const seoSearchResults = await searchEntries("seo", {
    "fields.page": "Contact",
  })
  return {
    title: String(seoSearchResults.items[0].fields.title),
    description: String(seoSearchResults.items[0].fields.description),
    keywords: seoSearchResults.items[0].fields.keywords as string[],
    openGraph: {
      url: "https://www.grandbay-puntacana.com/thankyou",
      type: "website",
      title: String(seoSearchResults.items[0].fields.title),
      description: String(seoSearchResults.items[0].fields.description),
      images: [
        {
          url: `https:${(seoSearchResults.items[0] as any).fields.image.fields.file.url}`,
          width: (seoSearchResults.items[0] as any).fields.image.fields.file
            .details.image.width,
          height: (seoSearchResults.items[0] as any).fields.image.fields.file
            .details.image.height,
          alt: (seoSearchResults.items[0] as any).fields.image.fields.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: String(seoSearchResults.items[0].fields.title),
      description: String(seoSearchResults.items[0].fields.description),
      creator: "@grandbay",
      site: "@grandbay",
      images: [
        {
          url: `https:${(seoSearchResults.items[0] as any).fields.image.fields.file.url}`,
          width: (seoSearchResults.items[0] as any).fields.image.fields.file
            .details.image.width,
          height: (seoSearchResults.items[0] as any).fields.image.fields.file
            .details.image.height,
          alt: (seoSearchResults.items[0] as any).fields.image.fields.title,
        },
      ],
    },
    alternates: {
      canonical: "https://www.grandbay-puntacana.com/thankyou/",
    },
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
      <ThankYou searchParams={props.searchParams} email={email.items[0].fields.email as string} />
    </main>
  )
}

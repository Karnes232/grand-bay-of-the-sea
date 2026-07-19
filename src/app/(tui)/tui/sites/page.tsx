import BackgroundVideo from "@/components/BackgroundVideoComponent/BackgroundVideo"
import DiveSites from "@/components/DiveSitesComponents/DiveSites"
import HeroStaticComponent from "@/components/HeroComponent/HeroStaticComponent"
import BlockContent from "@/components/BlockContent/BlockContent"
import TuiLocalDiveOverview from "@/components/TuiComponents/TuiLocalDiveOverview"
import { getPageSeo } from "@/sanity/queries/SEO/seo"
import { getSites } from "@/sanity/queries/Sites/sites"
import { cloudinaryVideoUrl } from "@/utils/cloudinaryVideoUrl"
import { Metadata } from "next"

// ISR 7 days — not force-static, so language switching works on Netlify.
export const revalidate = 604800

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo("Sites")

  if (!pageSeo) {
    // Never ship a page with a blank <head>: fail the build (or the single
    // ISR regeneration) loudly instead of silently caching empty metadata.
    throw new Error(
      "[metadata] SEO data came back empty for /tui/sites. " +
        "Check the Sanity pageSeo 'Sites' document.",
    )
  }

  const image = {
    url: pageSeo.seo.openGraph.image.url,
    width: pageSeo.seo.openGraph.image.width,
    height: pageSeo.seo.openGraph.image.height,
    alt: pageSeo.seo.openGraph.image.alt,
  }

  return {
    title: pageSeo.seo.meta.en.title,
    description: pageSeo.seo.meta.en.description,
    keywords: pageSeo.seo.meta.en.keywords,
    openGraph: {
      url: "https://www.grandbay-puntacana.com/tui/sites",
      type: "website",
      title: pageSeo.seo.openGraph.en.title,
      description: pageSeo.seo.openGraph.en.description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: pageSeo.seo.openGraph.en.title,
      description: pageSeo.seo.openGraph.en.description,
      creator: "@grandbay",
      site: "@grandbay",
      images: [image],
    },
    alternates: {
      canonical: "https://www.grandbay-puntacana.com/tui/sites/",
    },
  }
}

export default async function Page() {
  const sites = await getSites()
  return (
    <main id="main">
      <HeroStaticComponent heroImage={sites.heroImage.asset.url} />
      <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />

      <div className="max-w-6xl my-5 xl:my-14 flex flex-col justify-center items-center lg:flex-row mx-5 lg:mx-auto">
        <BlockContent content={sites.paragraph1} locale="en" />
        <div className="lg:w-[45rem]">
          <TuiLocalDiveOverview />
        </div>
      </div>
      <DiveSites locale={"en"} />

      {/* Same reef video the root /sites page uses — the sites singleton has no
          video field of its own. */}
      <BackgroundVideo
        video={cloudinaryVideoUrl("greyshark_aowggg")}
        className={`[clip-path:polygon(0_5vh,100%_0,100%_40vh,0%_100%)] lg:[clip-path:polygon(0_5vh,100%_0,100%_60vh,0%_100%)]`}
      />
    </main>
  )
}

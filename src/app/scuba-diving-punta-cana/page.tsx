import BackgroundImage from "@/components/BackgroundImageComponent/BackgroundImage"
import BackgroundVideo from "@/components/BackgroundVideoComponent/BackgroundVideo"
import DivingOrganizations from "@/components/DivingOrganizations/DivingOrganizations"
import GoogleMaps from "@/components/GoogleMapsComponent/GoogleMaps"
import HeroComponent from "@/components/HeroComponent/HeroComponent"
import RichText from "@/components/RichTextComponents/RichText"
import SelectionComponent from "@/components/SelectionComponents/SelectionComponent"
import { getAllEntries, searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const seoSearchResults = await searchEntries("seo", {
    "fields.page": "Scuba Diving Punta Cana",
  })
  return {
    title: String(seoSearchResults.items[0].fields.title),
    description: String(seoSearchResults.items[0].fields.description),
    keywords: seoSearchResults.items[0].fields.keywords as string[],
    openGraph: {
      url: "https://www.grandbay-puntacana.com/scuba-diving-punta-cana",
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
      canonical: "https://www.grandbay-puntacana.com/scuba-diving-punta-cana",
    },
  }
}

export default async function Home(props: any) {
  const pageLayout = await searchEntries("pageLayout", {
    "fields.page": "Scuba Diving Punta Cana",
  })

  return (
    <main>
      <HeroComponent
        heroImage={`https:${(pageLayout.items[0] as any).fields.heroImage.fields.file.url}`}
      />
      <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />
      <RichText context={pageLayout.items[0].fields.paragraph1} />
      <SelectionComponent
        secondaryHeroImage={`https:${(pageLayout.items[0] as any).fields.secondaryHeroImage.fields.file.url}`}
        linkImage1={(pageLayout.items[0] as any).fields.linkImage1.fields.file}
        linkImage2={(pageLayout.items[0] as any).fields.linkImage2.fields.file}
        linkImage3={(pageLayout.items[0] as any).fields.linkImage3.fields.file}
      />
      <RichText context={pageLayout.items[0].fields.paragraph2} />
      <BackgroundVideo
        className="xl:min-h-[80vh] [clip-path:polygon(0%_5vh,100%_0%,100%_35vh,0%_100%)] lg:[clip-path:polygon(0%_5vh,100%_0%,100%_55vh,0%_100%)] xl:[clip-path:polygon(0%_5vh,100%_0%,100%_75vh,0%_100%)]"
        video={(pageLayout.items[0] as any).fields.videoHero.fields.file.url}
      />
      <DivingOrganizations />
      <RichText context={pageLayout.items[0].fields.paragraph3} />
      <BackgroundImage
        image={
          (pageLayout.items[0] as any).fields.tertiaryHeroImage.fields.file.url
        }
      />
      <GoogleMaps />
    </main>
  )
}

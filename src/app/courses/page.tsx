import BackgroundVideo from "@/components/BackgroundVideoComponent/BackgroundVideo"
import CourseCards from "@/components/CourseCardsComponents/CourseCards"
import HeroComponent from "@/components/HeroComponent/HeroComponent"
import RichText from "@/components/RichTextComponents/RichText"
import { searchEntries } from "@/lib/contentful"

export default async function Page() {
  const pageLayout = await searchEntries("pageLayout", {
    "fields.page": "Courses",
  })
  console.log((pageLayout.items[0] as any).fields.linkImage1.fields)
  return (
    <main>
      <HeroComponent
        heroImage={`https:${(pageLayout.items[0] as any).fields.heroImage.fields.file.url}`}
      />
      <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />
      <RichText context={pageLayout.items[0].fields.paragraph1} />
      <BackgroundVideo
        className="[clip-path:polygon(0%_5vh,100%_0%,100%_35vh,0%_100%)] lg:[clip-path:polygon(0%_5vh,100%_0%,100%_55vh,0%_100%)] xl:[clip-path:polygon(0%_5vh,100%_0%,100%_75vh,0%_100%)]"
        video={(pageLayout.items[0] as any).fields.videoHero.fields.file.url}
      />
      <RichText context={pageLayout.items[0].fields.paragraph2} />
      <CourseCards
        image1={(pageLayout.items[0] as any).fields.linkImage1.fields}
        image2={(pageLayout.items[0] as any).fields.linkImage2.fields}
        image3={(pageLayout.items[0] as any).fields.linkImage3.fields}
        image4={(pageLayout.items[0] as any).fields.linkImage4.fields}
      />
    </main>
  )
}

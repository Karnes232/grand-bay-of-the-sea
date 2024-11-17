import BackgroundVideo from "@/components/BackgroundVideoComponent/BackgroundVideo"
import CourseOverview from "@/components/CourseComponents/CourseOverview"
import RichText from "@/components/RichTextComponents/RichText"
import { getAllEntries, searchEntries } from "@/lib/contentful"

// export async function generateStaticParams() {
//   const searchResults = await getAllEntries("course")
//   console.log(searchResults)
//   return searchResults.map(course => ({
//     slug: course.fields.slug,
//   }))
// }

export default async function Page({ params }: { params: { slug: string } }) {
  const course = await searchEntries("course", {
    "fields.slug": params.slug,
  })

  return (
    <main>
      <BackgroundVideo
        video={(course.items[0] as any).fields.backgroundVideo.fields.file.url}
        className="-mt-20 md:-mt-40 [clip-path:polygon(0_0,100%_0,100%_35vh,0%_100%)] lg:[clip-path:polygon(0_0,100%_0,100%_55vh,0%_100%)]"
      />
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:mx-auto max-w-6xl xl:h-[35rem]">
          <div className="lg:flex lg:flex-col lg:justify-start lg:mt-5 xl:min-h-full xl:justify-center xl:mt-0">
            <RichText context={course.items[0].fields.paragraph1} />
          </div>
          <div className="lg:w-[45rem] xl:mx-10 lg:min-h-full lg:flex lg:flex-col md:justify-center">
            <CourseOverview course={course.items[0]} />
          </div>
          <div className="lg:flex lg:flex-col lg:justify-start lg:mt-5 xl:min-h-full xl:justify-center xl:mt-0">
            <RichText context={course.items[0].fields.paragraph2} />
          </div>
        </div>
      </div>
    </main>
  )
}

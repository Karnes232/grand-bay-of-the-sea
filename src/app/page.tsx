import Image from "next/image"
import { getAllEntries, searchEntries } from "@/lib/contentful"
import HeroComponent from "@/components/HeroComponent/HeroComponent"
import RichText from "@/components/RichTextComponents/RichText"

export default async function Home(props: any) {
  const pageLayout = await getAllEntries("pageLayout")
  return (
    <main>
      <HeroComponent
        heroImage={`https:${(pageLayout[0] as any).fields.heroImage.fields.file.url}`}
      />
      <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />
      <RichText context={pageLayout[0].fields.paragraph1} />
    </main>
  )
}

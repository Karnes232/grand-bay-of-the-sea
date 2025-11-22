import React from "react"
import { getAllEntries } from "@/lib/contentful"
import FishCard2 from "./FishCard2"
import { getFishes } from "@/sanity/queries/Page-Species/Fishes"
const Fishes = async ({ locale }: { locale: string }) => {
  const fishes = await getAllEntries("fish", locale)

  const fishesData = await getFishes()
  console.log(fishesData)
  return (
    <div className="max-w-6xl my-5 xl:my-14 flex flex-col flex-wrap justify-center items-center sm:flex-row mx-5 lg:mx-auto">
      {fishesData.map((fish, index) => {
        return <FishCard2 fish={fish} key={index} locale={locale} />
      })}
    </div>
  )
}

export default Fishes

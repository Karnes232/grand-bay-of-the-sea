import React from "react"
import { getAllEntries } from "@/lib/contentful"
import FishCard from "./FishCard"
const Fishes = async () => {
  const fishes = await getAllEntries("fish")
  const newList = fishes.reverse()
  return (
    <div className="max-w-6xl my-5 xl:my-14 flex flex-col flex-wrap justify-center items-start sm:flex-row mx-5 lg:mx-auto">
      {newList.map((fish, index) => {
        return <FishCard fish={fish.fields} key={index} />
      })}
    </div>
  )
}

export default Fishes

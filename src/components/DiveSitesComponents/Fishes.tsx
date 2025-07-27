import React from "react"
import { getAllEntries } from "@/lib/contentful"
import FishCard from "./FishCard"
const Fishes = async () => {
  const fishes = await getAllEntries("fish")
  return (
    <div className="max-w-6xl my-5 xl:my-14 flex flex-col flex-wrap justify-center items-center sm:flex-row mx-5 lg:mx-auto">
      {fishes.map((fish, index) => {
        return <FishCard fish={fish.fields} key={index} />
      })}
    </div>
  )
}

export default Fishes

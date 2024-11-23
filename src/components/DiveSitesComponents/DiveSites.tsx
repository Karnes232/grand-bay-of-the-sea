import { getAllEntries } from "@/lib/contentful"
import React from "react"
import DiveSiteCard from "./DiveSiteCard"

const DiveSites = async () => {
  const diveSites = await getAllEntries("diveSites")
  console.log(diveSites[0].fields)
  const newList = diveSites.reverse()
  return (
    <div className="max-w-6xl my-5 xl:my-14 flex flex-col flex-wrap justify-center items-center sm:flex-row mx-5 lg:mx-auto">
      {newList.map((diveSite, index) => {
        return <DiveSiteCard diveSite={diveSite.fields} key={index} />
      })}
    </div>
  )
}

export default DiveSites

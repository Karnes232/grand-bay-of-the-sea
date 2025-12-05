import React from "react"
import DiveSiteCard from "./DiveSiteCard"
import { getDiveSites } from "@/sanity/queries/Sites/DiveSites"

const DiveSites = async ({ locale }: { locale: string }) => {
  const diveSites = await getDiveSites()

  const newList = diveSites.reverse()
  return (
    <div className="max-w-6xl my-5 xl:my-14 flex flex-col flex-wrap justify-center items-center sm:flex-row mx-5 lg:mx-auto">
      {newList.map((diveSite, index) => {
        return <DiveSiteCard diveSite={diveSite} key={index} locale={locale} />
      })}
    </div>
  )
}

export default DiveSites

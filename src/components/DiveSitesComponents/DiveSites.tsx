import React from "react"
import DiveSiteCard from "./DiveSiteCard"
import { getDiveSites } from "@/sanity/queries/Sites/DiveSites"
import { getTranslations } from "next-intl/server"

const DiveSites = async ({ locale }: { locale: string }) => {
  const [diveSites, t] = await Promise.all([
    getDiveSites(),
    getTranslations("DiveSites"),
  ])

  const newList = diveSites.reverse()
  return (
    <section className="max-w-6xl my-5 xl:my-14 mx-5 lg:mx-auto">
      <h2 className="font-bold font-crimson text-center text-balance text-2xl md:text-3xl text-neutral-950 dark:text-white">
        {t("heading")}
      </h2>
      <div className="flex flex-col flex-wrap justify-center items-center sm:flex-row">
        {newList.map((diveSite, index) => {
          return (
            <DiveSiteCard diveSite={diveSite} key={index} locale={locale} />
          )
        })}
      </div>
    </section>
  )
}

export default DiveSites

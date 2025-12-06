import React from "react"

import { getFishes } from "@/sanity/queries/Page-Species/Fishes"
import FishesClient from "./FishesClient"

const Fishes = async ({ locale }: { locale: string }) => {
  const fishesData = await getFishes()
  
  return <FishesClient fishesData={fishesData} locale={locale} />
}

export default Fishes

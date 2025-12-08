"use client"

import React, { useState, useMemo } from "react"
import FishCard2 from "./FishCard2"
import { Fishes as FishesType } from "@/sanity/queries/Page-Species/Fishes"

const FishesClient = ({
  fishesData,
  locale,
}: {
  fishesData: FishesType[]
  locale: string
}) => {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFishes = useMemo(() => {
    if (!searchQuery.trim()) {
      return fishesData
    }

    const query = searchQuery.toLowerCase().trim()
    return fishesData.filter(fish => {
      const fishName = fish.name[locale as "en" | "es"] || fish.name.en
      return fishName.toLowerCase().includes(query)
    })
  }, [fishesData, searchQuery, locale])

  return (
    <div className="w-full max-w-6xl lg:mx-auto my-5 xl:my-14">
      {/* Search Bar */}
      <div className="mb-6 flex justify-center ">
        <div className="relative w-full mx-5 md:mx-10 lg:max-w-2xl xl:max-w-3xl xl:mx-0">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={locale === "es" ? "Buscar peces..." : "Search fish..."}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Fish Cards */}
      <div className="flex flex-col flex-wrap justify-center items-center sm:flex-row">
        {filteredFishes.length > 0 ? (
          filteredFishes.map((fish, index) => (
            <FishCard2 fish={fish} key={index} locale={locale} />
          ))
        ) : (
          <div className="w-full text-center py-12">
            <p className="text-gray-600 text-lg">
              {locale === "es"
                ? "No se encontraron peces con ese nombre."
                : "No fish found with that name."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FishesClient

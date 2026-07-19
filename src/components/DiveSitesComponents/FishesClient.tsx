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
    <section className="mx-auto max-w-[1280px] px-6 pb-6 pt-4">
      {/* Search Bar */}
      <div className="mb-9 flex justify-center">
        <div className="relative w-full max-w-[560px]">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg
              className="h-5 w-5 text-faint"
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
            className="block w-full rounded-full border-[1.5px] border-line-strong bg-card py-3.5 pl-11 pr-4 text-[15px] text-fg outline-none transition-colors placeholder:text-faint focus:border-accent"
          />
        </div>
      </div>

      {/* Fish Cards */}
      {filteredFishes.length > 0 ? (
        <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
          {filteredFishes.map((fish, index) => (
            <FishCard2 fish={fish} key={index} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="w-full py-12 text-center">
          <p className="text-lg text-muted">
            {locale === "es"
              ? "No se encontraron peces con ese nombre."
              : "No fish found with that name."}
          </p>
        </div>
      )}
    </section>
  )
}

export default FishesClient

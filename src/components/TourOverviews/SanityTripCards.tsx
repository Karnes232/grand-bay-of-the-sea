import React from "react"
import IndividualTrip from "./IndividualTrip"
import { TripCards as TripCardsType } from "@/sanity/queries/DiveTrips/Trips"
import SanityIndividualTrip from "./SanityIndividualTrip"

const SanityTripCards = ({
  locale,
  tripCards,
}: {
  locale: string
  tripCards: TripCardsType[]
}) => {
  return (
    <div className="h-[100vh] md:h-[45vh] lg:h-[65vh]">
      <div className="flex flex-col h-full justify-evenly items-center  max-w-6xl mx-5 md:flex-row xl:mx-auto gap-10">
        {tripCards.map(tripCard => (
          <SanityIndividualTrip
            key={tripCard.title}
            name={tripCard.cardTitle[locale]}
            url={tripCard.slug.current}
            description={
              locale === "en"
                ? tripCard.cardDescription.en
                : tripCard.cardDescription.es
            }
            image={tripCard.cardImage}
          />
        ))}
      </div>
    </div>
  )
}

export default SanityTripCards

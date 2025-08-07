import React from "react"
import IndividualTrip from "./IndividualTrip"

const TripCards = ({
  locale,
  image1,
  image2,
  image3,
}: {
  locale: string
  image1: any
  image2: any
  image3: any
}) => {
  return (
    <div className="h-[100vh] md:h-[45vh] lg:h-[65vh]">
      <div className="flex flex-col h-full justify-evenly items-center  max-w-6xl mx-5 md:flex-row xl:mx-auto gap-10">
        <IndividualTrip
          name={locale === "en" ? "Catalina Island" : "Isla Catalina"}
          url="/trips/catalina"
          description={
            locale === "en"
              ? "If you dreamed of a Caribbean paradise, you'll find it right here on Catalina Island. Crystal-clear water, gorgeous beaches."
              : "Si soñaste con un paraís caribeño, lo encontrarás justo aquí en la Isla Catalina. Agua cristalina, hermosas playas."
          }
          image={image1}
        />
        <IndividualTrip
          name={locale === "en" ? "Saona Island" : "Isla Saona"}
          url="/trips/saona"
          description={
            locale === "en"
              ? "Saona Island is the excursion that everyone recommends when they know that you are visiting the Dominican Republic."
              : "La Isla Saona es la excursión que todos recomiendan cuando saben que estás visitando la República Dominicana."
          }
          image={image2}
        />
        <IndividualTrip
          name={locale === "en" ? "Bayahibe Diving" : "Buceo en Bayahibe"}
          url="/trips/bayahibe"
          description={
            locale === "en"
              ? "This quiet fishing village has some amazing dive sites, including a couple wrecks that will surprise any diver."
              : "Este tranquilo pueblo pesquero tiene algunos sitios de buceo increíbles, incluyendo algunos restos que sorprenderán a cualquier buceador."
          }
          image={image3}
        />
      </div>
    </div>
  )
}

export default TripCards

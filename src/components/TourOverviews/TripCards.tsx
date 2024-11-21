import React from "react"
import IndividualTrip from "./IndividualTrip"

const TripCards = ({
  image1,
  image2,
  image3,
}: {
  image1: any
  image2: any
  image3: any
}) => {
  return (
    <div className="h-[95vh] md:h-[45vh] lg:h-[65vh]">
      <div className="flex flex-col h-full justify-evenly items-center  max-w-6xl mx-5 md:flex-row xl:mx-auto gap-10">
        <IndividualTrip
          name="Catalina Island"
          url="/trips/catalina"
          description="If you dreamed of a Caribbean paradise, you'll find it right here on Catalina Island. Crystal-clear water, gorgeous beaches."
          image={image1}
        />
        <IndividualTrip
          name="Saona Island"
          url="/trips/saona"
          description="Saona Island is the excursion that everyone recommends when they know that you are visiting the Dominican Republic."
          image={image2}
        />
        <IndividualTrip
          name="Bayahibe Diving"
          url="/trips/bayahibe"
          description="his quiet fishing village has some amazing dive sites, including a couple wrecks that will surprise any diver."
          image={image3}
        />
      </div>
    </div>
  )
}

export default TripCards

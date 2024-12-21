import React from "react"
import SingleCourseCard from "./SingleCourseCard"

const AdvancedCourseCards = ({
  image1,
  image2,
  image3,
  image4,
}: {
  image1: any
  image2: any
  image3: any
  image4: any
}) => {
  return (
    <div className="relative my-5 flex justify-center items-center">
      <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between lg:justify-around items-center justify-center text-center  max-w-4xl mx-5 md:p-6 xl:mx-auto">
        <SingleCourseCard
          title="Peak Performance Buoyancy"
          description="Master buoyancy control for smoother, more efficient and enjoyable dives."
          image={image1}
          link="/courses/peak-performance-buoyancy"
          hash1="BuoyancyControl"
          hash2="ScubaDiving"
          hash3="PADI"
        />
        <SingleCourseCard
          title="Enriched Air Nitrox"
          description="Extend dive time and reduce surface intervals with enriched air diving"
          image={image2}
          link="/courses/enriched-air"
          hash1="PADI"
          hash2="EnrichedAir"
          hash3="NitroxDiving"
        />
        <SingleCourseCard
          title="Wreck Diver"
          description="Explore sunken ships and underwater history with the wreck diver course."
          image={image3}
          link="/courses/wreck"
          hash1="ScubaAdventure"
          hash2="PADI"
          hash3="WreckDiving"
        />
        <SingleCourseCard
          title="Deep Diver"
          description="Explore deeper dive sites safely with the PADI Deep Diver course"
          image={image4}
          link="/courses/deep-diver"
          hash1="ScubaAdventure"
          hash2="DeepDiving"
          hash3="PADI"
        />
      </div>
    </div>
  )
}

export default AdvancedCourseCards

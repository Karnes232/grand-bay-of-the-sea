import React from "react"
import LinkComponent from "./LinkComponent"

const SelectionComponent = ({
  secondaryHeroImage,
  linkImage1,
  linkImage2,
  linkImage3,
}: {
  secondaryHeroImage: string
  linkImage1: string
  linkImage2: string
  linkImage3: string
}) => {
  const HeroStyles = {
    backgroundPosition: "75% 70%",
    backgroundImage:
      "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(" +
      secondaryHeroImage +
      ")",
  }
  return (
    <div className="w-full h-[95vh] md:h-[50vh] lg:[75vh] my-5">
      <div
        style={HeroStyles}
        className="h-[95vh] md:h-[50vh] lg:[75vh] bg-cover relative [clip-path:polygon(0%_5vh,100%_0%,100%_90vh,0%_100%)] md:[clip-path:polygon(0%_5vh,100%_0%,100%_45vh,0%_100%)] lg:[clip-path:polygon(0%_5vh,100%_0%,100%_70vh,0%_100%)]"
      >
        <div className="flex flex-col h-full justify-evenly items-center max-w-6xl mx-5 md:flex-row xl:mx-auto">
          <LinkComponent
            name="Scuba Courses"
            url="/courses"
            description="Try diving for the first time, get certified, or upgrade your certification"
            image={linkImage1}
            textColor="text-white"
          />
          <LinkComponent
            name="Dive Packages"
            url="/sites"
            description="Dive for a day or more, and save on multiple dive packages"
            image={linkImage2}
            textColor="text-white"
          />
          <LinkComponent
            name="Day Trips"
            url="/trips"
            description="Enjoy a day on the caribbean coast of the island, with its white sand and turquoise waters"
            image={linkImage3}
            textColor="text-white"
          />
        </div>
      </div>
    </div>
  )
}

export default SelectionComponent

import React from "react"
import LinkComponent from "./LinkComponent"
import Image from "next/image"
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
    <div className="w-full h-[115vh] md:h-[60vh] lg:h-[75vh] my-5">
      <div className="relative h-[115vh] md:h-[60vh] lg:h-[75vh] [clip-path:polygon(0%_5vh,100%_0%,100%_110vh,0%_100%)] md:[clip-path:polygon(0%_5vh,100%_0%,100%_55vh,0%_100%)] lg:[clip-path:polygon(0%_5vh,100%_0%,100%_70vh,0%_100%)]">
        {/* Background Image */}
        <Image
          src={secondaryHeroImage}
          alt="Background"
          fill
          className="object-cover object-[75%_70%] xl:object-[75%_50%]"
          priority
          quality={75}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full justify-evenly items-center max-w-6xl mx-5 md:flex-row xl:mx-auto xl:space-x-4">
          <LinkComponent
            name="Learn to Dive with Experts"
            url="/courses"
            description="Discover the underwater world with our internationally certified instructors. From beginners to advanced divers, we offer courses for all levels."
            image={linkImage1}
            textColor="text-white"
          />
          <LinkComponent
            name="Experience Our Best Dive Sites"
            url="/sites"
            description="Save with our value-packed dive packages designed for certified divers. Multi-day adventures to Punta Cana's premier dive locations."
            image={linkImage2}
            textColor="text-white"
          />
          <LinkComponent
            name="Caribbean Day Adventures"
            url="/trips"
            description="Explore the stunning islands of the Dominican Republic with our full-day excursions. Perfect for everyone, no diving experience required."
            image={linkImage3}
            textColor="text-white"
          />
        </div>
      </div>
    </div>
  )
}

export default SelectionComponent

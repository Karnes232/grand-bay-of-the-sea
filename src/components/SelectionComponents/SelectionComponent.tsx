"use client"
import React from "react"
import LinkComponent from "./LinkComponent"
import Image from "next/image"
import { useTranslations } from "next-intl"
const SelectionComponent = ({
  sectionLinks,
  locale,
  secondaryHeroImage,
}: {
  sectionLinks: any
  locale: string
  secondaryHeroImage: string
}) => {
  const t = useTranslations("SelectionComponent")

  const HeroStyles = {
    backgroundPosition: "75% 70%",
    backgroundImage:
      "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(" +
      secondaryHeroImage +
      ")",
  }

  console.log(sectionLinks)
  return (
    <div className="w-full h-[115vh] md:h-[60vh] lg:h-[75vh] my-5">
      <div className="relative h-[115vh] md:h-[60vh] lg:h-[75vh] [clip-path:polygon(0%_5vh,100%_0%,100%_110vh,0%_100%)] md:[clip-path:polygon(0%_5vh,100%_0%,100%_55vh,0%_100%)] lg:[clip-path:polygon(0%_5vh,100%_0%,100%_70vh,0%_100%)]">
        {/* Background Image */}
        <Image
          src={secondaryHeroImage}
          alt="scuba diving punta cana"
          fill
          className="object-cover object-[75%_70%] xl:object-[75%_50%]"
          priority
          quality={75}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full justify-evenly items-center max-w-6xl mx-5 md:flex-row xl:mx-auto xl:space-x-4">
          {sectionLinks.map((link: any, index: number) => (
            <LinkComponent
              key={index}
              name={link.title[locale]}
              url={link.url}
              description={link.description[locale]}
              image={link.image.asset.url}
              textColor="text-white"
            />
          ))}
          {/* <LinkComponent
            name={t("learnToDiveWithExperts")}
            url="/courses"
            description={t("discoverTheUnderwaterWorld")}
            image={linkImage1}
            textColor="text-white"
          />
          <LinkComponent
            name={t("experienceOurBestDiveSites")}
            url="/sites"
            description={t("saveWithOurValuePackedDivePackages")}
            image={linkImage2}
            textColor="text-white"
          />
          <LinkComponent
            name={t("caribbeanDayAdventures")}
            url="/trips"
            description={t("exploreTheStunningIslandsOfTheDominicanRepublic")}
            image={linkImage3}
            textColor="text-white"
          /> */}
        </div>
      </div>
    </div>
  )
}

export default SelectionComponent

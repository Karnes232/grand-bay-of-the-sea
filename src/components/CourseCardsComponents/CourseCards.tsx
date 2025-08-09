"use client"
import React from "react"
import SingleCourseCard from "./SingleCourseCard"
import { useTranslations } from "next-intl"

const CourseCards = ({
  locale,
  image1,
  image2,
  image3,
  image4,
}: {
  locale: string
  image1: any
  image2: any
  image3: any
  image4: any
}) => {
  const t = useTranslations("CourseCards")
  return (
    <div className="relative my-5 flex justify-center items-center">
      <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between lg:justify-around items-center justify-center text-center  max-w-4xl mx-5 md:p-6 xl:mx-auto">
        <SingleCourseCard
          title="Discover Scuba Diving"
          description={t("discoverScubaDiving")}
          image={image1}
          link="/courses/discover"
          hash1="experience"
          hash2="travel"
          hash3="adventure"
        />
        <SingleCourseCard
          title="Scuba Diver"
          description={t("scubaDiver")}
          image={image2}
          link="/courses/scubadiver"
          hash1="PADI"
          hash2="certification"
          hash3="travel"
        />
        <SingleCourseCard
          title="Open Water Diver"
          description={t("openWaterDiver")}
          image={image3}
          link="/courses/openwater"
          hash1="travel adventure"
          hash2="PADI"
          hash3="Dominican"
        />
        <SingleCourseCard
          title="Advanced Open Water Diver"
          description={t("advancedOpenWaterDiver")}
          image={image4}
          link="/courses/advanced"
          hash1="Advanced"
          hash2="deep diving"
          hash3="PADI"
        />
      </div>
    </div>
  )
}

export default CourseCards

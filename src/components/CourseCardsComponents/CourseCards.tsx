"use client"
import React from "react"
import SingleCourseCard from "./SingleCourseCard"
import { useTranslations } from "next-intl"
import { IndividualCourseCard } from "@/sanity/queries/Courses/IndividualCourses"

const CourseCards = ({
  locale,
  individualBeginnerCoursesCards,
}: {
  locale: string
  individualBeginnerCoursesCards: IndividualCourseCard[]
}) => {
  const t = useTranslations("CourseCards")
  return (
    <div className="relative my-5 flex justify-center items-center">
      <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between lg:justify-around items-center justify-center text-center  max-w-4xl mx-5 md:p-6 xl:mx-auto">
        {individualBeginnerCoursesCards.map(course => (
          <SingleCourseCard
            key={course.course}
            title={course.course}
            description={course.cardDescription[locale]}
            image={course.cardImage}
            link={`/courses/${course.slug.current}`}
            hash1={course.cardHashTags[0]}
            hash2={course.cardHashTags[1]}
            hash3={course.cardHashTags[2]}
          />
        ))}
      </div>
    </div>
  )
}

export default CourseCards

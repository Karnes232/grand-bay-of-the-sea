"use client"

import React from "react"
import { motion } from "motion/react"
import Link from "next/link"
import CustomPayPal from "../PayPalComponents/CustomPayPal"
const CourseOverview = ({ course }: { course: any }) => {
  return (
    <div className="my-5">
      {" "}
      <div className="flex flex-col justify-center items-center mb-2">
        <h4 className="text-xl font-semibold mb-1 xl:text-3xl">
          <strong>Course Overview</strong>
        </h4>
        <p className="my-1 text-center text-sm md:text-base xl:text-lg">
          <b>Course Level:</b> {course.fields.level}
        </p>
        {course.fields.padiPrice && (
          <p className="my-1 text-sm md:text-base xl:text-lg">
            <b>PADI Price:</b> ${course.fields.padiPrice} per person
          </p>
        )}
        {course.fields.ssiPrice && (
          <p className="my-1 text-sm md:text-base xl:text-lg">
            <b>SSI Price:</b> ${course.fields.ssiPrice} per person
          </p>
        )}

        <p className="my-1 text-sm md:text-base xl:text-lg">
          <b>Duration: </b>
          {course.fields.duration}
        </p>
        <p className="my-1 text-sm md:text-base xl:text-lg">
          <b> Includes: </b>Transport
        </p>
        {course.fields.extraInfo && (
          <p className="my-1 text-sm md:text-base xl:text-lg">
            {course.fields.extraInfo}
          </p>
        )}
      </div>
      <div className="flex justify-center w-[200px] h-[35px] mx-auto">
        <Link href="/contact" className="no-underline w-[200px] h-[35px]">
          <button className=" bg-[#2C2E2F] text-[#FFF] text-sm rounded-3xl w-full h-full px-5">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 3,
                delay: 0.3,
              }}
            >
              Contact Us
            </motion.p>
          </button>
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center mb-4">
        <p className="mb-1 mt-2">
          <strong>Reserve Now</strong>
        </p>
        <p className="mt-1">Only a 50% deposit</p>
      </div>
      <CustomPayPal
        price={course.fields.ssiPrice / 2 || course.fields.padiPrice / 2}
      />
    </div>
  )
}

export default CourseOverview

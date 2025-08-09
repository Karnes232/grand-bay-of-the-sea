"use client"

import React from "react"
import { motion } from "motion/react"
import Link from "next/link"
import CustomPayPal from "../PayPalComponents/CustomPayPal"
import PaymentPopupCourses from "../PaymentComponents/PaymentPopupCourses"
import { useTranslations } from "next-intl"
const CourseOverview = ({ course }: { course: any }) => {
  const t = useTranslations("CourseOverview")
  return (
    <div className="my-5">
      {" "}
      <div className="flex flex-col justify-center items-center mb-2">
        <h4 className="text-xl font-semibold mb-1 xl:text-3xl">
          <strong>{t("courseOverview")}</strong>
        </h4>
        <p className="my-1 text-center text-sm md:text-base xl:text-lg">
          <b>{t("courseLevel")}:</b> {course.fields.level}
        </p>
        {course.fields.padiPrice && (
          <p className="my-1 text-sm md:text-base xl:text-lg">
            <b>{t("price")}:</b> ${course.fields.padiPrice} {t("perPerson")}
          </p>
        )}

        <p className="my-1 text-sm md:text-base xl:text-lg">
          <b>{t("duration")}: </b>
          {course.fields.duration}
        </p>
        <p className="my-1 text-sm md:text-base xl:text-lg">
          <b> {t("includes")}: </b>
          {t("transport")}
        </p>
        {course.fields.extraInfo && (
          <p className="my-1 text-sm md:text-base xl:text-lg">
            {course.fields.extraInfo}
          </p>
        )}
      </div>
      <div className="flex flex-col justify-center w-[200px] h-[70px] mx-auto space-y-2 my-2">
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
              {t("contactUs")}
            </motion.p>
          </button>
        </Link>
        <PaymentPopupCourses
          course={course.fields.course}
          price={course.fields.padiPrice}
        />
      </div>
      <div className="flex flex-col justify-center items-center mb-4">
        <p className="mb-1 mt-2">
          <strong>{t("reserveNow")}</strong>
        </p>
        <p className="mt-1">{t("only50Deposit")}</p>
      </div>
      {/* <CustomPayPal
        price={course.fields.ssiPrice / 2 || course.fields.padiPrice / 2}
      /> */}
    </div>
  )
}

export default CourseOverview

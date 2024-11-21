"use client"
import Link from "next/link"
import React from "react"
import { motion } from "motion/react"
import CustomPayPal from "../PayPalComponents/CustomPayPal"
const TripOverview = ({ tour }) => {
  return (
    <div className="my-5">
      <div className="flex flex-col justify-center items-center mb-2">
        <h4 className="text-xl font-semibold mb-1 xl:text-3xl">
          <strong>Trip Overview</strong>
        </h4>
        <p className="my-1 text-center text-sm xl:text-base">
          Price: ${tour.price} per person
        </p>
        <p className="my-1 text-center text-sm xl:text-base">(2 tank dive)</p>
        {tour.spectatorSnorkel && (
          <>
            <p className="my-1 text-center text-sm xl:text-base">
              Price: ${tour.spectatorSnorkel} per person
            </p>
            <p className="my-1 text-center text-sm xl:text-base">(companion)</p>{" "}
          </>
        )}
        <p className="my-1 text-center text-sm xl:text-base">
          Duration: {tour.duration}
        </p>
        {tour.extras.map((extra: string) => {
          return (
            <p className="my-1 text-center text-sm xl:text-base">{extra}</p>
          )
        })}
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
        <p className="mt-1">Only a ${tour.depositPrice} deposit</p>
      </div>
      <CustomPayPal price={tour.depositPrice} />
    </div>
  )
}

export default TripOverview

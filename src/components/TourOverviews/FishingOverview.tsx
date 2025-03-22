"use client"
import Link from "next/link"
import React from "react"
import { motion } from "motion/react"
import CustomPayPal from "../PayPalComponents/CustomPayPal"
import PaymentPopup from "../PaymentComponents/PaymentPopup"

interface Tour {
  price: number
  spectatorSnorkel: number
  duration: string
  privateCharter: number
  depositPrice: number
}

const FishingOverview = ({ tour }: { tour: Tour }) => {
  return (
    <div className="my-5">
      <div className="flex flex-col justify-center items-center mb-2">
        <h4 className="text-xl font-semibold mb-1 xl:text-3xl">
          <strong>Fishing Overview</strong>
        </h4>
        <p className="my-1 text-center text-sm xl:text-base">
          Shared Fishing Charter
        </p>
        <p className="my-1 text-center text-sm xl:text-base">
          ${tour.price} per person
        </p>
        <p className="my-1 text-center text-sm xl:text-base">Spectator</p>{" "}
        <p className="my-1 text-center text-sm xl:text-base">
          ${tour.spectatorSnorkel} per person
        </p>
        <p className="my-1 text-center text-sm xl:text-base">
          Private Fishing Charter
        </p>
        <p className="my-1 text-center text-sm xl:text-base">
          Duration: {tour.duration}
        </p>
        <p className="my-1 text-center text-sm xl:text-base">
          Price: ${tour.privateCharter}
        </p>
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
              Contact Us
            </motion.p>
          </button>
        </Link>
        <PaymentPopup tour={tour} />
      </div>
      <div className="flex flex-col justify-center items-center mb-4">
        <p className="mb-1 mt-2">
          <strong>Reserve Shared Charter Now</strong>
        </p>
        <p className="mt-1">Only a ${tour.depositPrice} deposit</p>
      </div>
      {/* <CustomPayPal price={tour.depositPrice} /> */}
    </div>
  )
}

export default FishingOverview

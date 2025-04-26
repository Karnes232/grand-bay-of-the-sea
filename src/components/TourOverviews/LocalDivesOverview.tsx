"use client"
import Link from "next/link"
import React from "react"
import { motion } from "motion/react"
import CustomPayPal from "../PayPalComponents/CustomPayPal"
import PaymentPopupLocalDives from "../PaymentComponents/PaymentPopupLocalDives"

declare global {
  interface Window {
    PADI?: {
      Widget: {
        init: () => void
      }
    }
  }
}

interface DiveInfo {
  title: string
  twoTankDive: number
  duration: string
  fourTankPackage: number
  depositPrice: number
}

const LocalDivesOverview = ({
  info,
  sharkPrice,
}: {
  info: DiveInfo
  sharkPrice: number
}) => {
  return (
    <> <script src="https://travel.padi.com/widget/padi-widget-button.js" defer={false} async={false}></script>
    <div className="my-5">
      {" "}
      <div className="flex flex-col justify-center items-center mb-2">
        <h4 className="text-xl font-semibold mb-1 xl:text-3xl">
          <strong>{info.title}</strong>
        </h4>
        <p className="my-1 text-sm md:text-base xl:text-lg">
          2 Tank Dive: ${info.twoTankDive} per person
        </p>
        <p className="my-1 text-sm md:text-base xl:text-lg">
          Duration: {info.duration}
        </p>
        <p className="my-1 text-sm md:text-base xl:text-lg">
          4 Tank Package: ${info.fourTankPackage}
        </p>
        <p className="my-1 text-sm md:text-base xl:text-lg">
          <Link href="/shark-dive-punta-cana" className="no-underline">
            Shark Dive: ${sharkPrice}
          </Link>
        </p>

        <p className="my-1 text-sm md:text-base xl:text-lg">
          Other packages available upon request
        </p>
      </div>
      <div className="flex flex-col justify-center w-[200px] h-[70px] mx-auto space-y-2 my-2">
        <Link href="/contact" className="no-underline w-[200px] h-[35px]">
          <button className="w-full h-full bg-[#2C2E2F] text-[#FFF] text-sm rounded-3xl px-5">
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
        <PaymentPopupLocalDives tour={info} />
      </div>
      <div className="flex flex-col justify-center items-center mb-4">
        <p className="mb-1 mt-2">
          <strong>Reserve Now</strong>
        </p>
        <p className="mt-1">Only a ${info.depositPrice} deposit</p>
      </div>
      <div className="flex flex-col justify-center items-center mb-4">
        <button
          style={{
            backgroundColor: "#2c2e2f",
            borderColor: "#2c2e2f",
            color: "#FFFFFF",
            cursor: "pointer",
            marginLeft: "auto",
            marginRight: "auto",
            width: "200px",
            height: "35px",
            fontSize: ".875rem",
            borderRadius: "1.5rem",
            textAlign: "center",
            lineHeight: "1.25rem",
            textTransform: "none",
            fontWeight: "400",
            fontFamily: "inherit",
          }}
          className="padi-booking-button"
          id="padi-widget-modal"
          data-aid="27147"
          data-language="en"
          data-currency="USD"
          data-shop-id="75625"
          data-widget-type="adventure_page"
          data-adventure-id="149070"
          data-source="widget_individual_adventure"
        >
          Book now Via Padi
         
        </button>

        
      </div>
    </div></>
  )
}

export default LocalDivesOverview

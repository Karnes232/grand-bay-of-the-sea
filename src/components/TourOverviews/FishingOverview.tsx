"use client"
import Link from "next/link"
import React from "react"
import { motion } from "motion/react"
import CustomPayPal from "../PayPalComponents/CustomPayPal"
import PaymentPopupFishing from "../PaymentComponents/PaymentPopupFishing"
import { useTranslations } from "next-intl"

interface Tour {
  price: number
  spectatorSnorkel: number
  duration: string
  privateCharter: number
  depositPrice: number
}

const FishingOverview = ({ tour }: { tour: Tour }) => {
  const t = useTranslations("FishingOverview")
  return (
    <div className="my-5">
      <div className="flex flex-col justify-center items-center mb-2">
        <h4 className="text-xl font-semibold mb-1 xl:text-3xl">
          <strong>{t("fishingOverview")}</strong>
        </h4>
        <p className="my-1 text-center text-sm xl:text-base">
          {t("sharedFishingCharter")}
        </p>
        <p className="my-1 text-center text-sm xl:text-base">
          ${tour.price} {t("perPerson")}
        </p>
        <p className="my-1 text-center text-sm xl:text-base">
          {t("spectator")}
        </p>{" "}
        <p className="my-1 text-center text-sm xl:text-base">
          ${tour.spectatorSnorkel} {t("perPerson")}
        </p>
        <p className="my-1 text-center text-sm xl:text-base">
          {t("privateFishingCharter")}
        </p>
        <p className="my-1 text-center text-sm xl:text-base">
          {t("duration")}: {tour.duration}
        </p>
        <p className="my-1 text-center text-sm xl:text-base">
          {t("price")}: ${tour.privateCharter}
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
              {t("contactUs")}
            </motion.p>
          </button>
        </Link>
        <PaymentPopupFishing tour={tour} />
      </div>
      <div className="flex flex-col justify-center items-center mb-4">
        <p className="mb-1 mt-2">
          <strong>{t("reserveSharedCharterNow")}</strong>
        </p>
        <p className="mt-1">
          {t("onlyADeposit")}: ${tour.depositPrice} {t("deposit")}
        </p>
      </div>
      {/* <CustomPayPal price={tour.depositPrice} /> */}
    </div>
  )
}

export default FishingOverview

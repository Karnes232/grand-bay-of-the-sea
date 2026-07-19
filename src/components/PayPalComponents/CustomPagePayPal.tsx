"use client"
import React, { useState } from "react"
import CustomPayPal from "./CustomPayPal"
import { useTranslations } from "next-intl"

const CustomPagePayPal = () => {
  const [price, setPrice] = useState(0)
  const updatePrice = e => {
    setPrice(e.target.value)
  }
  const t = useTranslations("CustomPagePayPal")
  return (
    <>
      <div className="mx-auto mb-6 w-full max-w-[13rem]">
        <label
          htmlFor="deposit"
          className="mb-1.5 block text-center text-[13px] font-semibold text-[#12303a]"
        >
          {t("depositAmount")}
        </label>
        <input
          type="number"
          name="deposit"
          id="deposit"
          className="w-full rounded-[11px] border-[1.5px] border-[#d7e0e0] bg-white px-[15px] py-[13px] text-center text-[15px] text-ink outline-none transition-colors focus:border-accent"
          required
          onChange={updatePrice}
        />
      </div>
      <CustomPayPal price={price} />
    </>
  )
}

export default CustomPagePayPal

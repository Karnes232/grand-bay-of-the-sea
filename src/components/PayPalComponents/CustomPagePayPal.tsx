"use client"
import React, { useState } from "react"
import CustomPayPal from "./CustomPayPal"

const CustomPagePayPal = () => {
  const [price, setPrice] = useState(0)
  const updatePrice = e => {
    setPrice(e.target.value)
  }
  return (
    <>
      <div className="max-w-[10rem] mx-auto relative z-0 mb-6 w-full group">
        <input
          type="number"
          name="deposit"
          id="deposit"
          className="text-center block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          required
          onChange={updatePrice}
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Deposit Amount
        </label>
      </div>
      <CustomPayPal price={price} />
    </>
  )
}

export default CustomPagePayPal

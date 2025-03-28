import React from "react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

import Link from "next/link"
import PayPalButtonWrapperBooking from "./PayPalButtonWrapperBooking"
const CustomPayPalBookingForm = ({ price, handleSubmit, formData }) => {
  // const sandBox = "ATyo0QdaaI3Kxm1TaxC-i_RHGTzwdw23bI4dNdjQ-v_bGu0CuKT54AzYFsOYJcXr_ZjO1bvqrHWBhG-c"
  const liveId =" AaPiNuBE-3bjn86CtDSbnbs5nnaeQ-vNhBk48DdMwZ0vsUYGVuE1_38burybKxv_Qn78gXQYUSKf1UG0"
  const currency = "USD"
  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <PayPalScriptProvider
          options={{
            clientId: liveId,
            components: "buttons",
            currency: "USD",
          }}
        >
          <PayPalButtonWrapperBooking
            currency={currency}
            amount={price}
            showSpinner={false}
            handleSubmit={handleSubmit}
            formData={formData}
          />
        </PayPalScriptProvider>
        <p className="text-xs mt-2 mx-6 text-wrap">
          By proceeding with payment, you acknowledge that you have read and
          agree to our{" "}
          <Link href={"/terms-and-conditions"} className="text-blue-700">
            Terms and Conditions
          </Link>
        </p>
      </div>
    </div>
  )
}

export default CustomPayPalBookingForm

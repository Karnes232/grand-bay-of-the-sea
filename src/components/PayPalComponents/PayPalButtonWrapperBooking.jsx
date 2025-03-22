"use client"

import React, { useEffect } from "react"
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js"

const PayPalButtonWrapperBooking = ({
  currency,
  showSpinner,
  amount,
  handleSubmit,
  formData,
}) => {
  const style = { layout: "vertical", shape: "pill" }

  const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    })
  }, [currency, showSpinner])

  const isFormComplete = () => {
    // Check if all required fields have values
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.hotel.trim() !== "" &&
      formData.guestCount > 0 &&
      formData.date !== "" &&
      formData.tourSelect !== ""
      //&&
      // formData.certification !== ""
    )
  }

  const formComplete = isFormComplete()

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      {!formComplete && (
        <div className="text-red-500 mb-2 text-sm">
          Please complete all required fields before proceeding with payment.
        </div>
      )}
      <PayPalButtons
        style={style}
        disabled={!formComplete}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
              application_context: {
                shipping_preference: "NO_SHIPPING",
              },
            })
            .then(orderId => {
              // Your code here after create the order
              return orderId
            })
        }}
        onApprove={async function (data, actions) {
          return actions.order.capture().then(function () {
            handleSubmit(formData)
            // Your code here after capture the order
            console.log("order captured")
          })
        }}
      />
    </>
  )
}

export default PayPalButtonWrapperBooking

"use client"

import React, { useEffect } from "react"
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js"

const PayPalButtonWrapper = ({ currency, showSpinner, amount }) => {
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

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
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
            // Your code here after capture the order
            console.log("order captured")
          })
        }}
      />
    </>
  )
}

export default PayPalButtonWrapper

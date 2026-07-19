"use client"

import React, { useEffect, useRef, useState } from "react"
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js"
import { CgSpinner } from "react-icons/cg"
import { useTranslations } from "next-intl"

const PayPalButtonWrapperBooking = ({
  currency,
  showSpinner,
  amount,
  handleSubmit,
  formData,
}) => {
  const t = useTranslations("PayPalButtonWrapperBooking")
  const style = { layout: "vertical", shape: "pill" }

  const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

  // Once the order is approved and we start recording the booking, block any
  // further triggering of the submit. The ref is the synchronous guard; the
  // state drives the dimmed/spinner UI.
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submittingRef = useRef(false)

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
          {t("pleaseCompleteAllRequiredFieldsBeforeProceedingWithPayment")}
        </div>
      )}
      {isSubmitting && (
        <div className="mb-2 flex items-center justify-center gap-2 text-sm text-gray-600">
          <CgSpinner className="animate-spin" aria-hidden />
          {t("processing")}
        </div>
      )}
      <div
        className={
          isSubmitting
            ? "pointer-events-none opacity-50 transition-opacity"
            : "transition-opacity"
        }
      >
      <PayPalButtons
        style={style}
        disabled={!formComplete || isSubmitting}
        forceReRender={[amount, currency, style, formData.date]}
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
          return actions.order.capture().then(async function () {
            // Payment is captured; record the booking exactly once.
            if (submittingRef.current) return
            submittingRef.current = true
            setIsSubmitting(true)
            await handleSubmit(formData)
            // Your code here after capture the order
            console.log("order captured")
          })
        }}
      />
      </div>
    </>
  )
}

export default PayPalButtonWrapperBooking

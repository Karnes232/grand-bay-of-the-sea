"use client"

import React, { useEffect, useRef, useState } from "react"
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js"
import { useRouter } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { CgSpinner } from "react-icons/cg"

const PayPalButtonWrapper = ({ currency, showSpinner, amount }) => {
  const style = { layout: "vertical", shape: "pill" }

  const [{ options, isPending }, dispatch] = usePayPalScriptReducer()
  const router = useRouter()
  const t = useTranslations("PayPalButtonWrapperBooking")

  // Once the order is captured, block any further checkout and show the
  // processing state while we redirect. The ref is the synchronous guard; the
  // state drives the dimmed/spinner UI. Without this the page gave no feedback
  // after payment and customers paid twice.
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

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
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
          disabled={isSubmitting}
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
              // Payment is captured — confirm exactly once.
              if (submittingRef.current) return
              submittingRef.current = true
              setIsSubmitting(true)
              console.log("order captured")
              router.push("/thankyou")
            })
          }}
        />
      </div>
    </>
  )
}

export default PayPalButtonWrapper

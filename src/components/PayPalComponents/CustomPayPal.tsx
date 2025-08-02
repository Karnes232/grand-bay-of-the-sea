import React from "react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import PayPalButtonWrapper from "./PayPalButtonWrapper"
import Link from "next/link"
import { useTranslations } from "next-intl"
const CustomPayPal = ({ price }) => {
  const currency = "USD"
  const t = useTranslations("CustomPagePayPal")
  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <PayPalScriptProvider
          options={{
            clientId:
              "AaPiNuBE-3bjn86CtDSbnbs5nnaeQ-vNhBk48DdMwZ0vsUYGVuE1_38burybKxv_Qn78gXQYUSKf1UG0",
            components: "buttons",
            currency: "USD",
          }}
        >
          <PayPalButtonWrapper
            currency={currency}
            amount={price}
            showSpinner={false}
          />
        </PayPalScriptProvider>
        <p className="text-xs mt-2 mx-6 text-wrap">
          {t("byProceedingWithPayment")}{' '}
          <Link href={"/terms-and-conditions"} className="text-blue-700">
            {t("termsAndConditions")}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default CustomPayPal

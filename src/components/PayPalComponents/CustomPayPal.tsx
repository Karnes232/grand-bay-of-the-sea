import React from "react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import PayPalButtonWrapper from "./PayPalButtonWrapper"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
const CustomPayPal = ({ price }) => {
  const currency = "USD"
  const t = useTranslations("CustomPagePayPal")
  const sandBox =
    "ATyo0QdaaI3Kxm1TaxC-i_RHGTzwdw23bI4dNdjQ-v_bGu0CuKT54AzYFsOYJcXr_ZjO1bvqrHWBhG-c"
  const liveId =
    "AaPiNuBE-3bjn86CtDSbnbs5nnaeQ-vNhBk48DdMwZ0vsUYGVuE1_38burybKxv_Qn78gXQYUSKf1UG0"
  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <PayPalScriptProvider
          options={{
            clientId: sandBox,
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
        <p className="mx-6 mt-2 text-wrap text-[13.5px] leading-relaxed text-muted">
          {t("byProceedingWithPayment")}{" "}
          <Link
            href={"/terms-and-conditions"}
            className="border-b-[1.5px] border-moss/30 font-semibold text-moss"
          >
            {t("termsAndConditions")}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default CustomPayPal

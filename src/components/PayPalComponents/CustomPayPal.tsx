import React from "react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import PayPalButtonWrapper from "./PayPalButtonWrapper"
const CustomPayPal = ({ price }) => {
  const currency = "USD"
  return (
    <div className="flex justify-center">
      <PayPalScriptProvider
        options={{
          clientId:
            "AWKpOxlq063t4e3-YvGIHBWohFbzZ_o0Y1M2juHc6EaAr5iK_UfOAEKb_YxhdpRvC5uu_Sj444MyUzmZ",
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
    </div>
  )
}

export default CustomPayPal

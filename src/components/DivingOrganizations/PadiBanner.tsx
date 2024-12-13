import React from "react"
import { searchEntries } from "@/lib/contentful"
import Image from "next/image"
const PadiBanner = async () => {
  const searchResults = await searchEntries(
    "layout",
    {
      "fields.companyName": "Grand Bay of the Sea",
    },
    ["fields.padiLogo"],
  )
  return (
    <div className="mt-5 mb-10 mx-5 max-w-6xl md:mx-auto flex flex-col justify-center items-center">
      <Image
        className="w-10/12 lg:w-1/2 mb-8 object-cover"
        src={`https:${(searchResults.items[0] as any).fields.padiLogo?.fields?.file?.url ?? ""}`}
        alt="PADI Logo"
        width={
          (searchResults.items[0] as any).fields.padiLogo?.fields?.file.details
            .image.width
        }
        height={
          (searchResults.items[0] as any).fields.padiLogo?.fields?.file.details
            .image.height
        }
        quality={75}
      />

      <div className="hidden md:block">
        <iframe
          title="PADI"
          className="diviac-iframe md:w-[45rem]"
          id="diviac-iframe"
          style={{
            border: 0,
            margin: 0,
            padding: 0,
            minHeight: "50vh",
            overflow: "auto",
          }}
          src="https://travel.padi.com/widget/dive-operator/grand-bay-of-the-sea/adventures/?products=30&aid=27147&utm_campaign=ww-all-travel-pros-affiliates_shops-widgets&utm_medium=widget&utm_source=affiliate_27147&language=en&currency_code=USD&utm_content=search_iframe"
          data-iframe-type="adventures"
          data-shop-slug="grand-bay-of-the-sea"
          data-shop-id="75625"
          data-widget-type="iframe"
        ></iframe>
      </div>

      <div className="block md:hidden w-full">
        <iframe
          title="PADI"
          className="diviac-iframe w-full md:w-[45rem]"
          id="diviac-iframe"
          style={{
            border: 0,
            margin: 0,
            padding: 0,
            minHeight: "100vh",
            overflow: "auto",
          }}
          src="https://travel.padi.com/widget/dive-operator/grand-bay-of-the-sea/adventures/?products=30&aid=27147&utm_campaign=ww-all-travel-pros-affiliates_shops-widgets&utm_medium=widget&utm_source=affiliate_27147&language=en&currency_code=USD&utm_content=search_iframe"
          data-iframe-type="adventures"
          data-shop-slug="grand-bay-of-the-sea"
          data-shop-id="75625"
          data-widget-type="iframe"
        ></iframe>
      </div>
    </div>
  )
}

export default PadiBanner

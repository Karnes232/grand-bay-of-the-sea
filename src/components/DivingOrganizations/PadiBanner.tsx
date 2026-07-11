import React from "react"
import { searchEntries } from "@/lib/contentful"
import Image, { getImageProps } from "next/image"
import LazyIframeWhenVisible from "@/components/performance/LazyIframeWhenVisible"

// The widget pulls ~1.5 MB of third-party JS (analytics included) once loaded,
// so it must stay behind the lazy facade.
const PADI_WIDGET_SRC =
  "https://travel.padi.com/widget/dive-operator/grand-bay-of-the-sea/adventures/?products=30&aid=27147&utm_campaign=ww-all-travel-pros-affiliates_shops-widgets&utm_medium=widget&utm_source=affiliate_27147&language=en&currency_code=USD&utm_content=search_iframe"

const PadiBanner = async () => {
  const searchResults = await searchEntries(
    "layout",
    {
      "fields.companyName": "Grand Bay of the Sea",
    },
    ["fields.padiLogoDark", "fields.padiLogo"],
  )

  const commonPadi = { alt: "Padi Logo", width: 480, height: 150 }
  const {
    props: { srcSet: darkPadi },
  } = getImageProps({
    ...commonPadi,
    src: `https:${(searchResults.items[0] as any).fields.padiLogoDark?.fields?.file?.url ?? ""}`,
  })
  const {
    props: { srcSet: lightPadi, ...restPadi },
  } = getImageProps({
    ...commonPadi,
    src: `https:${(searchResults.items[0] as any).fields.padiLogo?.fields?.file?.url ?? ""}`,
  })
  return (
    <div className="mt-5 mb-10 mx-5 max-w-6xl md:mx-auto flex flex-col justify-center items-center">
      {/* <Image
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
      /> */}
      <picture className="mb-8 object-cover">
        <source media="(prefers-color-scheme: dark)" srcSet={darkPadi} />
        <source media="(prefers-color-scheme: light)" srcSet={lightPadi} />
        <img {...restPadi} alt={commonPadi.alt} />
      </picture>

      {/* display:none wrappers never intersect, so only the visible
          breakpoint's widget actually loads (previously both did). */}
      <div className="hidden md:block">
        <LazyIframeWhenVisible
          title="PADI booking widget"
          className="diviac-iframe md:w-[45rem]"
          id="diviac-iframe-desktop"
          rootMargin="600px"
          style={{
            border: 0,
            margin: 0,
            padding: 0,
            minHeight: "50vh",
            overflow: "auto",
          }}
          src={PADI_WIDGET_SRC}
          data-iframe-type="adventures"
          data-shop-slug="grand-bay-of-the-sea"
          data-shop-id="75625"
          data-widget-type="iframe"
        />
      </div>

      <div className="block md:hidden w-full">
        <LazyIframeWhenVisible
          title="PADI booking widget"
          className="diviac-iframe w-full md:w-[45rem]"
          id="diviac-iframe-mobile"
          rootMargin="600px"
          style={{
            border: 0,
            margin: 0,
            padding: 0,
            minHeight: "100vh",
            overflow: "auto",
          }}
          src={PADI_WIDGET_SRC}
          data-iframe-type="adventures"
          data-shop-slug="grand-bay-of-the-sea"
          data-shop-id="75625"
          data-widget-type="iframe"
        />
      </div>
    </div>
  )
}

export default PadiBanner

import { searchEntries } from "@/lib/contentful"
import Image, { getImageProps } from "next/image"
import React from "react"

const SSIBanner = async () => {
  const searchResults = await searchEntries(
    "layout",
    {
      "fields.companyName": "Grand Bay of the Sea",
    },
    ["fields.ssiLogoDark", "fields.ssiLogo"],
  )

  const commonSSI = { alt: "SSI Logo", width: 566, height: 150 }
  const {
    props: { srcSet: darkSSI },
  } = getImageProps({
    ...commonSSI,
    src: `https:${(searchResults.items[0] as any).fields.ssiLogoDark?.fields?.file?.url ?? ""}`,
  })
  const {
    props: { srcSet: lightSSI, ...restSSI },
  } = getImageProps({
    ...commonSSI,
    src: `https:${(searchResults.items[0] as any).fields.ssiLogo?.fields?.file?.url ?? ""}`,
  })

  return (
    <div className="flex flex-col items-center justify-center mb-5">
      <picture className="mb-8 object-contain">
        <source media="(prefers-color-scheme: dark)" srcSet={darkSSI} />
        <source media="(prefers-color-scheme: light)" srcSet={lightSSI} />
        <img {...restSSI} />
      </picture>
      {/* <Image
        className="w-10/12 lg:w-1/2 mb-8 object-contain"
        src={`https:${(searchResults.items[0] as any).fields.ssiLogo?.fields?.file?.url ?? ""}`}
        alt="SSI Logo"
        width={
          (searchResults.items[0] as any).fields.ssiLogo?.fields?.file.details
            .image.width
        }
        height={
          (searchResults.items[0] as any).fields.ssiLogo?.fields?.file.details
            .image.height
        }
        quality={75}
      /> */}
      <a
        href="//my.divessi.com/extern/recent_certs.php/810013/2/100P/h/4/300/500"
        target="ssi"
      >
        <iframe
          scrolling="no"
          src="//my.divessi.com/extern/recent_certs.php/810013/2/100P/h/3/300/500"
          frameBorder="0"
          name="SSI - We conduct the following Programs"
          id="ourCertRules"
          title="SSI"
        ></iframe>
      </a>
    </div>
  )
}

export default SSIBanner

import React from "react"
import { getAllEntries, searchEntries } from "@/lib/contentful"
import Image, { getImageProps } from "next/image"
const DivingOrganizations = async () => {
  const searchResults = await searchEntries(
    "layout",
    {
      "fields.companyName": "Grand Bay of the Sea",
    },
    [
      "fields.ssiLogo",
      "fields.ssiLogoDark",
      "fields.padiLogo",
      "fields.padiLogoDark",
    ],
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
    <div className="max-w-6xl m-auto">
      <div className="flex flex-col lg:flex-row items-center justify-center space-x-5 lg:space-x-10 mt-8 mx-5 md:mx-0">
        {/* <Image
          className="w-10/12 md:h-40 lg:w-1/2 mb-8 object-contain"
          src={`https:${(searchResults.items[0] as any).fields.ssiLogo?.fields?.file?.url ?? ""}`}
          alt="Logo"
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
        <picture className="mb-8 object-contain">
          <source media="(prefers-color-scheme: dark)" srcSet={darkSSI} />
          <source media="(prefers-color-scheme: light)" srcSet={lightSSI} />
          <img {...restSSI} />
        </picture>
        <picture className="mb-8 object-cover">
          <source media="(prefers-color-scheme: dark)" srcSet={darkPadi} />
          <source media="(prefers-color-scheme: light)" srcSet={lightPadi} />
          <img {...restPadi} />
        </picture>
        {/* <Image
          className="w-10/12 md:h-40 lg:w-1/2 mb-8 object-contain"
          src={`https:${(searchResults.items[0] as any).fields.padiLogo?.fields?.file?.url ?? ""}`}
          alt="Logo"
          width={
            (searchResults.items[0] as any).fields.padiLogo?.fields?.file
              .details.image.width
          }
          height={
            (searchResults.items[0] as any).fields.padiLogo?.fields?.file
              .details.image.height
          }
        /> */}
      </div>
    </div>
  )
}

export default DivingOrganizations

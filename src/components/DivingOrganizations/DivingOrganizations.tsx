import React from "react"
import { getAllEntries, searchEntries } from "@/lib/contentful"
import Image from "next/image"
const DivingOrganizations = async () => {
  const searchResults = await searchEntries(
    "layout",
    {
      "fields.companyName": "Grand Bay of the Sea",
    },
    ["fields.ssiLogo", "fields.padiLogo"],
  )
  return (
    <div className="max-w-6xl m-auto">
      <div className="flex flex-col lg:flex-row items-center justify-center mt-8">
        <Image
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
        />
        <Image
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
        />
      </div>
    </div>
  )
}

export default DivingOrganizations

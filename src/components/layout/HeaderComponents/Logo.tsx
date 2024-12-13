import React from "react"
import { searchEntries } from "@/lib/contentful"
import Image from "next/image"
import Link from "next/link"
const Logo = async () => {
  const searchResults = await searchEntries(
    "layout",
    {
      "fields.companyName": "Grand Bay of the Sea",
    },
    ["fields.logo"],
  )

  return (
    <div className="flex justify-center items-center">
      <Link href="/" className="no-underline" aria-label="Home">
        <div className="flex p-2 md:p-6 items-center w-20 h-20 cursor-pointer md:w-40 md:h-40">
          <Image
            src={`https:${(searchResults.items[0] as any).fields.logo?.fields?.file?.url ?? ""}`}
            alt="Logo"
            width={
              (searchResults.items[0] as any).fields.logo?.fields?.file.details
                .image.width
            }
            height={
              (searchResults.items[0] as any).fields.logo?.fields?.file.details
                .image.height
            }
            quality={75}
          />{" "}
        </div>
      </Link>
    </div>
  )
}

export default Logo

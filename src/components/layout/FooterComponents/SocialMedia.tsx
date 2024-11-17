import { searchEntries } from "@/lib/contentful"
import React from "react"
import { FaFacebookF, FaInstagram } from "react-icons/fa"
import { GrMail } from "react-icons/gr"
const SocialMedia = async () => {
  const searchResults = await searchEntries(
    "layout",
    {
      "fields.companyName": "Grand Bay of the Sea",
    },
    ["fields.facebook", "fields.instagram", "fields.email"],
  )
  return (
    <div className="border-b border-gray-500 md:border-none">
      <div className="mx-8 flex justify-around py-4 md:mx-auto md:max-w-md">
        <a
          href={searchResults.items[0].fields.facebook as string}
          target="_blank"
          aria-label="Facebook"
          rel="noreferrer"
        >
          <FaFacebookF className="footerIcons" />
        </a>
        <a
          href={searchResults.items[0].fields.instagram as string}
          target="_blank"
          aria-label="Instagram"
          rel="noreferrer"
        >
          <FaInstagram className="footerIcons" />
        </a>
        <a
          href={`mailto:${searchResults.items[0].fields.email}`}
          aria-label="Gmail"
          rel="noreferrer"
        >
          <GrMail className="footerIcons" />
        </a>
      </div>
    </div>
  )
}

export default SocialMedia

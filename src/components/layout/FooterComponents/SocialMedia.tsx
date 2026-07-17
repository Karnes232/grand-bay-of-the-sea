import { searchEntries } from "@/lib/contentful"
import { BUSINESS } from "@/lib/business"
import React from "react"
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa"
import { GrMail } from "react-icons/gr"
const SocialMedia = async () => {
  const searchResults = await searchEntries(
    "layout",
    {
      "fields.companyName": "Grand Bay of the Sea",
    },
    ["fields.facebook", "fields.instagram", "fields.email"],
  )
  const iconLink =
    "grid h-10 w-10 place-items-center rounded-full bg-white/[0.08] text-white transition-colors hover:bg-accent hover:text-ink"
  return (
    <div className="flex gap-3">
      <a
        href={searchResults.items[0].fields.facebook as string}
        target="_blank"
        aria-label="Facebook"
        rel="noreferrer"
        className={iconLink}
      >
        <FaFacebookF className="h-[18px] w-[18px]" />
      </a>
      <a
        href={searchResults.items[0].fields.instagram as string}
        target="_blank"
        aria-label="Instagram"
        rel="noreferrer"
        className={iconLink}
      >
        <FaInstagram className="h-[18px] w-[18px]" />
      </a>
      <a
        href={`mailto:${searchResults.items[0].fields.email}`}
        aria-label="Gmail"
        rel="noreferrer"
        className={iconLink}
      >
        <GrMail className="h-[18px] w-[18px]" />
      </a>
      <a
        href={`https://wa.me/${BUSINESS.phoneE164.replace("+", "")}`}
        target="_blank"
        aria-label="WhatsApp"
        rel="noreferrer"
        className={iconLink}
      >
        <FaWhatsapp className="h-[18px] w-[18px]" />
      </a>
    </div>
  )
}

export default SocialMedia

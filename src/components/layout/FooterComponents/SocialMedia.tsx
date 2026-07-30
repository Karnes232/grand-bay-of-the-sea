import { getSiteSettings } from "@/sanity/queries/SiteSettings/siteSettings"
import React from "react"
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa"
import { GrMail } from "react-icons/gr"
import TrackedWhatsAppLink from "@/components/analytics/TrackedWhatsAppLink"
const SocialMedia = async () => {
  const settings = await getSiteSettings()
  const iconLink =
    "grid h-10 w-10 place-items-center rounded-full bg-white/[0.08] text-white transition-colors hover:bg-accent hover:text-ink"
  return (
    <div className="flex gap-3">
      <a
        href={settings.facebook}
        target="_blank"
        aria-label="Facebook"
        rel="noreferrer"
        className={iconLink}
      >
        <FaFacebookF className="h-[18px] w-[18px]" />
      </a>
      <a
        href={settings.instagram}
        target="_blank"
        aria-label="Instagram"
        rel="noreferrer"
        className={iconLink}
      >
        <FaInstagram className="h-[18px] w-[18px]" />
      </a>
      <a
        href={`mailto:${settings.email}`}
        aria-label="Gmail"
        rel="noreferrer"
        className={iconLink}
      >
        <GrMail className="h-[18px] w-[18px]" />
      </a>
      <TrackedWhatsAppLink
        source="footer"
        aria-label="WhatsApp"
        className={iconLink}
      >
        <FaWhatsapp className="h-[18px] w-[18px]" />
      </TrackedWhatsAppLink>
    </div>
  )
}

export default SocialMedia

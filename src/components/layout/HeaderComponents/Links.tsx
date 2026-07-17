"use client"

import React from "react"
import { Link } from "@/i18n/navigation"
import DropDownMenu from "./DropDownMenu"
import { useTranslations } from "next-intl"

// Shared desktop nav link style for the redesigned header bar.
export const navLinkClass =
  "whitespace-nowrap text-[15px] font-medium text-white/80 transition-colors hover:text-white"

const Links = () => {
  const t = useTranslations("Navbar")
  return (
    <>
      <Link href="/" className={`no-underline ${navLinkClass}`}>
        {t("home")}
      </Link>
      <Link href="/courses" className={`no-underline ${navLinkClass}`}>
        {t("scubaClasses")}
      </Link>
      <DropDownMenu
        name={t("divePackages")}
        subItems={[
          { name: t("localDives"), url: "/sites" },
          { name: t("sharkDive"), url: "/shark-dive-punta-cana" },
          { name: t("diveTrips"), url: "/trips" },
        ]}
        useHover
      />
      <Link
        href="/fishing-punta-cana"
        className={`no-underline ${navLinkClass}`}
      >
        {t("deepSeaFishing")}
      </Link>
      <DropDownMenu
        name={t("photoGallery")}
        subItems={[
          { name: t("photoGallery"), url: "/photo-gallery" },
          { name: t("speciesGuide"), url: "/species" },
        ]}
        useHover
      />
      <Link href="/contact" className={`no-underline ${navLinkClass}`}>
        {t("contactUs")}
      </Link>
    </>
  )
}

export default Links

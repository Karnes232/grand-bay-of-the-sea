import React from "react"
import Link from "next/link"
import "@/styles/header/header.css"
import DropDownMenu from "./DropDownMenu"
import { useTranslations } from "next-intl"

const Links = () => {
  const t = useTranslations("Navbar")
  const links = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Scuba Classes" },
    { href: "/sites", label: "Dive Packages" },
    { href: "/trips", label: "Dive Trips" },
    { href: "/shark-dive-punta-cana", label: "Shark Dive" },
    { href: "/fishing-punta-cana", label: "Deep Sea Fishing" },
    { href: "/contact", label: "Contact Us" },
  ]
  return (
    <>
      <Link href="/" className="no-underline">
        <button className="navLinks">{t("home")}</button>
      </Link>
      <Link href="/courses" className="no-underline">
        <button className="navLinks">{t("scubaClasses")}</button>
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
      <Link href="/fishing-punta-cana" className="no-underline">
        <button className="navLinks">{t("deepSeaFishing")}</button>
      </Link>
      <DropDownMenu
        name={t("photoGallery")}
        subItems={[
          { name: t("photoGallery"), url: "/photo-gallery" },
          { name: t("speciesGuide"), url: "/species" },
        ]}
        useHover
      />
      <Link href="/contact" className="no-underline">
        <button className="navLinks">{t("contactUs")}</button>
      </Link>
    </>
  )
}

export default Links

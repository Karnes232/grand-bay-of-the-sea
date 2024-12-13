import React from "react"
import Link from "next/link"
import "@/styles/header/header.css"
import DropDownMenu from "./DropDownMenu"
const Links = () => {
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
        <button className="navLinks">Home</button>
      </Link>
      <Link href="/courses" className="no-underline">
        <button className="navLinks">Scuba Classes</button>
      </Link>
      <DropDownMenu
        name="Dive Packages"
        subItems={[
          { name: "Local Dives", url: "/sites" },
          { name: "Shark Dive", url: "/shark-dive-punta-cana" },
          { name: "Dive Trips", url: "/trips" },
        ]}
        useHover
      />
      <Link href="/fishing-punta-cana" className="no-underline">
        <button className="navLinks">Deep Sea Fishing</button>
      </Link>
      <DropDownMenu
        name="Photo Gallery"
        subItems={[
          { name: "Photo Gallery", url: "/photo-gallery" },
          { name: "Species Guide", url: "/species" },
        ]}
        useHover
      />
      <Link href="/contact" className="no-underline">
        <button className="navLinks">Contact Us</button>
      </Link>
    </>
  )
}

export default Links

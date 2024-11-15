import React from "react"
import Link from "next/link"
import "@/styles/header/header.css"
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
      {links.map(link => (
        <Link href={link.href} className="no-underline" key={link.href}>
          <button className="navLinks">{link.label}</button>
        </Link>
      ))}
    </>
  )
}

export default Links

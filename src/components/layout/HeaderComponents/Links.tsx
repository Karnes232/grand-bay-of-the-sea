import React from "react"
import Link from "next/link"
import "@/styles/header/header.css"
const Links = () => {
  return (
    <>
      <Link href="/" className="no-underline">
        <button className="navLinks">Home</button>
      </Link>
      <Link href="/courses" className="no-underline">
        <button className="navLinks">Scuba Classes</button>
      </Link>
      <Link href="/sites" className="no-underline">
        <button className="navLinks">Dive Packages</button>
      </Link>
      <Link href="/trips" className="no-underline">
        <button className="navLinks">Dive Trips</button>
      </Link>
      <Link href="/shark-dive-punta-cana" className="no-underline">
        <button className="navLinks">Shark Dive</button>
      </Link>
      <Link href="/fishing-punta-cana" className="no-underline">
        <button className="navLinks">Deep Sea Fishing</button>
      </Link>
      <Link href="/contact" className="no-underline">
        <button className="navLinks">Contact Us</button>
      </Link>
    </>
  )
}

export default Links

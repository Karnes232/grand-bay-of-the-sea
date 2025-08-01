import React from "react"
import SocialMedia from "./SocialMedia"
import "@/styles/footer/footer.css"
import Sitemap from "./Sitemap"
import Copyright from "./Copyright"
import Signature from "./Signature"
import dynamic from "next/dynamic"

const TrustBadges = dynamic(() => import("./TrustBadges"))

const Footer = () => {
  return (
    <footer className="border-b bg-gray-800 shadow-sm w-screen">
      <div className="mx-5 flex max-w-6xl flex-col justify-between xl:mx-auto">
        <SocialMedia />
        <Sitemap />
      
        <TrustBadges />

        <div className="flex flex-col w-full justify-between md:flex-row">
          <Copyright />
        </div>
      </div>
      <Signature />
    </footer>
  )
}

export default Footer

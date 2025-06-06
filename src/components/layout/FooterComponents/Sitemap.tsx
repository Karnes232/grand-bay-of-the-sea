import Link from "next/link"
import React from "react"

const Sitemap = () => {
  return (
    <div className="border-b border-gray-500">
      <div className="mx-8 flex flex-col justify-between pt-4 md:mx-auto md:max-w-2xl md:flex-row">
        <Link href="/">
          <p className="footerSitemap">Home</p>
        </Link>
        <Link href="/courses">
          <p className="footerSitemap">Scuba Classes</p>
        </Link>
        <Link href="/sites">
          <p className="footerSitemap">Dive Packages</p>
        </Link>
        <Link href="/trips">
          <p className="footerSitemap">Dive Trips</p>
        </Link>
      </div>
      <div className="mx-8 flex flex-col justify-around  md:pt-4 md:mx-auto md:max-w-2xl md:flex-row">
        <Link href="/scuba-diving-punta-cana">
          <p className="footerSitemap">Scuba Diving Punta Cana</p>
        </Link>
        <Link href="/shark-dive-punta-cana">
          <p className="footerSitemap">Shark Diving Punta Cana</p>
        </Link>

        <Link href="/fishing-punta-cana">
          <p className="footerSitemap">Deep Sea Fishing</p>
        </Link>
        <Link href="/liveaboard-dominican-republic">
          <p className="footerSitemap">Live Aboards</p>
        </Link>
      </div>
      <div className="mx-8 flex flex-col justify-center md:space-x-8 md:pt-4 md:mx-auto md:max-w-2xl md:flex-row">
        <Link href="/species">
          <p className="footerSitemap">Species Guide</p>
        </Link>
        <Link href="/photo-gallery">
          <p className="footerSitemap">Photo Gallery</p>
        </Link>

        <Link href="/terms-and-conditions">
          <p className="footerSitemap">Cancellation Policy</p>
        </Link>
      </div>
      <div className="mx-8 flex flex-col justify-center md:space-x-8 pb-4 md:pt-4 md:mx-auto md:max-w-2xl md:flex-row">
        <Link href="/sitemap.xml">
          <p className="footerSitemap">Site Map</p>
        </Link>
        <Link href="/blog">
          <p className="footerSitemap">Blog</p>
        </Link>
        <Link href="/contact">
          <p className="footerSitemap">Contact Us</p>
        </Link>
      </div>
    </div>
  )
}

export default Sitemap

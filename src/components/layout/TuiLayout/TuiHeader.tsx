import React, { Suspense } from "react"
import Logo from "../HeaderComponents/Logo"
import LogoSkeleton from "../HeaderComponents/LogoSkeleton"
import TuiHamburgerMenu from "./TuiHamburgerMenu"

const TuiHeader = () => {
  return (
    <nav className="bg-transparent sticky top-0 z-50">
      <div className="flex items-center justify-between bg-transparent max-w-6xl mx-5 xl:mx-auto">
        <Suspense fallback={<LogoSkeleton />}>
          <Logo />
        </Suspense>

        <TuiHamburgerMenu />
      </div>
    </nav>
  )
}

export default TuiHeader

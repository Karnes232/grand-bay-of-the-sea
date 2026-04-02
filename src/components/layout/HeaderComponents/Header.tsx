import React, { Suspense } from "react"
import Logo from "./Logo"
import LogoSkeleton from "./LogoSkeleton"
import Nav from "./Nav"

const Header = () => {
  return (
    <nav className="bg-transparent sticky top-0 z-50">
      <div className="flex items-center justify-between bg-transparent lg:max-w-fit mx-5 xl:mx-auto">
        <Suspense fallback={<LogoSkeleton />}>
          <Logo />
        </Suspense>

        <Nav />
      </div>
    </nav>
  )
}

export default Header

import React from "react"
import Logo from "./Logo"
import Nav from "./Nav"

// Logo is an async server component (cached Contentful fetch). Rendering it
// directly — rather than inside <Suspense> with a skeleton — keeps it in the
// SSR HTML, avoiding the client-side-rendering bailout and the skeleton's CLS.
const Header = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between gap-6 px-4 md:h-24 md:px-6">
        <Logo />

        <Nav />
      </div>
    </header>
  )
}

export default Header

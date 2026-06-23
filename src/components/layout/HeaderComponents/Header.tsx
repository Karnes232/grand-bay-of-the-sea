import React from "react"
import Logo from "./Logo"
import Nav from "./Nav"

// Logo is an async server component (cached Contentful fetch). Rendering it
// directly — rather than inside <Suspense> with a skeleton — keeps it in the
// SSR HTML, avoiding the client-side-rendering bailout and the skeleton's CLS.
const Header = () => {
  return (
    <nav className="bg-transparent sticky top-0 z-50">
      <div className="flex items-center justify-between bg-transparent lg:max-w-fit mx-5 xl:mx-auto">
        <Logo />

        <Nav />
      </div>
    </nav>
  )
}

export default Header

import React from "react"

/** Same outer dimensions as <Logo /> so the header layout does not shift. */
export default function LogoSkeleton() {
  return (
    <div className="flex justify-center items-center" aria-hidden>
      <div className="flex p-2 md:p-6 items-center w-20 h-20 md:w-40 md:h-40">
        <div className="h-full w-full rounded-md bg-white/20 animate-pulse" />
      </div>
    </div>
  )
}

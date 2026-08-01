"use client"

import React from "react"
import { useLocale } from "next-intl"
import { usePathname } from "next/navigation"
import { trackEvent } from "@/lib/analytics"

// Shared WhatsApp CTA: fires a GTM "whatsapp_click" event, then navigates
// (new tab) to /api/wa, which logs the click server-side and redirects to
// wa.me with a localized pre-filled message.
//
// Crawlers fetch the static href from the HTML and were logged as clicks, so
// the href gains a c=1 param only at interaction time (mousedown/keydown fire
// before navigation) — /api/wa logs nothing without it.
const TrackedWhatsAppLink = ({
  source,
  className,
  children,
  onNavigate,
  "aria-label": ariaLabel,
}: {
  source: string
  className?: string
  children: React.ReactNode
  onNavigate?: () => void
  "aria-label"?: string
}) => {
  const locale = useLocale()
  const pathname = usePathname()
  const href = `/api/wa?src=${encodeURIComponent(source)}&locale=${locale}&page=${encodeURIComponent(pathname)}`
  const markIntent = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
    e.currentTarget.href = `${href}&c=1`
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={ariaLabel}
      className={className}
      onMouseDown={markIntent}
      onKeyDown={markIntent}
      onClick={() => {
        trackEvent("whatsapp_click", { location: source, page: pathname })
        onNavigate?.()
      }}
    >
      {children}
    </a>
  )
}

export default TrackedWhatsAppLink

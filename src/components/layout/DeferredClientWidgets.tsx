"use client"

import dynamic from "next/dynamic"

const FloatingContactForm = dynamic(
  () => import("@/components/FloatingButtonComponents/FloatingContactForm"),
  { ssr: false },
)

const ServiceWorkerCleanup = dynamic(
  () =>
    import("@/components/layout/ServiceWorkerCleanup").then(m => ({
      default: m.ServiceWorkerCleanup,
    })),
  { ssr: false },
)

/** Keeps Headless UI, react-select, etc. off the main RSC payload / initial JS. */
export function DeferredClientWidgets() {
  return (
    <>
      <FloatingContactForm />
      <ServiceWorkerCleanup />
    </>
  )
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

// Pushes a GTM dataLayer event. Safe to call before GTM finishes its lazy
// load — the queue is replayed once the container is up.
export function trackEvent(event: string, params?: Record<string, string>) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

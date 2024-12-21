"use client"

import { useEffect } from "react"

export function ServiceWorkerCleanup() {
  useEffect(() => {
    const cleanupServiceWorkers = () => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          for (const registration of registrations) {
            // Check if the service worker is specifically from the Gatsby site
            if (
              registration.scope.includes("https://grandbay-2.netlify.app/")
            ) {
              registration.unregister()
              console.log("Unregistered Gatsby service worker")
            }
          }
        })

        // Optional: Clear caches related to the old site
        if ("caches" in window) {
          caches.keys().then(keyList => {
            return Promise.all(
              keyList.map(key => {
                // Only delete caches with Gatsby-related names
                if (key.includes("gatsby")) {
                  return caches.delete(key)
                }
              }),
            )
          })
        }
      }
    }

    cleanupServiceWorkers()
  }, [])

  return null
}

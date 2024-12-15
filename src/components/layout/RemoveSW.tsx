"use client"
import React, { useEffect } from "react"

const RemoveSW = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.unregister()
        })
      })
    }
    location.reload()
  }, [])
  return <></>
}

export default RemoveSW

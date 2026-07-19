"use client"
import React, { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

/**
 * Light/dark toggle for the class-based theme (darkMode: "class").
 * First visit follows the OS preference (set by the no-flash script in the
 * root locale layout); a click stores an explicit choice in localStorage.
 * Renders nothing until mounted — the icon depends on the client-only class,
 * so SSR can't know it.
 */
const ThemeToggle = ({
  className = "",
  variant = "header",
}: {
  className?: string
  /** "header" = white pill over hero imagery; "menu" = row inside a themed dropdown */
  variant?: "header" | "menu"
}) => {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains("dark"))

    // No stored choice yet → keep following live OS preference changes.
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.theme) return
      } catch {
        return
      }
      document.documentElement.classList.toggle("dark", e.matches)
      setIsDark(e.matches)
    }
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark")
    document.documentElement.classList.toggle("dark", next)
    setIsDark(next)
    try {
      localStorage.theme = next ? "dark" : "light"
    } catch {}
  }

  if (!mounted) {
    return variant === "header" ? (
      <div className={`h-[42px] w-[42px] ${className}`} aria-hidden />
    ) : (
      <div className={`h-9 ${className}`} aria-hidden />
    )
  }

  const label = isDark ? "Switch to light mode" : "Switch to dark mode"
  const icon = isDark ? (
    <Sun className="h-[18px] w-[18px]" aria-hidden />
  ) : (
    <Moon className="h-[18px] w-[18px]" aria-hidden />
  )

  if (variant === "menu") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 dark:text-fg ${className}`}
      >
        {icon}
        <span>{isDark ? "Light mode" : "Dark mode"}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className={`grid h-[42px] w-[42px] place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 ${className}`}
    >
      {icon}
    </button>
  )
}

export default ThemeToggle

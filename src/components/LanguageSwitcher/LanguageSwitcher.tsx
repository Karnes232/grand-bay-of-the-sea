"use client"

import { useRouter, usePathname } from "@/i18n/navigation"
import {
  ACTIVE_LOCALES,
  DEFAULT_LOCALE,
  stripLocalePrefix,
  type Locale,
} from "@/i18n/locales"
import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { Globe, ChevronDown, Loader2 } from "lucide-react"
import { getSafeLocale, preloadLanguageMessages } from "@/utils/languageUtils"

// Display metadata per locale. Which of these actually render is decided by
// ACTIVE_LOCALES, so a locale whose translation isn't live yet stays hidden.
const LOCALE_DISPLAY: Record<Locale, { display: string; flag: string }> = {
  en: { display: "English", flag: "🇺🇸" },
  es: { display: "Español", flag: "🇩🇴" },
  de: { display: "Deutsch", flag: "🇩🇪" },
  fr: { display: "Français", flag: "🇫🇷" },
}

const LANGUAGE_OPTIONS = ACTIVE_LOCALES.map(code => ({
  code,
  ...LOCALE_DISPLAY[code],
}))

interface LanguageSwitcherProps {
  color?: string
  className?: string
  onDropdownToggle?: (isOpen: boolean) => void
}

export default function LanguageSwitcher({
  color = "white",
  className = "",
  onDropdownToggle,
}: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const tA11y = useTranslations("A11y")
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Use useParams at the top level with better error handling
  const params = useParams()
  const currentLocale = (params?.locale as string) || DEFAULT_LOCALE
  const safeLocale = getSafeLocale(currentLocale)

  // Memoize the current language option to prevent unnecessary re-renders
  const currentLangOption = useMemo(
    () =>
      LANGUAGE_OPTIONS.find(lang => lang.code === safeLocale) ||
      LANGUAGE_OPTIONS[0],
    [safeLocale],
  )

  const handleLanguageChange = useCallback(
    async (newLocale: string) => {
      if (newLocale === safeLocale || isLoading) {
        setIsOpen(false)
        onDropdownToggle?.(false)
        return
      }

      setIsLoading(true)
      setIsOpen(false)
      onDropdownToggle?.(false)

      try {
        // Preload the language messages for better performance
        await preloadLanguageMessages(newLocale as any)

        // Use replace instead of push for better performance and to avoid history issues
        // Also add a small delay to ensure the UI updates properly
        await new Promise(resolve => setTimeout(resolve, 100))
        await router.replace(pathname, { locale: newLocale })
      } catch (error) {
        console.error("Language switch error:", error)
        // Fallback: try a full page reload if router fails
        if (typeof window !== "undefined") {
          const currentPath = window.location.pathname
          const newPath =
            newLocale === DEFAULT_LOCALE
              ? stripLocalePrefix(currentPath)
              : `/${newLocale}${stripLocalePrefix(currentPath)}`
          window.location.href = newPath
        }
      } finally {
        setIsLoading(false)
      }
    },
    [safeLocale, isLoading, router, pathname, onDropdownToggle],
  )

  const handleToggle = useCallback(
    (newState: boolean) => {
      if (!isLoading) {
        setIsOpen(newState)
        onDropdownToggle?.(newState)
      }
    },
    [isLoading, onDropdownToggle],
  )

  // Preload other language messages for better performance
  useEffect(() => {
    const preloadOtherLanguages = async () => {
      const otherLanguages = LANGUAGE_OPTIONS.filter(
        lang => lang.code !== safeLocale,
      ).map(lang => preloadLanguageMessages(lang.code as any))

      try {
        await Promise.allSettled(otherLanguages)
      } catch (error) {
        console.warn("Failed to preload some language messages:", error)
      }
    }

    preloadOtherLanguages()
  }, [safeLocale])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        onDropdownToggle?.(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onDropdownToggle])

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-lg z-10 flex items-center justify-center">
          <div className="flex items-center space-x-2 text-orange-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm font-medium">Switching...</span>
          </div>
        </div>
      )}
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <button
          onClick={() => handleToggle(!isOpen)}
          disabled={isLoading}
          aria-label={tA11y("changeLanguage")}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          className={`flex items-center space-x-2 text-${color} transition-all duration-200 px-3 py-2 rounded-lg border border-transparent ${
            isLoading
              ? "opacity-70 cursor-not-allowed bg-gray-100 scale-95"
              : "hover:bg-white/10 hover:scale-105"
          }`}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
          ) : (
            <Globe className="h-5 w-5" />
          )}
          <span
            className={`text-xl transition-opacity duration-200 ${isLoading ? "opacity-50" : ""}`}
          >
            {currentLangOption.flag}
          </span>
          <span
            className={`text-lg font-medium transition-opacity duration-200 ${isLoading ? "opacity-50" : ""}`}
          >
            {isLoading ? "..." : currentLangOption.code.toUpperCase()}
          </span>
          <ChevronDown
            className={`h-3 w-3 transition-all duration-200 ${
              isOpen ? "rotate-180" : ""
            } ${isLoading ? "opacity-50" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Version */}
      <div className="lg:hidden">
        <button
          onClick={() => handleToggle(!isOpen)}
          disabled={isLoading}
          aria-label={tA11y("changeLanguage")}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          className={`flex items-center space-x-1 text-${color} transition-all duration-200 p-2 rounded-lg ${
            isLoading
              ? "opacity-70 cursor-not-allowed bg-accent/10 scale-95"
              : "hover:text-accent hover:bg-accent/10 hover:scale-105"
          }`}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
          ) : (
            <Globe className="h-5 w-5" />
          )}
          <span
            className={`text-lg transition-opacity duration-200 ${isLoading ? "opacity-50" : ""}`}
          >
            {currentLangOption.flag}
          </span>
          <ChevronDown
            className={`h-3 w-3 transition-all duration-200 ${
              isOpen ? "rotate-180" : ""
            } ${isLoading ? "opacity-50" : ""}`}
          />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-card rounded-lg shadow-xl border border-line py-2 z-50">
          {LANGUAGE_OPTIONS.map(lng => {
            const isActive = safeLocale === lng.code
            const isChangingToThis = isLoading && !isActive
            return (
              <button
                key={lng.code}
                onClick={() => handleLanguageChange(lng.code)}
                disabled={isLoading}
                className={`w-full text-left px-4 py-2 flex items-center space-x-3 transition-all duration-200 ${
                  isLoading
                    ? isChangingToThis
                      ? "bg-accent/10 text-accent cursor-not-allowed"
                      : "opacity-50 cursor-not-allowed"
                    : isActive
                      ? "bg-accent/10 text-accent"
                      : "text-muted hover:bg-accent/10 hover:text-accent"
                }`}
              >
                <span
                  className={`text-lg transition-opacity duration-200 ${isChangingToThis ? "opacity-70" : ""}`}
                >
                  {lng.flag}
                </span>
                <span
                  className={`font-medium transition-opacity duration-200 ${isChangingToThis ? "opacity-70" : ""}`}
                >
                  {lng.display}
                </span>
                {isChangingToThis ? (
                  <Loader2 className="ml-auto h-4 w-4 animate-spin text-orange-500" />
                ) : isActive ? (
                  <div className="ml-auto w-2 h-2 bg-orange-500 rounded-full"></div>
                ) : null}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

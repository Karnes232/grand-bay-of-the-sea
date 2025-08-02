"use client"

import { useRouter, usePathname } from "@/i18n/navigation"
import { languages, fallbackLng } from "@/i18n/settings"
import { useState, useRef, useEffect } from "react"
import { useParams } from "next/navigation"
import { Globe, ChevronDown } from "lucide-react"

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
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Use useParams at the top level
  const params = useParams()
  const currentLocale = (params?.locale as string) || fallbackLng
  const safeLocale = languages.includes(currentLocale)
    ? currentLocale
    : fallbackLng

  const languageOptions = [
    { code: "en", display: "English", flag: "🇺🇸" },
    { code: "es", display: "Español", flag: "🇩🇴" },
  ]

  const handleLanguageChange = (newLocale: string) => {
    setIsOpen(false)
    onDropdownToggle?.(false)
    router.replace(pathname, { locale: newLocale })
  }

  const handleToggle = (newState: boolean) => {
    setIsOpen(newState)
    onDropdownToggle?.(newState)
  }

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

  const currentLangOption =
    languageOptions.find(lang => lang.code === safeLocale) || languageOptions[0]

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <button
          onClick={() => handleToggle(!isOpen)}
          className={`flex items-center space-x-2 text-${color}  transition-colors duration-200 px-3 py-2 rounded-lg  border border-transparent `}
        >
          <Globe className="h-5 w-5 " />
          <span className="text-xl">{currentLangOption.flag}</span>
          <span className="text-lg font-medium">
            {currentLangOption.code.toUpperCase()}
          </span>
          <ChevronDown
            className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Version */}
      <div className="lg:hidden">
        <button
          onClick={() => handleToggle(!isOpen)}
          className={`flex items-center space-x-1 text-${color} hover:text-orange-500 transition-colors duration-200 p-2 rounded-lg hover:bg-orange-50`}
        >
          <Globe className="h-5 w-5" />
          <span className="text-lg">{currentLangOption.flag}</span>
          <ChevronDown
            className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
          {languageOptions.map(lng => {
            const isActive = safeLocale === lng.code
            return (
              <button
                key={lng.code}
                onClick={() => handleLanguageChange(lng.code)}
                className={`w-full text-left px-4 py-2 flex items-center space-x-3 hover:bg-orange-50 hover:text-orange-600 transition-colors ${
                  isActive ? "bg-orange-50 text-orange-600" : "text-slate-700"
                }`}
              >
                <span className="text-lg">{lng.flag}</span>
                <span className="font-medium">{lng.display}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-orange-500 rounded-full"></div>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

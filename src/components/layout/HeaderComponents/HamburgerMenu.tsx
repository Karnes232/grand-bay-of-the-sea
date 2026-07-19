"use client"
import React, { Fragment, useState } from "react"
import { Link } from "@/i18n/navigation"
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react"
import { Bars3Icon } from "@heroicons/react/24/outline"
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher"
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle"
import { useTranslations } from "next-intl"

const HamburgerMenu = () => {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const t = useTranslations("Navbar")

  const links = [
    { href: "/", label: t("home") },
    { href: "/courses", label: t("scubaClasses") },
    { href: "/sites", label: t("divePackages") },
    { href: "/trips", label: t("diveTrips") },
    { href: "/shark-dive-punta-cana", label: t("sharkDive") },
    { href: "/fishing-punta-cana", label: t("deepSeaFishing") },
    { href: "/liveaboard-dominican-republic", label: t("liveAboards") },
    { href: "/species", label: t("speciesGuide") },
    { href: "/photo-gallery", label: t("photoGallery") },
    { href: "/contact", label: t("contactUs") },
  ]

  return (
    <>
      <div className="cursor-pointer">
        <Menu>
          <>
            <span className="rounded-md shadow-sm">
              <MenuButton
                className="grid h-[42px] w-[42px] place-items-center rounded-[11px] border border-white/[0.16] bg-white/10 text-white transition-colors hover:bg-white/[0.16] focus:outline-none"
                aria-label="Open navigation menu"
                aria-haspopup="menu"
              >
                <Bars3Icon className="h-5 w-5 text-white" aria-hidden="true" />
              </MenuButton>
            </span>
          </>

          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems
              anchor="bottom"
              static
              className={`absolute right-0 w-56 mt-2 origin-top-right bg-card border border-line divide-y divide-line rounded-md shadow-lg outline-none cursor-default z-50 ${
                isLanguageDropdownOpen ? "pb-32" : ""
              }`}
            >
              <>
                <div className="py-1">
                  {links.map(link => (
                    <MenuItem key={link.href}>
                      <Link href={link.href} className="no-underline">
                        <button
                          className={`active:bg-surface-soft active:text-fg text-muted flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          {link.label}
                        </button>
                      </Link>
                    </MenuItem>
                  ))}
                </div>
              </>
              <div className="px-3 flex flex-col justify-center pb-2">
                <LanguageSwitcher
                  color="muted"
                  className=""
                  onDropdownToggle={isOpen => setIsLanguageDropdownOpen(isOpen)}
                />
                <ThemeToggle variant="menu" />
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </>
  )
}

export default HamburgerMenu

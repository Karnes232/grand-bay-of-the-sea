import React from "react"
import Links from "./Links"
import HamburgerMenu from "./HamburgerMenu"
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher"
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle"
import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"

const Nav = async () => {
  const t = await getTranslations("Navbar")
  return (
    <div className="flex items-center justify-end gap-6">
      <div className="hidden items-center gap-7 xl:flex">
        <Links />
      </div>
      <div className="hidden xl:block">
        <LanguageSwitcher color="white" className="" />
      </div>
      <div className="hidden xl:block">
        <ThemeToggle />
      </div>
      {/*
        flex-none + whitespace-nowrap keep the pill on one line whatever the
        label length. The header row is a fixed h-20 / md:h-24, so a wrapped
        label does not grow the row — it overflows it, which is what made the
        French CTA look like it had made the header taller. Same convention as
        navLinkClass in Links.tsx and the flex-none on the other accent CTAs.
      */}
      <Link
        href="/contact"
        className="flex-none whitespace-nowrap rounded-full bg-accent px-[22px] py-[11px] text-[15px] font-semibold text-ink shadow-[0_8px_24px_rgba(255,106,61,0.28)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(255,106,61,0.4)]"
      >
        {t("bookCta")}
      </Link>
      <div className="xl:hidden">
        <HamburgerMenu />
      </div>
    </div>
  )
}

export default Nav

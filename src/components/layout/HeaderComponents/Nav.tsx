import React from "react"
import Links from "./Links"
import HamburgerMenu from "./HamburgerMenu"
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher"
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
      <Link
        href="/contact"
        className="rounded-full bg-accent px-[22px] py-[11px] text-[15px] font-semibold text-ink shadow-[0_8px_24px_rgba(255,106,61,0.28)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(255,106,61,0.4)]"
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

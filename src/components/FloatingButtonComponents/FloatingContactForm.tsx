"use client"

import React, { useState } from "react"
import { IoClose } from "react-icons/io5"
import { FaRegMessage } from "react-icons/fa6"
import { FaWhatsapp } from "react-icons/fa"
import { Dialog, DialogPanel } from "@headlessui/react"
import { useTranslations } from "next-intl"
import ContactForm from "../ContactForm/ContactForm"
import { BUSINESS } from "@/lib/business"

const FloatingContactForm = () => {
  const t = useTranslations("FloatingContact")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  return (
    <>
      {isMenuOpen && (
        <div className="fixed z-[500] bottom-24 right-6 xl:right-10 flex flex-col items-end gap-3 animate-fade-in-up">
          <a
            href={`https://wa.me/${BUSINESS.phoneE164.replace("+", "")}`}
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 group"
          >
            <span className="rounded-full bg-white/95 px-3 py-1 text-sm font-medium text-gray-800 shadow-md">
              {t("whatsapp")}
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md">
              <FaWhatsapp size={24} aria-hidden />
            </span>
          </a>
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false)
              setIsFormOpen(true)
            }}
            className="flex items-center gap-3 group"
          >
            <span className="rounded-full bg-white/95 px-3 py-1 text-sm font-medium text-gray-800 shadow-md">
              {t("contactForm")}
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/75 text-[#007FFF] shadow-md">
              <FaRegMessage size={22} aria-hidden />
            </span>
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
        aria-expanded={isMenuOpen}
        className="fixed z-[500] flex px-2 justify-center items-center bottom-6 right-6 xl:right-10 rounded-full h-14 w-14 bg-black/75 text-[#007FFF]"
      >
        {isMenuOpen ? (
          <IoClose size={28} aria-hidden />
        ) : (
          <FaRegMessage size={24} aria-hidden />
        )}
      </button>
      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto bg-transparent">
          <div className="flex min-h-screen items-end justify-end p-4">
            <DialogPanel className="mb-20 mr-6 xl:mr-10 w-full max-w-md rounded-xl bg-card p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <div className="absolute top-5 right-5">
                <button
                  type="button"
                  aria-label={t("closeForm")}
                  className="p-2 text-2xl text-gray-500"
                  onClick={() => setIsFormOpen(false)}
                >
                  <IoClose aria-hidden />
                </button>
              </div>
              <div className="">
                <ContactForm onSubmit={() => setIsFormOpen(false)} stacked />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default FloatingContactForm

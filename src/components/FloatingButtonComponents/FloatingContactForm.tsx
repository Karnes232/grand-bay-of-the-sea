"use client"

import React, { useState } from "react"
import { IoClose } from "react-icons/io5"
import { FaRegMessage } from "react-icons/fa6"
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react"
import ContactForm from "../ContactForm/ContactForm"

const FloatingContactForm = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {" "}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-[500] flex px-2 justify-center items-center bottom-6 right-6 xl:right-10 rounded-full h-14 w-14 bg-black/75 text-[#007FFF]"
      >
        <FaRegMessage size={24} />
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto bg-transparent">
          <div className="flex min-h-screen items-end justify-end p-4">
            <DialogPanel className="mb-20 mr-6 xl:mr-10 w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <div className="absolute top-5 right-5">
                <button
                  className="p-2 text-2xl text-gray-500"
                  onClick={() => setIsOpen(false)}
                >
                  <IoClose />
                </button>
              </div>
              <div className="">
                <ContactForm onSubmit={() => setIsOpen(false)} />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default FloatingContactForm

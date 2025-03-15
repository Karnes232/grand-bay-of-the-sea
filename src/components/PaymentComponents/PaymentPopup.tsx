import React, { useState } from "react"
import { IoClose } from "react-icons/io5"
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react"

interface DiveInfo {
  title: string
  twoTankDive: number
  duration: string
  fourTankPackage: number
  depositPrice: number
}

const PaymentPopup = ({ tour }: { tour: DiveInfo }) => {
  const [isOpen, setIsOpen] = useState(false)
  console.log(tour)
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full h-full bg-[#2C2E2F] text-[#FFF] text-sm rounded-3xl px-5"
      >
        Book Now
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-400/70">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-3xl rounded-xl bg-white lg:p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 h-64">
              <div className="fixed top-5 right-5">
                <button
                  className="p-2 text-2xl text-gray-500"
                  onClick={() => setIsOpen(false)}
                >
                  <IoClose />
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default PaymentPopup

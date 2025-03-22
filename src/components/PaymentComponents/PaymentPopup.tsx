import React, { useEffect, useState } from "react"
import { IoClose } from "react-icons/io5"
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react"
import DatePickerComponent from "./DatePickerComponent"
import TourSelect from "./TourSelect"
import CertificationLevel from "./CertificationLevel"
import { submitBookingForm } from "@/app/(root)/actions"
import { useRouter } from "next/navigation"

interface DiveInfo {
  title: string
  twoTankDive: number
  duration: string
  fourTankPackage: number
  depositPrice: number
}

const PaymentPopup = ({ tour }: { tour: DiveInfo }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hotel: "",
    guestCount: 1,
    date: "",
    tourSelect: "",
    certification: "",
    deposit: tour.depositPrice,
    price: 0,
  })

  useEffect(() => {
    if (formData.tourSelect === "Two Tank Dive") {
      setFormData({
        ...formData,
        price: tour.twoTankDive * formData.guestCount,
      })
    }
    if (formData.tourSelect === "Four Tank Package") {
      setFormData({
        ...formData,
        price: tour.fourTankPackage * formData.guestCount,
      })
    }
  }, [formData.tourSelect, formData.guestCount])


  const handleSubmit = async formData => {
    const result = await submitBookingForm(formData)
    if (result.success) {
      try {
        const response = await fetch("/__forms.html", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(result.data).toString(),
        })

        if (response.ok) {
          router.push(`/thankyou/?name=${result.data.name}`)
        } else {
          // Handle error
        }
      } catch (error) {
        console.error("Submission error:", error)
      }
    } else {
      console.log("Submission error")
    }
  }

  const handleInputChange = e => {
    const { name, value } = e.target

    // Special handling for guestCount to ensure it stays within bounds
    if (name === "guestCount") {
      const numValue = parseInt(value, 10) || 1
      const validCount = Math.min(20, Math.max(1, numValue))

      setFormData({
        ...formData,
        [name]: validCount,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#2C2E2F] text-[#FFF] text-sm rounded-3xl px-5  w-[200px] h-[35px]"
      >
        Book Now
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto bg-gray-400/70">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-3xl rounded-xl bg-white lg:p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <div className="fixed top-5 right-5">
                <button
                  className="p-2 text-2xl text-gray-500"
                  onClick={() => setIsOpen(false)}
                >
                  <IoClose />
                </button>
              </div>
              <div className="fixed top-5 right-1/2 translate-x-1/2">
                Contact Info
              </div>
              <div className="rounded-lg p-6 h-full flex flex-col">
                <form
                  action={handleSubmit}
                  name="booking"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  id="booking"
                  className="w-64 md:w-full max-w-md flex flex-col justify-center items-center mx-auto my-5"
                >
                  <input type="hidden" name="bot-field" />
                  <input type="hidden" name="form-name" value="booking" />
                  <input
                    type="hidden"
                    name="deposit"
                    value={formData.deposit}
                  />
                  <input type="hidden" name="price" value={formData.price} />
                  <div className="relative z-0 mb-6 w-full group">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Full Name
                    </label>
                  </div>
                  <div className="relative z-0 mb-6 w-full group">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-6newValue00 peer"
                      placeholder=" "
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative z-0 mb-6 w-full group">
                    <input
                      type="text"
                      name="hotel"
                      id="hotel"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={formData.hotel}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="hotel"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Hotel
                    </label>
                  </div>
                  <div className="relative z-0 mb-6 w-full group">
                    <input
                      type="number"
                      name="guestCount"
                      id="guestCount"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      min="1"
                      max="20"
                      value={formData.guestCount}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="guestCount"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Number of Guests
                    </label>
                  </div>
                  <div className="relative z-0 mb-6 w-full group">
                    <CertificationLevel
                      setFormData={setFormData}
                      formData={formData}
                    />
                  </div>
                  <div className="relative z-0 mb-6 w-full group">
                    <DatePickerComponent
                      setFormData={setFormData}
                      formData={formData}
                    />
                  </div>
                  <div className="relative z-0 mb-6 w-full group">
                    <TourSelect setFormData={setFormData} formData={formData} />
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default PaymentPopup

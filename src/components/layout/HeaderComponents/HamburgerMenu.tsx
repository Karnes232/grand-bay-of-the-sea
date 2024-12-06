import React, { Fragment } from "react"
import Link from "next/link"
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react"
import { Bars3Icon } from "@heroicons/react/24/outline"
const HamburgerMenu = () => {
  const links = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Scuba Classes" },
    { href: "/sites", label: "Dive Packages" },
    { href: "/trips", label: "Dive Trips" },
    { href: "/shark-dive-punta-cana", label: "Shark Dive" },
    { href: "/fishing-punta-cana", label: "Deep Sea Fishing" },
    { href: "/species", label: "Species Guide" },
    { href: "/photo-gallery", label: "Photo Gallery" },
    { href: "/contact", label: "Contact Us" },
  ]

  return (
    <>
      <div className="cursor-pointer">
        <Menu>
          <>
            <span className="rounded-md shadow-sm">
              <MenuButton
                className="inline-flex justify-center w-10 px-4 py-2 font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-transparent border border-gray-800 rounded-md hover:text-gray-500 focus:outline-none focus:border-gray-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                aria-label="menu"
              >
                <span>
                  <Bars3Icon className="h-6 text-gray-800" />
                </span>
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
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
              className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none cursor-default z-50"
            >
              <>
                <div className="py-1">
                  {links.map(link => (
                    <MenuItem key={link.href}>
                      <Link href={link.href} className="no-underline">
                        <button
                          className={`active:bg-gray-100 active:text-gray-900 text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          {link.label}
                        </button>
                      </Link>
                    </MenuItem>
                  ))}
                </div>
              </>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </>

    //             <>
    //               <div className="py-1">
    //                 <Menu.Item>
    //                   {({ active }) => (
    //                     <Link href="/" className="no-underline">
    //                       <button
    //                         className={`${
    //                           active
    //                             ? "bg-gray-100 text-gray-900"
    //                             : "text-gray-700"
    //                         } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
    //                       >
    //                         Home
    //                       </button>
    //                     </Link>
    //                   )}
    //                 </Menu.Item>
    //                 <Menu.Item>
    //                   {({ active }) => (
    //                     <Link href="/courses" className="no-underline">
    //                       <button
    //                         className={`${
    //                           active
    //                             ? "bg-gray-100 text-gray-900"
    //                             : "text-gray-700"
    //                         } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
    //                       >
    //                         Scuba Classes
    //                       </button>
    //                     </Link>
    //                   )}
    //                 </Menu.Item>
    //                 <Menu.Item>
    //                   {({ active }) => (
    //                     <Link href="/sites" className="no-underline">
    //                       <button
    //                         className={`${
    //                           active
    //                             ? "bg-gray-100 text-gray-900"
    //                             : "text-gray-700"
    //                         } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
    //                       >
    //                         Dive Packages
    //                       </button>
    //                     </Link>
    //                   )}
    //                 </Menu.Item>
    //                 <Menu.Item>
    //                   {({ active }) => (
    //                     <Link href="/trips" className="no-underline">
    //                       <button
    //                         className={`${
    //                           active
    //                             ? "bg-gray-100 text-gray-900"
    //                             : "text-gray-700"
    //                         } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
    //                       >
    //                         Dive Trips
    //                       </button>
    //                     </Link>
    //                   )}
    //                 </Menu.Item>
    //                 <Menu.Item>
    //                   {({ active }) => (
    //                     <Link
    //                       href="/shark-dive-punta-cana"
    //                       className="no-underline"
    //                     >
    //                       <button
    //                         className={`${
    //                           active
    //                             ? "bg-gray-100 text-gray-900"
    //                             : "text-gray-700"
    //                         } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
    //                       >
    //                         Shark Dive
    //                       </button>
    //                     </Link>
    //                   )}
    //                 </Menu.Item>
    //                 <Menu.Item>
    //                   {({ active }) => (
    //                     <Link href="/fishing-punta-cana" className="no-underline">
    //                       <button
    //                         className={`${
    //                           active
    //                             ? "bg-gray-100 text-gray-900"
    //                             : "text-gray-700"
    //                         } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
    //                       >
    //                         Deep Sea Fishing
    //                       </button>
    //                     </Link>
    //                   )}
    //                 </Menu.Item>
    //                 <Menu.Item>
    //                   {({ active }) => (
    //                     <Link href="/species" className="no-underline">
    //                       <button
    //                         className={`${
    //                           active
    //                             ? "bg-gray-100 text-gray-900"
    //                             : "text-gray-700"
    //                         } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
    //                       >
    //                         Species Guide
    //                       </button>
    //                     </Link>
    //                   )}
    //                 </Menu.Item>

    //                 <Menu.Item>
    //                   {({ active }) => (
    //                     <Link href="/contact" className="no-underline">
    //                       <button
    //                         className={`${
    //                           active
    //                             ? "bg-gray-100 text-gray-900"
    //                             : "text-gray-700"
    //                         } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
    //                       >
    //                         Contact Us
    //                       </button>
    //                     </Link>
    //                   )}
    //                 </Menu.Item>
    //               </div>
    //             </>
  )
}

export default HamburgerMenu

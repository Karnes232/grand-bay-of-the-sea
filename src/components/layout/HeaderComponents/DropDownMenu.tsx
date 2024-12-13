"use client"
import React, { useRef } from "react"
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react"
import Link from "next/link"
import { ChevronDownIcon } from "@heroicons/react/20/solid"

// Define types for the component props
interface SubItem {
  name: string;
  url: string;
}

interface DropDownMenuProps {
  name: string;
  subItems: SubItem[];
  useHover?: boolean;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ name, subItems, useHover = false }) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutDuration = 200
  let timeout: NodeJS.Timeout | null = null

  const openMenu = () => buttonRef.current?.click()
  
  const closeMenu = () => {
    if (dropdownRef.current) {
      dropdownRef.current.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Escape",
          bubbles: true,
          cancelable: true,
        })
      )
    }
  }

  const onMouseEnter = (closed: boolean) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    if (closed) {
      openMenu()
    }
  }

  const onMouseLeave = (open: boolean) => {
    if (open) {
      timeout = setTimeout(() => closeMenu(), timeoutDuration)
    }
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div
            className={`focus:outline-none focus:border-transparent focus:ring-transparent`}
            onClick={openMenu}
            onMouseEnter={() => useHover && onMouseEnter(!open)}
            onMouseLeave={() => useHover && onMouseLeave(open)}
          >
            <MenuButton
              ref={buttonRef}
              className={`navLinks text-black`}
              translate="no"
            >
              {name}
              <ChevronDownIcon
                aria-hidden="true"
                className={`ml-1 h-5 w-5 navLinks text-black`}
              />
            </MenuButton>
          </div>
          <Transition
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems
              ref={dropdownRef}
              onMouseEnter={() => useHover && onMouseEnter(!open)}
              onMouseLeave={() => useHover && onMouseLeave(open)}
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-2 mt-2">
                {subItems.map((item, index) => (
                  <div className="py-2" key={index}>
                    <MenuItem>
                      {({ focus }) => (
                        <Link
                          href={item.url}
                          className={`font-lato uppercase text-black no-underline mx-3 ${focus ? 'bg-blue-100' : ''}`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </MenuItem>
                  </div>
                ))}
              </div>
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default DropDownMenu
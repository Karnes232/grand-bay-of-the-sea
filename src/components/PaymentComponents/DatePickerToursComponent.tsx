import { LOCALE_TAG, toLocale } from "@/i18n/locales"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import React, { useState } from "react"
import Datepicker from "react-tailwindcss-datepicker"
import "@/styles/datepicker-popover.css"

const START_FROM = new Date()
START_FROM.setMonth(START_FROM.getMonth())

// Define available days for tours
const TOUR_AVAILABLE_DAYS = {
  "Catalina Island": [1, 3, 5], // Monday (1), Wednesday (3), Friday (5)
  Bayahibe: [2, 4], // Tuesday (2), Thursday (4)
  "Saona Island": [1, 5], // Monday (1), Friday (5)
  "Shark Dive Punta Cana": [0, 1, 2, 3, 4, 5, 6], // Monday (1), Tuesday (2), Wednesday (3), Thursday (4), Friday (5), Saturday (6)
}

/**
 * Weekday names in the reader's language, indexed by JS day number (0 = Sunday).
 *
 * Derived from `Intl` rather than hand-written: this file carried English and
 * Spanish tables and picked between them with `locale === "es"`, so German tour
 * pages listed their available days in English.
 *
 * The first letter is upper-cased because Spanish and German `Intl` return
 * "domingo" where the old table said "Domingo", and these render as standalone
 * labels rather than mid-sentence. 2023-01-01 was a Sunday, so adding the day
 * number lands on the right weekday.
 */
const dayNames = (locale: string): string[] => {
  const format = new Intl.DateTimeFormat(LOCALE_TAG[toLocale(locale)], {
    weekday: "long",
    timeZone: "UTC",
  })
  return Array.from({ length: 7 }, (_, day) => {
    const name = format.format(new Date(Date.UTC(2023, 0, 1 + day)))
    return name.charAt(0).toUpperCase() + name.slice(1)
  })
}

const DatePickerToursComponent = ({ setFormData, formData, tour }) => {
  const t = useTranslations("DatePickerComponent")
  const params = useParams()
  const locale = toLocale(params?.locale as string)
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  })
  const [selectedDate, setSelectedDate] = useState(null)

  const getDayNames = () => dayNames(locale)

  // Get available days for the specific tour
  const getAvailableDays = () => {
    if (!tour || !TOUR_AVAILABLE_DAYS[tour]) return []
    const dayNames = getDayNames()
    return TOUR_AVAILABLE_DAYS[tour].map(day => dayNames[day])
  }

  const handleValueChange = (newValue: any) => {
    if (newValue.startDate) {
      const dateObj = new Date(newValue.startDate)
      const dayOfWeek = dateObj.getDay()

      // Check if the selected date is available for the tour
      if (TOUR_AVAILABLE_DAYS[tour]?.includes(dayOfWeek)) {
        const weekday = new Intl.DateTimeFormat(LOCALE_TAG[locale], {
          dateStyle: "full",
        }).format(dateObj)

        setValue(newValue)
        setSelectedDate(weekday)
        setFormData({
          ...formData,
          date: weekday,
        })
      } else {
        // Reset if an invalid date is selected
        setValue({ startDate: null, endDate: null })
        setSelectedDate(null)
        setFormData({
          ...formData,
          date: "",
        })
      }
    }
  }

  // Get available days text
  const availableDaysText = getAvailableDays().join(", ")

  return (
    <div>
      <div className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">
        <input type="hidden" name="date" value={selectedDate || ""} />
        <Datepicker
          placeholder={t("preferredDate")}
          asSingle={true}
          useRange={false}
          minDate={START_FROM}
          startFrom={START_FROM}
          value={value}
          popoverDirection="up"
          onChange={handleValueChange}
          inputClassName="pl-0 w-full bg-transparent text-gray-900 outline-none"
        />
      </div>
      {tour && (
        <p className="text-red-500 text-xs mt-1">
          {t("availableDaysFor")} {tour}: {availableDaysText}
        </p>
      )}
    </div>
  )
}

export default DatePickerToursComponent

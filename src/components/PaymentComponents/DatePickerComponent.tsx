import React, { useState } from "react"
import Datepicker, { DateRangeType } from "react-tailwindcss-datepicker"

const START_FROM = new Date()
START_FROM.setMonth(START_FROM.getMonth())

const DatePickerComponent = ({ setFormData, formData }) => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  })
  const [selectedDate, setSelectedDate] = useState(null)
  const [isSundaySelected, setIsSundaySelected] = useState(false)

  // Generate disabled Sunday dates
  const generateDisabledSundays = (): DateRangeType[] => {
    return Array.from({ length: 52 }, (_, i) => {
      const date = new Date(START_FROM)
      date.setDate(date.getDate() + i * 7)

      // Only return Sunday dates
      if (date.getDay() === 0) {
        return {
          startDate: date,
          endDate: date,
        }
      }
      return null
    }).filter(Boolean) as DateRangeType[]
  }

  const handleValueChange = (newValue: any) => {
    // Check if the selected date is a Sunday
    const selectedDate = new Date(newValue.startDate)
    const isSunday = selectedDate.getDay() === 0

    if (isSunday) {
      // If Sunday is selected, reset the date and show warning
      setIsSundaySelected(true)
      setValue({ startDate: null, endDate: null })
      return
    }

    // Clear Sunday warning if a non-Sunday is selected
    setIsSundaySelected(false)

    const weekday = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
    }).format(newValue.startDate)

    setValue(newValue)
    setSelectedDate(weekday)
    setFormData({
      ...formData,
      date: weekday,
    })
  }

  // Custom function to disable Sundays
  const isDayDisabled = (date: Date) => {
    return date.getDay() === 0
  }

  return (
    <div className="relative">
      <div className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">
        <input type="hidden" name="date" value={selectedDate || ""} />
        <Datepicker
          placeholder={"Preferred Date"}
          asSingle={true}
          useRange={false}
          minDate={START_FROM}
          startFrom={START_FROM}
          value={value}
          popoverDirection="up"
          onChange={handleValueChange}
          inputClassName="pl-0"
          disabledDates={generateDisabledSundays()}
        />
      </div>
      {isSundaySelected && (
        <p className="text-red-500 text-sm mt-1">
          Closed on Sundays. Please select another date.
        </p>
      )}
    </div>
  )
}

export default DatePickerComponent

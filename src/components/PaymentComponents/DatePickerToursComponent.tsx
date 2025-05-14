import React, { useState } from "react"
import Datepicker from "react-tailwindcss-datepicker"

const START_FROM = new Date()
START_FROM.setMonth(START_FROM.getMonth())

// Define available days for tours
const TOUR_AVAILABLE_DAYS = {
  "Catalina Island": [1, 3, 5], // Monday (1), Wednesday (3), Friday (5)
  Bayahibe: [2, 4], // Tuesday (2), Thursday (4)
  "Saona Island": [2, 4, 6], // Tuesday (2), Thursday (4), Saturday (6)
  "Shark Dive Punta Cana": [1, 2, 3, 4, 5, 6], // Monday (1), Tuesday (2), Wednesday (3), Thursday (4), Friday (5), Saturday (6)
}

// Map of day numbers to day names
const DAY_NAMES = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
}

const DatePickerToursComponent = ({ setFormData, formData, tour }) => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  })
  const [selectedDate, setSelectedDate] = useState(null)
  // Get available days for the specific tour
  const getAvailableDays = () => {
    if (!tour || !TOUR_AVAILABLE_DAYS[tour]) return []
    return TOUR_AVAILABLE_DAYS[tour].map(day => DAY_NAMES[day])
  }

  const handleValueChange = (newValue: any) => {
    if (newValue.startDate) {
      const dateObj = new Date(newValue.startDate)
      const dayOfWeek = dateObj.getDay()

      // Check if the selected date is available for the tour
      if (TOUR_AVAILABLE_DAYS[tour]?.includes(dayOfWeek)) {
        const weekday = new Intl.DateTimeFormat("en-US", {
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
          placeholder={"Preferred Date"}
          asSingle={true}
          useRange={false}
          minDate={START_FROM}
          startFrom={START_FROM}
          value={value}
          popoverDirection="up"
          onChange={handleValueChange}
          inputClassName="pl-0"
        />
      </div>
      {tour && (
        <p className="text-red-500 text-xs mt-1">
          Available days for {tour}: {availableDaysText}
        </p>
      )}
    </div>
  )
}

export default DatePickerToursComponent

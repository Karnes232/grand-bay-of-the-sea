import React, { useEffect, useState } from "react"
import Datepicker from "react-tailwindcss-datepicker"

const START_FROM = new Date()
START_FROM.setMonth(START_FROM.getMonth())

const DatePickerComponent = ({ setFormData, formData }) => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  })
  const [selectedDate, setSelectedDate] = useState(null)

  const handleValueChange = (newValue: any) => {
    const weekday = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
    }).format(newValue.startDate)
    // }
    setValue(newValue)
    setSelectedDate(weekday)
    setFormData({
      ...formData,
      date: weekday,
    })
  }

  return (
    <div className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">
        <input type="hidden" name="date" value={selectedDate} />
      <Datepicker
        placeholder={"Preferred Date"}
        asSingle={true}
        useRange={false}
        minDate={START_FROM}
        startFrom={START_FROM}
        value={value}
        popoverDirection="up"
        onChange={handleValueChange}
        inputClassName='pl-0'
      />
    </div>
  )
}

export default DatePickerComponent

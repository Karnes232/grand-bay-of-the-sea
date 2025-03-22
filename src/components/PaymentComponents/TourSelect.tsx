import React, { useEffect, useState } from "react"
import Select from "react-select"
const TourSelect = ({ setFormData, formData }) => {
  // const [contentfulData, setContentfulData] = useState<any[]>([])
  // useEffect(() => {
  //   const fetchContentfulData = async () => {
  //     try {
  //       const response = await fetch("/api/contentful")
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch content")
  //       }
  //       const data = await response.json()
  //       setContentfulData(data)
  //     } catch (error) {
  //       console.error("Error fetching Contentful data:", error)
  //     } finally {
  //     }
  //   }

  //   fetchContentfulData()
  // }, [])

  const style = {
    control: base => ({
      ...base,
      border: 1,
      // This line disable the blue border
      boxShadow: "none",
    }),
    menuPortal: provided => ({ ...provided, zIndex: 9999 }),
    menu: provided => ({ ...provided, zIndex: 9999 }),
  }

  const options = [
    {
      value: "Two Tank Dive",
      label: "Two Tank Dive",
    },
    {
      value: "Four Tank Package",
      label: "Four Tank Package",
    },
  ]
  // contentfulData.map(tour => {
  //   const option = {
  //     value: tour.title,
  //     label: tour.title,
  //   }
  //   return options.push(option)
  // })

  const handleChange = e => {
    setFormData({
      ...formData,
      tourSelect: e.value,
    })
  }
  return (
    <>
      <div className="relative mb-2 w-full group">
        <Select
          options={options}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          classNamePrefix="select"
          isSearchable={true}
          name="tourSelect"
          onChange={handleChange}
          placeholder="Excursion"
          styles={style}
          required
          menuPortalTarget={document.body}
        />
      </div>
    </>
  )
}

export default TourSelect

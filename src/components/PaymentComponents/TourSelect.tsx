import React from "react"
import Select from "react-select"
import { useTranslations } from "next-intl"
const TourSelect = ({ setFormData, formData }) => {
  const t = useTranslations("TourSelect")

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
      label: t("twoTankDive"),
    },
    {
      value: "Four Tank Package",
      label: t("fourTankPackage"),
    },
  ]

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
          placeholder={t("excursion")}
          styles={style}
          required
          menuPortalTarget={document.body}
        />
      </div>
    </>
  )
}

export default TourSelect

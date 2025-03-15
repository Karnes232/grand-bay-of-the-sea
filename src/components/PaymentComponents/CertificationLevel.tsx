import React from "react"
import Select from "react-select"
const CertificationLevel = ({ setFormData, formData }) => {
  const style = {
    control: base => ({
      ...base,
      border: 1,
      // This line disable the blue border
      boxShadow: "none",
      zIndex: 50,
    }),
    menuPortal: base => ({ ...base, zIndex: 9999 }),
  }
  const options = [
    {
      value: "Not Certifed",
      label: "Not Certifed",
    },
    {
      value: "Open Water",
      label: "Open Water",
    },
    {
      value: "Advanced",
      label: "Advanced",
    },
    {
      value: "Rescue +",
      label: "Rescue +",
    },
  ]

  const handleChange = e => {
    setFormData({
      ...formData,
      certification: e.value,
    })
  }
  return (
    <div className="relative mb-2 w-full group z-50">
      <Select
        options={options}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer z-50"
        classNamePrefix="select"
        isSearchable={true}
        name="certification"
        onChange={handleChange}
        placeholder="Certification Level"
        menuPortalTarget={document.body}
        styles={style}
        required
      />
    </div>
  )
}

export default CertificationLevel

import React from "react"
import Select from "react-select"
import { useTranslations } from "next-intl"
const CertificationLevel = ({
  setFormData,
  formData,
  themed = false,
}: {
  setFormData: (data: any) => void
  formData: any
  /** Theme-aware styling for surfaces that flip in dark mode (ContactForm).
   *  The payment popups stay light in both themes and omit this. */
  themed?: boolean
}) => {
  const t = useTranslations("CertificationLevel")
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

  // react-select paints its internals with inline colors, so Tailwind tokens
  // never reach it — feed it the same CSS variables instead. The menu portals
  // to document.body, which is still under html.dark, so the vars resolve.
  const themedStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "rgb(var(--card))",
      borderColor: state.isFocused
        ? "rgb(var(--accent))"
        : "rgb(var(--line-strong))",
      borderWidth: 1.5,
      borderRadius: 11,
      minHeight: 48,
      boxShadow: "none",
      "&:hover": {
        borderColor: state.isFocused
          ? "rgb(var(--accent))"
          : "rgb(var(--line-strong))",
      },
      zIndex: 50,
    }),
    singleValue: base => ({ ...base, color: "rgb(var(--fg))" }),
    input: base => ({ ...base, color: "rgb(var(--fg))" }),
    placeholder: base => ({ ...base, color: "rgb(var(--faint))" }),
    menu: base => ({
      ...base,
      backgroundColor: "rgb(var(--card))",
      border: "1px solid rgb(var(--line))",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? "rgb(var(--accent) / 0.12)"
        : "transparent",
      color: state.isFocused ? "rgb(var(--accent))" : "rgb(var(--muted))",
      cursor: "pointer",
    }),
    menuPortal: base => ({ ...base, zIndex: 9999 }),
  }
  const options = [
    {
      value: "Not Certifed",
      label: t("notCertified"),
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
        className={
          themed
            ? "block w-full text-sm z-50"
            : "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer z-50"
        }
        classNamePrefix="select"
        isSearchable={true}
        name="certification"
        onChange={handleChange}
        placeholder={t("certificationLevel")}
        menuPortalTarget={
          typeof window !== "undefined" ? document.body : undefined
        }
        styles={themed ? themedStyles : style}
        required
      />
    </div>
  )
}

export default CertificationLevel

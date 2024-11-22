// app/actions.ts
"use server"

export async function submitForm(formData: FormData) {
  const name = formData.get("name")
  const email = formData.get("email")
  const hotel = formData.get("hotel")
  const message = formData.get("message")

  // Encode form data for Netlify
  const encode = (data: any) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        name,
        email,
        hotel,
        message,
      }),
    })

    if (response.ok) {
      // Redirect or handle success
      return { success: true }
    } else {
      return { success: false }
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return { success: false }
  }
}

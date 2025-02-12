"use server"

export async function submitForm(formData: any) {
  const name = formData.get("name")
  const email = formData.get("email")
  const hotel = formData.get("hotel")
  const message = formData.get("message")

  try {
    return {
      success: true,
      data: {
        "form-name": "contact",
        name: name?.toString() || "",
        email: email?.toString() || "",
        hotel: hotel?.toString() || "",
        message: message?.toString() || "",
      },
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return { success: false }
  }
}

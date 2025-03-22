"use server"
import { sendConfirmationEmail } from "@/app/actions/send-confirmation"
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

export async function submitBookingForm(formData: any) {
  const name = formData.get("name")
  const email = formData.get("email")
  const hotel = formData.get("hotel")
  const guestCount = formData.get("guestCount")
  const date = formData.get("date")
  const tourSelect = formData.get("tourSelect")
  const certification = formData.get("certification")
  const deposit = formData.get("deposit")
  const price = formData.get("price")

  try {
    await sendConfirmationEmail({
      customerName: name,
      customerEmail: email,
      hotel: hotel,
      excursionName: tourSelect,
      excursionDate: date,
      guestCount: guestCount,
      certification: certification,
      deposit: deposit,
      price: price,
      // Add all other required fields
    })
    return {
      success: true,
      data: {
        "form-name": "booking",
        name: name?.toString() || "",
        email: email?.toString() || "",
        hotel: hotel?.toString() || "",
        guestCount: guestCount?.toString() || "",
        date: date?.toString() || "",
        tourSelect: tourSelect?.toString() || "",
        certification: certification?.toString() || "",
        deposit: deposit?.toString() || "",
        price: price?.toString() || "",
      },
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return { success: false }
  }
}

"use server"
import { sendConfirmationEmail, sendConfirmationFishingEmail } from "@/app/actions/send-confirmation"
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
  // const name = formData.get("name")
  // const email = formData.get("email")
  // const hotel = formData.get("hotel")
  // const guestCount = formData.get("guestCount")
  // const date = formData.get("date")
  // const tourSelect = formData.get("tourSelect")
  // const certification = formData.get("certification")
  // const deposit = formData.get("deposit")
  // const price = formData.get("price")

  try {
    await sendConfirmationEmail({
      customerName: formData.name,
      customerEmail: formData.email,
      hotel: formData.hotel,
      excursionName: formData.tourSelect,
      excursionDate: formData.date,
      guestCount: formData.guestCount,
      certification: formData.certification,
      deposit: formData.deposit,
      price: formData.price,
      // Add all other required fields
    })
    return {
      success: true,
      data: {
        "form-name": "booking",
        name: formData.name?.toString() || "",
        email: formData.email?.toString() || "",
        hotel: formData.hotel?.toString() || "",
        guestCount: formData.guestCount?.toString() || "",
        date: formData.date?.toString() || "",
        tourSelect: formData.tourSelect?.toString() || "",
        certification: formData.certification?.toString() || "",
        deposit: formData.deposit?.toString() || "",
        price: formData.price?.toString() || "",
      },
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return { success: false }
  }
}

export async function submitFishingForm(formData: any) {
  // const name = formData.get("name")
  // const email = formData.get("email")
  // const hotel = formData.get("hotel")
  // const guestCount = formData.get("guestCount")
  // const date = formData.get("date")
  // const tourSelect = formData.get("tourSelect")
  // const certification = formData.get("certification")
  // const deposit = formData.get("deposit")
  // const price = formData.get("price")

  try {
    await sendConfirmationFishingEmail({
      customerName: formData.name,
      customerEmail: formData.email,
      hotel: formData.hotel,
      excursionName: formData.tourSelect,
      excursionDate: formData.date,
      guestCount: formData.guestCount,
      spectator: formData.spectator,
      certification: formData.certification,
      deposit: formData.deposit,
      price: formData.price,
      // Add all other required fields
    })
    return {
      success: true,
      data: {
        "form-name": "booking",
        name: formData.name?.toString() || "",
        email: formData.email?.toString() || "",
        hotel: formData.hotel?.toString() || "",
        guestCount: formData.guestCount?.toString() || "",
        spectator: formData.spectator?.toString() || "",
        date: formData.date?.toString() || "",
        tourSelect: formData.tourSelect?.toString() || "",
        certification: formData.certification?.toString() || "",
        deposit: formData.deposit?.toString() || "",
        price: formData.price?.toString() || "",
      },
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return { success: false }
  }
}

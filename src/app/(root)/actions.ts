"use server"
import {
  sendConfirmationEmail,
  sendConfirmationFishingEmail,
  sendConfirmationTripEmail,
} from "@/app/actions/send-confirmation"
export async function submitForm(formData: any, certificationData: any) {
  const name = formData.get("name")
  const email = formData.get("email")
  const hotel = formData.get("hotel")
  const message = formData.get("message")
  const certification = certificationData.get("certification")
  try {
    return {
      success: true,
      data: {
        "form-name": "contact",
        name: name?.toString() || "",
        email: email?.toString() || "",
        hotel: hotel?.toString() || "",
        message: message?.toString() || "",
        certification: certification?.toString() || "",
      },
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return { success: false }
  }
}

export async function submitBookingForm(formData: any) {
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
        "form-name": "fishing",
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

export async function submitTripForm(formData: any) {
  try {
    await sendConfirmationTripEmail({
      customerName: formData.name,
      customerEmail: formData.email,
      hotel: formData.hotel,
      excursionName: formData.tourSelect,
      excursionDate: formData.date,
      guestCount: formData.guestCount,
      snorkelers: formData.snorkelers,
      certification: formData.certification,
      deposit: formData.deposit,
      price: formData.price,
      // Add all other required fields
    })
    return {
      success: true,
      data: {
        "form-name": "trip",
        name: formData.name?.toString() || "",
        email: formData.email?.toString() || "",
        hotel: formData.hotel?.toString() || "",
        guestCount: formData.guestCount?.toString() || "",
        snorkelers: formData.snorkelers?.toString() || "",
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

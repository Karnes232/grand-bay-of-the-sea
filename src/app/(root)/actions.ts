"use server"
import {
  sendConfirmationEmail,
  sendConfirmationFishingEmail,
  sendConfirmationTripEmail,
} from "@/app/actions/send-confirmation"
import { supabaseServer } from "@/lib/supabaseServer"

async function saveBookingToSupabase(formData: any, formType: string) {
  const { error } = await supabaseServer.from("Grand Bay Bookings").insert([
    {
      name: formData.name?.toString() || "",
      email: formData.email?.toString() || "",
      hotel: formData.hotel?.toString() || "",
      tour_name: formData.tourSelect?.toString() || "",
      excursion_date: formData.date?.toString() || "",
      guest_count: formData.guestCount?.toString() || "",
      snorkelers: formData.snorkelers?.toString() || "",
      spectators: formData.spectator?.toString() || "",
      certification_level: formData.certification?.toString() || "",
      deposit: formData.deposit?.toString() || "",
      price: formData.price?.toString() || "",
      form_type: formType,
    },
  ])

  if (error) {
    console.error("Failed to save booking.", error)
  } else {
    console.log("Booking saved successfully.")
  }
}

export async function submitForm(formData: any, certificationData: any) {
  const name = formData.get("name")
  const email = formData.get("email")
  const hotel = formData.get("hotel")
  const message = formData.get("message")
  const page = formData.get("page")

  if (certificationData?.certification !== "Not Certifed") {
    // Check if email already exists in the database
    const { data: existingRecords, error: checkError } = await supabaseServer
      .from("Grand Bay Certifed Divers")
      .select("email")
      .eq("email", email)

    if (checkError) {
      console.error("Failed to check for existing client.", checkError)
    } else if (!existingRecords || existingRecords.length === 0) {
      // Email doesn't exist, proceed with insert
      const { error } = await supabaseServer
        .from("Grand Bay Certifed Divers")
        .insert([
          {
            name,
            email,
            certification_level: certificationData?.certification,
          },
        ])

      if (error) {
        console.error("Failed to save client.", error)
      } else {
        console.log("Client saved successfully.")
      }
    } else {
      console.log("Client with this email already exists, skipping insert.")
    }
  }

  try {
    return {
      success: true,
      data: {
        "form-name": "contact",
        name: name?.toString() || "",
        email: email?.toString() || "",
        hotel: hotel?.toString() || "",
        message: message?.toString() || "",
        certification: certificationData?.certification?.toString() || "",
        page: page?.toString() || "",
      },
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return { success: false }
  }
}

/**
 * Homepage "Request a booking" lead form. Saves to Supabase (form_type "lead"
 * so the owner can tell website leads from full bookings) and emails the
 * customer a confirmation via the existing Resend template. Owner notification
 * is handled by the Netlify Forms capture on the client (form-name "booking").
 */
export async function submitLeadForm(formData: any) {
  await saveBookingToSupabase(formData, "lead")

  try {
    await sendConfirmationEmail({
      customerName: formData.name,
      customerEmail: formData.email,
      hotel: "",
      excursionName: formData.tourSelect || "Dive booking request",
      excursionDate: formData.date,
      guestCount: formData.guestCount,
      certification: formData.certification,
      deposit: "",
      price: "",
    })
    return {
      success: true,
      data: {
        "form-name": "booking",
        name: formData.name?.toString() || "",
        email: formData.email?.toString() || "",
        date: formData.date?.toString() || "",
        guestCount: formData.guestCount?.toString() || "",
        certification: formData.certification?.toString() || "",
      },
    }
  } catch (error) {
    console.error("Lead form submission error:", error)
    return { success: false }
  }
}

export async function submitBookingForm(formData: any) {
  await saveBookingToSupabase(formData, "booking")

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
  await saveBookingToSupabase(formData, "fishing")

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
  await saveBookingToSupabase(formData, "trip")

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

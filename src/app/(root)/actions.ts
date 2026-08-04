"use server"
import { supabaseServer } from "@/lib/supabaseServer"

// Payment-form submissions (booking/fishing/trip) live in the route handler
// at src/app/api/booking/route.ts, NOT here: server-action IDs are invalidated
// by every deploy, which lost paid bookings made from pages loaded before a
// redeploy. Only non-payment lead forms remain as server actions.

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
 * Homepage "Request a booking" CTA. This is a plain lead/inquiry — no deposit,
 * no payment — so it behaves like a contact submission: it does NOT write to the
 * Grand Bay Bookings table and does NOT send a booking confirmation email. The
 * owner is notified through Netlify Forms (form-name "cta"); this action just
 * reshapes the payload into the fields Netlify captures.
 */
export async function submitCtaForm(formData: any) {
  try {
    return {
      success: true,
      data: {
        "form-name": "cta",
        name: formData.name?.toString() || "",
        email: formData.email?.toString() || "",
        date: formData.date?.toString() || "",
        guestCount: formData.guestCount?.toString() || "",
        certification: formData.certification?.toString() || "",
      },
    }
  } catch (error) {
    console.error("CTA form submission error:", error)
    return { success: false }
  }
}


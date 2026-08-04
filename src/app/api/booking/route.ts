import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabaseServer"
import {
  sendConfirmationEmail,
  sendConfirmationFishingEmail,
  sendConfirmationTripEmail,
} from "@/app/actions/send-confirmation"

// Payment-form submissions come through this route handler instead of a server
// action on purpose: server-action IDs are invalidated by every deploy, so a
// customer paying from a page loaded before a deploy would lose the whole
// booking (Supabase + email) after PayPal already captured the money. This URL
// is stable across deploys.

const FORM_TYPES = ["booking", "fishing", "trip"] as const
type FormType = (typeof FORM_TYPES)[number]

async function saveBookingToSupabase(
  formData: any,
  formType: string,
): Promise<boolean> {
  try {
    const { error } = await supabaseServer.from("Grand Bay Bookings").insert([
      {
        name: formData.name?.toString() || "",
        email: formData.email?.toString() || "",
        phone: formData.phone?.toString() || "",
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
      return false
    }
    console.log("Booking saved successfully.")
    return true
  } catch (err) {
    console.error("Failed to save booking.", err)
    return false
  }
}

async function sendEmail(formType: FormType, formData: any): Promise<boolean> {
  const bookingData = {
    customerName: formData.name,
    customerEmail: formData.email,
    customerPhone: formData.phone,
    hotel: formData.hotel,
    excursionName: formData.tourSelect,
    excursionDate: formData.date,
    guestCount: formData.guestCount,
    certification: formData.certification,
    deposit: formData.deposit,
    price: formData.price,
  }

  try {
    let result
    if (formType === "fishing") {
      result = await sendConfirmationFishingEmail({
        ...bookingData,
        spectator: formData.spectator,
      })
    } else if (formType === "trip") {
      result = await sendConfirmationTripEmail({
        ...bookingData,
        snorkelers: formData.snorkelers,
      })
    } else {
      result = await sendConfirmationEmail(bookingData)
    }
    return !!result?.success
  } catch (err) {
    console.error("Failed to send confirmation email:", err)
    return false
  }
}

export async function POST(request: Request) {
  let body: any
  try {
    body = await request.json()
  } catch (err) {
    console.error("API /booking error:", err)
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  const { formType, formData } = body || {}
  if (
    !FORM_TYPES.includes(formType) ||
    !formData?.name ||
    !formData?.email
  ) {
    return NextResponse.json(
      { error: "Missing formType, name, or email." },
      { status: 400 },
    )
  }

  const supabaseOk = await saveBookingToSupabase(formData, formType)
  const emailOk = await sendEmail(formType, formData)

  // Side-effect failures are reported, not thrown — the customer has already
  // paid, so the client decides how to present a partial failure.
  return NextResponse.json({ success: supabaseOk && emailOk, supabaseOk, emailOk })
}

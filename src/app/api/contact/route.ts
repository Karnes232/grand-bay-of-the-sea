import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabaseServer"

export async function POST(request: Request) {
  try {
    const { name, email, certification_level } = await request.json()

    if (!name || !email || !certification_level) {
      return NextResponse.json(
        { error: "Name, email, and certification level are required." },
        { status: 400 },
      )
    }

    const { error } = await supabaseServer
      .from("contact_clients")
      .insert([{ name, email, certification_level }])

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json(
        { error: "Failed to save client." },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("API /contact error:", err)
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }
}

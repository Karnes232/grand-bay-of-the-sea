import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// This client is safe for use in the browser (anon key only).
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

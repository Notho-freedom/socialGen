import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export function getSupabaseClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey)
}

// Database types
export interface Post {
  id: string
  user_id: string
  title: string
  content: string
  platform: "linkedin" | "twitter" | "instagram" | "facebook" | "tiktok"
  status: "draft" | "scheduled" | "published"
  image_url?: string
  prompt?: string
  objective?: string
  scheduled_at?: string
  published_at?: string
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

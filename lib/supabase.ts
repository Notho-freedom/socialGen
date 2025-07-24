import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

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

export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

// Check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey)
}

// Create Supabase client only if configured
export const supabase = isSupabaseConfigured() ? createClient(supabaseUrl!, supabaseAnonKey!) : null

// Database operations
export async function createPost(post: Omit<Post, "id" | "created_at" | "updated_at">) {
  if (!supabase) {
    throw new Error("Supabase not configured")
  }

  const { data, error } = await supabase.from("posts").insert([post]).select().single()

  if (error) throw error
  return data
}

export async function getPosts(userId: string, limit = 50) {
  if (!supabase) {
    throw new Error("Supabase not configured")
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export async function updatePost(id: string, updates: Partial<Post>) {
  if (!supabase) {
    throw new Error("Supabase not configured")
  }

  const { data, error } = await supabase
    .from("posts")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deletePost(id: string) {
  if (!supabase) {
    throw new Error("Supabase not configured")
  }

  const { error } = await supabase.from("posts").delete().eq("id", id)

  if (error) throw error
}

// Auth helpers
export async function signUp(email: string, password: string, name: string) {
  if (!supabase) {
    throw new Error("Supabase not configured")
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  })

  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  if (!supabase) {
    throw new Error("Supabase not configured")
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  if (!supabase) {
    throw new Error("Supabase not configured")
  }

  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  if (!supabase) {
    return null
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

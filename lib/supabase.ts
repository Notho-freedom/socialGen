import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client when Supabase is not configured
    return {
      auth: {
        signUp: async () => ({ error: { message: "Supabase not configured. Please add your environment variables." } }),
        signInWithPassword: async () => ({
          error: { message: "Supabase not configured. Please add your environment variables." },
        }),
        signOut: async () => ({ error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            order: () => ({ data: [], error: null }),
          }),
        }),
        insert: () => ({
          select: () => ({
            single: () => ({ data: null, error: { message: "Supabase not configured" } }),
          }),
        }),
        delete: () => ({
          eq: () => ({ error: { message: "Supabase not configured" } }),
        }),
      }),
    } as any
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey)
}

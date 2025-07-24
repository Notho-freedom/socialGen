import { createClient } from "@/lib/supabase"
import type { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return Response.json({ error: "User ID required" }, { status: 400 })
    }

    const supabase = createClient()

    const { data: posts, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return Response.json({ error: "Failed to fetch posts" }, { status: 500 })
    }

    return Response.json({ posts })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, title, prompt, textGenerated, imageUrl, platform, status } = await req.json()

    const supabase = createClient()

    const { data: post, error } = await supabase
      .from("posts")
      .insert({
        user_id: userId,
        title,
        prompt,
        text_generated: textGenerated,
        image_url: imageUrl,
        platform,
        status,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return Response.json({ error: "Failed to create post" }, { status: 500 })
    }

    return Response.json({ post })
  } catch (error) {
    console.error("Error creating post:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

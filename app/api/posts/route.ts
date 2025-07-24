import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)

    const userId = searchParams.get("userId")
    const platform = searchParams.get("platform")
    const status = searchParams.get("status")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    let query = supabase
      .from("posts")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (platform && platform !== "all") {
      query = query.eq("platform", platform)
    }

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    const { data: posts, error } = await query

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
    }

    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const body = await request.json()

    const { userId, title, content, platform, status = "draft", imageUrl, prompt, objective, scheduledAt } = body

    if (!userId || !title || !content || !platform) {
      return NextResponse.json({ error: "Missing required fields: userId, title, content, platform" }, { status: 400 })
    }

    const postData = {
      user_id: userId,
      title,
      content,
      platform,
      status,
      image_url: imageUrl,
      prompt,
      objective,
      scheduled_at: scheduledAt,
      published_at: status === "published" ? new Date().toISOString() : null,
    }

    const { data: post, error } = await supabase.from("posts").insert(postData).select().single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
    }

    return NextResponse.json({ post }, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

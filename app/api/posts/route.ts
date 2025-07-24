import { type NextRequest, NextResponse } from "next/server"
import { createPost, getPosts, isSupabaseConfigured } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || "demo-user"
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    if (!isSupabaseConfigured()) {
      // Return mock data for demo
      const mockPosts = [
        {
          id: "1",
          user_id: userId,
          title: "Conseils productivité pour entrepreneurs",
          content: "🚀 5 conseils pour booster votre productivité en tant qu'entrepreneur...",
          platform: "linkedin" as const,
          status: "published" as const,
          image_url: "/placeholder.svg?height=300&width=500&text=Productivity",
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "2",
          user_id: userId,
          title: "Thread marketing digital 2024",
          content: "🧵 THREAD : Les 10 tendances marketing digital à suivre en 2024...",
          platform: "twitter" as const,
          status: "published" as const,
          created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        },
      ]

      return NextResponse.json({
        success: true,
        posts: mockPosts.slice(0, limit),
      })
    }

    const posts = await getPosts(userId, limit)

    return NextResponse.json({
      success: true,
      posts,
    })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const postData = await request.json()

    if (!isSupabaseConfigured()) {
      // Return mock success for demo
      return NextResponse.json({
        success: true,
        post: {
          id: Date.now().toString(),
          ...postData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      })
    }

    const post = await createPost(postData)

    return NextResponse.json({
      success: true,
      post,
    })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ success: false, error: "Failed to create post" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import { updatePost, deletePost, isSupabaseConfigured } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!isSupabaseConfigured()) {
      // Return mock data for demo
      const mockPost = {
        id,
        user_id: "demo-user",
        title: "Post de démonstration",
        content: "Ceci est un post de démonstration généré par SocialGen AI.",
        platform: "linkedin",
        status: "draft",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      return NextResponse.json({
        success: true,
        post: mockPost,
      })
    }

    // In a real implementation, you would fetch the specific post
    // const post = await getPost(id)

    return NextResponse.json({
      success: true,
      post: null,
    })
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const updates = await request.json()

    if (!isSupabaseConfigured()) {
      // Return mock success for demo
      return NextResponse.json({
        success: true,
        post: {
          id,
          ...updates,
          updated_at: new Date().toISOString(),
        },
      })
    }

    const post = await updatePost(id, updates)

    return NextResponse.json({
      success: true,
      post,
    })
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ success: false, error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!isSupabaseConfigured()) {
      // Return mock success for demo
      return NextResponse.json({
        success: true,
        message: "Post deleted successfully",
      })
    }

    await deletePost(id)

    return NextResponse.json({
      success: true,
      message: "Post deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ success: false, error: "Failed to delete post" }, { status: 500 })
  }
}

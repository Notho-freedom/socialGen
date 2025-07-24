import { createClient } from "@/lib/supabase"
import type { NextRequest } from "next/server"

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()

    const { error } = await supabase.from("posts").delete().eq("id", params.id)

    if (error) {
      console.error("Supabase error:", error)
      return Response.json({ error: "Failed to delete post" }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Error deleting post:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

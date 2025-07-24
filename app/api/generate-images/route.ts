import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt, style = "professional" } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // For demo purposes, return placeholder images
    // In production, you would integrate with DALL-E, Midjourney, or Stable Diffusion
    const placeholderImages = [
      {
        id: 1,
        url: `/placeholder.svg?height=400&width=600&text=${encodeURIComponent("Business Professional")}`,
        alt: "Business Professional",
        style: "professional",
      },
      {
        id: 2,
        url: `/placeholder.svg?height=400&width=600&text=${encodeURIComponent("Creative Design")}`,
        alt: "Creative Design",
        style: "creative",
      },
      {
        id: 3,
        url: `/placeholder.svg?height=400&width=600&text=${encodeURIComponent("Technology Innovation")}`,
        alt: "Technology Innovation",
        style: "modern",
      },
      {
        id: 4,
        url: `/placeholder.svg?height=400&width=600&text=${encodeURIComponent("Team Collaboration")}`,
        alt: "Team Collaboration",
        style: "corporate",
      },
    ]

    // Filter images based on style preference
    const filteredImages = style === "all" ? placeholderImages : placeholderImages.filter((img) => img.style === style)

    return NextResponse.json({
      images: filteredImages.length > 0 ? filteredImages : placeholderImages,
    })
  } catch (error) {
    console.error("Error generating images:", error)
    return NextResponse.json({ error: "Failed to generate images" }, { status: 500 })
  }
}

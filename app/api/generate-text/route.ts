import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { prompt, platform, objective } = await req.json()

    const platformInstructions = {
      linkedin:
        "Créez un post professionnel pour LinkedIn avec un ton expert et engageant. Utilisez des hashtags pertinents et encouragez l'interaction.",
      twitter:
        "Créez un tweet concis et percutant (max 280 caractères). Utilisez des hashtags tendance et un ton direct.",
      instagram:
        "Créez un post Instagram avec un ton inspirant et visuel. Incluez des emojis et des hashtags populaires.",
      facebook: "Créez un post Facebook conversationnel et engageant. Encouragez les commentaires et partages.",
    }

    const systemPrompt = `Vous êtes un expert en marketing digital et création de contenu pour les réseaux sociaux. 
    ${platform ? platformInstructions[platform as keyof typeof platformInstructions] : ""}
    
    Créez un contenu original, engageant et optimisé pour les réseaux sociaux.
    Le contenu doit être authentique, apporter de la valeur et inciter à l'engagement.
    
    Règles importantes:
    - Utilisez un français parfait
    - Adaptez le ton à la plateforme
    - Incluez des éléments d'engagement (questions, call-to-action)
    - Ajoutez des hashtags pertinents
    - Respectez les bonnes pratiques de la plateforme`

    const result = await streamText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: `Créez un post pour ${platform || "les réseaux sociaux"} avec cet objectif: ${prompt}`,
      maxTokens: 500,
    })

    const text = await result.text

    return Response.json({ text })
  } catch (error) {
    console.error("Error generating text:", error)
    return Response.json({ error: "Failed to generate text" }, { status: 500 })
  }
}

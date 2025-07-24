import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt, platform, objective, tone = "professional" } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // For demo purposes, return mock generated content
    // In production, you would integrate with OpenAI GPT-4 or similar
    const platformLimits = {
      linkedin: 3000,
      twitter: 280,
      instagram: 2200,
      facebook: 63206,
      tiktok: 150,
    }

    const sampleContent = {
      "Attirer des freelances": {
        linkedin: `🚀 Freelances talentueux, cette opportunité est pour vous !

Nous recherchons des experts passionnés pour rejoindre notre équipe projet. Si vous excellez dans votre domaine et cherchez des missions stimulantes, parlons-en !

💼 Ce que nous offrons :
• Projets innovants et variés
• Rémunération attractive
• Flexibilité totale
• Équipe bienveillante

Prêt(e) à relever le défi ? Contactez-nous en MP !

#Freelance #Opportunité #Recrutement`,
        twitter: `🚀 Freelances talentueux recherchés !

✅ Projets innovants
✅ Rémunération attractive  
✅ Flexibilité totale
✅ Équipe bienveillante

Prêt(e) ? MP ouvert ! 

#Freelance #Opportunité`,
        instagram: `🚀 Appel aux freelances talentueux !

Rejoignez notre équipe pour des projets passionnants 💼

Ce qu'on offre :
✨ Projets variés et stimulants
✨ Rémunération compétitive
✨ Flexibilité maximale
✨ Ambiance de travail top

Vous êtes partant(e) ? Contactez-nous ! 📩

#Freelance #Opportunité #Équipe #Travail #Passion`,
      },
      "Post du lundi motivant": {
        linkedin: `💪 Nouveau lundi, nouvelles possibilités !

Cette semaine, fixez-vous un objectif qui vous fait vibrer. Peu importe sa taille, l'important c'est de commencer.

✨ Rappel du jour :
• Chaque expert a été un débutant
• Chaque succès a commencé par un premier pas
• Chaque rêve mérite sa chance

Alors, quel sera votre premier pas aujourd'hui ?

Partagez vos objectifs de la semaine en commentaire ! 👇

#Motivation #Lundi #Objectifs #Réussite`,
        twitter: `💪 Nouveau lundi, nouvelles possibilités !

Cette semaine, quel objectif vous fait vibrer ?

✨ Rappel :
• Chaque expert a été débutant
• Chaque succès commence par un pas
• Chaque rêve mérite sa chance

Votre premier pas aujourd'hui ? 👇

#MondayMotivation`,
        instagram: `💪 LUNDI = NOUVEAU DÉPART 💪

Cette semaine, on se fixe un objectif qui nous fait vibrer ! 🎯

✨ Petits rappels motivants :
• Tous les experts ont été débutants
• Chaque succès commence par un premier pas
• Tous les rêves méritent leur chance

Alors, c'est quoi votre premier pas aujourd'hui ? 👇

Partagez en commentaire, on se motive ensemble ! 🔥

#Motivation #Lundi #Objectifs #Réussite #Mindset #Inspiration`,
      },
    }

    // Get content based on objective and platform
    let generatedText = ""
    if (objective && sampleContent[objective as keyof typeof sampleContent]) {
      const objectiveContent = sampleContent[objective as keyof typeof sampleContent]
      generatedText =
        objectiveContent[platform as keyof typeof objectiveContent] ||
        objectiveContent.linkedin ||
        `Contenu généré pour ${objective} sur ${platform}`
    } else {
      // Fallback generic content
      generatedText = `Contenu généré pour "${prompt}" optimisé pour ${platform}.

Ce post a été créé automatiquement en tenant compte des meilleures pratiques de ${platform} et de votre objectif : ${objective || "engagement général"}.

#IA #ContenuAutomatisé #${platform.charAt(0).toUpperCase() + platform.slice(1)}`
    }

    // Trim content if it exceeds platform limits
    const limit = platformLimits[platform as keyof typeof platformLimits] || 3000
    if (generatedText.length > limit) {
      generatedText = generatedText.substring(0, limit - 3) + "..."
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json({
      text: generatedText,
      platform,
      objective,
      characterCount: generatedText.length,
      maxCharacters: limit,
    })
  } catch (error) {
    console.error("Error generating text:", error)
    return NextResponse.json({ error: "Failed to generate text" }, { status: 500 })
  }
}

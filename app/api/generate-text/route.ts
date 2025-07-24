import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { platform, objective, customPrompt } = await request.json()

    // Simulate AI text generation with realistic content
    const templates = {
      linkedin: {
        "Attirer des freelances": `🚀 Freelances talentueux, cette opportunité est pour vous !

Nous recherchons des experts passionnés pour rejoindre notre équipe projet. Si vous excellez dans votre domaine et cherchez des missions stimulantes, parlons-en !

💼 Ce que nous offrons :
• Projets innovants et variés
• Rémunération attractive
• Flexibilité totale
• Équipe bienveillante

Prêt(e) à relever le défi ? Contactez-nous en MP !

#Freelance #Opportunité #Recrutement #TalentAcquisition`,

        "Post du lundi motivant": `💪 Nouveau lundi, nouvelles possibilités !

Cette semaine, fixez-vous un objectif qui vous fait vibrer. Peu importe sa taille, l'important c'est de commencer.

✨ Rappel du jour :
• Chaque expert a été un débutant
• Chaque succès a commencé par un premier pas
• Chaque rêve mérite sa chance

Alors, quel sera votre premier pas aujourd'hui ?

Partagez vos objectifs de la semaine en commentaire ! 👇

#Motivation #Lundi #Objectifs #Réussite #Mindset`,

        "Présenter un nouveau produit": `🎉 Grande nouvelle ! Notre dernier produit est enfin là !

Après des mois de développement, nous sommes fiers de vous présenter une solution qui va révolutionner votre quotidien professionnel.

🌟 Les points forts :
• Interface intuitive et moderne
• Performance optimisée
• Sécurité renforcée
• Support client 24/7
• Intégrations natives

Découvrez dès maintenant comment il peut transformer votre façon de travailler.

Lien en commentaire pour en savoir plus ! 👇

#Innovation #NouveauProduit #Technologie #Productivité`,
      },
      twitter: {
        "Attirer des freelances": `🔥 Freelances recherchés !

Vous êtes expert dans votre domaine ? Rejoignez notre équipe pour des missions passionnantes.

✅ Projets variés
✅ Rémunération attractive  
✅ Flexibilité totale

DM ouvert ! 

#Freelance #Opportunité #Remote`,

        "Post du lundi motivant": `💪 Nouveau lundi, nouvelles opportunités !

Cette semaine, fixez-vous UN objectif qui vous fait vibrer.

Rappel : Chaque expert a été un débutant.

Quel sera votre premier pas aujourd'hui ? 👇

#MondayMotivation #Objectifs #Mindset`,

        "Présenter un nouveau produit": `🚀 Lancement produit !

Après des mois de dev, notre nouvelle solution est là !

✨ Interface intuitive
⚡ Performance optimisée
🔒 Sécurité renforcée

Découvrez-la maintenant 👇

#Innovation #Tech #Startup`,
      },
      instagram: {
        "Attirer des freelances": `🌟 FREELANCES TALENTUEUX 🌟

On recherche des experts passionnés pour rejoindre notre aventure !

💼 Ce qu'on offre :
• Projets créatifs
• Rémunération top
• Liberté totale
• Team bienveillante

Prêt(e) pour le défi ? 
Glisse en DM ! ✨

#Freelance #Opportunité #DreamTeam #CreativeJobs #Remote`,

        "Post du lundi motivant": `💪 LUNDI MOTIVATION 💪

Nouvelle semaine = nouvelles possibilités !

Cette semaine, fixe-toi UN objectif qui te fait vibrer ✨

💭 Remember :
Chaque expert a été débutant
Chaque succès commence par un pas
Chaque rêve mérite sa chance

Ton premier pas aujourd'hui ? 👇

#MondayMotivation #Objectifs #Mindset #Réussite #Inspiration`,

        "Présenter un nouveau produit": `🎉 GRANDE NOUVELLE ! 🎉

Notre nouveau produit est ENFIN là ! 

Après des mois de passion et de développement, on est fiers de vous présenter cette pépite ✨

🌟 Pourquoi vous allez l'adorer :
• Design moderne et intuitif
• Performance de folie
• Sécurité au top
• Support 24/7

Swipe pour découvrir ! 👉

#NouveauProduit #Innovation #Launch #Excited`,
      },
    }

    // Get template based on platform and objective
    const platformTemplates = templates[platform as keyof typeof templates] || templates.linkedin
    let generatedText = platformTemplates[objective as keyof typeof platformTemplates]

    // If no template found or custom prompt provided, generate generic content
    if (!generatedText || customPrompt) {
      const prompt = customPrompt || objective
      generatedText = `Contenu généré pour ${platform} sur le thème : ${prompt}

Voici un exemple de post optimisé pour cette plateforme avec un ton professionnel et engageant.

#${platform} #contenu #marketing`
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json({
      success: true,
      text: generatedText,
      platform,
      objective: objective || customPrompt,
    })
  } catch (error) {
    console.error("Error generating text:", error)
    return NextResponse.json({ success: false, error: "Failed to generate text" }, { status: 500 })
  }
}

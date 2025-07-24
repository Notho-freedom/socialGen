"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PostGeneratorProps {
  userId?: string
}

export function PostGenerator({ userId }: PostGeneratorProps) {
  const [objective, setObjective] = useState("")
  const [platform, setPlatform] = useState("")
  const [generatedText, setGeneratedText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const platforms = [
    { value: "linkedin", label: "LinkedIn", limit: 3000 },
    { value: "twitter", label: "Twitter/X", limit: 280 },
    { value: "instagram", label: "Instagram", limit: 2200 },
    { value: "facebook", label: "Facebook", limit: 63206 },
  ]

  const objectives = [
    "Attirer des freelances",
    "Post du lundi motivant",
    "Présenter un nouveau produit",
    "Partager une réussite client",
    "Conseils professionnels",
    "Tendances du secteur",
  ]

  const handleGenerate = async () => {
    if (!objective || !platform) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez sélectionner un objectif et une plateforme",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockTexts = {
        "Attirer des freelances": `🚀 Freelances talentueux, cette opportunité est pour vous !

Nous recherchons des experts passionnés pour rejoindre notre équipe projet. Si vous excellez dans votre domaine et cherchez des missions stimulantes, parlons-en !

💼 Ce que nous offrons :
• Projets innovants et variés
• Rémunération attractive
• Flexibilité totale
• Équipe bienveillante

Prêt(e) à relever le défi ? Contactez-nous en MP !

#Freelance #Opportunité #Recrutement`,

        "Post du lundi motivant": `💪 Nouveau lundi, nouvelles possibilités !

Cette semaine, fixez-vous un objectif qui vous fait vibrer. Peu importe sa taille, l'important c'est de commencer.

✨ Rappel du jour :
Chaque expert a été un débutant
Chaque succès a commencé par un premier pas
Chaque rêve mérite sa chance

Alors, quel sera votre premier pas aujourd'hui ?

Partagez vos objectifs de la semaine en commentaire ! 👇

#Motivation #Lundi #Objectifs #Réussite`,

        "Présenter un nouveau produit": `🎉 Grande nouvelle ! Notre dernier produit est enfin là !

Après des mois de développement, nous sommes fiers de vous présenter une solution qui va révolutionner votre quotidien.

🌟 Les points forts :
• Interface intuitive
• Performance optimisée
• Sécurité renforcée
• Support client 24/7

Découvrez dès maintenant comment il peut transformer votre façon de travailler.

Lien en bio pour en savoir plus ! 👆

#Innovation #NouveauProduit #Technologie`,
      }

      const selectedPlatform = platforms.find((p) => p.value === platform)
      let text = mockTexts[objective as keyof typeof mockTexts] || `Contenu généré pour : ${objective}`

      // Adjust text length based on platform
      if (selectedPlatform && text.length > selectedPlatform.limit) {
        text = text.substring(0, selectedPlatform.limit - 3) + "..."
      }

      setGeneratedText(text)

      toast({
        title: "Contenu généré !",
        description: "Votre post a été créé avec succès",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le contenu",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRegenerate = () => {
    handleGenerate()
  }

  const selectedPlatform = platforms.find((p) => p.value === platform)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Générateur de posts
          </CardTitle>
          <CardDescription>Créez du contenu optimisé pour vos réseaux sociaux en quelques clics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Platform Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Plateforme cible</label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger>
                <SelectValue placeholder="Choisissez une plateforme" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label} ({p.limit} caractères max)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Objective Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Objectif de publication</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {objectives.map((obj) => (
                <Badge
                  key={obj}
                  variant={objective === obj ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setObjective(obj)}
                >
                  {obj}
                </Badge>
              ))}
            </div>
            <Textarea
              placeholder="Ou décrivez votre objectif personnalisé..."
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              rows={2}
            />
          </div>

          <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Générer le contenu
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Content */}
      {generatedText && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Contenu généré</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {generatedText.length}
                  {selectedPlatform && `/${selectedPlatform.limit}`} caractères
                </Badge>
                <Button variant="outline" size="sm" onClick={handleRegenerate} disabled={isGenerating}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                value={generatedText}
                onChange={(e) => setGeneratedText(e.target.value)}
                rows={8}
                className="resize-none"
              />
              <div className="flex gap-2">
                <Button className="flex-1">Sauvegarder</Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Programmer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

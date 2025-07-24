"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Loader2, Sparkles, RefreshCw, Copy, Download, Share } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PostGeneratorProps {
  userId?: string
}

export function PostGenerator({ userId }: PostGeneratorProps) {
  const [platform, setPlatform] = useState("")
  const [objective, setObjective] = useState("")
  const [customPrompt, setCustomPrompt] = useState("")
  const [generatedText, setGeneratedText] = useState("")
  const [selectedImage, setSelectedImage] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const { toast } = useToast()

  const platforms = [
    { value: "linkedin", label: "LinkedIn", limit: 3000, color: "bg-blue-600" },
    { value: "twitter", label: "Twitter/X", limit: 280, color: "bg-black" },
    { value: "instagram", label: "Instagram", limit: 2200, color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { value: "facebook", label: "Facebook", limit: 63206, color: "bg-blue-500" },
    { value: "tiktok", label: "TikTok", limit: 150, color: "bg-black" },
  ]

  const objectives = [
    "Attirer des freelances",
    "Post du lundi motivant",
    "Présenter un nouveau produit",
    "Partager une réussite client",
    "Conseils d'expert",
    "Tendances du secteur",
    "Behind the scenes",
    "Question à la communauté",
  ]

  const sampleImages = [
    { id: 1, url: "/placeholder.svg?height=200&width=300&text=Business", alt: "Business" },
    { id: 2, url: "/placeholder.svg?height=200&width=300&text=Technology", alt: "Technology" },
    { id: 3, url: "/placeholder.svg?height=200&width=300&text=Marketing", alt: "Marketing" },
    { id: 4, url: "/placeholder.svg?height=200&width=300&text=Team", alt: "Team" },
  ]

  const generateContent = async () => {
    if (!platform) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une plateforme",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const sampleContent = {
      linkedin: `🚀 Vous cherchez à booster votre présence sur LinkedIn ?

Voici 5 stratégies qui ont fait leurs preuves :

✅ Publiez régulièrement du contenu de valeur
✅ Engagez-vous avec votre communauté
✅ Partagez vos expériences authentiques
✅ Utilisez des visuels impactants
✅ Analysez vos performances

Le secret ? La constance et l'authenticité.

Quelle est votre stratégie préférée ? 👇

#LinkedIn #Marketing #DigitalStrategy`,
      twitter: `🔥 3 conseils pour réussir sur les réseaux sociaux :

1️⃣ Soyez authentique
2️⃣ Créez de la valeur
3️⃣ Restez constant

Le succès vient avec le temps ! 💪

#SocialMedia #Tips`,
      instagram: `✨ Nouveau projet terminé ! ✨

Fier de présenter cette collaboration incroyable avec notre équipe. 

Chaque détail compte, chaque effort paie. 

Merci à tous ceux qui nous font confiance ! 🙏

#Projet #Équipe #Réussite #Gratitude`,
    }

    setGeneratedText(sampleContent[platform as keyof typeof sampleContent] || "Contenu généré pour " + platform)
    setIsGenerating(false)

    toast({
      title: "Contenu généré !",
      description: "Votre post a été créé avec succès",
    })
  }

  const regenerateContent = async () => {
    setIsRegenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Add some variation to the content
    const variations = [
      "Version alternative du contenu...",
      "Nouvelle approche créative...",
      "Contenu optimisé et personnalisé...",
    ]

    setGeneratedText(variations[Math.floor(Math.random() * variations.length)])
    setIsRegenerating(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText)
    toast({
      title: "Copié !",
      description: "Le contenu a été copié dans le presse-papier",
    })
  }

  const selectedPlatform = platforms.find((p) => p.value === platform)
  const characterCount = generatedText.length
  const isOverLimit = selectedPlatform && characterCount > selectedPlatform.limit

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>Générateur de Posts IA</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Platform Selection */}
          <div className="space-y-2">
            <Label>Plateforme cible</Label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger>
                <SelectValue placeholder="Choisissez une plateforme" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${p.color}`} />
                      <span>{p.label}</span>
                      <Badge variant="secondary" className="ml-2">
                        {p.limit} car.
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Objective Selection */}
          <div className="space-y-2">
            <Label>Objectif du post</Label>
            <Select value={objective} onValueChange={setObjective}>
              <SelectTrigger>
                <SelectValue placeholder="Quel est votre objectif ?" />
              </SelectTrigger>
              <SelectContent>
                {objectives.map((obj) => (
                  <SelectItem key={obj} value={obj}>
                    {obj}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Custom Prompt */}
          <div className="space-y-2">
            <Label>Prompt personnalisé (optionnel)</Label>
            <Textarea
              placeholder="Décrivez plus précisément ce que vous souhaitez..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              rows={3}
            />
          </div>

          {/* Generate Button */}
          <Button onClick={generateContent} disabled={isGenerating} className="w-full">
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
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={regenerateContent} disabled={isRegenerating}>
                  {isRegenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Textarea
                value={generatedText}
                onChange={(e) => setGeneratedText(e.target.value)}
                rows={8}
                className="resize-none"
              />
              {selectedPlatform && (
                <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                  <span className={isOverLimit ? "text-red-500" : ""}>
                    {characterCount}/{selectedPlatform.limit}
                  </span>
                </div>
              )}
            </div>

            {isOverLimit && (
              <div className="text-sm text-red-500">
                ⚠️ Le contenu dépasse la limite de caractères pour {selectedPlatform?.label}
              </div>
            )}

            <Separator />

            {/* Image Selection */}
            <div className="space-y-3">
              <Label>Images suggérées</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sampleImages.map((image) => (
                  <div
                    key={image.id}
                    className={`relative cursor-pointer rounded-lg border-2 transition-all ${
                      selectedImage === image.url
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedImage(image.url)}
                  >
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    {selectedImage === image.url && (
                      <div className="absolute inset-0 bg-primary/10 rounded-md flex items-center justify-center">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button variant="default">
                <Share className="mr-2 h-4 w-4" />
                Publier maintenant
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Planifier
              </Button>
              <Button variant="outline">Sauvegarder en brouillon</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

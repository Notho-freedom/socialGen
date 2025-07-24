"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Wand2, RefreshCw, Download, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { PostEditor } from "./post-editor"
import { isSupabaseConfigured } from "@/lib/supabase"

interface PostGeneratorProps {
  userId: string
}

const OBJECTIVES = [
  {
    value: "engagement",
    label: "Augmenter l'engagement",
    description: "Posts pour générer des likes, commentaires et partages",
  },
  { value: "leads", label: "Générer des leads", description: "Attirer de nouveaux prospects et clients potentiels" },
  { value: "awareness", label: "Notoriété de marque", description: "Faire connaître votre marque et vos valeurs" },
  { value: "education", label: "Éducation", description: "Partager des connaissances et expertise" },
  { value: "motivation", label: "Motivation", description: "Inspirer et motiver votre audience" },
  { value: "announcement", label: "Annonce", description: "Communiquer sur une nouveauté ou événement" },
]

const PLATFORMS = [
  { value: "linkedin", label: "LinkedIn", color: "bg-blue-600" },
  { value: "twitter", label: "Twitter/X", color: "bg-black" },
  { value: "instagram", label: "Instagram", color: "bg-pink-600" },
  { value: "facebook", label: "Facebook", color: "bg-blue-700" },
]

const SAMPLE_IMAGES = [
  "/placeholder.svg?height=200&width=300",
  "/placeholder.svg?height=200&width=300",
  "/placeholder.svg?height=200&width=300",
  "/placeholder.svg?height=200&width=300",
  "/placeholder.svg?height=200&width=300",
  "/placeholder.svg?height=200&width=300",
]

export function PostGenerator({ userId }: PostGeneratorProps) {
  const [step, setStep] = useState(1)
  const [objective, setObjective] = useState("")
  const [customPrompt, setCustomPrompt] = useState("")
  const [platform, setPlatform] = useState("")
  const [generatedText, setGeneratedText] = useState("")
  const [selectedImage, setSelectedImage] = useState("")
  const [suggestedImages, setSuggestedImages] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGeneratingImages, setIsGeneratingImages] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleGenerateText = async () => {
    if (!objective && !customPrompt) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un objectif ou saisir un prompt personnalisé.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const prompt = customPrompt || OBJECTIVES.find((obj) => obj.value === objective)?.description || ""
      const platformContext = platform ? ` pour ${PLATFORMS.find((p) => p.value === platform)?.label}` : ""

      const response = await fetch("/api/generate-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `${prompt}${platformContext}`,
          platform,
          objective,
        }),
      })

      if (!response.ok) throw new Error("Erreur lors de la génération")

      const data = await response.json()
      setGeneratedText(data.text)
      setStep(2)

      // Auto-generate images based on the text
      handleGenerateImages(data.text)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le texte. Réessayez.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGenerateImages = async (text?: string) => {
    setIsGeneratingImages(true)

    try {
      const response = await fetch("/api/generate-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text || generatedText,
          count: 6,
        }),
      })

      if (!response.ok) throw new Error("Erreur lors de la génération d'images")

      const data = await response.json()
      setSuggestedImages(data.images)
    } catch (error) {
      // Fallback to sample images
      setSuggestedImages(SAMPLE_IMAGES)
      toast({
        title: "Info",
        description: "Utilisation d'images d'exemple. La génération d'images sera disponible prochainement.",
      })
    } finally {
      setIsGeneratingImages(false)
    }
  }

  const handleRegenerateText = async () => {
    await handleGenerateText()
  }

  const handleCopyText = async () => {
    await navigator.clipboard.writeText(generatedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copié !",
      description: "Le texte a été copié dans le presse-papiers.",
    })
  }

  const handleSavePost = async () => {
    if (!isSupabaseConfigured()) {
      toast({
        title: "Mode démo",
        description: "En mode démo, les posts ne sont pas sauvegardés. Configurez Supabase pour la sauvegarde.",
      })
      return
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          title: objective || "Post personnalisé",
          prompt: customPrompt || objective,
          textGenerated: generatedText,
          imageUrl: selectedImage,
          platform,
          status: "draft",
        }),
      })

      if (!response.ok) throw new Error("Erreur lors de la sauvegarde")

      toast({
        title: "Sauvegardé !",
        description: "Votre post a été sauvegardé dans l'historique.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le post.",
        variant: "destructive",
      })
    }
  }

  if (step === 3) {
    return (
      <PostEditor
        text={generatedText}
        imageUrl={selectedImage}
        platform={platform}
        onSave={handleSavePost}
        onBack={() => setStep(2)}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Step 1: Configuration */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              Créer un nouveau post
            </CardTitle>
            <CardDescription>
              Définissez l'objectif de votre publication pour générer du contenu optimisé
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Platform Selection */}
            <div className="space-y-3">
              <Label>Plateforme cible</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une plateforme" />
                </SelectTrigger>
                <SelectContent>
                  {PLATFORMS.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${p.color}`} />
                        {p.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Objective Selection */}
            <div className="space-y-3">
              <Label>Quel est l'objectif de cette publication ?</Label>
              <div className="grid sm:grid-cols-2 gap-3">
                {OBJECTIVES.map((obj) => (
                  <Card
                    key={obj.value}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      objective === obj.value ? "ring-2 ring-blue-600 bg-blue-50" : ""
                    }`}
                    onClick={() => setObjective(obj.value)}
                  >
                    <CardContent className="p-4">
                      <div className="font-medium text-sm">{obj.label}</div>
                      <div className="text-xs text-gray-600 mt-1">{obj.description}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 border-t" />
              <span className="text-sm text-gray-500">OU</span>
              <div className="flex-1 border-t" />
            </div>

            {/* Custom Prompt */}
            <div className="space-y-3">
              <Label htmlFor="custom-prompt">Prompt personnalisé</Label>
              <Textarea
                id="custom-prompt"
                placeholder="Décrivez précisément le type de contenu que vous souhaitez générer..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                rows={3}
              />
            </div>

            <Button
              onClick={handleGenerateText}
              disabled={isGenerating || (!objective && !customPrompt)}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Générer le post
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Generated Content */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Generated Text */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Texte généré</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopyText}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRegenerateText} disabled={isGenerating}>
                    <RefreshCw className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
                  </Button>
                </div>
              </div>
              {platform && (
                <Badge variant="secondary" className="w-fit">
                  {PLATFORMS.find((p) => p.value === platform)?.label}
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">{generatedText}</div>
            </CardContent>
          </Card>

          {/* Image Selection */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Images suggérées</CardTitle>
                  <CardDescription>Sélectionnez une image qui accompagnera votre post</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleGenerateImages()}
                  disabled={isGeneratingImages}
                >
                  <RefreshCw className={`h-4 w-4 ${isGeneratingImages ? "animate-spin" : ""}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isGeneratingImages ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-video bg-gray-200 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {suggestedImages.map((image, index) => (
                    <div
                      key={index}
                      className={`relative cursor-pointer rounded-lg overflow-hidden transition-all hover:scale-105 ${
                        selectedImage === image ? "ring-2 ring-blue-600" : ""
                      }`}
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Suggestion ${index + 1}`}
                        className="w-full aspect-video object-cover"
                      />
                      {selectedImage === image && (
                        <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                          <Check className="h-8 w-8 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setStep(1)}>
              Retour
            </Button>
            <Button onClick={() => setStep(3)} disabled={!selectedImage}>
              Éditer et finaliser
            </Button>
            <Button variant="outline" onClick={handleSavePost}>
              <Download className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

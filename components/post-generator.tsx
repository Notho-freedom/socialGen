"use client"

<<<<<<< HEAD
import { useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
=======
import { useState } from "react"
>>>>>>> bb6cbcce9060a13eaeadb737c6b731f8e9bb4f8c
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

<<<<<<< HEAD
  const selectedPlatform = useMemo(() => PLATFORMS.find(p => p.value === platform), [platform])
  
  const handleGenerateText = async () => {
    if (!objective && !customPrompt) {
=======
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
>>>>>>> bb6cbcce9060a13eaeadb737c6b731f8e9bb4f8c
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

<<<<<<< HEAD
  const handleRegenerateText = async () => {
    await handleGenerateText()
  }

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(generatedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Copié !",
        description: "Le texte a été copié dans le presse-papiers.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "La copie dans le presse-papiers n'est pas supportée dans ce navigateur.",
        variant: "destructive",
      })
    }
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

  const handlePlatformChange = useCallback((value: string) => {
    if (value !== platform) {
      setPlatform(value)
    }
  }, [platform])

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
=======
  const selectedPlatform = platforms.find((p) => p.value === platform)
>>>>>>> bb6cbcce9060a13eaeadb737c6b731f8e9bb4f8c

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
<<<<<<< HEAD
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
              <Label htmlFor="platform-select">Plateforme cible</Label>
              <select
                id="platform-select"
                name="platform"
                aria-label="Sélectionner une plateforme"
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                <option value="">Sélectionnez une plateforme</option>
                {PLATFORMS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
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
=======
            <div className="flex items-center justify-between">
              <CardTitle>Contenu généré</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {generatedText.length}
                  {selectedPlatform && `/${selectedPlatform.limit}`} caractères
>>>>>>> bb6cbcce9060a13eaeadb737c6b731f8e9bb4f8c
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

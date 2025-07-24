"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Sparkles,
  RefreshCw,
  Copy,
  Save,
  Calendar,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  TwitterIcon as TikTok,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

const platforms = [
  { id: "twitter", name: "Twitter", icon: Twitter, limit: 280, color: "bg-blue-500" },
  { id: "facebook", name: "Facebook", icon: Facebook, limit: 2000, color: "bg-blue-600" },
  { id: "instagram", name: "Instagram", icon: Instagram, limit: 2200, color: "bg-pink-500" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, limit: 3000, color: "bg-blue-700" },
  { id: "youtube", name: "YouTube", icon: Youtube, limit: 5000, color: "bg-red-500" },
  { id: "tiktok", name: "TikTok", icon: TikTok, limit: 2200, color: "bg-black" },
]

const objectives = [
  "Engagement",
  "Vente",
  "Sensibilisation",
  "Éducation",
  "Divertissement",
  "Inspiration",
  "Promotion",
  "Communauté",
]

const tones = [
  "Professionnel",
  "Décontracté",
  "Humoristique",
  "Inspirant",
  "Informatif",
  "Persuasif",
  "Amical",
  "Autoritaire",
]

export function PostGenerator() {
  const [selectedPlatform, setSelectedPlatform] = useState("twitter")
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([])
  const [customObjective, setCustomObjective] = useState("")
  const [tone, setTone] = useState("")
  const [topic, setTopic] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)

  const currentPlatform = platforms.find((p) => p.id === selectedPlatform)
  const characterCount = generatedContent.length
  const isOverLimit = currentPlatform && characterCount > currentPlatform.limit

  const toggleObjective = (objective: string) => {
    setSelectedObjectives((prev) =>
      prev.includes(objective) ? prev.filter((o) => o !== objective) : [...prev, objective],
    )
  }

  const generateContent = async () => {
    if (!topic.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un sujet pour générer du contenu.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const allObjectives = [...selectedObjectives]
      if (customObjective.trim()) {
        allObjectives.push(customObjective.trim())
      }

      const response = await fetch("/api/generate-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platform: selectedPlatform,
          topic: topic.trim(),
          objectives: allObjectives,
          tone: tone || "Professionnel",
          maxLength: currentPlatform?.limit || 280,
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la génération")
      }

      const data = await response.json()
      setGeneratedContent(data.content)

      toast({
        title: "Contenu généré !",
        description: "Votre post a été créé avec succès.",
      })
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Impossible de générer le contenu. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const regenerateContent = async () => {
    setIsRegenerating(true)
    await generateContent()
    setIsRegenerating(false)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent)
      toast({
        title: "Copié !",
        description: "Le contenu a été copié dans le presse-papiers.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le contenu.",
        variant: "destructive",
      })
    }
  }

  const savePost = async () => {
    if (!generatedContent.trim()) {
      toast({
        title: "Erreur",
        description: "Aucun contenu à sauvegarder.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: generatedContent,
          platform: selectedPlatform,
          status: "draft",
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde")
      }

      toast({
        title: "Post sauvegardé !",
        description: "Votre post a été sauvegardé en brouillon.",
      })
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le post.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Générateur de Posts IA
          </CardTitle>
          <CardDescription>Créez du contenu engageant pour vos réseaux sociaux en quelques clics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Platform Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Plateforme</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {platforms.map((platform) => {
                const Icon = platform.icon
                return (
                  <Button
                    key={platform.id}
                    variant={selectedPlatform === platform.id ? "default" : "outline"}
                    className="flex flex-col items-center gap-2 h-auto py-3"
                    onClick={() => setSelectedPlatform(platform.id)}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs">{platform.name}</span>
                  </Button>
                )
              })}
            </div>
            {currentPlatform && (
              <p className="text-xs text-muted-foreground">Limite de caractères : {currentPlatform.limit}</p>
            )}
          </div>

          <Separator />

          {/* Content Configuration */}
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Configuration de base</TabsTrigger>
              <TabsTrigger value="advanced">Options avancées</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              {/* Topic */}
              <div className="space-y-2">
                <Label htmlFor="topic">Sujet du post *</Label>
                <Textarea
                  id="topic"
                  placeholder="Ex: Lancement de notre nouveau produit, conseils marketing, tendances 2024..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              {/* Objectives */}
              <div className="space-y-3">
                <Label>Objectifs</Label>
                <div className="flex flex-wrap gap-2">
                  {objectives.map((objective) => (
                    <Badge
                      key={objective}
                      variant={selectedObjectives.includes(objective) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/80"
                      onClick={() => toggleObjective(objective)}
                    >
                      {objective}
                    </Badge>
                  ))}
                </div>
                <Input
                  placeholder="Objectif personnalisé..."
                  value={customObjective}
                  onChange={(e) => setCustomObjective(e.target.value)}
                  className="mt-2"
                />
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              {/* Tone */}
              <div className="space-y-2">
                <Label htmlFor="tone">Ton de communication</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un ton" />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((toneOption) => (
                      <SelectItem key={toneOption} value={toneOption}>
                        {toneOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>

          <Separator />

          {/* Generate Button */}
          <Button onClick={generateContent} disabled={isGenerating || !topic.trim()} className="w-full" size="lg">
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
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
      {generatedContent && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Contenu généré</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={isOverLimit ? "destructive" : "secondary"}>
                  {characterCount}/{currentPlatform?.limit}
                </Badge>
                <Button variant="ghost" size="sm" onClick={regenerateContent} disabled={isRegenerating}>
                  {isRegenerating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              className={`min-h-[120px] ${isOverLimit ? "border-destructive" : ""}`}
              placeholder="Le contenu généré apparaîtra ici..."
            />

            {isOverLimit && (
              <p className="text-sm text-destructive">
                ⚠️ Le contenu dépasse la limite de caractères pour {currentPlatform?.name}
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="mr-2 h-4 w-4" />
                Copier
              </Button>
              <Button variant="outline" size="sm" onClick={savePost}>
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Programmer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

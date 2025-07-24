"use client"

import { useState, useRef, useCallback } from "react"
import { AnimatedButton } from "@/components/animated-button"
import { LoadingSpinner } from "@/components/loading-spinner"
import { FadeIn } from "@/components/fade-in"
import { StaggerContainer } from "@/components/stagger-container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Sparkles,
  RefreshCw,
  Copy,
  Save,
  Calendar,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  TwitterIcon as TikTok,
  Eye,
  Settings,
  Zap,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { FacebookPreview } from "@/components/post-previews/facebook-preview"
import { InstagramPreview } from "@/components/post-previews/instagram-preview"
import { TwitterPreview } from "@/components/post-previews/twitter-preview"
import { LinkedInPreview } from "@/components/post-previews/linkedin-preview"
import { EnhancedImageCatalog } from "@/components/enhanced-image-catalog"
import { TextFormattingToolbar } from "@/components/text-formatting-toolbar"
import { HashtagMentionSuggestions } from "@/components/hashtag-mention-suggestions"
import { PostValidation } from "@/components/post-validation"

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

export function ComprehensivePostCreator() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["twitter"])
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([])
  const [customObjective, setCustomObjective] = useState("")
  const [tone, setTone] = useState("")
  const [topic, setTopic] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>("")
  const [schedulePost, setSchedulePost] = useState(false)
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")
  const [autoOptimize, setAutoOptimize] = useState(true)
  const [currentPreviewPlatform, setCurrentPreviewPlatform] = useState("twitter")

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const platformLimits = platforms.reduce(
    (acc, platform) => {
      acc[platform.id] = platform.limit
      return acc
    },
    {} as { [key: string]: number },
  )

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) => {
      const newSelection = prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId]

      if (newSelection.length > 0 && !newSelection.includes(currentPreviewPlatform)) {
        setCurrentPreviewPlatform(newSelection[0])
      }

      return newSelection
    })
  }

  const toggleObjective = (objective: string) => {
    setSelectedObjectives((prev) =>
      prev.includes(objective) ? prev.filter((o) => o !== objective) : [...prev, objective],
    )
  }

  const handleTextFormat = useCallback(
    (format: string) => {
      const textarea = textareaRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = generatedContent.substring(start, end)

      let formattedText = selectedText
      switch (format) {
        case "bold":
          formattedText = `**${selectedText}**`
          break
        case "italic":
          formattedText = `*${selectedText}*`
          break
        case "underline":
          formattedText = `__${selectedText}__`
          break
        case "h1":
          formattedText = `# ${selectedText}`
          break
        case "h2":
          formattedText = `## ${selectedText}`
          break
        case "quote":
          formattedText = `> ${selectedText}`
          break
        default:
          break
      }

      const newContent = generatedContent.substring(0, start) + formattedText + generatedContent.substring(end)
      setGeneratedContent(newContent)

      // Restore cursor position
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + formattedText.length, start + formattedText.length)
      }, 0)
    },
    [generatedContent],
  )

  const handleTextInsert = useCallback(
    (text: string) => {
      const textarea = textareaRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const newContent = generatedContent.substring(0, start) + text + generatedContent.substring(start)
      setGeneratedContent(newContent)

      // Restore cursor position
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + text.length, start + text.length)
      }, 0)
    },
    [generatedContent],
  )

  const generateContent = async () => {
    if (!topic.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un sujet pour générer du contenu.",
        variant: "destructive",
      })
      return
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner au moins une plateforme.",
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
          platforms: selectedPlatforms,
          topic: topic.trim(),
          objectives: allObjectives,
          tone: tone || "Professionnel",
          autoOptimize,
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
          platforms: selectedPlatforms,
          image_url: selectedImage,
          status: schedulePost ? "scheduled" : "draft",
          scheduled_at: schedulePost ? `${scheduledDate}T${scheduledTime}` : null,
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde")
      }

      toast({
        title: "Post sauvegardé !",
        description: schedulePost ? "Votre post a été programmé." : "Votre post a été sauvegardé en brouillon.",
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

  const publishPost = async () => {
    if (!generatedContent.trim()) {
      toast({
        title: "Erreur",
        description: "Aucun contenu à publier.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/posts/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: generatedContent,
          platforms: selectedPlatforms,
          image_url: selectedImage,
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la publication")
      }

      toast({
        title: "Post publié !",
        description: `Votre post a été publié sur ${selectedPlatforms.length} plateforme(s).`,
      })

      // Reset form
      setGeneratedContent("")
      setTopic("")
      setSelectedImage("")
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Impossible de publier le post.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <FadeIn>
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Créateur de Posts IA
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Créez du contenu engageant pour toutes vos plateformes sociales avec l'intelligence artificielle
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="xl:col-span-2 space-y-6">
            <StaggerContainer>
              <FadeIn>
                <Card className="transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      Configuration du Post
                    </CardTitle>
                    <CardDescription>
                      Définissez les paramètres de votre post pour générer du contenu optimisé
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Platform Selection */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Plateformes cibles *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {platforms.map((platform) => {
                          const Icon = platform.icon
                          const isSelected = selectedPlatforms.includes(platform.id)
                          return (
                            <AnimatedButton
                              key={platform.id}
                              variant={isSelected ? "default" : "outline"}
                              className={`flex flex-col items-center gap-2 h-auto py-3 transition-all duration-300 ${
                                isSelected ? "scale-105 shadow-lg" : "hover:scale-105"
                              }`}
                              onClick={() => togglePlatform(platform.id)}
                            >
                              <Icon className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
                              <span className="text-xs">{platform.name}</span>
                              {isSelected && (
                                <Badge variant="secondary" className="text-xs">
                                  {platform.limit} car.
                                </Badge>
                              )}
                            </AnimatedButton>
                          )
                        })}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Sélectionnez une ou plusieurs plateformes pour optimiser votre contenu
                      </p>
                    </div>

                    <Separator />

                    {/* Content Configuration */}
                    <Tabs defaultValue="basic" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="basic">Basique</TabsTrigger>
                        <TabsTrigger value="advanced">Avancé</TabsTrigger>
                        <TabsTrigger value="scheduling">Programmation</TabsTrigger>
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
                            className="min-h-[100px] transition-all duration-300 focus:scale-[1.02]"
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
                                className="cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-md"
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
                            className="transition-all duration-300 focus:scale-[1.02]"
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="advanced" className="space-y-4">
                        {/* Tone */}
                        <div className="space-y-2">
                          <Label htmlFor="tone">Ton de communication</Label>
                          <Select value={tone} onValueChange={setTone}>
                            <SelectTrigger className="transition-all duration-300 hover:scale-[1.02]">
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

                        {/* Auto Optimization */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Optimisation automatique</Label>
                            <p className="text-xs text-muted-foreground">
                              Adapte automatiquement le contenu selon les plateformes
                            </p>
                          </div>
                          <Switch checked={autoOptimize} onCheckedChange={setAutoOptimize} />
                        </div>
                      </TabsContent>

                      <TabsContent value="scheduling" className="space-y-4">
                        {/* Schedule Toggle */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Programmer la publication</Label>
                            <p className="text-xs text-muted-foreground">
                              Planifiez votre post pour une publication ultérieure
                            </p>
                          </div>
                          <Switch checked={schedulePost} onCheckedChange={setSchedulePost} />
                        </div>

                        {/* Schedule Date/Time */}
                        {schedulePost && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="date">Date</Label>
                              <Input
                                id="date"
                                type="date"
                                value={scheduledDate}
                                onChange={(e) => setScheduledDate(e.target.value)}
                                min={new Date().toISOString().split("T")[0]}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="time">Heure</Label>
                              <Input
                                id="time"
                                type="time"
                                value={scheduledTime}
                                onChange={(e) => setScheduledTime(e.target.value)}
                              />
                            </div>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>

                    <Separator />

                    {/* Generate Button */}
                    <AnimatedButton
                      onClick={generateContent}
                      disabled={isGenerating || !topic.trim() || selectedPlatforms.length === 0}
                      className="w-full group"
                      size="lg"
                    >
                      {isGenerating ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Génération en cours...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                          Générer le contenu
                        </>
                      )}
                    </AnimatedButton>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Generated Content Editor */}
              {generatedContent && (
                <FadeIn delay={300}>
                  <Card className="transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Zap className="h-5 w-5 text-primary" />
                          Éditeur de Contenu
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="transition-all duration-300 hover:scale-110">
                            {generatedContent.length} caractères
                          </Badge>
                          <AnimatedButton
                            variant="ghost"
                            size="sm"
                            onClick={regenerateContent}
                            disabled={isRegenerating}
                            className="group"
                          >
                            {isRegenerating ? (
                              <LoadingSpinner size="sm" />
                            ) : (
                              <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180" />
                            )}
                          </AnimatedButton>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Text Formatting Toolbar */}
                      <TextFormattingToolbar onFormat={handleTextFormat} onInsert={handleTextInsert} />

                      {/* Content Editor */}
                      <Textarea
                        ref={textareaRef}
                        value={generatedContent}
                        onChange={(e) => setGeneratedContent(e.target.value)}
                        className="min-h-[200px] transition-all duration-300 focus:scale-[1.02] font-mono text-sm"
                        placeholder="Le contenu généré apparaîtra ici..."
                      />

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        <AnimatedButton variant="outline" size="sm" onClick={copyToClipboard} className="group">
                          <Copy className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                          Copier
                        </AnimatedButton>
                        <AnimatedButton variant="outline" size="sm" onClick={savePost} className="group">
                          <Save className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                          Sauvegarder
                        </AnimatedButton>
                        {schedulePost ? (
                          <AnimatedButton variant="outline" size="sm" onClick={savePost} className="group">
                            <Calendar className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                            Programmer
                          </AnimatedButton>
                        ) : (
                          <AnimatedButton onClick={publishPost} className="group">
                            <Send className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                            Publier maintenant
                          </AnimatedButton>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              )}

              {/* Hashtag and Mention Suggestions */}
              {generatedContent && (
                <FadeIn delay={400}>
                  <HashtagMentionSuggestions
                    content={generatedContent}
                    onSuggestionClick={(suggestion) => setGeneratedContent((prev) => prev + suggestion)}
                  />
                </FadeIn>
              )}

              {/* Image Catalog */}
              <FadeIn delay={500}>
                <EnhancedImageCatalog
                  onImageSelect={setSelectedImage}
                  selectedImage={selectedImage}
                  postContent={generatedContent || topic}
                  platform={currentPreviewPlatform}
                />
              </FadeIn>
            </StaggerContainer>
          </div>

          {/* Preview and Validation Panel */}
          <div className="space-y-6">
            <StaggerContainer>
              {/* Preview */}
              <FadeIn delay={200}>
                <Card className="transition-all duration-300 hover:shadow-lg sticky top-6">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5 text-primary" />
                        Prévisualisation
                      </CardTitle>
                      {selectedPlatforms.length > 1 && (
                        <Select value={currentPreviewPlatform} onValueChange={setCurrentPreviewPlatform}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedPlatforms.map((platformId) => {
                              const platform = platforms.find((p) => p.id === platformId)
                              return (
                                <SelectItem key={platformId} value={platformId}>
                                  {platform?.name}
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                    <CardDescription>
                      Aperçu de votre post tel qu'il apparaîtra sur{" "}
                      {platforms.find((p) => p.id === currentPreviewPlatform)?.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Platform Preview */}
                      <div className="min-h-[400px] flex items-center justify-center">
                        {currentPreviewPlatform === "facebook" && (
                          <FacebookPreview content={generatedContent || topic} imageUrl={selectedImage} />
                        )}
                        {currentPreviewPlatform === "instagram" && (
                          <InstagramPreview content={generatedContent || topic} imageUrl={selectedImage} />
                        )}
                        {currentPreviewPlatform === "twitter" && (
                          <TwitterPreview content={generatedContent || topic} imageUrl={selectedImage} />
                        )}
                        {currentPreviewPlatform === "linkedin" && (
                          <LinkedInPreview content={generatedContent || topic} imageUrl={selectedImage} />
                        )}
                        {(currentPreviewPlatform === "youtube" || currentPreviewPlatform === "tiktok") && (
                          <LinkedInPreview content={generatedContent || topic} imageUrl={selectedImage} />
                        )}
                      </div>

                      {/* Multi-platform indicators */}
                      {selectedPlatforms.length > 1 && (
                        <div className="flex flex-wrap gap-2 justify-center">
                          {selectedPlatforms.map((platformId) => {
                            const platform = platforms.find((p) => p.id === platformId)
                            const Icon = platform?.icon
                            return (
                              <Badge
                                key={platformId}
                                variant={platformId === currentPreviewPlatform ? "default" : "outline"}
                                className={`cursor-pointer transition-all duration-200 hover:scale-110 ${
                                  platformId === currentPreviewPlatform ? "shadow-md" : ""
                                }`}
                                onClick={() => setCurrentPreviewPlatform(platformId)}
                              >
                                {Icon && <Icon className="h-3 w-3 mr-1" />}
                                {platform?.name}
                              </Badge>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Validation */}
              {generatedContent && (
                <FadeIn delay={600}>
                  <PostValidation
                    content={generatedContent}
                    platform={currentPreviewPlatform}
                    selectedImage={selectedImage}
                    platformLimits={platformLimits}
                  />
                </FadeIn>
              )}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

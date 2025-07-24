"use client"

import { useState, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FadeIn } from "@/components/fade-in"
import { StaggerContainer } from "@/components/stagger-container"
import { ContentConfiguration } from "@/components/post-creator/content-configuration"
import { PlatformSelector } from "@/components/post-creator/platform-selector"
import { ContentEditor } from "@/components/post-creator/content-editor"
import { PreviewPanel } from "@/components/post-creator/preview-panel"
import { PublishingActions } from "@/components/post-creator/publishing-actions"
import { EnhancedImageCatalog } from "@/components/enhanced-image-catalog"
import { PostValidation } from "@/components/post-validation"
import {
  Settings,
  Globe,
  Edit3,
  Image,
  Eye,
  Send,
  CheckCircle,
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

export function ModularPostCreator() {
  // Content Configuration State
  const [topic, setTopic] = useState("")
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([])
  const [customObjective, setCustomObjective] = useState("")
  const [tone, setTone] = useState("Professionnel")
  const [autoOptimize, setAutoOptimize] = useState(true)

  // Platform State
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["twitter"])
  const [currentPreviewPlatform, setCurrentPreviewPlatform] = useState("twitter")

  // Content State
  const [generatedContent, setGeneratedContent] = useState("")
  const [selectedImage, setSelectedImage] = useState<string>("")

  // UI State
  const [isGenerating, setIsGenerating] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("configure")

  // Progress tracking
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  const platformLimits = platforms.reduce(
    (acc, platform) => {
      acc[platform.id] = platform.limit
      return acc
    },
    {} as { [key: string]: number },
  )

  const togglePlatform = useCallback(
    (platformId: string) => {
      setSelectedPlatforms((prev) => {
        const newSelection = prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId]

        if (newSelection.length > 0 && !newSelection.includes(currentPreviewPlatform)) {
          setCurrentPreviewPlatform(newSelection[0])
        }

        // Update completed steps
        if (newSelection.length > 0 && !completedSteps.includes("platforms")) {
          setCompletedSteps((prev) => [...prev, "platforms"])
        }

        return newSelection
      })
    },
    [currentPreviewPlatform, completedSteps],
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

      // Update completed steps and move to next tab
      setCompletedSteps((prev) => {
        const newSteps = [...prev]
        if (!newSteps.includes("content")) newSteps.push("content")
        return newSteps
      })
      setActiveTab("edit")

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
      setCompletedSteps([])
      setActiveTab("configure")
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Impossible de publier le post.",
        variant: "destructive",
      })
    }
  }

  const canGenerate = topic.trim() && selectedPlatforms.length > 0
  const canPublish = generatedContent.trim() && selectedPlatforms.length > 0

  // Calculate progress
  const totalSteps = 5
  const progress = (completedSteps.length / totalSteps) * 100

  const tabConfig = [
    {
      id: "configure",
      label: "Configuration",
      icon: Settings,
      completed: completedSteps.includes("content"),
    },
    {
      id: "platforms",
      label: "Plateformes",
      icon: Globe,
      completed: completedSteps.includes("platforms"),
    },
    {
      id: "edit",
      label: "Édition",
      icon: Edit3,
      completed: generatedContent.length > 0,
      disabled: !generatedContent,
    },
    {
      id: "media",
      label: "Médias",
      icon: Image,
      completed: !!selectedImage,
      disabled: !generatedContent,
    },
    {
      id: "preview",
      label: "Aperçu",
      icon: Eye,
      completed: false,
      disabled: !generatedContent,
    },
    {
      id: "publish",
      label: "Publication",
      icon: Send,
      completed: false,
      disabled: !canPublish,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header with Progress */}
        <FadeIn>
          <Card className="border-none shadow-lg bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Créateur de Posts IA
                  </h1>
                  <p className="text-muted-foreground mt-2">Créez du contenu engageant en quelques étapes simples</p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression</span>
                    <span>{Math.round(progress)}% complété</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-lg font-semibold">{selectedPlatforms.length}</div>
                    <div className="text-xs text-muted-foreground">Plateformes</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-semibold">{generatedContent.length}</div>
                    <div className="text-xs text-muted-foreground">Caractères</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-semibold">{selectedImage ? "1" : "0"}</div>
                    <div className="text-xs text-muted-foreground">Image</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-semibold">{completedSteps.length}</div>
                    <div className="text-xs text-muted-foreground">Étapes</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Main Interface */}
        <FadeIn delay={200}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab Navigation */}
            <Card className="mb-6">
              <CardContent className="p-2">
                <TabsList className="grid w-full grid-cols-6 h-auto p-1">
                  {tabConfig.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        disabled={tab.disabled}
                        className="flex flex-col items-center gap-2 py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        <div className="flex items-center gap-1">
                          <Icon className="h-4 w-4" />
                          {tab.completed && <CheckCircle className="h-3 w-3 text-green-500" />}
                        </div>
                        <span className="text-xs font-medium">{tab.label}</span>
                      </TabsTrigger>
                    )
                  })}
                </TabsList>
              </CardContent>
            </Card>

            {/* Tab Content */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Main Content Area */}
              <div className="xl:col-span-2">
                <StaggerContainer>
                  <TabsContent value="configure" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <ContentConfiguration
                        topic={topic}
                        setTopic={setTopic}
                        selectedObjectives={selectedObjectives}
                        setSelectedObjectives={setSelectedObjectives}
                        customObjective={customObjective}
                        setCustomObjective={setCustomObjective}
                        tone={tone}
                        setTone={setTone}
                        autoOptimize={autoOptimize}
                        setAutoOptimize={setAutoOptimize}
                        onGenerate={generateContent}
                        isGenerating={isGenerating}
                        canGenerate={canGenerate}
                      />
                      <PlatformSelector
                        platforms={platforms}
                        selectedPlatforms={selectedPlatforms}
                        onTogglePlatform={togglePlatform}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="platforms" className="mt-0">
                    <PlatformSelector
                      platforms={platforms}
                      selectedPlatforms={selectedPlatforms}
                      onTogglePlatform={togglePlatform}
                    />
                  </TabsContent>

                  <TabsContent value="edit" className="mt-0">
                    <ContentEditor
                      content={generatedContent}
                      setContent={setGeneratedContent}
                      onRegenerate={regenerateContent}
                      onSave={savePost}
                      isRegenerating={isRegenerating}
                      maxLength={Math.max(
                        ...selectedPlatforms.map((p) => platforms.find((pl) => pl.id === p)?.limit || 280),
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="media" className="mt-0">
                    <EnhancedImageCatalog
                      onImageSelect={setSelectedImage}
                      selectedImage={selectedImage}
                      postContent={generatedContent || topic}
                      platform={currentPreviewPlatform}
                    />
                  </TabsContent>

                  <TabsContent value="preview" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <PreviewPanel
                        platforms={platforms}
                        selectedPlatforms={selectedPlatforms}
                        currentPreviewPlatform={currentPreviewPlatform}
                        setCurrentPreviewPlatform={setCurrentPreviewPlatform}
                        content={generatedContent}
                        selectedImage={selectedImage}
                      />
                      <PostValidation
                        content={generatedContent}
                        platform={currentPreviewPlatform}
                        selectedImage={selectedImage}
                        platformLimits={platformLimits}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="publish" className="mt-0">
                    <PublishingActions
                      content={generatedContent}
                      selectedPlatforms={selectedPlatforms}
                      selectedImage={selectedImage}
                      onSave={savePost}
                      onPublish={publishPost}
                      canPublish={canPublish}
                    />
                  </TabsContent>
                </StaggerContainer>
              </div>

              {/* Sidebar - Always show preview and validation */}
              <div className="space-y-6">
                <StaggerContainer>
                  {generatedContent && (
                    <>
                      <PreviewPanel
                        platforms={platforms}
                        selectedPlatforms={selectedPlatforms}
                        currentPreviewPlatform={currentPreviewPlatform}
                        setCurrentPreviewPlatform={setCurrentPreviewPlatform}
                        content={generatedContent}
                        selectedImage={selectedImage}
                      />
                      <PostValidation
                        content={generatedContent}
                        platform={currentPreviewPlatform}
                        selectedImage={selectedImage}
                        platformLimits={platformLimits}
                      />
                    </>
                  )}
                </StaggerContainer>
              </div>
            </div>
          </Tabs>
        </FadeIn>
      </div>
    </div>
  )
}

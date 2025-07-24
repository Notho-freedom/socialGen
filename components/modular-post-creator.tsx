"use client"

import { useState, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedButton } from "@/components/animated-button"
import { LoadingSpinner } from "@/components/loading-spinner"
import { FadeIn } from "@/components/fade-in"
import { StaggerContainer } from "@/components/stagger-container"
import { BasicConfig } from "@/components/post-creator/basic-config"
import { PlatformSelector } from "@/components/post-creator/platform-selector"
import { ContentEditor } from "@/components/post-creator/content-editor"
import { AdvancedSettings } from "@/components/post-creator/advanced-settings"
import { PreviewPanel } from "@/components/post-creator/preview-panel"
import { EnhancedImageCatalog } from "@/components/enhanced-image-catalog"
import { HashtagMentionSuggestions } from "@/components/hashtag-mention-suggestions"
import { PostValidation } from "@/components/post-validation"
import { Sparkles, Settings2, ImageIcon, Hash, BarChart3, Wand2, Zap } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function ModularPostCreator() {
  // State management
  const [activeTab, setActiveTab] = useState("setup")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["twitter"])
  const [topic, setTopic] = useState("")
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([])
  const [customObjective, setCustomObjective] = useState("")
  const [tone, setTone] = useState("Professionnel")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>("")
  const [autoOptimize, setAutoOptimize] = useState(true)
  const [schedulePost, setSchedulePost] = useState(false)
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")
  const [currentPreviewPlatform, setCurrentPreviewPlatform] = useState("twitter")

  // Platform limits
  const platformLimits = {
    twitter: 280,
    facebook: 2000,
    instagram: 2200,
    linkedin: 3000,
    youtube: 5000,
    tiktok: 2200,
  }

  const currentLimit = platformLimits[currentPreviewPlatform as keyof typeof platformLimits] || 280

  // Handle platform changes
  const handlePlatformsChange = useCallback(
    (platforms: string[]) => {
      setSelectedPlatforms(platforms)
      if (platforms.length > 0 && !platforms.includes(currentPreviewPlatform)) {
        setCurrentPreviewPlatform(platforms[0])
      }
    },
    [currentPreviewPlatform],
  )

  // Generate content
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
      setActiveTab("editor") // Switch to editor tab

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

  // Copy to clipboard
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

  // Save post
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

  // Publish post
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
      setActiveTab("setup")
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8 space-y-8">
        {/* Header */}
        <FadeIn>
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Créateur de Posts IA
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interface modulaire pour créer du contenu social media optimisé avec l'intelligence artificielle
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-2">
            <StaggerContainer>
              <FadeIn>
                <Card className="transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wand2 className="h-5 w-5 text-primary" />
                      Assistant de Création
                    </CardTitle>
                    <CardDescription>Suivez les étapes pour créer votre post parfait</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="setup" className="flex items-center gap-1">
                          <Settings2 className="h-4 w-4" />
                          <span className="hidden sm:inline">Config</span>
                        </TabsTrigger>
                        <TabsTrigger value="editor" className="flex items-center gap-1">
                          <Zap className="h-4 w-4" />
                          <span className="hidden sm:inline">Éditeur</span>
                        </TabsTrigger>
                        <TabsTrigger value="media" className="flex items-center gap-1">
                          <ImageIcon className="h-4 w-4" />
                          <span className="hidden sm:inline">Médias</span>
                        </TabsTrigger>
                        <TabsTrigger value="hashtags" className="flex items-center gap-1">
                          <Hash className="h-4 w-4" />
                          <span className="hidden sm:inline">Tags</span>
                        </TabsTrigger>
                        <TabsTrigger value="advanced" className="flex items-center gap-1">
                          <BarChart3 className="h-4 w-4" />
                          <span className="hidden sm:inline">Avancé</span>
                        </TabsTrigger>
                      </TabsList>

                      <div className="mt-6">
                        <TabsContent value="setup" className="space-y-6">
                          <PlatformSelector
                            selectedPlatforms={selectedPlatforms}
                            onPlatformsChange={handlePlatformsChange}
                          />
                          <BasicConfig
                            topic={topic}
                            onTopicChange={setTopic}
                            selectedObjectives={selectedObjectives}
                            onObjectivesChange={setSelectedObjectives}
                            customObjective={customObjective}
                            onCustomObjectiveChange={setCustomObjective}
                            tone={tone}
                            onToneChange={setTone}
                          />

                          {/* Generate Button */}
                          <div className="pt-6 border-t">
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
                                  Générer le contenu IA
                                </>
                              )}
                            </AnimatedButton>
                          </div>
                        </TabsContent>

                        <TabsContent value="editor" className="space-y-6">
                          {generatedContent ? (
                            <ContentEditor
                              content={generatedContent}
                              onContentChange={setGeneratedContent}
                              isRegenerating={isRegenerating}
                              onRegenerate={regenerateContent}
                              selectedPlatforms={selectedPlatforms}
                              schedulePost={schedulePost}
                              onCopyToClipboard={copyToClipboard}
                              onSavePost={savePost}
                              onPublishPost={publishPost}
                              characterLimit={currentLimit}
                            />
                          ) : (
                            <Card className="p-8 text-center">
                              <CardContent>
                                <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Aucun contenu généré</h3>
                                <p className="text-muted-foreground mb-4">
                                  Commencez par configurer votre post dans l'onglet "Config"
                                </p>
                                <AnimatedButton onClick={() => setActiveTab("setup")}>
                                  Retour à la configuration
                                </AnimatedButton>
                              </CardContent>
                            </Card>
                          )}
                        </TabsContent>

                        <TabsContent value="media" className="space-y-6">
                          <EnhancedImageCatalog
                            onImageSelect={setSelectedImage}
                            selectedImage={selectedImage}
                            postContent={generatedContent || topic}
                            platform={currentPreviewPlatform}
                          />
                        </TabsContent>

                        <TabsContent value="hashtags" className="space-y-6">
                          <HashtagMentionSuggestions
                            content={generatedContent}
                            onSuggestionClick={(suggestion) => setGeneratedContent((prev) => prev + suggestion)}
                          />
                        </TabsContent>

                        <TabsContent value="advanced" className="space-y-6">
                          <AdvancedSettings
                            autoOptimize={autoOptimize}
                            onAutoOptimizeChange={setAutoOptimize}
                            schedulePost={schedulePost}
                            onSchedulePostChange={setSchedulePost}
                            scheduledDate={scheduledDate}
                            onScheduledDateChange={setScheduledDate}
                            scheduledTime={scheduledTime}
                            onScheduledTimeChange={setScheduledTime}
                          />
                        </TabsContent>
                      </div>
                    </Tabs>
                  </CardContent>
                </Card>
              </FadeIn>
            </StaggerContainer>
          </div>

          {/* Sidebar - Preview and Validation */}
          <div className="space-y-6">
            <StaggerContainer>
              {/* Preview Panel */}
              <FadeIn delay={200}>
                <PreviewPanel
                  content={generatedContent}
                  selectedImage={selectedImage}
                  selectedPlatforms={selectedPlatforms}
                  currentPreviewPlatform={currentPreviewPlatform}
                  onPreviewPlatformChange={setCurrentPreviewPlatform}
                />
              </FadeIn>

              {/* Validation Panel */}
              {generatedContent && (
                <FadeIn delay={400}>
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

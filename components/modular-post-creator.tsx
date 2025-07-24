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
import { Sparkles, Settings2, ImageIcon, Hash, BarChart3, Wand2, Zap, Play } from "lucide-react"
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
    <div className="w-full">
      {/* Main Layout - Full Width Responsive Grid */}
      <div className="grid grid-cols-1 2xl:grid-cols-12 gap-6 lg:gap-8">
        {/* Main Content Area - Takes most space */}
        <div className="2xl:col-span-8">
          <StaggerContainer>
            <FadeIn>
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Wand2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl lg:text-2xl">Assistant de Création IA</CardTitle>
                        <CardDescription className="text-base">
                          Créez du contenu optimisé pour toutes vos plateformes sociales
                        </CardDescription>
                      </div>
                    </div>
                    {generatedContent && (
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-green-600 font-medium">Contenu généré</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6 lg:p-8">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-5 h-12 p-1 bg-muted/50">
                      <TabsTrigger
                        value="setup"
                        className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2"
                      >
                        <Settings2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Configuration</span>
                        <span className="sm:hidden">Config</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="editor"
                        className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2"
                      >
                        <Zap className="h-4 w-4" />
                        <span className="hidden sm:inline">Éditeur</span>
                        <span className="sm:hidden">Edit</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="media"
                        className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2"
                      >
                        <ImageIcon className="h-4 w-4" />
                        <span className="hidden sm:inline">Médias</span>
                        <span className="sm:hidden">Media</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="hashtags"
                        className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2"
                      >
                        <Hash className="h-4 w-4" />
                        <span className="hidden sm:inline">Hashtags</span>
                        <span className="sm:hidden">Tags</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="advanced"
                        className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2"
                      >
                        <BarChart3 className="h-4 w-4" />
                        <span className="hidden sm:inline">Avancé</span>
                        <span className="sm:hidden">Plus</span>
                      </TabsTrigger>
                    </TabsList>

                    <div className="mt-8">
                      <TabsContent value="setup" className="space-y-8 mt-0">
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
                        <div className="pt-8 border-t">
                          <AnimatedButton
                            onClick={generateContent}
                            disabled={isGenerating || !topic.trim() || selectedPlatforms.length === 0}
                            className="w-full group h-14 text-lg"
                            size="lg"
                          >
                            {isGenerating ? (
                              <>
                                <LoadingSpinner size="sm" className="mr-3" />
                                Génération en cours...
                              </>
                            ) : (
                              <>
                                <Play className="mr-3 h-5 w-5 transition-transform group-hover:scale-110" />
                                Générer le contenu avec l'IA
                              </>
                            )}
                          </AnimatedButton>
                        </div>
                      </TabsContent>

                      <TabsContent value="editor" className="space-y-8 mt-0">
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
                          <Card className="p-12 text-center border-dashed border-2">
                            <CardContent className="space-y-6">
                              <div className="p-4 bg-muted/30 rounded-full w-fit mx-auto">
                                <Sparkles className="h-12 w-12 text-muted-foreground" />
                              </div>
                              <div className="space-y-2">
                                <h3 className="text-xl font-semibold">Aucun contenu généré</h3>
                                <p className="text-muted-foreground max-w-md mx-auto">
                                  Commencez par configurer votre post dans l'onglet "Configuration" puis générez votre
                                  contenu avec l'IA
                                </p>
                              </div>
                              <AnimatedButton onClick={() => setActiveTab("setup")} className="mt-6">
                                <Settings2 className="mr-2 h-4 w-4" />
                                Aller à la configuration
                              </AnimatedButton>
                            </CardContent>
                          </Card>
                        )}
                      </TabsContent>

                      <TabsContent value="media" className="space-y-8 mt-0">
                        <EnhancedImageCatalog
                          onImageSelect={setSelectedImage}
                          selectedImage={selectedImage}
                          postContent={generatedContent || topic}
                          platform={currentPreviewPlatform}
                        />
                      </TabsContent>

                      <TabsContent value="hashtags" className="space-y-8 mt-0">
                        <HashtagMentionSuggestions
                          content={generatedContent}
                          onSuggestionClick={(suggestion) => setGeneratedContent((prev) => prev + suggestion)}
                        />
                      </TabsContent>

                      <TabsContent value="advanced" className="space-y-8 mt-0">
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
        <div className="2xl:col-span-4 space-y-6">
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
  )
}

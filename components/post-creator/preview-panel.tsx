"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FacebookPreview } from "@/components/post-previews/facebook-preview"
import { InstagramPreview } from "@/components/post-previews/instagram-preview"
import { TwitterPreview } from "@/components/post-previews/twitter-preview"
import { LinkedInPreview } from "@/components/post-previews/linkedin-preview"
import { FadeIn } from "@/components/fade-in"
import { Eye, Monitor, Smartphone, Tablet, ExternalLink } from "lucide-react"
import { useState } from "react"

interface PreviewPanelProps {
  content?: string
  selectedImage?: string
  selectedPlatforms?: string[]
  currentPreviewPlatform?: string
  onPreviewPlatformChange?: (platform: string) => void
}

const platformIcons = {
  facebook: "📘",
  instagram: "📷",
  twitter: "🐦",
  linkedin: "💼",
  youtube: "📺",
  tiktok: "🎵",
}

const platformNames = {
  facebook: "Facebook",
  instagram: "Instagram",
  twitter: "Twitter",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  tiktok: "TikTok",
}

export function PreviewPanel({
  content = "",
  selectedImage = "",
  selectedPlatforms = [],
  currentPreviewPlatform = "twitter",
  onPreviewPlatformChange,
}: PreviewPanelProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile" | "tablet">("desktop")

  // Ensure we have valid platforms
  const validSelectedPlatforms = selectedPlatforms || []
  const safeContent = content || ""

  const renderPreview = (platform: string) => {
    const commonProps = {
      content: safeContent,
      image: selectedImage,
    }

    switch (platform) {
      case "facebook":
        return <FacebookPreview {...commonProps} />
      case "instagram":
        return <InstagramPreview {...commonProps} />
      case "twitter":
        return <TwitterPreview {...commonProps} />
      case "linkedin":
        return <LinkedInPreview {...commonProps} />
      default:
        return (
          <div className="p-8 text-center text-muted-foreground">
            <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Aperçu non disponible pour cette plateforme</p>
          </div>
        )
    }
  }

  const getViewModeClass = () => {
    switch (viewMode) {
      case "mobile":
        return "max-w-sm mx-auto"
      case "tablet":
        return "max-w-md mx-auto"
      default:
        return "w-full"
    }
  }

  return (
    <FadeIn>
      <Card className="h-fit">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Aperçu en temps réel</CardTitle>
                <CardDescription>Visualisez votre post sur différentes plateformes</CardDescription>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
              <Button
                variant={viewMode === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("desktop")}
                className="h-8 w-8 p-0"
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "tablet" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("tablet")}
                className="h-8 w-8 p-0"
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("mobile")}
                className="h-8 w-8 p-0"
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Platform Selection */}
          {validSelectedPlatforms.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Plateformes sélectionnées</h4>
                <Badge variant="secondary">{validSelectedPlatforms.length} plateforme(s)</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {validSelectedPlatforms.map((platform) => (
                  <Badge
                    key={platform}
                    variant={currentPreviewPlatform === platform ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => onPreviewPlatformChange?.(platform)}
                  >
                    <span className="mr-1">{platformIcons[platform as keyof typeof platformIcons]}</span>
                    {platformNames[platform as keyof typeof platformNames]}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Preview Content */}
          <div className="space-y-4">
            {validSelectedPlatforms.length > 0 ? (
              <div className={`transition-all duration-300 ${getViewModeClass()}`}>
                <div className="border rounded-lg overflow-hidden bg-background">
                  {renderPreview(currentPreviewPlatform)}
                </div>
              </div>
            ) : (
              <Card className="p-8 text-center border-dashed border-2">
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-full w-fit mx-auto">
                    <Eye className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Aucune plateforme sélectionnée</h3>
                    <p className="text-muted-foreground">
                      Sélectionnez des plateformes dans l'onglet "Configuration" pour voir l'aperçu
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Preview Actions */}
          {validSelectedPlatforms.length > 0 && safeContent && (
            <div className="pt-4 border-t">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <ExternalLink className="h-4 w-4 mr-2" />
                Ouvrir dans un nouvel onglet
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </FadeIn>
  )
}

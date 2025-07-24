"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/fade-in"
import { Eye, Monitor, Smartphone, Tablet } from "lucide-react"
import { FacebookPreview } from "@/components/post-previews/facebook-preview"
import { InstagramPreview } from "@/components/post-previews/instagram-preview"
import { TwitterPreview } from "@/components/post-previews/twitter-preview"
import { LinkedInPreview } from "@/components/post-previews/linkedin-preview"

interface Platform {
  id: string
  name: string
  icon: any
  limit: number
  color: string
}

interface PreviewPanelProps {
  platforms: Platform[]
  selectedPlatforms: string[]
  currentPreviewPlatform: string
  setCurrentPreviewPlatform: (platform: string) => void
  content: string
  selectedImage?: string
}

export function PreviewPanel({
  platforms,
  selectedPlatforms,
  currentPreviewPlatform,
  setCurrentPreviewPlatform,
  content,
  selectedImage,
}: PreviewPanelProps) {
  const currentPlatform = platforms.find((p) => p.id === currentPreviewPlatform)

  const renderPreview = () => {
    const previewProps = {
      content: content || "Votre contenu apparaîtra ici...",
      imageUrl: selectedImage,
    }

    switch (currentPreviewPlatform) {
      case "facebook":
        return <FacebookPreview {...previewProps} />
      case "instagram":
        return <InstagramPreview {...previewProps} />
      case "twitter":
        return <TwitterPreview {...previewProps} />
      case "linkedin":
        return <LinkedInPreview {...previewProps} />
      default:
        return <TwitterPreview {...previewProps} />
    }
  }

  return (
    <FadeIn>
      <Card className="h-full sticky top-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Prévisualisation
              </CardTitle>
              <CardDescription>Aperçu temps réel de votre post</CardDescription>
            </div>

            {/* Device Icons */}
            <div className="flex items-center gap-1">
              <Monitor className="h-4 w-4 text-muted-foreground" />
              <Tablet className="h-4 w-4 text-muted-foreground" />
              <Smartphone className="h-4 w-4 text-primary" />
            </div>
          </div>

          {/* Platform Selector */}
          {selectedPlatforms.length > 1 && (
            <div className="flex items-center gap-2">
              <Select value={currentPreviewPlatform} onValueChange={setCurrentPreviewPlatform}>
                <SelectTrigger className="w-40">
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

              {currentPlatform && (
                <Badge variant="outline" className="text-xs">
                  {currentPlatform.limit} car. max
                </Badge>
              )}
            </div>
          )}
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {/* Preview Container */}
            <div className="min-h-[500px] flex items-center justify-center bg-muted/20 rounded-lg p-4">
              {renderPreview()}
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

            {/* Content Stats */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="text-lg font-semibold">{content.length}</div>
                <div className="text-xs text-muted-foreground">Caractères</div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="text-lg font-semibold">
                  {content.split(/\s+/).filter((word) => word.length > 0).length}
                </div>
                <div className="text-xs text-muted-foreground">Mots</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  )
}

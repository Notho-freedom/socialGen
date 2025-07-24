"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FacebookPreview } from "@/components/post-previews/facebook-preview"
import { InstagramPreview } from "@/components/post-previews/instagram-preview"
import { TwitterPreview } from "@/components/post-previews/twitter-preview"
import { LinkedInPreview } from "@/components/post-previews/linkedin-preview"
import { FadeIn } from "@/components/fade-in"
import { Eye, Facebook, Twitter, Instagram, Linkedin, Youtube, TwitterIcon as TikTok } from "lucide-react"

interface PreviewPanelProps {
  content: string
  selectedImage?: string
  selectedPlatforms: string[]
  currentPreviewPlatform: string
  onPreviewPlatformChange: (platform: string) => void
}

const platforms = [
  { id: "twitter", name: "Twitter", icon: Twitter },
  { id: "facebook", name: "Facebook", icon: Facebook },
  { id: "instagram", name: "Instagram", icon: Instagram },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin },
  { id: "youtube", name: "YouTube", icon: Youtube },
  { id: "tiktok", name: "TikTok", icon: TikTok },
]

export function PreviewPanel({
  content,
  selectedImage,
  selectedPlatforms,
  currentPreviewPlatform,
  onPreviewPlatformChange,
}: PreviewPanelProps) {
  const renderPreview = () => {
    const previewContent = content || "Votre contenu apparaîtra ici..."

    switch (currentPreviewPlatform) {
      case "facebook":
        return <FacebookPreview content={previewContent} imageUrl={selectedImage} />
      case "instagram":
        return <InstagramPreview content={previewContent} imageUrl={selectedImage} />
      case "twitter":
        return <TwitterPreview content={previewContent} imageUrl={selectedImage} />
      case "linkedin":
        return <LinkedInPreview content={previewContent} imageUrl={selectedImage} />
      case "youtube":
      case "tiktok":
        return <LinkedInPreview content={previewContent} imageUrl={selectedImage} />
      default:
        return <TwitterPreview content={previewContent} imageUrl={selectedImage} />
    }
  }

  const currentPlatform = platforms.find((p) => p.id === currentPreviewPlatform)

  return (
    <FadeIn>
      <Card className="sticky top-6 transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Prévisualisation</CardTitle>
            </div>
            {selectedPlatforms.length > 1 && (
              <Select value={currentPreviewPlatform} onValueChange={onPreviewPlatformChange}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {selectedPlatforms.map((platformId) => {
                    const platform = platforms.find((p) => p.id === platformId)
                    const Icon = platform?.icon
                    return (
                      <SelectItem key={platformId} value={platformId}>
                        <div className="flex items-center gap-2">
                          {Icon && <Icon className="h-4 w-4" />}
                          {platform?.name}
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            )}
          </div>
          <CardDescription>Aperçu en temps réel sur {currentPlatform?.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Preview */}
            <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg p-4">
              {renderPreview()}
            </div>

            {/* Multi-platform indicators */}
            {selectedPlatforms.length > 1 && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-center">Plateformes sélectionnées :</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {selectedPlatforms.map((platformId) => {
                    const platform = platforms.find((p) => p.id === platformId)
                    const Icon = platform?.icon
                    return (
                      <Badge
                        key={platformId}
                        variant={platformId === currentPreviewPlatform ? "default" : "outline"}
                        className={`cursor-pointer transition-all duration-200 hover:scale-110 ${
                          platformId === currentPreviewPlatform ? "shadow-md ring-2 ring-primary/20" : ""
                        }`}
                        onClick={() => onPreviewPlatformChange(platformId)}
                      >
                        {Icon && <Icon className="h-3 w-3 mr-1" />}
                        {platform?.name}
                      </Badge>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Content info */}
            <div className="text-center space-y-2 pt-4 border-t">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Caractères :</span>
                <span>{content.length}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Mots :</span>
                <span>{content.split(/\s+/).filter((word) => word.length > 0).length}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Hashtags :</span>
                <span>{(content.match(/#\w+/g) || []).length}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  )
}

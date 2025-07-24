"use client"

import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { AnimatedButton } from "@/components/animated-button"
import { FadeIn } from "@/components/fade-in"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, TwitterIcon as TikTok, Globe2 } from "lucide-react"

interface PlatformSelectorProps {
  selectedPlatforms: string[]
  onPlatformsChange: (platforms: string[]) => void
}

const platforms = [
  { id: "twitter", name: "Twitter", icon: Twitter, limit: 280, color: "bg-blue-500" },
  { id: "facebook", name: "Facebook", icon: Facebook, limit: 2000, color: "bg-blue-600" },
  { id: "instagram", name: "Instagram", icon: Instagram, limit: 2200, color: "bg-pink-500" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, limit: 3000, color: "bg-blue-700" },
  { id: "youtube", name: "YouTube", icon: Youtube, limit: 5000, color: "bg-red-500" },
  { id: "tiktok", name: "TikTok", icon: TikTok, limit: 2200, color: "bg-black" },
]

export function PlatformSelector({ selectedPlatforms, onPlatformsChange }: PlatformSelectorProps) {
  const togglePlatform = (platformId: string) => {
    const newSelection = selectedPlatforms.includes(platformId)
      ? selectedPlatforms.filter((id) => id !== platformId)
      : [...selectedPlatforms, platformId]
    onPlatformsChange(newSelection)
  }

  return (
    <FadeIn>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Globe2 className="h-4 w-4 text-primary" />
          <Label className="text-base font-semibold">Plateformes cibles *</Label>
          {selectedPlatforms.length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {selectedPlatforms.length} sélectionnée(s)
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {platforms.map((platform) => {
            const Icon = platform.icon
            const isSelected = selectedPlatforms.includes(platform.id)
            return (
              <AnimatedButton
                key={platform.id}
                variant={isSelected ? "default" : "outline"}
                className={`flex flex-col items-center justify-center gap-2 h-20 w-full transition-all duration-300 ${
                  isSelected ? "scale-105 shadow-lg ring-2 ring-primary/20" : "hover:scale-105 hover:shadow-md"
                }`}
                onClick={() => togglePlatform(platform.id)}
                title={`${platform.name} - ${platform.limit} caractères`}
              >
                <Icon className="h-6 w-6 transition-transform duration-300" />
                <span className="text-xs text-muted-foreground">{platform.limit}</span>
              </AnimatedButton>
            )
          })}
        </div>

        <p className="text-xs text-muted-foreground">
          Sélectionnez les plateformes. Le contenu sera optimisé pour chaque plateforme choisie.
        </p>
      </div>
    </FadeIn>
  )
}

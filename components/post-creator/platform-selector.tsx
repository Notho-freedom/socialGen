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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {platforms.map((platform) => {
            const Icon = platform.icon
            const isSelected = selectedPlatforms.includes(platform.id)
            return (
              <AnimatedButton
                key={platform.id}
                variant={isSelected ? "default" : "outline"}
                className={`flex flex-col items-center gap-3 h-20 transition-all duration-300 ${
                  isSelected ? "scale-105 shadow-lg ring-2 ring-primary/20" : "hover:scale-105 hover:shadow-md"
                }`}
                onClick={() => togglePlatform(platform.id)}
              >
                <Icon className="h-5 w-5 transition-transform duration-300" />
                <div className="text-center">
                  <div className="text-sm font-medium">{platform.name}</div>
                  <div className="text-xs text-muted-foreground">{platform.limit} caractères</div>
                </div>
              </AnimatedButton>
            )
          })}
        </div>

        <p className="text-xs text-muted-foreground">
          Sélectionnez une ou plusieurs plateformes. Le contenu sera optimisé pour chaque plateforme choisie.
        </p>
      </div>
    </FadeIn>
  )
}

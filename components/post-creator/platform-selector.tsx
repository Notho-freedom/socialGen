"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedButton } from "@/components/animated-button"
import { FadeIn } from "@/components/fade-in"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, TwitterIcon as TikTok, Globe } from "lucide-react"

interface Platform {
  id: string
  name: string
  icon: any
  limit: number
  color: string
}

interface PlatformSelectorProps {
  platforms: Platform[]
  selectedPlatforms: string[]
  onTogglePlatform: (platformId: string) => void
}

const platformIcons = {
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: TikTok,
}

export function PlatformSelector({ platforms, selectedPlatforms, onTogglePlatform }: PlatformSelectorProps) {
  return (
    <FadeIn>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Plateformes Cibles
          </CardTitle>
          <CardDescription>Sélectionnez les plateformes pour votre publication</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {platforms.map((platform) => {
              const Icon = platformIcons[platform.id as keyof typeof platformIcons] || Globe
              const isSelected = selectedPlatforms.includes(platform.id)

              return (
                <AnimatedButton
                  key={platform.id}
                  variant={isSelected ? "default" : "outline"}
                  className={`flex flex-col items-center gap-3 h-auto py-4 transition-all duration-300 ${
                    isSelected ? "scale-105 shadow-lg ring-2 ring-primary/20" : "hover:scale-105"
                  }`}
                  onClick={() => onTogglePlatform(platform.id)}
                >
                  <Icon className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-medium">{platform.name}</div>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {platform.limit} caractères
                    </Badge>
                  </div>
                </AnimatedButton>
              )
            })}
          </div>

          {selectedPlatforms.length > 0 && (
            <div className="mt-4 p-3 bg-primary/5 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-primary">
                  {selectedPlatforms.length} plateforme(s) sélectionnée(s)
                </span>
                <br />
                Le contenu sera optimisé pour chaque plateforme
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </FadeIn>
  )
}

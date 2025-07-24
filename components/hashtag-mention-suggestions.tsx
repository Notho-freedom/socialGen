"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatedButton } from "@/components/animated-button"
import { FadeIn } from "@/components/fade-in"
import { Hash, AtSign, TrendingUp, Users, Plus } from "lucide-react"

interface HashtagMentionSuggestionsProps {
  content: string
  onSuggestionClick: (suggestion: string) => void
}

const popularHashtags = [
  "#marketing",
  "#business",
  "#innovation",
  "#tech",
  "#startup",
  "#entrepreneur",
  "#leadership",
  "#success",
  "#motivation",
  "#growth",
  "#digital",
  "#AI",
  "#socialmedia",
  "#branding",
  "#strategy",
]

const suggestedMentions = [
  "@expert_marketing",
  "@tech_leader",
  "@business_guru",
  "@startup_mentor",
  "@innovation_hub",
  "@digital_expert",
  "@growth_hacker",
  "@brand_master",
]

export function HashtagMentionSuggestions({ content, onSuggestionClick }: HashtagMentionSuggestionsProps) {
  const [customHashtag, setCustomHashtag] = useState("")
  const [customMention, setCustomMention] = useState("")

  const currentHashtags = useMemo(() => {
    return content.match(/#\w+/g) || []
  }, [content])

  const currentMentions = useMemo(() => {
    return content.match(/@\w+/g) || []
  }, [content])

  const addCustomHashtag = () => {
    if (customHashtag.trim()) {
      const hashtag = customHashtag.startsWith("#") ? customHashtag : `#${customHashtag}`
      onSuggestionClick(` ${hashtag}`)
      setCustomHashtag("")
    }
  }

  const addCustomMention = () => {
    if (customMention.trim()) {
      const mention = customMention.startsWith("@") ? customMention : `@${customMention}`
      onSuggestionClick(` ${mention}`)
      setCustomMention("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Current Tags */}
      {(currentHashtags.length > 0 || currentMentions.length > 0) && (
        <FadeIn>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
                Tags actuels
              </CardTitle>
              <CardDescription>Hashtags et mentions détectés dans votre contenu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentHashtags.length > 0 && (
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Hash className="h-4 w-4" />
                    Hashtags ({currentHashtags.length})
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {currentHashtags.map((hashtag, index) => (
                      <Badge key={index} variant="default" className="text-sm">
                        {hashtag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {currentMentions.length > 0 && (
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <AtSign className="h-4 w-4" />
                    Mentions ({currentMentions.length})
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {currentMentions.map((mention, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {mention}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {/* Hashtag Suggestions */}
      <FadeIn>
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Hash className="h-5 w-5 text-primary" />
              Hashtags populaires
            </CardTitle>
            <CardDescription>Ajoutez des hashtags tendance pour augmenter la visibilité</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Custom Hashtag Input */}
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Ajouter un hashtag personnalisé..."
                  value={customHashtag}
                  onChange={(e) => setCustomHashtag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addCustomHashtag()}
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <AnimatedButton onClick={addCustomHashtag} disabled={!customHashtag.trim()} size="sm" className="px-3">
                <Plus className="h-4 w-4" />
              </AnimatedButton>
            </div>

            {/* Popular Hashtags */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Suggestions populaires</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {popularHashtags.map((hashtag) => (
                  <AnimatedButton
                    key={hashtag}
                    variant="outline"
                    size="sm"
                    onClick={() => onSuggestionClick(` ${hashtag}`)}
                    className="justify-start text-left hover:bg-primary/5 transition-all duration-200"
                    disabled={currentHashtags.includes(hashtag)}
                  >
                    <Hash className="h-3 w-3 mr-1" />
                    {hashtag.slice(1)}
                  </AnimatedButton>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Mention Suggestions */}
      <FadeIn>
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <AtSign className="h-5 w-5 text-primary" />
              Mentions suggérées
            </CardTitle>
            <CardDescription>Mentionnez des comptes pertinents pour étendre votre portée</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Custom Mention Input */}
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Ajouter une mention personnalisée..."
                  value={customMention}
                  onChange={(e) => setCustomMention(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addCustomMention()}
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <AnimatedButton onClick={addCustomMention} disabled={!customMention.trim()} size="sm" className="px-3">
                <Plus className="h-4 w-4" />
              </AnimatedButton>
            </div>

            {/* Suggested Mentions */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Comptes recommandés</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {suggestedMentions.map((mention) => (
                  <AnimatedButton
                    key={mention}
                    variant="outline"
                    size="sm"
                    onClick={() => onSuggestionClick(` ${mention}`)}
                    className="justify-start text-left hover:bg-primary/5 transition-all duration-200"
                    disabled={currentMentions.includes(mention)}
                  >
                    <Users className="h-3 w-3 mr-2" />
                    {mention.slice(1)}
                  </AnimatedButton>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  )
}

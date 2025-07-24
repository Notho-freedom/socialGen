"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FadeIn } from "@/components/fade-in"
import { Hash, AtSign, TrendingUp, Search } from "lucide-react"

interface HashtagMentionSuggestionsProps {
  content: string
  onSuggestionClick: (suggestion: string) => void
}

const popularHashtags = [
  "#marketing",
  "#business",
  "#entrepreneur",
  "#startup",
  "#innovation",
  "#technology",
  "#AI",
  "#digitalmarketing",
  "#socialmedia",
  "#branding",
  "#leadership",
  "#motivation",
  "#success",
  "#growth",
  "#networking",
  "#productivity",
  "#strategy",
  "#tips",
  "#inspiration",
  "#future",
]

const suggestedMentions = [
  "@elonmusk",
  "@garyvee",
  "@neilpatel",
  "@randfish",
  "@semrush",
  "@hubspot",
  "@buffer",
  "@hootsuite",
  "@canva",
  "@adobe",
]

export function HashtagMentionSuggestions({ content, onSuggestionClick }: HashtagMentionSuggestionsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [detectedHashtags, setDetectedHashtags] = useState<string[]>([])
  const [detectedMentions, setDetectedMentions] = useState<string[]>([])

  useEffect(() => {
    // Detect existing hashtags and mentions
    const hashtags = content.match(/#\w+/g) || []
    const mentions = content.match(/@\w+/g) || []

    setDetectedHashtags(hashtags)
    setDetectedMentions(mentions)
  }, [content])

  const filteredHashtags = popularHashtags.filter(
    (tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()) && !detectedHashtags.includes(tag),
  )

  const filteredMentions = suggestedMentions.filter(
    (mention) => mention.toLowerCase().includes(searchTerm.toLowerCase()) && !detectedMentions.includes(mention),
  )

  return (
    <FadeIn>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Suggestions
          </CardTitle>
          <CardDescription>Hashtags et mentions pour améliorer votre portée</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher hashtags ou mentions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Detected Elements */}
          {(detectedHashtags.length > 0 || detectedMentions.length > 0) && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Détectés dans votre post</Label>
              <div className="flex flex-wrap gap-2">
                {detectedHashtags.map((hashtag, index) => (
                  <Badge key={index} variant="default" className="text-xs">
                    {hashtag}
                  </Badge>
                ))}
                {detectedMentions.map((mention, index) => (
                  <Badge key={index} variant="default" className="text-xs">
                    {mention}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Hashtag Suggestions */}
          {filteredHashtags.length > 0 && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Hash className="h-4 w-4" />
                Hashtags suggérés
              </Label>
              <div className="flex flex-wrap gap-2">
                {filteredHashtags.slice(0, 10).map((hashtag) => (
                  <Badge
                    key={hashtag}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                    onClick={() => onSuggestionClick(` ${hashtag}`)}
                  >
                    {hashtag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Mention Suggestions */}
          {filteredMentions.length > 0 && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <AtSign className="h-4 w-4" />
                Mentions suggérées
              </Label>
              <div className="flex flex-wrap gap-2">
                {filteredMentions.slice(0, 8).map((mention) => (
                  <Badge
                    key={mention}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                    onClick={() => onSuggestionClick(` ${mention}`)}
                  >
                    {mention}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground">
              💡 <strong>Conseil :</strong> Utilisez 3-5 hashtags pertinents pour un engagement optimal. Les mentions
              peuvent augmenter votre portée si les comptes vous répondent.
            </p>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  )
}

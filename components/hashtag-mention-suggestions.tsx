"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Hash, AtSign, TrendingUp, Users } from "lucide-react"

interface HashtagMentionSuggestionsProps {
  content: string
  onSuggestionClick: (suggestion: string) => void
}

const popularHashtags = [
  "#marketing",
  "#business",
  "#entrepreneur",
  "#innovation",
  "#technology",
  "#startup",
  "#leadership",
  "#motivation",
  "#success",
  "#digitalmarketing",
  "#socialmedia",
  "#branding",
  "#networking",
  "#growth",
  "#productivity",
]

const suggestedMentions = [
  "@expert_marketing",
  "@tech_innovator",
  "@business_guru",
  "@startup_mentor",
  "@digital_leader",
]

export function HashtagMentionSuggestions({ content, onSuggestionClick }: HashtagMentionSuggestionsProps) {
  const [detectedHashtags, setDetectedHashtags] = useState<string[]>([])
  const [detectedMentions, setDetectedMentions] = useState<string[]>([])
  const [suggestedHashtags, setSuggestedHashtags] = useState<string[]>([])

  useEffect(() => {
    // Detect existing hashtags and mentions
    const hashtagMatches = content.match(/#\w+/g) || []
    const mentionMatches = content.match(/@\w+/g) || []

    setDetectedHashtags(hashtagMatches)
    setDetectedMentions(mentionMatches)

    // Suggest relevant hashtags based on content
    const contentWords = content.toLowerCase().split(/\s+/)
    const relevant = popularHashtags.filter((hashtag) =>
      contentWords.some(
        (word) => hashtag.toLowerCase().includes(word) || word.includes(hashtag.slice(1).toLowerCase()),
      ),
    )

    setSuggestedHashtags(relevant.slice(0, 8))
  }, [content])

  if (!content.trim()) return null

  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardContent className="p-4 space-y-4">
        {/* Detected Elements */}
        {(detectedHashtags.length > 0 || detectedMentions.length > 0) && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Éléments détectés
            </h4>
            <div className="flex flex-wrap gap-2">
              {detectedHashtags.map((hashtag, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700">
                  <Hash className="h-3 w-3 mr-1" />
                  {hashtag.slice(1)}
                </Badge>
              ))}
              {detectedMentions.map((mention, index) => (
                <Badge key={index} variant="secondary" className="bg-green-100 text-green-700">
                  <AtSign className="h-3 w-3 mr-1" />
                  {mention.slice(1)}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Hashtags */}
        {suggestedHashtags.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Hash className="h-4 w-4" />
              Hashtags suggérés
            </h4>
            <div className="flex flex-wrap gap-2">
              {suggestedHashtags.map((hashtag) => (
                <Button
                  key={hashtag}
                  variant="outline"
                  size="sm"
                  onClick={() => onSuggestionClick(` ${hashtag}`)}
                  className="h-7 text-xs hover:bg-blue-50 hover:border-blue-300"
                >
                  {hashtag}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Mentions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            Mentions suggérées
          </h4>
          <div className="flex flex-wrap gap-2">
            {suggestedMentions.slice(0, 3).map((mention) => (
              <Button
                key={mention}
                variant="outline"
                size="sm"
                onClick={() => onSuggestionClick(` ${mention}`)}
                className="h-7 text-xs hover:bg-green-50 hover:border-green-300"
              >
                {mention}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

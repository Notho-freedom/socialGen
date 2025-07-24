"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AnimatedButton } from "@/components/animated-button"
import { FadeIn } from "@/components/fade-in"
import { Hash, AtSign, Search, TrendingUp } from "lucide-react"

interface HashtagMentionSuggestionsProps {
  content: string
  onSuggestionClick: (suggestion: string) => void
}

const popularHashtags = [
  "#marketing",
  "#business",
  "#innovation",
  "#technology",
  "#startup",
  "#entrepreneur",
  "#digitalmarketing",
  "#socialmedia",
  "#AI",
  "#success",
  "#motivation",
  "#leadership",
  "#growth",
  "#tips",
  "#inspiration",
]

const suggestedMentions = [
  "@experts",
  "@influencers",
  "@industry_leaders",
  "@community",
  "@followers",
  "@team",
  "@partners",
  "@clients",
]

export function HashtagMentionSuggestions({ content, onSuggestionClick }: HashtagMentionSuggestionsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredHashtags, setFilteredHashtags] = useState(popularHashtags)
  const [contentHashtags, setContentHashtags] = useState<string[]>([])
  const [contentMentions, setContentMentions] = useState<string[]>([])

  useEffect(() => {
    // Extract existing hashtags and mentions from content
    const hashtags = content.match(/#\w+/g) || []
    const mentions = content.match(/@\w+/g) || []
    setContentHashtags(hashtags)
    setContentMentions(mentions)

    // Filter hashtags based on search
    if (searchQuery) {
      setFilteredHashtags(popularHashtags.filter((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    } else {
      setFilteredHashtags(popularHashtags)
    }
  }, [content, searchQuery])

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionClick(` ${suggestion}`)
  }

  return (
    <FadeIn>
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Suggestions et Tendances
          </CardTitle>
          <CardDescription>Ajoutez des hashtags et mentions populaires pour augmenter votre portée</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher des hashtags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Current hashtags and mentions */}
          {(contentHashtags.length > 0 || contentMentions.length > 0) && (
            <div className="space-y-3">
              <p className="text-sm font-medium">Dans votre contenu :</p>
              <div className="flex flex-wrap gap-2">
                {contentHashtags.map((hashtag, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700">
                    <Hash className="h-3 w-3 mr-1" />
                    {hashtag.slice(1)}
                  </Badge>
                ))}
                {contentMentions.map((mention, index) => (
                  <Badge key={index} variant="secondary" className="bg-green-100 text-green-700">
                    <AtSign className="h-3 w-3 mr-1" />
                    {mention.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Hashtag suggestions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-primary" />
              <p className="text-sm font-medium">Hashtags populaires</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {filteredHashtags.slice(0, 12).map((hashtag) => (
                <AnimatedButton
                  key={hashtag}
                  variant="outline"
                  size="sm"
                  className="justify-start hover:scale-105 transition-all duration-200"
                  onClick={() => handleSuggestionClick(hashtag)}
                >
                  <Hash className="h-3 w-3 mr-1" />
                  {hashtag.slice(1)}
                </AnimatedButton>
              ))}
            </div>
          </div>

          {/* Mention suggestions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AtSign className="h-4 w-4 text-primary" />
              <p className="text-sm font-medium">Mentions suggérées</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {suggestedMentions.map((mention) => (
                <AnimatedButton
                  key={mention}
                  variant="outline"
                  size="sm"
                  className="justify-start hover:scale-105 transition-all duration-200"
                  onClick={() => handleSuggestionClick(mention)}
                >
                  <AtSign className="h-3 w-3 mr-1" />
                  {mention.slice(1)}
                </AnimatedButton>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FadeIn } from "@/components/fade-in"
import { Hash, AtSign, Search, TrendingUp, Plus, Sparkles } from "lucide-react"

interface HashtagMentionSuggestionsProps {
  content?: string
  onSuggestionClick: (suggestion: string) => void
}

const trendingHashtags = [
  "#marketing",
  "#socialmedia",
  "#business",
  "#entrepreneur",
  "#startup",
  "#innovation",
  "#technology",
  "#digitalmarketing",
  "#branding",
  "#growth",
  "#success",
  "#motivation",
  "#leadership",
  "#productivity",
  "#networking",
]

const popularMentions = [
  "@instagram",
  "@facebook",
  "@twitter",
  "@linkedin",
  "@youtube",
  "@tiktok",
  "@pinterest",
  "@snapchat",
  "@reddit",
  "@discord",
]

const categoryHashtags = {
  business: ["#business", "#entrepreneur", "#startup", "#success", "#growth", "#leadership"],
  tech: ["#technology", "#innovation", "#ai", "#digital", "#future", "#coding"],
  marketing: ["#marketing", "#branding", "#advertising", "#content", "#seo", "#socialmedia"],
  lifestyle: ["#lifestyle", "#motivation", "#inspiration", "#wellness", "#mindset", "#goals"],
}

export function HashtagMentionSuggestions({ content = "", onSuggestionClick }: HashtagMentionSuggestionsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [customHashtag, setCustomHashtag] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("business")

  // Extract existing hashtags and mentions from content with null safety
  const safeContent = content || ""
  const existingHashtags = safeContent.match(/#\w+/g) || []
  const existingMentions = safeContent.match(/@\w+/g) || []

  // Filter suggestions based on search term
  const filteredHashtags = trendingHashtags.filter(
    (tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()) && !existingHashtags.includes(tag),
  )

  const filteredMentions = popularMentions.filter(
    (mention) => mention.toLowerCase().includes(searchTerm.toLowerCase()) && !existingMentions.includes(mention),
  )

  const handleAddCustomHashtag = () => {
    if (customHashtag.trim()) {
      const hashtag = customHashtag.startsWith("#") ? customHashtag : `#${customHashtag}`
      onSuggestionClick(` ${hashtag}`)
      setCustomHashtag("")
    }
  }

  return (
    <FadeIn>
      <div className="space-y-6">
        {/* Search Bar */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Hash className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Hashtags & Mentions</CardTitle>
                <CardDescription>Améliorez la portée de votre contenu</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher des hashtags ou mentions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Custom Hashtag Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Créer un hashtag personnalisé..."
                value={customHashtag}
                onChange={(e) => setCustomHashtag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddCustomHashtag()}
              />
              <Button onClick={handleAddCustomHashtag} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Suggestions Tabs */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="hashtags" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="hashtags" className="flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Hashtags
                </TabsTrigger>
                <TabsTrigger value="mentions" className="flex items-center gap-2">
                  <AtSign className="h-4 w-4" />
                  Mentions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="hashtags" className="space-y-6 mt-6">
                {/* Category Selection */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Catégories populaires
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(categoryHashtags).map((category) => (
                      <Badge
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className="cursor-pointer capitalize"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Category Hashtags */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium capitalize">{selectedCategory}</h4>
                  <div className="flex flex-wrap gap-2">
                    {categoryHashtags[selectedCategory as keyof typeof categoryHashtags].map((hashtag) => (
                      <Badge
                        key={hashtag}
                        variant="outline"
                        className={`cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors ${
                          existingHashtags.includes(hashtag) ? "opacity-50" : ""
                        }`}
                        onClick={() => !existingHashtags.includes(hashtag) && onSuggestionClick(` ${hashtag}`)}
                      >
                        {hashtag}
                        {!existingHashtags.includes(hashtag) && <Plus className="h-3 w-3 ml-1" />}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Trending Hashtags */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Tendances
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(searchTerm ? filteredHashtags : trendingHashtags.slice(0, 10)).map((hashtag) => (
                      <Badge
                        key={hashtag}
                        variant="outline"
                        className={`cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors ${
                          existingHashtags.includes(hashtag) ? "opacity-50" : ""
                        }`}
                        onClick={() => !existingHashtags.includes(hashtag) && onSuggestionClick(` ${hashtag}`)}
                      >
                        {hashtag}
                        {!existingHashtags.includes(hashtag) && <Plus className="h-3 w-3 ml-1" />}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="mentions" className="space-y-6 mt-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Mentions populaires</h4>
                  <div className="flex flex-wrap gap-2">
                    {(searchTerm ? filteredMentions : popularMentions).map((mention) => (
                      <Badge
                        key={mention}
                        variant="outline"
                        className={`cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors ${
                          existingMentions.includes(mention) ? "opacity-50" : ""
                        }`}
                        onClick={() => !existingMentions.includes(mention) && onSuggestionClick(` ${mention}`)}
                      >
                        {mention}
                        {!existingMentions.includes(mention) && <Plus className="h-3 w-3 ml-1" />}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Current Content Analysis */}
        {safeContent && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Analyse du contenu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {existingHashtags.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Hashtags utilisés ({existingHashtags.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {existingHashtags.map((hashtag, index) => (
                      <Badge key={index} variant="secondary">
                        {hashtag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {existingMentions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Mentions utilisées ({existingMentions.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {existingMentions.map((mention, index) => (
                      <Badge key={index} variant="secondary">
                        {mention}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {existingHashtags.length === 0 && existingMentions.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Aucun hashtag ou mention détecté dans votre contenu
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </FadeIn>
  )
}

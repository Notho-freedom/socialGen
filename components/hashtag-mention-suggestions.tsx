"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FadeIn } from "@/components/fade-in"
import { Hash, AtSign, Search, TrendingUp, Users, Briefcase, Heart, Zap, Plus } from "lucide-react"

interface HashtagMentionSuggestionsProps {
  content?: string
  onSuggestionClick: (suggestion: string) => void
}

const trendingHashtags = [
  { tag: "#IA", category: "tech", count: "2.1M" },
  { tag: "#Marketing", category: "business", count: "1.8M" },
  { tag: "#Innovation", category: "tech", count: "1.5M" },
  { tag: "#Entrepreneuriat", category: "business", count: "1.2M" },
  { tag: "#Digital", category: "tech", count: "980K" },
  { tag: "#Startup", category: "business", count: "850K" },
  { tag: "#Leadership", category: "business", count: "750K" },
  { tag: "#Tech", category: "tech", count: "690K" },
  { tag: "#SocialMedia", category: "marketing", count: "620K" },
  { tag: "#SEO", category: "marketing", count: "580K" },
]

const suggestedMentions = [
  { handle: "@vercel", category: "tech", followers: "500K" },
  { handle: "@nextjs", category: "tech", followers: "300K" },
  { handle: "@reactjs", category: "tech", followers: "2.1M" },
  { handle: "@tailwindcss", category: "design", followers: "180K" },
  { handle: "@github", category: "tech", followers: "3.2M" },
  { handle: "@figma", category: "design", followers: "750K" },
]

const categoryIcons = {
  tech: Zap,
  business: Briefcase,
  marketing: TrendingUp,
  design: Heart,
}

export function HashtagMentionSuggestions({ content = "", onSuggestionClick }: HashtagMentionSuggestionsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  const safeContent = content || ""

  // Extract existing hashtags and mentions
  const existingHashtags = safeContent.match(/#\w+/g) || []
  const existingMentions = safeContent.match(/@\w+/g) || []

  const filteredHashtags = trendingHashtags.filter((item) => {
    const matchesSearch = item.tag.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "all" || item.category === activeCategory
    const notAlreadyUsed = !existingHashtags.includes(item.tag)
    return matchesSearch && matchesCategory && notAlreadyUsed
  })

  const filteredMentions = suggestedMentions.filter((item) => {
    const matchesSearch = item.handle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "all" || item.category === activeCategory
    const notAlreadyUsed = !existingMentions.includes(item.handle)
    return matchesSearch && matchesCategory && notAlreadyUsed
  })

  const handleDragStart = (e: React.DragEvent, suggestion: string) => {
    setDraggedItem(suggestion)
    e.dataTransfer.setData("text/plain", suggestion)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  return (
    <FadeIn>
      <Card
        className="transition-all duration-300 hover:shadow-lg cursor-move"
        draggable
        onDragStart={(e) => e.dataTransfer.setData("text/plain", "hashtag-card")}
      >
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Hash className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Suggestions & Hashtags</CardTitle>
              <CardDescription>Améliorez la portée de votre contenu</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des hashtags ou mentions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value="hashtags" className="w-full">
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

            <TabsContent value="hashtags" className="space-y-4 mt-4">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={activeCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory("all")}
                >
                  Tous
                </Button>
                {Object.entries(categoryIcons).map(([category, Icon]) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className="flex items-center gap-1"
                  >
                    <Icon className="h-3 w-3" />
                    {category}
                  </Button>
                ))}
              </div>

              {/* Hashtag Suggestions */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Hashtags tendance
                </h4>
                <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                  {filteredHashtags.map((item) => {
                    const Icon = categoryIcons[item.category as keyof typeof categoryIcons]
                    return (
                      <div
                        key={item.tag}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 cursor-move hover:bg-muted/50 ${
                          draggedItem === item.tag ? "opacity-50" : ""
                        }`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, ` ${item.tag}`)}
                        onDragEnd={handleDragEnd}
                        onClick={() => onSuggestionClick(` ${item.tag}`)}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{item.tag}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {item.count}
                          </Badge>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mentions" className="space-y-4 mt-4">
              <div className="space-y-3">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Comptes suggérés
                </h4>
                <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                  {filteredMentions.map((item) => {
                    const Icon = categoryIcons[item.category as keyof typeof categoryIcons]
                    return (
                      <div
                        key={item.handle}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 cursor-move hover:bg-muted/50 ${
                          draggedItem === item.handle ? "opacity-50" : ""
                        }`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, ` ${item.handle}`)}
                        onDragEnd={handleDragEnd}
                        onClick={() => onSuggestionClick(` ${item.handle}`)}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{item.handle}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {item.followers}
                          </Badge>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Quick Stats */}
          <div className="pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{existingHashtags.length}</p>
                <p className="text-xs text-muted-foreground">Hashtags utilisés</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{existingMentions.length}</p>
                <p className="text-xs text-muted-foreground">Mentions ajoutées</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  )
}

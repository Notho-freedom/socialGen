"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Calendar, Send, Eye, ImageIcon, Hash, AtSign, Bold, Italic, LinkIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PostEditorProps {
  text?: string
  imageUrl?: string
  platform?: string
  onSave?: () => void
  onBack?: () => void
}

export function PostEditor({ text = "", imageUrl = "", platform = "linkedin", onSave, onBack }: PostEditorProps) {
  const [content, setContent] = useState(text)
  const [selectedImage, setSelectedImage] = useState(imageUrl)
  const [hashtags, setHashtags] = useState("#marketing #socialmedia #ai")
  const { toast } = useToast()

  const platformLimits = {
    linkedin: 3000,
    twitter: 280,
    instagram: 2200,
    facebook: 63206,
    tiktok: 150,
  }

  const platformNames = {
    linkedin: "LinkedIn",
    twitter: "Twitter/X",
    instagram: "Instagram",
    facebook: "Facebook",
    tiktok: "TikTok",
  }

  const currentLimit = platformLimits[platform as keyof typeof platformLimits] || 3000
  const platformName = platformNames[platform as keyof typeof platformNames] || "LinkedIn"
  const characterCount = content.length
  const isOverLimit = characterCount > currentLimit

  const handleSave = () => {
    toast({
      title: "Post sauvegardé",
      description: "Votre post a été sauvegardé en brouillon",
    })
    onSave?.()
  }

  const handleSchedule = () => {
    toast({
      title: "Post programmé",
      description: "Votre post sera publié selon la planification",
    })
  }

  const handlePublish = () => {
    toast({
      title: "Post publié",
      description: `Votre post a été publié sur ${platformName}`,
    })
  }

  const formatText = (type: "bold" | "italic" | "link") => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    let formattedText = selectedText
    switch (type) {
      case "bold":
        formattedText = `**${selectedText}**`
        break
      case "italic":
        formattedText = `*${selectedText}*`
        break
      case "link":
        formattedText = `[${selectedText}](url)`
        break
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end)
    setContent(newContent)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Éditeur de post
              </CardTitle>
              <CardDescription>Personnalisez votre contenu pour {platformName}</CardDescription>
            </div>
            <Badge variant="outline">{platformName}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="content" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Contenu</TabsTrigger>
              <TabsTrigger value="media">Média</TabsTrigger>
              <TabsTrigger value="preview">Aperçu</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              {/* Formatting Toolbar */}
              <div className="flex items-center gap-2 p-2 border rounded-lg bg-muted/50">
                <Button variant="ghost" size="sm" onClick={() => formatText("bold")}>
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => formatText("italic")}>
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => formatText("link")}>
                  <LinkIcon className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button variant="ghost" size="sm">
                  <Hash className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <AtSign className="h-4 w-4" />
                </Button>
              </div>

              {/* Content Editor */}
              <div className="space-y-2">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Rédigez votre post ici..."
                  rows={12}
                  className="resize-none"
                />
                <div className="flex items-center justify-between text-sm">
                  <span className={`${isOverLimit ? "text-red-500" : "text-muted-foreground"}`}>
                    {characterCount} / {currentLimit} caractères
                  </span>
                  {isOverLimit && (
                    <span className="text-red-500 text-xs">
                      Dépassement de {characterCount - currentLimit} caractères
                    </span>
                  )}
                </div>
              </div>

              {/* Hashtags */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Hashtags suggérés</label>
                <Textarea
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  placeholder="#hashtag1 #hashtag2 #hashtag3"
                  rows={2}
                  className="resize-none"
                />
              </div>
            </TabsContent>

            <TabsContent value="media" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-3">Image actuelle</h3>
                  {selectedImage ? (
                    <div className="relative">
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Post image"
                        className="w-full max-w-md rounded-lg border"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 bg-transparent"
                        onClick={() => setSelectedImage("")}
                      >
                        Supprimer l'image
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                      <p className="text-muted-foreground mb-4">Aucune image sélectionnée</p>
                      <Button variant="outline">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Ajouter une image
                      </Button>
                    </div>
                  )}
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Images suggérées</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="relative cursor-pointer rounded-lg border-2 border-transparent hover:border-primary transition-colors"
                        onClick={() => setSelectedImage(`/placeholder.svg?height=200&width=300&text=Image${i}`)}
                      >
                        <img
                          src={`/placeholder.svg?height=200&width=300&text=Image${i}` || "/placeholder.svg"}
                          alt={`Suggestion ${i}`}
                          className="w-full h-24 object-cover rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              <div className="border rounded-lg p-6 bg-muted/30">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium">JD</span>
                    </div>
                    <div>
                      <div className="font-medium">John Doe</div>
                      <div className="text-sm text-muted-foreground">{platformName} • Maintenant</div>
                    </div>
                  </div>

                  {selectedImage && (
                    <img
                      src={selectedImage || "/placeholder.svg"}
                      alt="Post preview"
                      className="w-full rounded-lg border"
                    />
                  )}

                  <div className="space-y-2">
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {content || "Votre contenu apparaîtra ici..."}
                    </p>
                    {hashtags && <p className="text-primary text-sm">{hashtags}</p>}
                  </div>

                  <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
                    <span>👍 12 J'aime</span>
                    <span>💬 3 Commentaires</span>
                    <span>🔄 2 Partages</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
            <Button onClick={handleSave} variant="outline" className="flex-1 bg-transparent">
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
            <Button onClick={handleSchedule} variant="outline" className="flex-1 bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              Programmer
            </Button>
            <Button onClick={handlePublish} className="flex-1" disabled={isOverLimit}>
              <Send className="h-4 w-4 mr-2" />
              Publier maintenant
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

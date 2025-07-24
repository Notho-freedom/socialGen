"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Save, Share, Eye, Calendar } from "lucide-react"

interface PostEditorProps {
  text: string
  imageUrl: string
  platform: string
  onSave: () => void
  onBack: () => void
}

const PLATFORM_CONFIGS = {
  linkedin: {
    name: "LinkedIn",
    color: "bg-blue-600",
    maxLength: 3000,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  twitter: {
    name: "Twitter/X",
    color: "bg-black",
    maxLength: 280,
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
  },
  instagram: {
    name: "Instagram",
    color: "bg-pink-600",
    maxLength: 2200,
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
  },
  facebook: {
    name: "Facebook",
    color: "bg-blue-700",
    maxLength: 63206,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
}

export function PostEditor({ text, imageUrl, platform, onSave, onBack }: PostEditorProps) {
  const [editedText, setEditedText] = useState(text)
  const [isPreview, setIsPreview] = useState(false)

  const platformConfig = PLATFORM_CONFIGS[platform as keyof typeof PLATFORM_CONFIGS] || PLATFORM_CONFIGS.linkedin
  const characterCount = editedText.length
  const isOverLimit = characterCount > platformConfig.maxLength

  const handleSave = () => {
    onSave()
  }

  const PostPreview = () => (
    <Card className={`${platformConfig.bgColor} ${platformConfig.borderColor} border-2`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">U</span>
          </div>
          <div>
            <div className="font-medium text-sm">Votre nom</div>
            <div className="text-xs text-gray-600">Il y a quelques instants</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="whitespace-pre-wrap text-sm">{editedText}</div>
          {imageUrl && (
            <div className="rounded-lg overflow-hidden">
              <img src={imageUrl || "/placeholder.svg"} alt="Post image" className="w-full aspect-video object-cover" />
            </div>
          )}
          <div className="flex items-center gap-4 pt-2 text-gray-600">
            <button className="flex items-center gap-1 text-xs hover:text-blue-600">👍 J'aime</button>
            <button className="flex items-center gap-1 text-xs hover:text-blue-600">💬 Commenter</button>
            <button className="flex items-center gap-1 text-xs hover:text-blue-600">🔄 Partager</button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <CardTitle>Éditeur de post</CardTitle>
                <CardDescription>Personnalisez votre contenu avant publication</CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${platformConfig.color}`} />
              {platformConfig.name}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Édition du texte</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setIsPreview(!isPreview)}>
                  <Eye className="h-4 w-4 mr-2" />
                  {isPreview ? "Éditer" : "Aperçu"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isPreview ? (
                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap min-h-[200px]">{editedText}</div>
              ) : (
                <div className="space-y-3">
                  <Textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    rows={10}
                    className="resize-none"
                    placeholder="Rédigez votre post..."
                  />
                  <div className="flex justify-between items-center text-sm">
                    <span className={`${isOverLimit ? "text-red-600" : "text-gray-600"}`}>
                      {characterCount} / {platformConfig.maxLength} caractères
                    </span>
                    {isOverLimit && (
                      <span className="text-red-600 font-medium">
                        Limite dépassée de {characterCount - platformConfig.maxLength} caractères
                      </span>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Image */}
          {imageUrl && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Image sélectionnée</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt="Selected image"
                    className="w-full aspect-video object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Aperçu {platformConfig.name}</CardTitle>
              <CardDescription>Voici comment votre post apparaîtra sur {platformConfig.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <PostPreview />
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={handleSave} className="w-full" disabled={isOverLimit}>
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder le brouillon
              </Button>

              <Button variant="outline" className="w-full bg-transparent" disabled={isOverLimit}>
                <Share className="h-4 w-4 mr-2" />
                Publier maintenant
              </Button>

              <Button variant="outline" className="w-full bg-transparent" disabled={isOverLimit}>
                <Calendar className="h-4 w-4 mr-2" />
                Programmer la publication
              </Button>

              <Separator />

              <div className="text-xs text-gray-600 space-y-1">
                <p>• La publication directe sera disponible prochainement</p>
                <p>• La programmation nécessite une connexion aux APIs</p>
                <p>• Vos brouillons sont sauvegardés automatiquement</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

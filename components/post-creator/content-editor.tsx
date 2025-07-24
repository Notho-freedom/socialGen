"use client"

import { useRef, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AnimatedButton } from "@/components/animated-button"
import { LoadingSpinner } from "@/components/loading-spinner"
import { TextFormattingToolbar } from "@/components/text-formatting-toolbar"
import { FadeIn } from "@/components/fade-in"
import { Edit3, RefreshCw, Copy, Save, Calendar, Send, CheckCircle } from "lucide-react"

interface ContentEditorProps {
  content: string
  onContentChange: (content: string) => void
  isRegenerating: boolean
  onRegenerate: () => void
  selectedPlatforms: string[]
  schedulePost: boolean
  onCopyToClipboard: () => void
  onSavePost: () => void
  onPublishPost: () => void
  characterLimit: number
}

export function ContentEditor({
  content,
  onContentChange,
  isRegenerating,
  onRegenerate,
  selectedPlatforms,
  schedulePost,
  onCopyToClipboard,
  onSavePost,
  onPublishPost,
  characterLimit,
}: ContentEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleTextFormat = useCallback(
    (format: string) => {
      const textarea = textareaRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = content.substring(start, end)

      let formattedText = selectedText
      switch (format) {
        case "bold":
          formattedText = `**${selectedText}**`
          break
        case "italic":
          formattedText = `*${selectedText}*`
          break
        case "underline":
          formattedText = `__${selectedText}__`
          break
        case "h1":
          formattedText = `# ${selectedText}`
          break
        case "h2":
          formattedText = `## ${selectedText}`
          break
        case "quote":
          formattedText = `> ${selectedText}`
          break
        default:
          break
      }

      const newContent = content.substring(0, start) + formattedText + content.substring(end)
      onContentChange(newContent)

      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + formattedText.length, start + formattedText.length)
      }, 0)
    },
    [content, onContentChange],
  )

  const handleTextInsert = useCallback(
    (text: string) => {
      const textarea = textareaRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const newContent = content.substring(0, start) + text + content.substring(start)
      onContentChange(newContent)

      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + text.length, start + text.length)
      }, 0)
    },
    [content, onContentChange],
  )

  const isOverLimit = content.length > characterLimit
  const isNearLimit = content.length > characterLimit * 0.8

  return (
    <FadeIn>
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Éditeur de Contenu</CardTitle>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant={isOverLimit ? "destructive" : isNearLimit ? "secondary" : "outline"}
                className="transition-all duration-300"
              >
                {content.length}/{characterLimit}
              </Badge>
              <AnimatedButton
                variant="ghost"
                size="sm"
                onClick={onRegenerate}
                disabled={isRegenerating}
                className="group"
              >
                {isRegenerating ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180" />
                )}
              </AnimatedButton>
            </div>
          </div>
          <CardDescription>Éditez votre contenu avec des outils de formatage avancés</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Formatting Toolbar */}
          <TextFormattingToolbar onFormat={handleTextFormat} onInsert={handleTextInsert} />

          {/* Content Editor */}
          <div className="space-y-2">
            <Textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              className={`min-h-[200px] transition-all duration-300 focus:ring-2 focus:ring-primary/20 font-mono text-sm resize-none ${
                isOverLimit ? "border-destructive focus:ring-destructive/20" : ""
              }`}
              placeholder="Le contenu généré apparaîtra ici. Vous pouvez le modifier librement..."
            />
            {isOverLimit && (
              <p className="text-xs text-destructive flex items-center gap-1">
                ⚠️ Le contenu dépasse la limite de caractères pour certaines plateformes
              </p>
            )}
          </div>

          {/* Platform Character Limits */}
          {selectedPlatforms.length > 1 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Limites par plateforme :</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {selectedPlatforms.map((platformId) => {
                  const platformLimits: { [key: string]: number } = {
                    twitter: 280,
                    facebook: 2000,
                    instagram: 2200,
                    linkedin: 3000,
                    youtube: 5000,
                    tiktok: 2200,
                  }
                  const limit = platformLimits[platformId]
                  const isValid = content.length <= limit
                  return (
                    <div
                      key={platformId}
                      className={`flex items-center justify-between text-xs p-2 rounded border ${
                        isValid ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                      }`}
                    >
                      <span className="capitalize font-medium">{platformId}</span>
                      <div className="flex items-center gap-1">
                        <span>
                          {content.length}/{limit}
                        </span>
                        {isValid ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <span className="text-red-500">⚠️</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <AnimatedButton
              variant="outline"
              size="sm"
              onClick={onCopyToClipboard}
              className="group flex-1 sm:flex-none"
            >
              <Copy className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Copier
            </AnimatedButton>

            <AnimatedButton variant="outline" size="sm" onClick={onSavePost} className="group flex-1 sm:flex-none">
              <Save className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Sauvegarder
            </AnimatedButton>

            {schedulePost ? (
              <AnimatedButton variant="secondary" size="sm" onClick={onSavePost} className="group flex-1 sm:flex-none">
                <Calendar className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Programmer
              </AnimatedButton>
            ) : (
              <AnimatedButton
                onClick={onPublishPost}
                className="group flex-1 sm:flex-none"
                disabled={!content.trim() || isOverLimit}
              >
                <Send className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Publier
              </AnimatedButton>
            )}
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  )
}

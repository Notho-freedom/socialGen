"use client"

import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AnimatedButton } from "@/components/animated-button"
import { TextFormattingToolbar } from "@/components/text-formatting-toolbar"
import { FadeIn } from "@/components/fade-in"
import { Edit3, RefreshCw, Copy, Save } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ContentEditorProps {
  content: string
  setContent: (content: string) => void
  onRegenerate: () => void
  onSave: () => void
  isRegenerating: boolean
  maxLength?: number
}

export function ContentEditor({
  content,
  setContent,
  onRegenerate,
  onSave,
  isRegenerating,
  maxLength = 2000,
}: ContentEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleTextFormat = (format: string) => {
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
    setContent(newContent)

    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length)
    }, 0)
  }

  const handleTextInsert = (text: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const newContent = content.substring(0, start) + text + content.substring(start)
    setContent(newContent)

    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + text.length, start + text.length)
    }, 0)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content)
      toast({
        title: "Copié !",
        description: "Le contenu a été copié dans le presse-papiers.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le contenu.",
        variant: "destructive",
      })
    }
  }

  const characterCount = content.length
  const isOverLimit = characterCount > maxLength

  return (
    <FadeIn>
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-primary" />
                Éditeur de Contenu
              </CardTitle>
              <CardDescription>Personnalisez votre contenu généré</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isOverLimit ? "destructive" : "secondary"} className="transition-all duration-300">
                {characterCount}/{maxLength}
              </Badge>
              <AnimatedButton
                variant="ghost"
                size="sm"
                onClick={onRegenerate}
                disabled={isRegenerating}
                className="group"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRegenerating ? "animate-spin" : "group-hover:rotate-180 transition-transform"}`}
                />
              </AnimatedButton>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Formatting Toolbar */}
          <TextFormattingToolbar onFormat={handleTextFormat} onInsert={handleTextInsert} />

          {/* Content Editor */}
          <div className="space-y-2">
            <Textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`min-h-[300px] resize-none transition-all duration-300 focus:scale-[1.01] ${
                isOverLimit ? "border-destructive focus:border-destructive" : ""
              }`}
              placeholder="Votre contenu généré apparaîtra ici..."
            />

            {isOverLimit && <p className="text-sm text-destructive">Le contenu dépasse la limite recommandée</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-2">
            <AnimatedButton variant="outline" size="sm" onClick={copyToClipboard} className="group">
              <Copy className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Copier
            </AnimatedButton>
            <AnimatedButton variant="outline" size="sm" onClick={onSave} className="group">
              <Save className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Sauvegarder
            </AnimatedButton>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  )
}

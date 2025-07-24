"use client"

import { AnimatedButton } from "@/components/animated-button"
import { Separator } from "@/components/ui/separator"
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Quote,
  List,
  ListOrdered,
  Hash,
  AtSign,
  Link,
  Smile,
} from "lucide-react"

interface TextFormattingToolbarProps {
  onFormat: (format: string) => void
  onInsert: (text: string) => void
}

export function TextFormattingToolbar({ onFormat, onInsert }: TextFormattingToolbarProps) {
  const formatButtons = [
    { icon: Bold, action: "bold", tooltip: "Gras (Ctrl+B)" },
    { icon: Italic, action: "italic", tooltip: "Italique (Ctrl+I)" },
    { icon: Underline, action: "underline", tooltip: "Souligné (Ctrl+U)" },
  ]

  const headingButtons = [
    { icon: Heading1, action: "h1", tooltip: "Titre 1" },
    { icon: Heading2, action: "h2", tooltip: "Titre 2" },
    { icon: Quote, action: "quote", tooltip: "Citation" },
  ]

  const listButtons = [
    { icon: List, action: "ul", tooltip: "Liste à puces" },
    { icon: ListOrdered, action: "ol", tooltip: "Liste numérotée" },
  ]

  const insertButtons = [
    { icon: Hash, text: "#", tooltip: "Hashtag" },
    { icon: AtSign, text: "@", tooltip: "Mention" },
    { icon: Link, text: "🔗 ", tooltip: "Lien" },
    { icon: Smile, text: "😊 ", tooltip: "Emoji" },
  ]

  return (
    <div className="flex flex-wrap items-center gap-1 p-3 bg-muted/30 rounded-lg border">
      {/* Format Buttons */}
      <div className="flex items-center gap-1">
        {formatButtons.map((button) => {
          const Icon = button.icon
          return (
            <AnimatedButton
              key={button.action}
              variant="ghost"
              size="sm"
              onClick={() => onFormat(button.action)}
              className="h-8 w-8 p-0 hover:bg-primary/10"
              title={button.tooltip}
            >
              <Icon className="h-4 w-4" />
            </AnimatedButton>
          )
        })}
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Heading Buttons */}
      <div className="flex items-center gap-1">
        {headingButtons.map((button) => {
          const Icon = button.icon
          return (
            <AnimatedButton
              key={button.action}
              variant="ghost"
              size="sm"
              onClick={() => onFormat(button.action)}
              className="h-8 w-8 p-0 hover:bg-primary/10"
              title={button.tooltip}
            >
              <Icon className="h-4 w-4" />
            </AnimatedButton>
          )
        })}
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* List Buttons */}
      <div className="flex items-center gap-1">
        {listButtons.map((button) => {
          const Icon = button.icon
          return (
            <AnimatedButton
              key={button.action}
              variant="ghost"
              size="sm"
              onClick={() => onFormat(button.action)}
              className="h-8 w-8 p-0 hover:bg-primary/10"
              title={button.tooltip}
            >
              <Icon className="h-4 w-4" />
            </AnimatedButton>
          )
        })}
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Insert Buttons */}
      <div className="flex items-center gap-1">
        {insertButtons.map((button) => {
          const Icon = button.icon
          return (
            <AnimatedButton
              key={button.text}
              variant="ghost"
              size="sm"
              onClick={() => onInsert(button.text)}
              className="h-8 w-8 p-0 hover:bg-primary/10"
              title={button.tooltip}
            >
              <Icon className="h-4 w-4" />
            </AnimatedButton>
          )
        })}
      </div>
    </div>
  )
}

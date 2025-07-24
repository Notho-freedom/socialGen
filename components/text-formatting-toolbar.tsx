"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Link,
  Hash,
  AtSign,
  Smile,
} from "lucide-react"

interface TextFormattingToolbarProps {
  onFormat: (format: string) => void
  onInsert: (text: string) => void
}

export function TextFormattingToolbar({ onFormat, onInsert }: TextFormattingToolbarProps) {
  const formatButtons = [
    { icon: Bold, label: "Gras", format: "bold", shortcut: "Ctrl+B" },
    { icon: Italic, label: "Italique", format: "italic", shortcut: "Ctrl+I" },
    { icon: Underline, label: "Souligné", format: "underline", shortcut: "Ctrl+U" },
  ]

  const headingButtons = [
    { icon: Heading1, label: "Titre 1", format: "h1" },
    { icon: Heading2, label: "Titre 2", format: "h2" },
  ]

  const listButtons = [
    { icon: List, label: "Liste à puces", format: "ul" },
    { icon: ListOrdered, label: "Liste numérotée", format: "ol" },
    { icon: Quote, label: "Citation", format: "quote" },
  ]

  const insertButtons = [
    { icon: Hash, label: "Hashtag", text: "#" },
    { icon: AtSign, label: "Mention", text: "@" },
    { icon: Link, label: "Lien", text: "https://" },
    { icon: Smile, label: "Emoji", text: "😊" },
  ]

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 p-2 border rounded-lg bg-background">
        {/* Text Formatting */}
        <div className="flex items-center gap-1">
          {formatButtons.map((button) => (
            <Tooltip key={button.format}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFormat(button.format)}
                  className="h-8 w-8 p-0 hover:bg-primary/10"
                >
                  <button.icon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {button.label} ({button.shortcut})
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Headings */}
        <div className="flex items-center gap-1">
          {headingButtons.map((button) => (
            <Tooltip key={button.format}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFormat(button.format)}
                  className="h-8 w-8 p-0 hover:bg-primary/10"
                >
                  <button.icon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{button.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Lists */}
        <div className="flex items-center gap-1">
          {listButtons.map((button) => (
            <Tooltip key={button.format}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFormat(button.format)}
                  className="h-8 w-8 p-0 hover:bg-primary/10"
                >
                  <button.icon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{button.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Insert Elements */}
        <div className="flex items-center gap-1">
          {insertButtons.map((button) => (
            <Tooltip key={button.text}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onInsert(button.text)}
                  className="h-8 w-8 p-0 hover:bg-primary/10"
                >
                  <button.icon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{button.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}

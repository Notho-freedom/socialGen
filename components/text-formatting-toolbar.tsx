"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
import { FadeIn } from "@/components/fade-in"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Hash,
  AtSign,
  Smile,
  ImageIcon,
  Calendar,
  MapPin,
  Star,
  Type,
  Palette,
} from "lucide-react"

interface TextFormattingToolbarProps {
  onFormatClick: (format: string) => void
  onInsertClick: (element: string) => void
}

const formatButtons = [
  { icon: Bold, label: "Gras", action: "bold" },
  { icon: Italic, label: "Italique", action: "italic" },
  { icon: Underline, label: "Souligné", action: "underline" },
]

const alignmentButtons = [
  { icon: AlignLeft, label: "Aligner à gauche", action: "align-left" },
  { icon: AlignCenter, label: "Centrer", action: "align-center" },
  { icon: AlignRight, label: "Aligner à droite", action: "align-right" },
]

const listButtons = [
  { icon: List, label: "Liste à puces", action: "bullet-list" },
  { icon: ListOrdered, label: "Liste numérotée", action: "ordered-list" },
]

const insertButtons = [
  { icon: Link, label: "Insérer un lien", action: "link", text: "🔗 " },
  { icon: Hash, label: "Ajouter hashtag", action: "hashtag", text: "#" },
  { icon: AtSign, label: "Mentionner", action: "mention", text: "@" },
  { icon: Smile, label: "Emoji", action: "emoji", text: "😊 " },
  { icon: ImageIcon, label: "Image", action: "image", text: "📷 " },
  { icon: Calendar, label: "Date/Événement", action: "date", text: "📅 " },
  { icon: MapPin, label: "Localisation", action: "location", text: "📍 " },
  { icon: Star, label: "Call-to-action", action: "cta", text: "⭐ " },
]

const styleButtons = [
  { icon: Type, label: "Taille de police", action: "font-size" },
  { icon: Palette, label: "Couleur", action: "color" },
]

export function TextFormattingToolbar({ onFormatClick, onInsertClick }: TextFormattingToolbarProps) {
  return (
    <FadeIn>
      <Card
        className="transition-all duration-300 hover:shadow-lg cursor-move"
        draggable
        onDragStart={(e) => e.dataTransfer.setData("text/plain", "toolbar-card")}
      >
        <CardContent className="p-4">
          <TooltipProvider>
            <div className="flex flex-wrap items-center gap-2">
              {/* Format Buttons */}
              <div className="flex items-center gap-1">
                {formatButtons.map((button) => {
                  const Icon = button.icon
                  return (
                    <Tooltip key={button.action}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onFormatClick(button.action)}
                          className="h-8 w-8 p-0 hover:bg-primary/10"
                        >
                          <Icon className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{button.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Alignment Buttons */}
              <div className="flex items-center gap-1">
                {alignmentButtons.map((button) => {
                  const Icon = button.icon
                  return (
                    <Tooltip key={button.action}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onFormatClick(button.action)}
                          className="h-8 w-8 p-0 hover:bg-primary/10"
                        >
                          <Icon className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{button.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* List Buttons */}
              <div className="flex items-center gap-1">
                {listButtons.map((button) => {
                  const Icon = button.icon
                  return (
                    <Tooltip key={button.action}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onFormatClick(button.action)}
                          className="h-8 w-8 p-0 hover:bg-primary/10"
                        >
                          <Icon className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{button.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Insert Buttons */}
              <div className="flex items-center gap-1 flex-wrap">
                {insertButtons.map((button) => {
                  const Icon = button.icon
                  return (
                    <Tooltip key={button.action}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onInsertClick(button.text)}
                          className="h-8 w-8 p-0 hover:bg-primary/10"
                        >
                          <Icon className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{button.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Style Buttons */}
              <div className="flex items-center gap-1">
                {styleButtons.map((button) => {
                  const Icon = button.icon
                  return (
                    <Tooltip key={button.action}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onFormatClick(button.action)}
                          className="h-8 w-8 p-0 hover:bg-primary/10"
                        >
                          <Icon className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{button.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>
    </FadeIn>
  )
}

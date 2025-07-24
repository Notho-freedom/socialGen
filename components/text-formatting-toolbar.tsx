"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
} from "lucide-react"

interface TextFormattingToolbarProps {
  onFormatText: (format: string) => void
  onInsertElement: (element: string) => void
}

export function TextFormattingToolbar({ onFormatText, onInsertElement }: TextFormattingToolbarProps) {
  const formatButtons = [
    { icon: Bold, label: "Gras", format: "bold" },
    { icon: Italic, label: "Italique", format: "italic" },
    { icon: Underline, label: "Souligné", format: "underline" },
  ]

  const alignmentButtons = [
    { icon: AlignLeft, label: "Aligner à gauche", format: "left" },
    { icon: AlignCenter, label: "Centrer", format: "center" },
    { icon: AlignRight, label: "Aligner à droite", format: "right" },
  ]

  const listButtons = [
    { icon: List, label: "Liste à puces", format: "bullet" },
    { icon: ListOrdered, label: "Liste numérotée", format: "numbered" },
  ]

  const insertButtons = [
    { icon: Link, label: "Insérer un lien", element: "link" },
    { icon: Hash, label: "Ajouter hashtag", element: "hashtag" },
    { icon: AtSign, label: "Ajouter mention", element: "mention" },
    { icon: Smile, label: "Ajouter emoji", element: "emoji" },
    { icon: ImageIcon, label: "Ajouter image", element: "image" },
    { icon: Calendar, label: "Ajouter date", element: "date" },
    { icon: MapPin, label: "Ajouter lieu", element: "location" },
  ]

  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-1 p-2 bg-muted/30 rounded-lg border">
        {/* Text Formatting */}
        <div className="flex items-center gap-1">
          {formatButtons.map(({ icon: Icon, label, format }) => (
            <Tooltip key={format}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFormatText(format)}
                  className="h-8 w-8 p-0 hover:bg-primary/10"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Text Alignment */}
        <div className="flex items-center gap-1">
          {alignmentButtons.map(({ icon: Icon, label, format }) => (
            <Tooltip key={format}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFormatText(format)}
                  className="h-8 w-8 p-0 hover:bg-primary/10"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Lists */}
        <div className="flex items-center gap-1">
          {listButtons.map(({ icon: Icon, label, format }) => (
            <Tooltip key={format}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFormatText(format)}
                  className="h-8 w-8 p-0 hover:bg-primary/10"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Insert Elements */}
        <div className="flex items-center gap-1 flex-wrap">
          {insertButtons.map(({ icon: Icon, label, element }) => (
            <Tooltip key={element}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onInsertElement(element)}
                  className="h-8 w-8 p-0 hover:bg-primary/10"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}

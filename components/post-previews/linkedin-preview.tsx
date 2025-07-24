"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThumbsUp, MessageCircle, Share, Send, MoreHorizontal } from "lucide-react"

interface LinkedInPreviewProps {
  content: string
  imageUrl?: string
  userName?: string
  userTitle?: string
  userAvatar?: string
}

export function LinkedInPreview({
  content,
  imageUrl,
  userName = "Votre Nom",
  userTitle = "Votre Titre Professionnel",
  userAvatar,
}: LinkedInPreviewProps) {
  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <div className="bg-blue-700 text-white px-4 py-2 font-semibold text-center">LinkedIn</div>
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center px-4 py-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={userAvatar || "/placeholder-user.jpg"} />
            <AvatarFallback>{userName[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-3 flex-1">
            <div className="font-semibold text-sm text-gray-900">{userName}</div>
            <div className="text-xs text-gray-500">{userTitle}</div>
            <div className="text-xs text-gray-500">Il y a 2 min</div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        {content && (
          <div className="px-4 pb-3">
            <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{content}</p>
          </div>
        )}

        {/* Image */}
        {imageUrl && (
          <div className="w-full">
            <img src={imageUrl || "/placeholder.svg"} alt="Post image" className="w-full object-cover max-h-80" />
          </div>
        )}

        {/* Actions */}
        <div className="px-4 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-blue-50">
              <ThumbsUp className="h-4 w-4" />
              <span className="text-xs">J'aime</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-blue-50">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">Commenter</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-blue-50">
              <Share className="h-4 w-4" />
              <span className="text-xs">Partager</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-blue-50">
              <Send className="h-4 w-4" />
              <span className="text-xs">Envoyer</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

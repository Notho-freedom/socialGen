"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react"

interface InstagramPreviewProps {
  content: string
  imageUrl?: string
  userName?: string
  userAvatar?: string
}

export function InstagramPreview({ content, imageUrl, userName = "votre_nom", userAvatar }: InstagramPreviewProps) {
  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-white px-4 py-2 font-semibold text-center">
        Instagram
      </div>
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center px-4 py-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userAvatar || "/placeholder-user.jpg"} />
            <AvatarFallback>{userName[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-3 flex-1">
            <span className="font-semibold text-sm">{userName}</span>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Image */}
        <div className="w-full aspect-square">
          {imageUrl ? (
            <img src={imageUrl || "/placeholder.svg"} alt="Post image" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              Aucune image sélectionnée
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                <Heart className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                <MessageCircle className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                <Send className="h-6 w-6" />
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              <Bookmark className="h-6 w-6" />
            </Button>
          </div>

          {/* Content */}
          {content && (
            <div className="text-sm">
              <span className="font-semibold">{userName}</span>
              <span className="ml-1 whitespace-pre-wrap">{content}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

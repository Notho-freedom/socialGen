"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThumbsUp, MessageCircle, Share, MoreHorizontal, Globe } from "lucide-react"

interface FacebookPreviewProps {
  content: string
  imageUrl?: string
  userName?: string
  userAvatar?: string
}

export function FacebookPreview({ content, imageUrl, userName = "Votre Nom", userAvatar }: FacebookPreviewProps) {
  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <div className="bg-blue-600 text-white px-4 py-2 font-semibold text-center">Facebook</div>
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center px-4 py-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userAvatar || "/placeholder-user.jpg"} />
            <AvatarFallback>{userName[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-3 flex-1">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm text-gray-900">{userName}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>Il y a 2 min</span>
              <Globe className="h-3 w-3" />
            </div>
          </div>
          <Button variant="ghost" size="sm" className="ml-auto">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        {content && (
          <div className="px-4 pb-3">
            <p className="text-sm text-gray-800 whitespace-pre-wrap">{content}</p>
          </div>
        )}

        {/* Image */}
        {imageUrl && (
          <div className="w-full">
            <img src={imageUrl || "/placeholder.svg"} alt="Post image" className="w-full object-cover max-h-80" />
          </div>
        )}

        {/* Stats */}
        <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-600 border-b">
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1">
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                <ThumbsUp className="h-2 w-2 text-white fill-current" />
              </div>
            </div>
            <span>42</span>
          </div>
          <div className="text-xs">8 commentaires · 3 partages</div>
        </div>

        {/* Actions */}
        <div className="flex divide-x divide-gray-200">
          <Button variant="ghost" className="flex-1 py-2 hover:bg-gray-100 rounded-none">
            <ThumbsUp className="h-4 w-4 mr-2" />
            J'aime
          </Button>
          <Button variant="ghost" className="flex-1 py-2 hover:bg-gray-100 rounded-none">
            <MessageCircle className="h-4 w-4 mr-2" />
            Commenter
          </Button>
          <Button variant="ghost" className="flex-1 py-2 hover:bg-gray-100 rounded-none">
            <Share className="h-4 w-4 mr-2" />
            Partager
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

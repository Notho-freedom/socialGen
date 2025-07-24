"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Repeat, Heart, Share, MoreHorizontal } from "lucide-react"

interface TwitterPreviewProps {
  content: string
  imageUrl?: string
  userName?: string
  userHandle?: string
  userAvatar?: string
}

export function TwitterPreview({
  content,
  imageUrl,
  userName = "Votre Nom",
  userHandle = "votre_nom",
  userAvatar,
}: TwitterPreviewProps) {
  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <div className="bg-blue-400 text-white px-4 py-2 font-semibold text-center">Twitter</div>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userAvatar || "/placeholder-user.jpg"} />
            <AvatarFallback>{userName[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1">
              <span className="font-bold text-sm">{userName}</span>
              <span className="text-gray-500 text-sm">@{userHandle}</span>
              <span className="text-gray-500 text-sm">·</span>
              <span className="text-gray-500 text-sm">2min</span>
              <Button variant="ghost" size="sm" className="ml-auto p-0 h-auto">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {content && <p className="text-sm mb-3 whitespace-pre-wrap">{content}</p>}

            {imageUrl && (
              <div className="mb-3 rounded-xl overflow-hidden border">
                <img src={imageUrl || "/placeholder.svg"} alt="Post image" className="w-full object-cover max-h-60" />
              </div>
            )}

            <div className="flex items-center justify-between text-gray-500 max-w-md">
              <Button variant="ghost" size="sm" className="p-0 h-auto hover:text-blue-500">
                <MessageCircle className="h-4 w-4 mr-1" />
                <span className="text-xs">12</span>
              </Button>
              <Button variant="ghost" size="sm" className="p-0 h-auto hover:text-green-500">
                <Repeat className="h-4 w-4 mr-1" />
                <span className="text-xs">8</span>
              </Button>
              <Button variant="ghost" size="sm" className="p-0 h-auto hover:text-red-500">
                <Heart className="h-4 w-4 mr-1" />
                <span className="text-xs">42</span>
              </Button>
              <Button variant="ghost" size="sm" className="p-0 h-auto hover:text-blue-500">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

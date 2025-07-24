"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MoreHorizontal, Eye, Heart, Share2, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface PostHistoryProps {
  userId?: string
}

export function PostHistory({ userId }: PostHistoryProps) {
  const posts = [
    {
      id: 1,
      title: "Post LinkedIn - Tendances Marketing 2024",
      content: "🚀 Les 5 tendances marketing qui vont dominer 2024...",
      platform: "LinkedIn",
      status: "published",
      publishedAt: "2024-01-15T10:30:00Z",
      stats: { views: 1250, likes: 89, shares: 23 },
    },
    {
      id: 2,
      title: "Story Instagram - Coulisses équipe",
      content: "Découvrez les coulisses de notre équipe créative...",
      platform: "Instagram",
      status: "scheduled",
      scheduledAt: "2024-01-16T14:00:00Z",
      stats: { views: 0, likes: 0, shares: 0 },
    },
    {
      id: 3,
      title: "Tweet - Innovation Tech",
      content: "L'IA révolutionne notre façon de travailler. Voici comment...",
      platform: "Twitter",
      status: "draft",
      createdAt: "2024-01-14T16:45:00Z",
      stats: { views: 0, likes: 0, shares: 0 },
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "published":
        return "Publié"
      case "scheduled":
        return "Planifié"
      case "draft":
        return "Brouillon"
      default:
        return status
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "LinkedIn":
        return "bg-blue-600"
      case "Instagram":
        return "bg-pink-600"
      case "Twitter":
        return "bg-sky-500"
      default:
        return "bg-gray-600"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique des posts</CardTitle>
        <CardDescription>Gérez et suivez tous vos contenus publiés</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={`text-white text-xs ${getPlatformColor(post.platform)}`}>
                      {post.platform.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm">{post.title}</h3>
                      <Badge variant="secondary" className={getStatusColor(post.status)}>
                        {getStatusText(post.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {post.publishedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Publié le {formatDate(post.publishedAt)}
                        </span>
                      )}
                      {post.scheduledAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Planifié pour le {formatDate(post.scheduledAt)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Modifier</DropdownMenuItem>
                    <DropdownMenuItem>Dupliquer</DropdownMenuItem>
                    <DropdownMenuItem>Voir les stats</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Supprimer</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {post.status === "published" && (
                <div className="flex items-center gap-6 text-sm text-muted-foreground border-t pt-3">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{post.stats.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{post.stats.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="h-4 w-4" />
                    <span>{post.stats.shares}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

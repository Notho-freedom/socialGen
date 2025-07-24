"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Heart, MessageCircle, Share, Edit, Trash2, Copy, ExternalLink } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

interface ActivityItem {
  id: string
  type: "published" | "scheduled" | "draft" | "engagement"
  title: string
  platform: "linkedin" | "twitter" | "instagram" | "facebook"
  timestamp: Date
  metrics?: {
    views?: number
    likes?: number
    comments?: number
    shares?: number
  }
  content?: string
  imageUrl?: string
}

const platformColors = {
  linkedin: "bg-blue-600",
  twitter: "bg-black",
  instagram: "bg-gradient-to-r from-purple-500 to-pink-500",
  facebook: "bg-blue-500",
}

const platformNames = {
  linkedin: "LinkedIn",
  twitter: "Twitter/X",
  instagram: "Instagram",
  facebook: "Facebook",
}

function ActivityCard({ activity }: { activity: ActivityItem }) {
  const getStatusBadge = () => {
    switch (activity.type) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">Publié</Badge>
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Programmé</Badge>
      case "draft":
        return <Badge variant="outline">Brouillon</Badge>
      case "engagement":
        return <Badge className="bg-purple-100 text-purple-800">Engagement</Badge>
      default:
        return null
    }
  }

  return (
    <div className="flex items-start space-x-4 p-4">
      <div className="flex-shrink-0">
        <div className={`w-3 h-3 rounded-full ${platformColors[activity.platform]}`} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
            {getStatusBadge()}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                Voir
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Dupliquer
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink className="mr-2 h-4 w-4" />
                Ouvrir sur {platformNames[activity.platform]}
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center space-x-4 mt-1">
          <span className="text-xs text-gray-500">{platformNames[activity.platform]}</span>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(activity.timestamp, { addSuffix: true, locale: fr })}
          </span>
        </div>

        {activity.content && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{activity.content}</p>}

        {activity.metrics && (
          <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
            {activity.metrics.views && (
              <div className="flex items-center space-x-1">
                <Eye className="h-3 w-3" />
                <span>{activity.metrics.views.toLocaleString()}</span>
              </div>
            )}
            {activity.metrics.likes && (
              <div className="flex items-center space-x-1">
                <Heart className="h-3 w-3" />
                <span>{activity.metrics.likes}</span>
              </div>
            )}
            {activity.metrics.comments && (
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-3 w-3" />
                <span>{activity.metrics.comments}</span>
              </div>
            )}
            {activity.metrics.shares && (
              <div className="flex items-center space-x-1">
                <Share className="h-3 w-3" />
                <span>{activity.metrics.shares}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {activity.imageUrl && (
        <div className="flex-shrink-0">
          <img src={activity.imageUrl || "/placeholder.svg"} alt="" className="w-12 h-12 rounded-lg object-cover" />
        </div>
      )}
    </div>
  )
}

export function RecentActivity() {
  const [activities] = useState<ActivityItem[]>([
    {
      id: "1",
      type: "published",
      title: "Conseils pour améliorer votre productivité",
      platform: "linkedin",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      metrics: { views: 1250, likes: 45, comments: 8, shares: 12 },
      content: "🚀 5 conseils pour booster votre productivité au travail...",
      imageUrl: "/placeholder.svg?height=100&width=100&text=Productivity",
    },
    {
      id: "2",
      type: "scheduled",
      title: "Post du lundi motivant",
      platform: "instagram",
      timestamp: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      content: "💪 Nouveau lundi, nouvelles opportunités ! Cette semaine...",
      imageUrl: "/placeholder.svg?height=100&width=100&text=Monday",
    },
    {
      id: "3",
      type: "published",
      title: "Thread sur les tendances marketing 2024",
      platform: "twitter",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      metrics: { views: 890, likes: 23, comments: 5, shares: 8 },
      content: "🧵 Thread : Les 10 tendances marketing à suivre en 2024...",
    },
    {
      id: "4",
      type: "draft",
      title: "Présentation nouveau produit",
      platform: "facebook",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Yesterday
      content: "🎉 Nous sommes fiers de vous présenter notre dernière innovation...",
    },
    {
      id: "5",
      type: "published",
      title: "Behind the scenes de notre équipe",
      platform: "linkedin",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      metrics: { views: 2100, likes: 67, comments: 15, shares: 23 },
      content: "👥 Découvrez les coulisses de notre équipe créative...",
      imageUrl: "/placeholder.svg?height=100&width=100&text=Team",
    },
  ])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>Vos dernières publications et interactions</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            Voir tout
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {activities.map((activity, index) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

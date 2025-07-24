import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "post_created",
      title: "Nouveau post LinkedIn créé",
      description: "Post sur les tendances marketing 2024",
      status: "published",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      platform: "LinkedIn",
    },
    {
      id: 2,
      type: "post_scheduled",
      title: "Post Instagram planifié",
      description: "Story sur les coulisses de l'entreprise",
      status: "scheduled",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      platform: "Instagram",
    },
    {
      id: 3,
      type: "post_generated",
      title: "Contenu généré par IA",
      description: "Post Twitter sur l'innovation tech",
      status: "draft",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      platform: "Twitter",
    },
    {
      id: 4,
      type: "image_generated",
      title: "Image générée",
      description: "Visuel pour campagne produit",
      status: "completed",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      platform: "AI",
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
      case "completed":
        return "bg-purple-100 text-purple-800"
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
      case "completed":
        return "Terminé"
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
      case "AI":
        return "bg-purple-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle>Activité récente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, i) => (
            <div key={activity.id} className={`flex items-start space-x-3 animate-fade-in-up delay-${i * 100} transition-transform duration-200 hover:scale-[1.02] hover:shadow-md`}>
              <Avatar className="h-8 w-8 animate-fade-in">
                <AvatarFallback className={`text-white text-xs ${getPlatformColor(activity.platform)}`}>{activity.platform.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium animate-fade-in delay-100">{activity.title}</p>
                  <Badge variant="secondary" className={getStatusColor(activity.status) + " animate-fade-in delay-200"}>
                    {getStatusText(activity.status)}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground animate-fade-in delay-200">{activity.description}</p>
                <p className="text-xs text-muted-foreground animate-fade-in delay-300">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true, locale: fr })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

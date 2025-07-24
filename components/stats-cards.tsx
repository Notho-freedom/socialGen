import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Eye, Heart, Share2, Users } from "lucide-react"

export function StatsCards() {
  const stats = [
    {
      title: "Posts créés",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: Share2,
      description: "Ce mois-ci",
    },
    {
      title: "Vues totales",
      value: "12.5K",
      change: "+8.2%",
      trend: "up",
      icon: Eye,
      description: "Cette semaine",
    },
    {
      title: "Engagement",
      value: "3.2K",
      change: "-2.1%",
      trend: "down",
      icon: Heart,
      description: "Interactions",
    },
    {
      title: "Followers",
      value: "1.8K",
      change: "+5.4%",
      trend: "up",
      icon: Users,
      description: "Nouveaux abonnés",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown
        const trendColor = stat.trend === "up" ? "text-green-600" : "text-red-600"

        return (
          <Card key={stat.title} className={`animate-fade-in-up delay-${i * 100} transition-transform duration-200 hover:scale-105 hover:shadow-lg`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground animate-fade-in" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold animate-fade-in-up delay-100">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <TrendIcon className={`h-3 w-3 ${trendColor} animate-bounce`} />
                <span className={trendColor}>{stat.change}</span>
                <span>par rapport au mois dernier</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 animate-fade-in delay-200">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

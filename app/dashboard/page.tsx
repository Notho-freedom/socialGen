import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { StatsCards } from "@/components/stats-cards"
import { RecentActivity } from "@/components/recent-activity"
import { DemoBanner } from "@/components/demo-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Target, Zap, Plus, BarChart3, Users } from "lucide-react"

export default function DashboardPage() {
  const quickActions = [
    {
      title: "Nouveau post",
      description: "Créer du contenu avec l'IA",
      icon: Plus,
      href: "/generator",
      color: "bg-blue-500",
    },
    {
      title: "Planifier",
      description: "Programmer vos publications",
      icon: Calendar,
      href: "/scheduler",
      color: "bg-green-500",
    },
    {
      title: "Analytics",
      description: "Voir les performances",
      icon: BarChart3,
      href: "/analytics",
      color: "bg-purple-500",
    },
    {
      title: "Audience",
      description: "Analyser votre communauté",
      icon: Users,
      href: "/audience",
      color: "bg-orange-500",
    },
  ]

  const upcomingPosts = [
    {
      title: "Post motivant du lundi",
      platform: "LinkedIn",
      scheduledFor: "Demain 9:00",
      status: "scheduled",
    },
    {
      title: "Thread marketing digital",
      platform: "Twitter",
      scheduledFor: "Mercredi 14:00",
      status: "scheduled",
    },
    {
      title: "Behind the scenes",
      platform: "Instagram",
      scheduledFor: "Vendredi 18:00",
      status: "draft",
    },
  ]

  const goals = [
    {
      title: "Posts ce mois",
      current: 24,
      target: 30,
      progress: 80,
    },
    {
      title: "Engagement rate",
      current: 7.2,
      target: 8.0,
      progress: 90,
    },
    {
      title: "Nouveaux followers",
      current: 156,
      target: 200,
      progress: 78,
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {/* Demo Banner */}
            <DemoBanner />

            {/* Welcome Section */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Bonjour, John ! 👋</h1>
                <p className="text-muted-foreground">Voici un aperçu de vos performances aujourd'hui</p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouveau post
              </Button>
            </div>

            {/* Stats Cards */}
            <StatsCards />

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Quick Actions */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 h-5 w-5" />
                    Actions rapides
                  </CardTitle>
                  <CardDescription>Accès direct à vos outils favoris</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start h-auto p-4 bg-transparent"
                      asChild
                    >
                      <a href={action.href}>
                        <div className={`mr-3 p-2 rounded-md ${action.color}`}>
                          <action.icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{action.title}</div>
                          <div className="text-xs text-muted-foreground">{action.description}</div>
                        </div>
                      </a>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Posts */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Posts programmés
                  </CardTitle>
                  <CardDescription>Vos prochaines publications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingPosts.map((post, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{post.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {post.platform} • {post.scheduledFor}
                        </div>
                      </div>
                      <Badge variant={post.status === "scheduled" ? "default" : "outline"}>
                        {post.status === "scheduled" ? "Programmé" : "Brouillon"}
                      </Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    Voir tout le planning
                  </Button>
                </CardContent>
              </Card>

              {/* Goals Progress */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="mr-2 h-5 w-5" />
                    Objectifs du mois
                  </CardTitle>
                  <CardDescription>Votre progression vers vos objectifs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {goals.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{goal.title}</span>
                        <span className="text-muted-foreground">
                          {goal.current}/{goal.target}
                        </span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <RecentActivity />
          </div>
        </main>
      </div>
    </div>
  )
}

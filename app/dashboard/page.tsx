import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { StatsCards } from "@/components/stats-cards"
import { RecentActivity } from "@/components/recent-activity"
import { PostGenerator } from "@/components/post-generator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Calendar, Target, TrendingUp, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const quickActions = [
    {
      title: "Créer un post",
      description: "Générer du contenu avec l'IA",
      icon: PlusCircle,
      href: "/dashboard/create",
      color: "bg-blue-500",
    },
    {
      title: "Planifier",
      description: "Programmer vos publications",
      icon: Calendar,
      href: "/dashboard/schedule",
      color: "bg-green-500",
    },
    {
      title: "Analytics",
      description: "Voir les performances",
      icon: TrendingUp,
      href: "/dashboard/analytics",
      color: "bg-purple-500",
    },
  ]

  const upcomingPosts = [
    {
      id: 1,
      title: "Post LinkedIn - Conseils productivité",
      platform: "LinkedIn",
      scheduledFor: "Aujourd'hui 14:00",
      status: "scheduled",
    },
    {
      id: 2,
      title: "Story Instagram - Behind the scenes",
      platform: "Instagram",
      scheduledFor: "Demain 09:00",
      status: "scheduled",
    },
    {
      id: 3,
      title: "Tweet - Innovation tech",
      platform: "Twitter",
      scheduledFor: "Demain 16:30",
      status: "scheduled",
    },
  ]

  const monthlyGoals = [
    {
      title: "Posts créés",
      current: 24,
      target: 30,
      percentage: 80,
    },
    {
      title: "Engagement",
      current: 3200,
      target: 4000,
      percentage: 80,
    },
    {
      title: "Nouveaux followers",
      current: 156,
      target: 200,
      percentage: 78,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8">
          <div className="mx-auto max-w-7xl space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold">Bonjour, John ! 👋</h1>
                <p className="text-muted-foreground">Voici un aperçu de votre activité aujourd'hui</p>
              </div>
              <div className="flex gap-3">
                <Button asChild>
                  <Link href="/dashboard/create">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nouveau post
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <StatsCards />

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
                <CardDescription>Accédez rapidement aux fonctionnalités principales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {quickActions.map((action, index) => (
                    <Link key={index} href={action.href}>
                      <div className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.color}`}>
                          <action.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium">{action.title}</h3>
                          <p className="text-sm text-muted-foreground">{action.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-8">
                {/* Post Generator */}
                <PostGenerator />

                {/* Recent Activity */}
                <RecentActivity />
              </div>

              {/* Sidebar Content */}
              <div className="space-y-8">
                {/* Upcoming Posts */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Posts programmés
                      </CardTitle>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/schedule">Voir tout</Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingPosts.map((post) => (
                      <div key={post.id} className="flex items-start gap-3 rounded-lg border p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                          <Calendar className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{post.title}</h4>
                          <p className="text-xs text-muted-foreground">{post.platform}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{post.scheduledFor}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Programmé
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Monthly Goals */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Objectifs du mois
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {monthlyGoals.map((goal, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{goal.title}</span>
                          <span className="text-muted-foreground">
                            {goal.current.toLocaleString()} / {goal.target.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={goal.percentage} className="h-2" />
                        <div className="flex items-center gap-1">
                          {goal.percentage >= 80 ? (
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                          ) : (
                            <AlertCircle className="h-3 w-3 text-yellow-500" />
                          )}
                          <span className="text-xs text-muted-foreground">{goal.percentage}% complété</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Tips Card */}
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-900">💡 Conseil du jour</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-blue-800 leading-relaxed">
                      Publiez vos contenus LinkedIn entre 8h-10h et 17h-18h pour maximiser l'engagement. Ces créneaux
                      correspondent aux pics d'activité professionnelle.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

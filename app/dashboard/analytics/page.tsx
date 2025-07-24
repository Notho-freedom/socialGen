import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Eye, Heart, Share2, MessageCircle, Calendar, Target, BarChart3 } from "lucide-react"

export default function AnalyticsPage() {
  const overviewStats = [
    {
      title: "Impressions totales",
      value: "45.2K",
      change: "+12.5%",
      trend: "up",
      icon: Eye,
    },
    {
      title: "Engagement",
      value: "3.8K",
      change: "+8.2%",
      trend: "up",
      icon: Heart,
    },
    {
      title: "Partages",
      value: "892",
      change: "-2.1%",
      trend: "down",
      icon: Share2,
    },
    {
      title: "Commentaires",
      value: "456",
      change: "+15.3%",
      trend: "up",
      icon: MessageCircle,
    },
  ]

  const platformStats = [
    {
      platform: "LinkedIn",
      posts: 24,
      engagement: 4.2,
      reach: "12.5K",
      color: "bg-blue-500",
      growth: "+18%",
    },
    {
      platform: "Twitter",
      posts: 18,
      engagement: 2.8,
      reach: "8.3K",
      color: "bg-sky-500",
      growth: "+12%",
    },
    {
      platform: "Instagram",
      posts: 15,
      engagement: 5.1,
      reach: "15.2K",
      color: "bg-pink-500",
      growth: "+25%",
    },
    {
      platform: "Facebook",
      posts: 12,
      engagement: 3.4,
      reach: "9.8K",
      color: "bg-blue-600",
      growth: "+8%",
    },
  ]

  const topPosts = [
    {
      id: 1,
      content: "🚀 Les 5 tendances marketing qui vont dominer 2024...",
      platform: "LinkedIn",
      engagement: 156,
      reach: "2.3K",
      date: "Il y a 2 jours",
    },
    {
      id: 2,
      content: "💡 Comment l'IA transforme le marketing digital...",
      platform: "Twitter",
      engagement: 89,
      reach: "1.8K",
      date: "Il y a 3 jours",
    },
    {
      id: 3,
      content: "✨ Behind the scenes de notre équipe créative...",
      platform: "Instagram",
      engagement: 234,
      reach: "3.1K",
      date: "Il y a 5 jours",
    },
  ]

  const goals = [
    {
      title: "Followers LinkedIn",
      current: 1250,
      target: 1500,
      percentage: 83,
    },
    {
      title: "Engagement rate",
      current: 4.2,
      target: 5.0,
      percentage: 84,
    },
    {
      title: "Posts ce mois",
      current: 28,
      target: 30,
      percentage: 93,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8">
          <div className="mx-auto max-w-7xl space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold">Analytics</h1>
                <p className="text-muted-foreground">Analysez les performances de vos contenus sociaux</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  30 derniers jours
                </Button>
                <Button variant="outline">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Exporter rapport
                </Button>
              </div>
            </div>

            {/* Overview Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {overviewStats.map((stat, index) => {
                const Icon = stat.icon
                const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown
                const trendColor = stat.trend === "up" ? "text-green-600" : "text-red-600"

                return (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="flex items-center space-x-1 text-xs">
                        <TrendIcon className={`h-3 w-3 ${trendColor}`} />
                        <span className={trendColor}>{stat.change}</span>
                        <span className="text-muted-foreground">vs mois dernier</span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="platforms">Plateformes</TabsTrigger>
                <TabsTrigger value="content">Contenu</TabsTrigger>
                <TabsTrigger value="audience">Audience</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-3">
                  {/* Platform Performance */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Performance par plateforme</CardTitle>
                      <CardDescription>Comparaison des performances sur 30 jours</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {platformStats.map((platform, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${platform.color}`} />
                              <span className="font-medium">{platform.platform}</span>
                              <Badge variant="secondary">{platform.posts} posts</Badge>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">{platform.reach}</div>
                              <div className="text-xs text-muted-foreground">{platform.engagement}% engagement</div>
                            </div>
                          </div>
                          <Progress value={platform.engagement * 20} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Croissance: {platform.growth}</span>
                            <span>{platform.engagement}% taux d'engagement</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Goals */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Objectifs
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {goals.map((goal, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{goal.title}</span>
                            <span className="text-muted-foreground">
                              {goal.current}/{goal.target}
                            </span>
                          </div>
                          <Progress value={goal.percentage} className="h-2" />
                          <p className="text-xs text-muted-foreground">{goal.percentage}% de l'objectif atteint</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="platforms" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {platformStats.map((platform, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${platform.color}`} />
                          <CardTitle>{platform.platform}</CardTitle>
                          <Badge variant="outline">{platform.growth}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-2xl font-bold">{platform.posts}</p>
                            <p className="text-xs text-muted-foreground">Posts publiés</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{platform.reach}</p>
                            <p className="text-xs text-muted-foreground">Portée totale</p>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Taux d'engagement</span>
                            <span>{platform.engagement}%</span>
                          </div>
                          <Progress value={platform.engagement * 20} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top des posts performants</CardTitle>
                    <CardDescription>Vos contenus les plus engageants des 30 derniers jours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topPosts.map((post, index) => (
                        <div key={post.id} className="flex items-start gap-4 p-4 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium line-clamp-2">{post.content}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <Badge variant="outline">{post.platform}</Badge>
                              <span>{post.date}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">{post.engagement}</div>
                            <div className="text-xs text-muted-foreground">interactions</div>
                            <div className="text-sm text-muted-foreground mt-1">{post.reach} vues</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="audience" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Croissance de l'audience</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold">12.5K</div>
                          <div className="text-sm text-muted-foreground">Followers totaux</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Croissance ce mois</span>
                            <span className="text-green-600">+8.2%</span>
                          </div>
                          <Progress value={82} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Engagement moyen</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold">4.2%</div>
                          <div className="text-sm text-muted-foreground">Taux d'engagement</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Objectif: 5.0%</span>
                            <span className="text-blue-600">84%</span>
                          </div>
                          <Progress value={84} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

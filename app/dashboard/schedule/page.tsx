"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Clock, Plus, Edit, Trash2, Play, Pause, MoreHorizontal } from "lucide-react"
import { useState } from "react"

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const scheduledPosts = [
    {
      id: 1,
      title: "Post LinkedIn - Tendances Marketing 2024",
      content: "🚀 Les 5 tendances marketing qui vont dominer 2024...",
      platform: "LinkedIn",
      scheduledDate: "2024-01-16",
      scheduledTime: "09:00",
      status: "scheduled",
      engagement: { likes: 0, comments: 0, shares: 0 },
    },
    {
      id: 2,
      title: "Story Instagram - Behind the scenes",
      content: "Découvrez les coulisses de notre équipe créative...",
      platform: "Instagram",
      scheduledDate: "2024-01-16",
      scheduledTime: "14:30",
      status: "scheduled",
      engagement: { likes: 0, comments: 0, shares: 0 },
    },
    {
      id: 3,
      title: "Tweet - Innovation Tech",
      content: "L'IA révolutionne notre façon de travailler. Voici comment...",
      platform: "Twitter",
      scheduledDate: "2024-01-17",
      scheduledTime: "11:15",
      status: "scheduled",
      engagement: { likes: 0, comments: 0, shares: 0 },
    },
    {
      id: 4,
      title: "Post Facebook - Événement",
      content: "Rejoignez-nous pour notre webinar sur le marketing digital...",
      platform: "Facebook",
      scheduledDate: "2024-01-17",
      scheduledTime: "16:00",
      status: "paused",
      engagement: { likes: 0, comments: 0, shares: 0 },
    },
  ]

  const todaysPosts = scheduledPosts.filter((post) => post.scheduledDate === "2024-01-16")

  const upcomingPosts = scheduledPosts.filter((post) => new Date(post.scheduledDate) > new Date("2024-01-16"))

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "LinkedIn":
        return "bg-blue-600"
      case "Instagram":
        return "bg-pink-600"
      case "Twitter":
        return "bg-sky-500"
      case "Facebook":
        return "bg-blue-500"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-green-100 text-green-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "scheduled":
        return "Programmé"
      case "paused":
        return "En pause"
      case "failed":
        return "Échec"
      default:
        return status
    }
  }

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
                <h1 className="text-3xl font-bold">Planification</h1>
                <p className="text-muted-foreground">
                  Gérez et programmez vos publications sur tous vos réseaux sociaux
                </p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Programmer un post
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Aujourd'hui</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">{todaysPosts.length}</div>
                  <p className="text-xs text-muted-foreground">posts programmés</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Cette semaine</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">{scheduledPosts.length}</div>
                  <p className="text-xs text-muted-foreground">posts au total</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Actifs</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">
                    {scheduledPosts.filter((p) => p.status === "scheduled").length}
                  </div>
                  <p className="text-xs text-muted-foreground">prêts à publier</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Pause className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium">En pause</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">
                    {scheduledPosts.filter((p) => p.status === "paused").length}
                  </div>
                  <p className="text-xs text-muted-foreground">temporairement</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-4">
              {/* Calendar */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Calendrier</CardTitle>
                  <CardDescription>Sélectionnez une date pour voir les posts</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              {/* Scheduled Posts */}
              <div className="lg:col-span-3">
                <Tabs defaultValue="today" className="space-y-6">
                  <TabsList>
                    <TabsTrigger value="today">Aujourd'hui</TabsTrigger>
                    <TabsTrigger value="upcoming">À venir</TabsTrigger>
                    <TabsTrigger value="all">Tous</TabsTrigger>
                  </TabsList>

                  <TabsContent value="today" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Posts d'aujourd'hui</CardTitle>
                        <CardDescription>{todaysPosts.length} posts programmés pour aujourd'hui</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {todaysPosts.length === 0 ? (
                          <div className="text-center py-8">
                            <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">Aucun post aujourd'hui</h3>
                            <p className="text-muted-foreground">Programmez votre premier post pour aujourd'hui</p>
                            <Button className="mt-4">
                              <Plus className="mr-2 h-4 w-4" />
                              Programmer maintenant
                            </Button>
                          </div>
                        ) : (
                          todaysPosts.map((post) => (
                            <div key={post.id} className="border rounded-lg p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3 flex-1">
                                  <div className={`w-3 h-3 rounded-full mt-2 ${getPlatformColor(post.platform)}`} />
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="font-medium">{post.title}</h3>
                                      <Badge variant="secondary" className={getStatusColor(post.status)}>
                                        {getStatusText(post.status)}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{post.content}</p>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                      <span>{post.platform}</span>
                                      <span>{post.scheduledTime}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="upcoming" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Posts à venir</CardTitle>
                        <CardDescription>
                          {upcomingPosts.length} posts programmés pour les prochains jours
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {upcomingPosts.map((post) => (
                          <div key={post.id} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1">
                                <div className={`w-3 h-3 rounded-full mt-2 ${getPlatformColor(post.platform)}`} />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-medium">{post.title}</h3>
                                    <Badge variant="secondary" className={getStatusColor(post.status)}>
                                      {getStatusText(post.status)}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{post.content}</p>
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span>{post.platform}</span>
                                    <span>
                                      {new Date(post.scheduledDate).toLocaleDateString("fr-FR")} à {post.scheduledTime}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="all" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Tous les posts programmés</CardTitle>
                        <CardDescription>Vue d'ensemble de tous vos posts programmés</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {scheduledPosts.map((post) => (
                          <div key={post.id} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1">
                                <div className={`w-3 h-3 rounded-full mt-2 ${getPlatformColor(post.platform)}`} />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-medium">{post.title}</h3>
                                    <Badge variant="secondary" className={getStatusColor(post.status)}>
                                      {getStatusText(post.status)}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{post.content}</p>
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span>{post.platform}</span>
                                    <span>
                                      {new Date(post.scheduledDate).toLocaleDateString("fr-FR")} à {post.scheduledTime}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { StatsCards } from "@/components/stats-cards"
import { RecentActivity } from "@/components/recent-activity"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PostGenerator } from "@/components/post-generator"
import { PostHistory } from "@/components/post-history"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={{
          name: "John Doe",
          email: "john@example.com",
        }}
        onLogout={() => router.push("/")}
      />

      <div className="flex">
        <Sidebar className="hidden lg:flex" />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Gérez vos posts et suivez vos performances</p>
            </div>

            <StatsCards />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="generator">Générateur</TabsTrigger>
                <TabsTrigger value="history">Historique</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <RecentActivity />
                  <Card>
                    <CardHeader>
                      <CardTitle>Prochains Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Post LinkedIn</p>
                            <p className="text-sm text-muted-foreground">Demain à 9h00</p>
                          </div>
                          <Badge variant="outline">Planifié</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Story Instagram</p>
                            <p className="text-sm text-muted-foreground">Demain à 14h00</p>
                          </div>
                          <Badge variant="outline">Planifié</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="generator">
                <PostGenerator />
              </TabsContent>

              <TabsContent value="history">
                <PostHistory />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

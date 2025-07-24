"use client"

import { useEffect, useState } from "react"
import { createClient, isSupabaseConfigured } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, History, Settings, LogOut, Sparkles } from "lucide-react"
import { PostGenerator } from "@/components/post-generator"
import { PostHistory } from "@/components/post-history"
import { useToast } from "@/hooks/use-toast"
import { DemoBanner } from "@/components/demo-banner"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("generate")
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      if (!isSupabaseConfigured()) {
        // Demo mode - create a mock user
        setUser({
          id: "demo-user",
          email: "demo@example.com",
          user_metadata: { name: "Utilisateur Démo" },
        })
        setLoading(false)
        return
      }

      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/")
        return
      }
      setUser(user)
      setLoading(false)
    }

    getUser()
  }, [router, supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">SocialGen</h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Bonjour, {user?.user_metadata?.name || user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <DemoBanner />
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={activeTab === "generate" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("generate")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau post
                </Button>
                <Button
                  variant={activeTab === "history" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("history")}
                >
                  <History className="h-4 w-4 mr-2" />
                  Historique
                </Button>
                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres
                </Button>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Posts créés</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Ce mois</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Engagement moyen</span>
                  <span className="font-semibold text-green-600">+24%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "generate" && <PostGenerator userId={user.id} />}
            {activeTab === "history" && <PostHistory userId={user.id} />}
            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres</CardTitle>
                  <CardDescription>Configurez vos préférences et intégrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Fonctionnalité à venir...</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ModularPostCreator } from "@/components/modular-post-creator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, Clock, Users } from "lucide-react"

export default function CreatePostPage() {
  const tips = [
    {
      icon: TrendingUp,
      title: "Tendances actuelles",
      description: "L'IA et l'automatisation sont très populaires cette semaine",
      color: "bg-blue-100 text-blue-800",
    },
    {
      icon: Clock,
      title: "Meilleur moment",
      description: "Publiez entre 9h-11h pour plus d'engagement",
      color: "bg-green-100 text-green-800",
    },
    {
      icon: Users,
      title: "Audience active",
      description: "Vos followers sont plus actifs le mardi et jeudi",
      color: "bg-purple-100 text-purple-800",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8">
          <div className="mx-auto max-w-full space-y-8">
            {/* Header */}
            <div className="space-y-2 mb-8">
              <h1 className="text-3xl font-bold">Créer un nouveau post</h1>
              <p className="text-muted-foreground">
                Utilisez l'IA pour générer du contenu engageant adapté à votre audience
              </p>
            </div>

            {/* Main Content - Full Width Layout */}
            <div className="grid gap-8 lg:grid-cols-5">
              {/* Post Creator - Takes more space */}
              <div className="lg:col-span-3">
                <ModularPostCreator />
              </div>

              {/* Sidebar Tips - Reduced space */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      Conseils IA
                    </CardTitle>
                    <CardDescription>Optimisez vos posts avec ces recommandations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {tips.map((tip, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <tip.icon className="h-4 w-4 text-primary" />
                          <span className="font-medium text-sm">{tip.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground pl-6">{tip.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Hashtags populaires</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "#marketing",
                        "#innovation",
                        "#IA",
                        "#business",
                        "#startup",
                        "#tech",
                        "#digital",
                        "#entrepreneur",
                      ].map((hashtag) => (
                        <Badge key={hashtag} variant="secondary" className="text-xs">
                          {hashtag}
                        </Badge>
                      ))}
                    </div>
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

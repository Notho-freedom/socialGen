import { Sidebar } from "@/components/sidebar"
import { ModularPostCreator } from "@/components/modular-post-creator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, Clock, Users } from "lucide-react"
import { DemoBanner } from "@/components/demo-banner"
import { FadeIn } from "@/components/fade-in"

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <DemoBanner />
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-12">
          <div className="w-full max-w-none space-y-8">
            {/* Header */}
            <FadeIn>
              <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Créateur de Posts IA
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Créez du contenu social media optimisé avec l'intelligence artificielle. Interface modulaire, aperçus
                  en temps réel, et publication multi-plateformes.
                </p>
              </div>
            </FadeIn>

            {/* Main Content - Full Width */}
            <div className="container mx-auto px-4 py-8">
              <ModularPostCreator />
            </div>

            {/* Sidebar Tips - Reduced space */}
            <div className="grid gap-8 lg:grid-cols-5">
              {/* Post Creator - Takes more space */}
              <div className="lg:col-span-3">{/* ModularPostCreator is already here */}</div>

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

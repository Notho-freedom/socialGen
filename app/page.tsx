"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { isSupabaseConfigured } from "@/lib/supabase"
import { DemoBanner } from "@/components/demo-banner"

export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate a successful login
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setLoading(false)
    toast({
      title: "Connexion réussie!",
      description: "Redirection vers votre dashboard...",
    })

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
                Générez des posts
                <span className="text-primary"> parfaits</span> pour vos réseaux sociaux
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Créez automatiquement du contenu optimisé avec l'IA. Texte et images générés en quelques secondes pour
                tous vos réseaux sociaux.
              </p>
            </div>

            <DemoBanner />

            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-center">{isSupabaseConfigured() ? "Connexion" : "Mode Démo"}</CardTitle>
                <CardDescription className="text-center">
                  {isSupabaseConfigured()
                    ? "Connectez-vous pour accéder à votre dashboard"
                    : "Explorez toutes les fonctionnalités en mode démo"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Connexion..." : "Se connecter"}
                  </Button>
                </form>

                {!isSupabaseConfigured() && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      💡 En mode démo, utilisez n'importe quelles données pour vous connecter
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

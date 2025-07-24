"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MoreHorizontal, Copy, Edit, Trash2, Share, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { isSupabaseConfigured } from "@/lib/supabase"

interface Post {
  id: string
  title: string
  prompt: string
  text_generated: string
  image_url?: string
  platform?: string
  status: "draft" | "scheduled" | "published"
  created_at: string
  scheduled_at?: string
  posted_at?: string
}

interface PostHistoryProps {
  userId: string
}

const PLATFORM_CONFIGS = {
  linkedin: { name: "LinkedIn", color: "bg-blue-600" },
  twitter: { name: "Twitter/X", color: "bg-black" },
  instagram: { name: "Instagram", color: "bg-pink-600" },
  facebook: { name: "Facebook", color: "bg-blue-700" },
}

const STATUS_CONFIGS = {
  draft: { label: "Brouillon", color: "bg-gray-500" },
  scheduled: { label: "Programmé", color: "bg-orange-500" },
  published: { label: "Publié", color: "bg-green-500" },
}

export function PostHistory({ userId }: PostHistoryProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchPosts()
  }, [userId])

  const fetchPosts = async () => {
    try {
      if (!isSupabaseConfigured()) {
        // Demo data
        const demoPost = {
          id: "demo-1",
          title: "Post de démonstration",
          prompt: "Créer un post motivant pour LinkedIn",
          text_generated:
            "🚀 Nouvelle semaine, nouvelles opportunités !\n\nChaque lundi est une chance de recommencer, d'apprendre et de grandir. Que vous soyez entrepreneur, salarié ou freelance, rappelez-vous que le succès se construit jour après jour.\n\n💡 Mes 3 conseils pour bien commencer la semaine :\n✅ Définissez vos priorités\n✅ Restez curieux et ouvert aux opportunités\n✅ N'oubliez pas de célébrer vos petites victoires\n\nQuel est votre objectif principal cette semaine ? 👇\n\n#Motivation #LinkedIn #Entrepreneuriat #Croissance #Mindset",
          image_url: "/placeholder.svg?height=400&width=600",
          platform: "linkedin",
          status: "draft" as const,
          created_at: new Date().toISOString(),
        }
        setPosts([demoPost])
        setLoading(false)
        return
      }

      const response = await fetch(`/api/posts?userId=${userId}`)
      if (!response.ok) throw new Error("Erreur lors du chargement")

      const data = await response.json()
      setPosts(data.posts || [])
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger l'historique des posts.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCopyText = async (text: string) => {
    await navigator.clipboard.writeText(text)
    toast({
      title: "Copié !",
      description: "Le texte a été copié dans le presse-papiers.",
    })
  }

  const handleDeletePost = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Erreur lors de la suppression")

      setPosts(posts.filter((post) => post.id !== postId))
      toast({
        title: "Supprimé !",
        description: "Le post a été supprimé avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le post.",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (posts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historique des posts</CardTitle>
          <CardDescription>Retrouvez tous vos posts créés et publiés</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Aucun post créé</p>
            <p className="text-sm">Commencez par créer votre premier post !</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Historique des posts</CardTitle>
          <CardDescription>
            {posts.length} post{posts.length > 1 ? "s" : ""} créé{posts.length > 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {posts.map((post) => {
          const platformConfig = post.platform ? PLATFORM_CONFIGS[post.platform as keyof typeof PLATFORM_CONFIGS] : null
          const statusConfig = STATUS_CONFIGS[post.status]

          return (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{post.title}</h3>
                      <Badge variant="secondary" className={`text-white ${statusConfig.color}`}>
                        {statusConfig.label}
                      </Badge>
                      {platformConfig && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${platformConfig.color}`} />
                          {platformConfig.name}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">Créé le {formatDate(post.created_at)}</p>
                    {post.status === "scheduled" && post.scheduled_at && (
                      <p className="text-sm text-orange-600">Programmé pour le {formatDate(post.scheduled_at)}</p>
                    )}
                    {post.status === "published" && post.posted_at && (
                      <p className="text-sm text-green-600">Publié le {formatDate(post.posted_at)}</p>
                    )}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleCopyText(post.text_generated)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copier le texte
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="h-4 w-4 mr-2" />
                        Republier
                      </DropdownMenuItem>
                      <Separator />
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDeletePost(post.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Prompt utilisé</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{post.prompt}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Texte généré</h4>
                      <div className="text-sm bg-gray-50 p-3 rounded-lg max-h-32 overflow-y-auto">
                        <p className="whitespace-pre-wrap">{post.text_generated}</p>
                      </div>
                    </div>
                  </div>

                  {post.image_url && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Image</h4>
                      <div className="rounded-lg overflow-hidden">
                        <img
                          src={post.image_url || "/placeholder.svg"}
                          alt="Post image"
                          className="w-full aspect-video object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

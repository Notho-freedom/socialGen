"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Copy,
  Trash2,
  Calendar,
  Heart,
  MessageCircle,
  ExternalLink,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import type { Post } from "@/lib/supabase"

interface PostHistoryProps {
  userId?: string
}

const platformConfig = {
  linkedin: { name: "LinkedIn", color: "bg-blue-600", textColor: "text-blue-600" },
  twitter: { name: "Twitter/X", color: "bg-black", textColor: "text-black" },
  instagram: { name: "Instagram", color: "bg-pink-600", textColor: "text-pink-600" },
  facebook: { name: "Facebook", color: "bg-blue-500", textColor: "text-blue-500" },
  tiktok: { name: "TikTok", color: "bg-black", textColor: "text-black" },
}

const statusConfig = {
  draft: { label: "Brouillon", variant: "outline" as const },
  scheduled: { label: "Programmé", variant: "default" as const },
  published: { label: "Publié", variant: "secondary" as const },
}

function PostCard({
  post,
  onEdit,
  onDelete,
  onDuplicate,
}: {
  post: Post
  onEdit: (post: Post) => void
  onDelete: (postId: string) => void
  onDuplicate: (post: Post) => void
}) {
  const platform = platformConfig[post.platform]
  const status = statusConfig[post.status]

  const mockMetrics = {
    views: Math.floor(Math.random() * 5000) + 100,
    likes: Math.floor(Math.random() * 200) + 10,
    comments: Math.floor(Math.random() * 50) + 2,
    shares: Math.floor(Math.random() * 30) + 1,
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${platform.color}`} />
            <div>
              <h3 className="font-medium text-sm">{post.title}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-muted-foreground">{platform.name}</span>
                <Badge variant={status.variant} className="text-xs">
                  {status.label}
                </Badge>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(post)}>
                <Eye className="mr-2 h-4 w-4" />
                Voir
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(post)}>
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate(post)}>
                <Copy className="mr-2 h-4 w-4" />
                Dupliquer
              </DropdownMenuItem>
              {post.status === "published" && (
                <DropdownMenuItem>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ouvrir sur {platform.name}
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onDelete(post.id)} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{post.content}</p>

        {post.image_url && (
          <div className="mb-3">
            <img src={post.image_url || "/placeholder.svg"} alt="" className="w-full h-32 object-cover rounded-md" />
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: fr })}</span>
          </div>

          {post.status === "published" && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Eye className="h-3 w-3" />
                <span>{mockMetrics.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="h-3 w-3" />
                <span>{mockMetrics.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-3 w-3" />
                <span>{mockMetrics.comments}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function PostHistory({ userId = "demo-user" }: PostHistoryProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [platformFilter, setPlatformFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data for demo
  useEffect(() => {
    const mockPosts: Post[] = [
      {
        id: "1",
        user_id: userId,
        title: "Conseils productivité pour entrepreneurs",
        content:
          "🚀 5 conseils pour booster votre productivité en tant qu'entrepreneur :\n\n1️⃣ Planifiez votre journée la veille\n2️⃣ Utilisez la technique Pomodoro\n3️⃣ Éliminez les distractions\n4️⃣ Déléguez les tâches non-essentielles\n5️⃣ Prenez des pauses régulières\n\nQuel est votre conseil préféré ? 💬\n\n#Productivité #Entrepreneur #Conseils",
        platform: "linkedin",
        status: "published",
        image_url: "/placeholder.svg?height=300&width=500&text=Productivity",
        prompt: "Créer un post sur la productivité pour entrepreneurs",
        objective: "Conseils d'expert",
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "2",
        user_id: userId,
        title: "Thread marketing digital 2024",
        content:
          "🧵 THREAD : Les 10 tendances marketing digital à suivre en 2024\n\n1/ L'IA générative révolutionne la création de contenu\n2/ Le marketing conversationnel explose\n3/ Les micro-influenceurs dominent\n\n[Thread de 10 tweets]",
        platform: "twitter",
        status: "published",
        prompt: "Thread sur les tendances marketing 2024",
        objective: "Tendances du secteur",
        created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "3",
        user_id: userId,
        title: "Post motivant du lundi",
        content:
          "💪 Nouveau lundi, nouvelles opportunités !\n\nCette semaine, fixez-vous un objectif qui vous fait vibrer. Peu importe sa taille, l'important c'est de commencer.\n\n✨ Rappel du jour :\n• Chaque expert a été un débutant\n• Chaque succès a commencé par un premier pas\n• Chaque rêve mérite sa chance\n\nAlors, quel sera votre premier pas aujourd'hui ? 👇\n\n#Motivation #Lundi #Objectifs #Réussite",
        platform: "instagram",
        status: "scheduled",
        image_url: "/placeholder.svg?height=300&width=300&text=Monday+Motivation",
        prompt: "Post motivant pour le lundi",
        objective: "Post du lundi motivant",
        scheduled_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "4",
        user_id: userId,
        title: "Présentation nouveau produit",
        content:
          "🎉 Grande nouvelle ! Notre dernier produit est enfin là !\n\nAprès des mois de développement, nous sommes fiers de vous présenter une solution qui va révolutionner votre quotidien.\n\n🌟 Les points forts :\n• Interface intuitive\n• Performance optimisée\n• Sécurité renforcée\n• Support client 24/7\n\nDécouvrez dès maintenant comment il peut transformer votre façon de travailler.\n\nLien en bio pour en savoir plus ! 👆",
        platform: "facebook",
        status: "draft",
        image_url: "/placeholder.svg?height=300&width=500&text=New+Product",
        prompt: "Présenter le lancement d'un nouveau produit",
        objective: "Présenter un nouveau produit",
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "5",
        user_id: userId,
        title: "Behind the scenes équipe",
        content:
          "👥 Découvrez les coulisses de notre équipe créative !\n\nAujourd'hui, on vous emmène dans notre bureau pour vous montrer comment naissent nos idées les plus innovantes.\n\nDe la brainstorming session matinale au prototype final, chaque étape compte pour créer des solutions qui vous ressemblent.\n\nMerci à toute l'équipe pour cette énergie incroyable ! 🙌\n\n#Team #BehindTheScenes #Innovation #Créativité",
        platform: "linkedin",
        status: "published",
        image_url: "/placeholder.svg?height=300&width=500&text=Team+Work",
        prompt: "Montrer les coulisses de l'équipe",
        objective: "Behind the scenes",
        published_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]

    setTimeout(() => {
      setPosts(mockPosts)
      setLoading(false)
    }, 1000)
  }, [userId])

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPlatform = platformFilter === "all" || post.platform === platformFilter
    const matchesStatus = statusFilter === "all" || post.status === statusFilter

    return matchesSearch && matchesPlatform && matchesStatus
  })

  const handleEdit = (post: Post) => {
    console.log("Edit post:", post.id)
  }

  const handleDelete = (postId: string) => {
    setPosts(posts.filter((p) => p.id !== postId))
  }

  const handleDuplicate = (post: Post) => {
    const duplicatedPost: Post = {
      ...post,
      id: Date.now().toString(),
      title: `${post.title} (copie)`,
      status: "draft",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    setPosts([duplicatedPost, ...posts])
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historique des posts</CardTitle>
          <CardDescription>Chargement...</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Historique des posts</CardTitle>
          <CardDescription>Gérez tous vos contenus créés et publiés</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher dans vos posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Plateforme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les plateformes</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="twitter">Twitter/X</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="draft">Brouillons</SelectItem>
                <SelectItem value="scheduled">Programmés</SelectItem>
                <SelectItem value="published">Publiés</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {filteredPosts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-medium">Aucun post trouvé</h3>
              <p className="text-muted-foreground mt-1">
                {searchQuery || platformFilter !== "all" || statusFilter !== "all"
                  ? "Essayez de modifier vos filtres de recherche"
                  : "Commencez par créer votre premier post"}
              </p>
              <Button className="mt-4">Créer un nouveau post</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { PostHistory } from "@/components/post-history"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download } from "lucide-react"

export default function HistoryPage() {
  const stats = [
    { label: "Total des posts", value: "156", change: "+12 ce mois" },
    { label: "Posts publiés", value: "89", change: "+8 cette semaine" },
    { label: "Brouillons", value: "23", change: "3 en attente" },
    { label: "Programmés", value: "44", change: "12 cette semaine" },
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
                <h1 className="text-3xl font-bold">Historique des posts</h1>
                <p className="text-muted-foreground">Gérez et analysez tous vos contenus créés</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter
                </Button>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtres
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.change}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Rechercher et filtrer</CardTitle>
                <CardDescription>Trouvez rapidement vos posts par contenu, plateforme ou statut</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Rechercher dans vos posts..." className="pl-10" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Plateforme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les plateformes</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="published">Publié</SelectItem>
                      <SelectItem value="scheduled">Programmé</SelectItem>
                      <SelectItem value="draft">Brouillon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Post History */}
            <PostHistory />
          </div>
        </main>
      </div>
    </div>
  )
}

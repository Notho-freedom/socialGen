"use client"
import { useState, ChangeEvent } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, Sparkles, Image as ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { SocialPreviewCard } from "@/components/social-preview-card"

const PLATFORMS = [
  { value: "linkedin", label: "LinkedIn", limit: 3000 },
  { value: "twitter", label: "Twitter/X", limit: 280 },
  { value: "instagram", label: "Instagram", limit: 2200 },
  { value: "facebook", label: "Facebook", limit: 63206 },
] as const

type Platform = typeof PLATFORMS[number]["value"]

const OBJECTIVES = [
  "Attirer des freelances",
  "Post du lundi motivant",
  "Présenter un nouveau produit",
  "Partager une réussite client",
  "Conseils professionnels",
  "Tendances du secteur",
] as const

const SOCIAL_PREVIEW_USERS: Record<Platform, { name: string; avatar: string; job?: string }> = {
  linkedin: { name: "Jean Dupont", avatar: "/public/placeholder-user.jpg", job: "Consultant Marketing" },
  twitter: { name: "@jean_dupont", avatar: "/public/placeholder-user.jpg" },
  facebook: { name: "Jean Dupont", avatar: "/public/placeholder-user.jpg" },
  instagram: { name: "jean.dupont", avatar: "/public/placeholder-user.jpg" },
}

export function PostCreator() {
  const [platform, setPlatform] = useState<Platform>("linkedin")
  const [objective, setObjective] = useState<typeof OBJECTIVES[number]>(OBJECTIVES[0])
  const [customPrompt, setCustomPrompt] = useState("")
  const [generatedText, setGeneratedText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>("")
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!objective && !customPrompt) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez sélectionner un objectif ou saisir un prompt personnalisé.",
        variant: "destructive",
      })
      return
    }
    setIsGenerating(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      const mockTexts = {
        "Attirer des freelances": `🚀 Freelances talentueux, cette opportunité est pour vous !\n\nNous recherchons des experts passionnés pour rejoindre notre équipe projet. Si vous excellez dans votre domaine et cherchez des missions stimulantes, parlons-en !\n\n💼 Ce que nous offrons :\n• Projets innovants et variés\n• Rémunération attractive\n• Flexibilité totale\n• Équipe bienveillante\n\nPrêt(e) à relever le défi ? Contactez-nous en MP !\n\n#Freelance #Opportunité #Recrutement`,
        "Post du lundi motivant": `💪 Nouveau lundi, nouvelles possibilités !\n\nCette semaine, fixez-vous un objectif qui vous fait vibrer. Peu importe sa taille, l'important c'est de commencer.\n\n✨ Rappel du jour :\nChaque expert a été un débutant\nChaque succès a commencé par un premier pas\nChaque rêve mérite sa chance\n\nAlors, quel sera votre premier pas aujourd'hui ?\n\nPartagez vos objectifs de la semaine en commentaire ! 👇\n\n#Motivation #Lundi #Objectifs #Réussite`,
        "Présenter un nouveau produit": `🎉 Grande nouvelle ! Notre dernier produit est enfin là !\n\nAprès des mois de développement, nous sommes fiers de vous présenter une solution qui va révolutionner votre quotidien.\n\n🌟 Les points forts :\n• Interface intuitive\n• Performance optimisée\n• Sécurité renforcée\n• Support client 24/7\n\nDécouvrez dès maintenant comment il peut transformer votre façon de travailler.\n\nLien en bio pour en savoir plus ! 👆\n\n#Innovation #NouveauProduit #Technologie`,
      }
      let text = customPrompt || mockTexts[objective as keyof typeof mockTexts] || `Contenu généré pour : ${objective}`
      const selectedPlatform = PLATFORMS.find((p) => p.value === platform)
      if (selectedPlatform && text.length > selectedPlatform.limit) {
        text = text.substring(0, selectedPlatform.limit - 3) + "..."
      }
      setGeneratedText(text)
      toast({
        title: "Contenu généré !",
        description: "Votre post a été créé avec succès",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le contenu",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // Gestion de l'upload d'image
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setImageUrl(ev.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl mx-auto animate-fade-in-up">
      {/* Formulaire de création */}
      <div className="space-y-6">
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 animate-bounce" />
              Générer un post IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 animate-fade-in delay-100">
              <label className="text-sm font-medium">Plateforme cible</label>
              <Select value={platform} onValueChange={v => setPlatform(v as Platform)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisissez une plateforme" />
                </SelectTrigger>
                <SelectContent>
                  {PLATFORMS.map((p) => (
                    <SelectItem key={p.value} value={p.value} className="transition-all duration-200 hover:scale-105">
                      {p.label} ({p.limit} caractères max)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 animate-fade-in delay-200">
              <label className="text-sm font-medium">Objectif de publication</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {OBJECTIVES.map((obj) => (
                  <Badge
                    key={obj}
                    variant={objective === obj ? "default" : "outline"}
                    className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md"
                    onClick={() => setObjective(obj)}
                  >
                    {obj}
                  </Badge>
                ))}
              </div>
              <Textarea
                placeholder="Ou décrivez votre objectif personnalisé..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                rows={2}
                className="transition-all duration-200 focus:shadow-lg"
              />
            </div>
            <div className="flex items-center gap-2 animate-fade-in delay-300">
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                className="hidden"
                onChange={handleImageChange}
              />
              <label htmlFor="image-upload">
                <Button type="button" variant="outline" className="gap-2">
                  <ImageIcon className="h-4 w-4" /> Ajouter une image
                </Button>
              </label>
              {imageUrl && (
                <img src={imageUrl} alt="Aperçu" className="h-10 w-10 rounded object-cover border" />
              )}
            </div>
            <Button onClick={handleGenerate} disabled={isGenerating} className="w-full animate-fade-in-up delay-300 transition-transform duration-200 hover:scale-105">
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-bounce" />
                  Générer le contenu
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
      {/* Aperçu live */}
      <div className="space-y-4 flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-2">Aperçu en temps réel</h3>
        <SocialPreviewCard
          platform={platform}
          text={generatedText}
          user={SOCIAL_PREVIEW_USERS[platform]}
          imageUrl={imageUrl}
        />
      </div>
    </div>
  )
} 
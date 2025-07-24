"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { AnimatedButton } from "@/components/animated-button"
import { FadeIn } from "@/components/fade-in"
import { Settings, Target, MessageSquare, Zap } from "lucide-react"

interface ContentConfigurationProps {
  topic: string
  setTopic: (topic: string) => void
  selectedObjectives: string[]
  setSelectedObjectives: (objectives: string[]) => void
  customObjective: string
  setCustomObjective: (objective: string) => void
  tone: string
  setTone: (tone: string) => void
  autoOptimize: boolean
  setAutoOptimize: (optimize: boolean) => void
  onGenerate: () => void
  isGenerating: boolean
  canGenerate: boolean
}

const objectives = [
  "Engagement",
  "Vente",
  "Sensibilisation",
  "Éducation",
  "Divertissement",
  "Inspiration",
  "Promotion",
  "Communauté",
]

const tones = [
  "Professionnel",
  "Décontracté",
  "Humoristique",
  "Inspirant",
  "Informatif",
  "Persuasif",
  "Amical",
  "Autoritaire",
]

export function ContentConfiguration({
  topic,
  setTopic,
  selectedObjectives,
  setSelectedObjectives,
  customObjective,
  setCustomObjective,
  tone,
  setTone,
  autoOptimize,
  setAutoOptimize,
  onGenerate,
  isGenerating,
  canGenerate,
}: ContentConfigurationProps) {
  const toggleObjective = (objective: string) => {
    setSelectedObjectives(
      selectedObjectives.includes(objective)
        ? selectedObjectives.filter((o) => o !== objective)
        : [...selectedObjectives, objective],
    )
  }

  return (
    <FadeIn>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Configuration du Contenu
          </CardTitle>
          <CardDescription>Définissez le sujet et les paramètres de votre post</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Topic Input */}
          <div className="space-y-3">
            <Label htmlFor="topic" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Sujet du post *
            </Label>
            <Textarea
              id="topic"
              placeholder="Décrivez le sujet de votre post en détail..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="min-h-[120px] resize-none transition-all duration-300 focus:scale-[1.02]"
            />
            <p className="text-xs text-muted-foreground">Plus vous êtes précis, meilleur sera le contenu généré</p>
          </div>

          <Separator />

          {/* Objectives */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Objectifs du post
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {objectives.map((objective) => (
                <Badge
                  key={objective}
                  variant={selectedObjectives.includes(objective) ? "default" : "outline"}
                  className="cursor-pointer justify-center py-2 transition-all duration-200 hover:scale-105"
                  onClick={() => toggleObjective(objective)}
                >
                  {objective}
                </Badge>
              ))}
            </div>
            <Input
              placeholder="Objectif personnalisé..."
              value={customObjective}
              onChange={(e) => setCustomObjective(e.target.value)}
              className="transition-all duration-300 focus:scale-[1.02]"
            />
          </div>

          <Separator />

          {/* Tone Selection */}
          <div className="space-y-3">
            <Label htmlFor="tone">Ton de communication</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="transition-all duration-300 hover:scale-[1.02]">
                <SelectValue placeholder="Choisir un ton" />
              </SelectTrigger>
              <SelectContent>
                {tones.map((toneOption) => (
                  <SelectItem key={toneOption} value={toneOption}>
                    {toneOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Auto Optimization */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Optimisation IA
              </Label>
              <p className="text-xs text-muted-foreground">Adapte le contenu selon les plateformes sélectionnées</p>
            </div>
            <Switch checked={autoOptimize} onCheckedChange={setAutoOptimize} />
          </div>

          {/* Generate Button */}
          <AnimatedButton onClick={onGenerate} disabled={!canGenerate || isGenerating} className="w-full" size="lg">
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Génération en cours...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Générer le contenu
              </>
            )}
          </AnimatedButton>
        </CardContent>
      </Card>
    </FadeIn>
  )
}

"use client"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FadeIn } from "@/components/fade-in"
import { Settings, Target, MessageSquare } from "lucide-react"

interface BasicConfigProps {
  topic: string
  onTopicChange: (topic: string) => void
  selectedObjectives: string[]
  onObjectivesChange: (objectives: string[]) => void
  customObjective: string
  onCustomObjectiveChange: (objective: string) => void
  tone: string
  onToneChange: (tone: string) => void
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

export function BasicConfig({
  topic,
  onTopicChange,
  selectedObjectives,
  onObjectivesChange,
  customObjective,
  onCustomObjectiveChange,
  tone,
  onToneChange,
}: BasicConfigProps) {
  const toggleObjective = (objective: string) => {
    const newObjectives = selectedObjectives.includes(objective)
      ? selectedObjectives.filter((o) => o !== objective)
      : [...selectedObjectives, objective]
    onObjectivesChange(newObjectives)
  }

  return (
    <FadeIn>
      <div className="space-y-6">
        {/* Topic Input */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            <Label htmlFor="topic" className="text-base font-semibold">
              Sujet du post *
            </Label>
          </div>
          <Textarea
            id="topic"
            placeholder="Décrivez le sujet de votre post... (ex: Lancement de notre nouveau produit, conseils marketing, tendances 2024)"
            value={topic}
            onChange={(e) => onTopicChange(e.target.value)}
            className="min-h-[120px] transition-all duration-300 focus:ring-2 focus:ring-primary/20"
          />
          <p className="text-xs text-muted-foreground">
            Plus votre description est détaillée, plus le contenu généré sera précis et pertinent.
          </p>
        </div>

        {/* Objectives */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <Label className="text-base font-semibold">Objectifs</Label>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {objectives.map((objective) => (
              <Badge
                key={objective}
                variant={selectedObjectives.includes(objective) ? "default" : "outline"}
                className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md justify-center py-2"
                onClick={() => toggleObjective(objective)}
              >
                {objective}
              </Badge>
            ))}
          </div>
          <Input
            placeholder="Objectif personnalisé..."
            value={customObjective}
            onChange={(e) => onCustomObjectiveChange(e.target.value)}
            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Tone */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-primary" />
            <Label className="text-base font-semibold">Ton de communication</Label>
          </div>
          <Select value={tone} onValueChange={onToneChange}>
            <SelectTrigger className="transition-all duration-300 hover:ring-2 hover:ring-primary/20">
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
          <p className="text-xs text-muted-foreground">Le ton influence le style et l'approche du contenu généré.</p>
        </div>
      </div>
    </FadeIn>
  )
}

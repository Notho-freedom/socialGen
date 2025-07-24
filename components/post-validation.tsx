"use client"

import type React from "react"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FadeIn } from "@/components/fade-in"
import { CheckCircle, AlertTriangle, XCircle, BarChart3, Target, Hash, ImageIcon, Clock } from "lucide-react"

interface PostValidationProps {
  content: string
  platform: string
  selectedImage?: string
  platformLimits: { [key: string]: number }
}

interface ValidationRule {
  id: string
  name: string
  description: string
  check: (content: string, platform: string, image?: string) => boolean
  weight: number
  icon: React.ComponentType<{ className?: string }>
}

const validationRules: ValidationRule[] = [
  {
    id: "length",
    name: "Longueur appropriée",
    description: "Le contenu respecte les limites de caractères",
    check: (content, platform, platformLimits) => {
      const limits: { [key: string]: number } = {
        twitter: 280,
        facebook: 2000,
        instagram: 2200,
        linkedin: 3000,
        youtube: 5000,
        tiktok: 2200,
      }
      return content.length <= (limits[platform] || 280)
    },
    weight: 25,
    icon: Target,
  },
  {
    id: "hashtags",
    name: "Hashtags optimaux",
    description: "Utilise 1-5 hashtags pertinents",
    check: (content) => {
      const hashtags = content.match(/#\w+/g) || []
      return hashtags.length >= 1 && hashtags.length <= 5
    },
    weight: 20,
    icon: Hash,
  },
  {
    id: "engagement",
    name: "Potentiel d'engagement",
    description: "Contient des éléments engageants (questions, CTA)",
    check: (content) => {
      const engagementWords = ["?", "comment", "partagez", "pensez", "avis", "expérience", "conseil"]
      return engagementWords.some((word) => content.toLowerCase().includes(word))
    },
    weight: 20,
    icon: BarChart3,
  },
  {
    id: "visual",
    name: "Contenu visuel",
    description: "Inclut une image ou un média",
    check: (content, platform, image) => {
      return !!image || content.includes("http") || content.includes("www")
    },
    weight: 15,
    icon: ImageIcon,
  },
  {
    id: "readability",
    name: "Lisibilité",
    description: "Texte bien structuré avec des paragraphes courts",
    check: (content) => {
      const sentences = content.split(/[.!?]+/).filter((s) => s.trim().length > 0)
      const avgLength = sentences.reduce((acc, s) => acc + s.length, 0) / sentences.length
      return avgLength < 100 && sentences.length > 1
    },
    weight: 10,
    icon: CheckCircle,
  },
  {
    id: "timing",
    name: "Optimisation temporelle",
    description: "Contenu adapté au moment de publication",
    check: () => true, // Toujours vrai pour cet exemple
    weight: 10,
    icon: Clock,
  },
]

export function PostValidation({ content, platform, selectedImage, platformLimits }: PostValidationProps) {
  const validationResults = useMemo(() => {
    return validationRules.map((rule) => ({
      ...rule,
      passed: rule.check(content, platform, selectedImage),
    }))
  }, [content, platform, selectedImage])

  const totalScore = useMemo(() => {
    const passedWeight = validationResults
      .filter((result) => result.passed)
      .reduce((acc, result) => acc + result.weight, 0)
    return Math.round(passedWeight)
  }, [validationResults])

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return CheckCircle
    if (score >= 60) return AlertTriangle
    return XCircle
  }

  const ScoreIcon = getScoreIcon(totalScore)

  return (
    <FadeIn>
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Validation du Post</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <ScoreIcon className={`h-5 w-5 ${getScoreColor(totalScore)}`} />
              <Badge variant={totalScore >= 80 ? "default" : totalScore >= 60 ? "secondary" : "destructive"}>
                {totalScore}/100
              </Badge>
            </div>
          </div>
          <CardDescription>Analyse de la qualité et du potentiel d'engagement</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Overview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Score global</span>
              <span className={`text-sm font-bold ${getScoreColor(totalScore)}`}>{totalScore}%</span>
            </div>
            <Progress value={totalScore} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {totalScore >= 80
                ? "Excellent ! Votre post est optimisé pour l'engagement."
                : totalScore >= 60
                  ? "Bien ! Quelques améliorations peuvent augmenter l'engagement."
                  : "À améliorer. Suivez les suggestions ci-dessous."}
            </p>
          </div>

          {/* Validation Rules */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Critères d'évaluation</h4>
            <div className="space-y-2">
              {validationResults.map((result) => {
                const Icon = result.icon
                return (
                  <div
                    key={result.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 ${
                      result.passed ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50 hover:bg-red-100"
                    }`}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {result.passed ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">{result.name}</p>
                        <Badge variant="outline" className="text-xs">
                          {result.weight}pts
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{result.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Platform-specific info */}
          <div className="pt-4 border-t space-y-3">
            <h4 className="text-sm font-medium">Informations plateforme</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Plateforme</p>
                <p className="font-medium capitalize">{platform}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Limite caractères</p>
                <p className="font-medium">
                  {content.length}/{platformLimits[platform] || 280}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Hashtags</p>
                <p className="font-medium">{(content.match(/#\w+/g) || []).length}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Mentions</p>
                <p className="font-medium">{(content.match(/@\w+/g) || []).length}</p>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          {totalScore < 80 && (
            <div className="pt-4 border-t space-y-3">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                Suggestions d'amélioration
              </h4>
              <div className="space-y-2">
                {validationResults
                  .filter((result) => !result.passed)
                  .map((result) => (
                    <div key={result.id} className="text-xs text-muted-foreground p-2 bg-muted/50 rounded">
                      <strong>{result.name}:</strong> {result.description}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </FadeIn>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, XCircle, Info } from "lucide-react"

interface PostValidationProps {
  content: string
  platform: string
  selectedImage?: string
  platformLimits: { [key: string]: number }
}

interface ValidationRule {
  id: string
  name: string
  status: "success" | "warning" | "error" | "info"
  message: string
  required: boolean
}

export function PostValidation({ content, platform, selectedImage, platformLimits }: PostValidationProps) {
  const [validationRules, setValidationRules] = useState<ValidationRule[]>([])
  const [overallScore, setOverallScore] = useState(0)

  useEffect(() => {
    const rules: ValidationRule[] = []
    let score = 0
    const maxScore = 100

    // Content length validation
    const characterLimit = platformLimits[platform] || 280
    const contentLength = content.length

    if (contentLength === 0) {
      rules.push({
        id: "content-required",
        name: "Contenu requis",
        status: "error",
        message: "Le contenu du post est obligatoire",
        required: true,
      })
    } else if (contentLength > characterLimit) {
      rules.push({
        id: "content-length",
        name: "Limite de caractères",
        status: "error",
        message: `Le contenu dépasse la limite de ${characterLimit} caractères (${contentLength}/${characterLimit})`,
        required: true,
      })
    } else {
      rules.push({
        id: "content-length",
        name: "Limite de caractères",
        status: "success",
        message: `Contenu dans la limite (${contentLength}/${characterLimit})`,
        required: true,
      })
      score += 25
    }

    // Content quality checks
    if (content.length > 0) {
      // Check for hashtags
      const hashtagCount = (content.match(/#\w+/g) || []).length
      if (hashtagCount === 0) {
        rules.push({
          id: "hashtags",
          name: "Hashtags",
          status: "warning",
          message: "Ajoutez des hashtags pour améliorer la visibilité",
          required: false,
        })
      } else if (hashtagCount > 10) {
        rules.push({
          id: "hashtags",
          name: "Hashtags",
          status: "warning",
          message: "Trop de hashtags peuvent réduire l'engagement",
          required: false,
        })
        score += 10
      } else {
        rules.push({
          id: "hashtags",
          name: "Hashtags",
          status: "success",
          message: `${hashtagCount} hashtag(s) détecté(s)`,
          required: false,
        })
        score += 20
      }

      // Check for mentions
      const mentionCount = (content.match(/@\w+/g) || []).length
      if (mentionCount > 0) {
        rules.push({
          id: "mentions",
          name: "Mentions",
          status: "success",
          message: `${mentionCount} mention(s) détectée(s)`,
          required: false,
        })
        score += 10
      }

      // Check for emojis
      const emojiCount = (
        content.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/gu) || []
      ).length
      if (emojiCount > 0) {
        rules.push({
          id: "emojis",
          name: "Emojis",
          status: "success",
          message: `${emojiCount} emoji(s) ajouté(s) pour plus d'engagement`,
          required: false,
        })
        score += 10
      } else {
        rules.push({
          id: "emojis",
          name: "Emojis",
          status: "info",
          message: "Ajoutez des emojis pour rendre votre post plus engageant",
          required: false,
        })
      }

      // Check content length for engagement
      if (contentLength < 50) {
        rules.push({
          id: "content-engagement",
          name: "Longueur optimale",
          status: "warning",
          message: "Un contenu plus long pourrait améliorer l'engagement",
          required: false,
        })
      } else if (contentLength > 100) {
        rules.push({
          id: "content-engagement",
          name: "Longueur optimale",
          status: "success",
          message: "Longueur de contenu optimale pour l'engagement",
          required: false,
        })
        score += 15
      }
    }

    // Image validation
    if (selectedImage) {
      rules.push({
        id: "image",
        name: "Image",
        status: "success",
        message: "Image sélectionnée",
        required: false,
      })
      score += 20
    } else {
      rules.push({
        id: "image",
        name: "Image",
        status: "info",
        message: "Ajoutez une image pour augmenter l'engagement",
        required: false,
      })
    }

    // Platform-specific validations
    if (platform === "twitter" && content.includes("http")) {
      rules.push({
        id: "twitter-links",
        name: "Liens Twitter",
        status: "info",
        message: "Les liens sont automatiquement raccourcis sur Twitter",
        required: false,
      })
    }

    if (platform === "instagram" && !selectedImage) {
      rules.push({
        id: "instagram-image",
        name: "Image Instagram",
        status: "warning",
        message: "Instagram privilégie le contenu visuel",
        required: false,
      })
    }

    if (platform === "linkedin" && contentLength < 150) {
      rules.push({
        id: "linkedin-professional",
        name: "Contenu professionnel",
        status: "info",
        message: "LinkedIn favorise les posts plus détaillés et professionnels",
        required: false,
      })
    }

    setValidationRules(rules)
    setOverallScore(Math.min(score, maxScore))
  }, [content, platform, selectedImage, platformLimits])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "info":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const errorCount = validationRules.filter((rule) => rule.status === "error").length
  const warningCount = validationRules.filter((rule) => rule.status === "warning").length
  const successCount = validationRules.filter((rule) => rule.status === "success").length

  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Validation du Post</span>
          <Badge variant={errorCount > 0 ? "destructive" : warningCount > 0 ? "secondary" : "default"} className="ml-2">
            Score: {overallScore}/100
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Qualité du post</span>
            <span>{overallScore}%</span>
          </div>
          <Progress value={overallScore} className="h-2" />
        </div>

        {/* Summary */}
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>{successCount} validé(s)</span>
          </div>
          <div className="flex items-center gap-1">
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            <span>{warningCount} attention</span>
          </div>
          <div className="flex items-center gap-1">
            <XCircle className="h-4 w-4 text-red-500" />
            <span>{errorCount} erreur(s)</span>
          </div>
        </div>

        {/* Validation Rules */}
        <div className="space-y-2">
          {validationRules.map((rule) => (
            <Alert key={rule.id} className="py-2">
              <div className="flex items-center gap-3">
                {getStatusIcon(rule.status)}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{rule.name}</span>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(rule.status)}`}>
                      {rule.status === "success"
                        ? "OK"
                        : rule.status === "warning"
                          ? "Attention"
                          : rule.status === "error"
                            ? "Erreur"
                            : "Info"}
                    </Badge>
                  </div>
                  <AlertDescription className="text-xs mt-1">{rule.message}</AlertDescription>
                </div>
              </div>
            </Alert>
          ))}
        </div>

        {/* Overall Status */}
        {errorCount === 0 && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Votre post est prêt à être publié ! {warningCount > 0 && "Consultez les suggestions pour l'optimiser."}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

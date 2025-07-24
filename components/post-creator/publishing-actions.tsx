"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { AnimatedButton } from "@/components/animated-button"
import { FadeIn } from "@/components/fade-in"
import { Send, Calendar, Clock, Save, CheckCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface PublishingActionsProps {
  content: string
  selectedPlatforms: string[]
  selectedImage?: string
  onSave: () => void
  onPublish: () => void
  canPublish: boolean
}

export function PublishingActions({
  content,
  selectedPlatforms,
  selectedImage,
  onSave,
  onPublish,
  canPublish,
}: PublishingActionsProps) {
  const [schedulePost, setSchedulePost] = useState(false)
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")

  const handleScheduledPublish = async () => {
    if (!scheduledDate || !scheduledTime) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une date et une heure.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          platforms: selectedPlatforms,
          image_url: selectedImage,
          status: "scheduled",
          scheduled_at: `${scheduledDate}T${scheduledTime}`,
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la programmation")
      }

      toast({
        title: "Post programmé !",
        description: `Votre post sera publié le ${new Date(`${scheduledDate}T${scheduledTime}`).toLocaleString()}.`,
      })
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Impossible de programmer le post.",
        variant: "destructive",
      })
    }
  }

  const today = new Date().toISOString().split("T")[0]
  const now = new Date().toTimeString().slice(0, 5)

  return (
    <FadeIn>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-primary" />
            Publication
          </CardTitle>
          <CardDescription>Publiez immédiatement ou programmez votre post</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Post Summary */}
          <div className="p-4 bg-muted/50 rounded-lg space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Plateformes :</span>
              <span className="font-medium">{selectedPlatforms.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Caractères :</span>
              <span className="font-medium">{content.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Image :</span>
              <span className="font-medium">
                {selectedImage ? <CheckCircle className="h-4 w-4 text-green-500" /> : "Aucune"}
              </span>
            </div>
          </div>

          <Separator />

          {/* Scheduling Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Programmer la publication
                </Label>
                <p className="text-xs text-muted-foreground">Planifiez votre post pour plus tard</p>
              </div>
              <Switch checked={schedulePost} onCheckedChange={setSchedulePost} />
            </div>

            {schedulePost && (
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    min={today}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sm">
                    Heure
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Save Draft */}
            <AnimatedButton variant="outline" onClick={onSave} className="w-full group" disabled={!content.trim()}>
              <Save className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Sauvegarder en brouillon
            </AnimatedButton>

            {/* Publish or Schedule */}
            {schedulePost ? (
              <AnimatedButton
                onClick={handleScheduledPublish}
                disabled={!canPublish || !scheduledDate || !scheduledTime}
                className="w-full group"
              >
                <Clock className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Programmer la publication
              </AnimatedButton>
            ) : (
              <AnimatedButton onClick={onPublish} disabled={!canPublish} className="w-full group">
                <Send className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Publier maintenant
              </AnimatedButton>
            )}
          </div>

          {/* Validation Messages */}
          {!canPublish && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                {!content.trim() && "• Ajoutez du contenu"}
                {selectedPlatforms.length === 0 && "• Sélectionnez au moins une plateforme"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </FadeIn>
  )
}

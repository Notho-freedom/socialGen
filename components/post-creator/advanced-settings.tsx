"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { FadeIn } from "@/components/fade-in"
import { Clock, Zap } from "lucide-react"

interface AdvancedSettingsProps {
  autoOptimize: boolean
  onAutoOptimizeChange: (value: boolean) => void
  schedulePost: boolean
  onSchedulePostChange: (value: boolean) => void
  scheduledDate: string
  onScheduledDateChange: (date: string) => void
  scheduledTime: string
  onScheduledTimeChange: (time: string) => void
}

export function AdvancedSettings({
  autoOptimize,
  onAutoOptimizeChange,
  schedulePost,
  onSchedulePostChange,
  scheduledDate,
  onScheduledDateChange,
  scheduledTime,
  onScheduledTimeChange,
}: AdvancedSettingsProps) {
  return (
    <FadeIn>
      <div className="space-y-6">
        {/* Auto Optimization */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <CardTitle className="text-lg">Optimisation automatique</CardTitle>
            </div>
            <CardDescription>
              L'IA adapte automatiquement le contenu selon les meilleures pratiques de chaque plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Activer l'optimisation IA</Label>
                <p className="text-xs text-muted-foreground">Recommandé pour maximiser l'engagement</p>
              </div>
              <Switch checked={autoOptimize} onCheckedChange={onAutoOptimizeChange} />
            </div>
          </CardContent>
        </Card>

        {/* Scheduling */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <CardTitle className="text-lg">Programmation</CardTitle>
            </div>
            <CardDescription>Planifiez la publication de votre post pour un moment optimal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Programmer la publication</Label>
                <p className="text-xs text-muted-foreground">Choisissez le moment idéal pour votre audience</p>
              </div>
              <Switch checked={schedulePost} onCheckedChange={onSchedulePostChange} />
            </div>

            {schedulePost && (
              <FadeIn>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-sm font-medium">
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => onScheduledDateChange(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-sm font-medium">
                      Heure
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => onScheduledTimeChange(e.target.value)}
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </FadeIn>
            )}
          </CardContent>
        </Card>
      </div>
    </FadeIn>
  )
}

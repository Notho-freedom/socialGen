"use client"

import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Info, ExternalLink } from "lucide-react"

export function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Alert className="border-blue-200 bg-blue-50 text-blue-900 mb-6">
      <Info className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-blue-300 text-blue-700">
            Mode Démo
          </Badge>
          <span className="text-sm">
            Vous utilisez la version de démonstration. Les données ne sont pas sauvegardées.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Version complète
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-blue-700 hover:bg-blue-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}

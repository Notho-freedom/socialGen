"use client"

import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Sparkles, Zap } from "lucide-react"

export function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Alert className="border-amber-200 bg-amber-50 text-amber-800">
      <Sparkles className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
            <Zap className="mr-1 h-3 w-3" />
            DÉMO
          </Badge>
          <span>Vous utilisez la version de démonstration. Les fonctionnalités de publication sont simulées.</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="bg-white">
            Passer en version complète
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-amber-600 hover:text-amber-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}

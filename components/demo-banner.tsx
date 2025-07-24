"use client"

import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X, Info, ExternalLink } from "lucide-react"

export function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Alert className="rounded-none border-x-0 border-t-0 bg-blue-50 border-blue-200">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <span className="text-blue-800">
            🚀 <strong>Mode Démo</strong> - Vous utilisez la version de démonstration de SocialGen.
          </span>
          <Button variant="link" className="h-auto p-0 text-blue-600 hover:text-blue-800">
            Passer à la version complète
            <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="h-auto p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}

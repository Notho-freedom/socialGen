"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { isSupabaseConfigured } from "@/lib/supabase"

export function DemoBanner() {
  if (isSupabaseConfigured()) {
    return null
  }

  return (
    <Alert className="mb-6 border-orange-200 bg-orange-50">
      <Info className="h-4 w-4 text-orange-600" />
      <AlertDescription className="text-orange-800">
        <strong>Mode démo actif</strong> - Pour utiliser toutes les fonctionnalités, configurez Supabase avec vos
        variables d'environnement.
        <br />
        <code className="text-xs bg-orange-100 px-1 py-0.5 rounded mt-1 inline-block">
          NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY
        </code>
      </AlertDescription>
    </Alert>
  )
}

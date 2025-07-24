import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { isSupabaseConfigured } from "@/lib/supabase"

export function DemoBanner() {
  if (isSupabaseConfigured()) {
    return null
  }

  return (
    <Alert className="mb-6">
      <Info className="h-4 w-4" />
      <AlertDescription>
        <strong>Mode démo activé</strong> - Toutes les fonctionnalités sont disponibles avec des données de test.
        Configurez Supabase pour activer la persistance des données.
      </AlertDescription>
    </Alert>
  )
}

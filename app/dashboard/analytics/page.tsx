"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3 } from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 animate-fade-in-up">
      <Card className="w-full max-w-xl animate-fade-in-up">
        <CardHeader className="flex flex-row items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary animate-bounce" />
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">Analysez les performances de vos posts et suivez vos indicateurs clés.</p>
          <Button asChild className="w-full animate-fade-in-up">
            <Link href="/dashboard">Retour au dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 
"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Users, Eye, Heart, Calendar } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  icon: React.ElementType
  progress?: number
}

function StatCard({ title, value, description, trend, icon: Icon, progress }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {trend && (
          <div className="flex items-center pt-1">
            {trend.isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
            <Badge variant={trend.isPositive ? "default" : "destructive"} className="ml-1 text-xs">
              {trend.isPositive ? "+" : ""}
              {trend.value}%
            </Badge>
          </div>
        )}
        {progress !== undefined && (
          <div className="mt-3">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">{progress}% de l'objectif mensuel</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function StatsCards() {
  const stats = [
    {
      title: "Posts publiés",
      value: 24,
      description: "Ce mois-ci",
      trend: { value: 12, isPositive: true },
      icon: Calendar,
      progress: 80,
    },
    {
      title: "Impressions totales",
      value: "45.2K",
      description: "Derniers 30 jours",
      trend: { value: 8.5, isPositive: true },
      icon: Eye,
    },
    {
      title: "Engagement",
      value: "3.2K",
      description: "Likes, commentaires, partages",
      trend: { value: 15.3, isPositive: true },
      icon: Heart,
    },
    {
      title: "Nouveaux followers",
      value: 156,
      description: "Cette semaine",
      trend: { value: 2.1, isPositive: false },
      icon: Users,
    },
    {
      title: "Taux d'engagement",
      value: "7.2%",
      description: "Moyenne sur 30 jours",
      trend: { value: 0.8, isPositive: true },
      icon: TrendingUp,
    },
    {
      title: "Posts programmés",
      value: 8,
      description: "Prochains 7 jours",
      icon: Calendar,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}

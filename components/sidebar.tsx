"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  BarChart3,
  Calendar,
  ChevronDown,
  FileText,
  History,
  Home,
  ImageIcon,
  PlusCircle,
  Settings,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false)

  const mainNavigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
      current: pathname === "/dashboard",
    },
    {
      name: "Générateur",
      href: "/generator",
      icon: Sparkles,
      current: pathname === "/generator",
      badge: "IA",
    },
    {
      name: "Historique",
      href: "/history",
      icon: History,
      current: pathname === "/history",
    },
    {
      name: "Planificateur",
      href: "/scheduler",
      icon: Calendar,
      current: pathname === "/scheduler",
      badge: "3",
    },
  ]

  const analyticsNavigation = [
    {
      name: "Vue d'ensemble",
      href: "/analytics",
      icon: BarChart3,
      current: pathname === "/analytics",
    },
    {
      name: "Engagement",
      href: "/analytics/engagement",
      icon: TrendingUp,
      current: pathname === "/analytics/engagement",
    },
    {
      name: "Audience",
      href: "/analytics/audience",
      icon: Users,
      current: pathname === "/analytics/audience",
    },
  ]

  const contentNavigation = [
    {
      name: "Brouillons",
      href: "/drafts",
      icon: FileText,
      current: pathname === "/drafts",
      count: 5,
    },
    {
      name: "Images",
      href: "/images",
      icon: ImageIcon,
      current: pathname === "/images",
    },
  ]

  return (
    <div className={cn("flex h-full w-64 flex-col bg-background", className)}>
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold">SocialGen AI</span>
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <div className="space-y-1 px-3">
          {/* Quick Action */}
          <Button className="w-full justify-start" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouveau post
          </Button>
        </div>

        <Separator className="my-4" />

        {/* Main Navigation */}
        <div className="space-y-1 px-3">
          <div className="px-3 py-2">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-tight text-muted-foreground">Principal</h2>
          </div>
          {mainNavigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button variant={item.current ? "secondary" : "ghost"} className="w-full justify-start" size="sm">
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            </Link>
          ))}
        </div>

        <Separator className="my-4" />

        {/* Analytics Section */}
        <div className="space-y-1 px-3">
          <Collapsible open={isAnalyticsOpen} onOpenChange={setIsAnalyticsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
                <ChevronDown className="ml-auto h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1">
              {analyticsNavigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={item.current ? "secondary" : "ghost"}
                    className="w-full justify-start pl-8"
                    size="sm"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>

        <Separator className="my-4" />

        {/* Content Management */}
        <div className="space-y-1 px-3">
          <div className="px-3 py-2">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-tight text-muted-foreground">Contenu</h2>
          </div>
          {contentNavigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button variant={item.current ? "secondary" : "ghost"} className="w-full justify-start" size="sm">
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
                {item.count && (
                  <Badge variant="outline" className="ml-auto">
                    {item.count}
                  </Badge>
                )}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t p-4">
        <Link href="/settings">
          <Button variant={pathname === "/settings" ? "secondary" : "ghost"} className="w-full justify-start" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Paramètres
          </Button>
        </Link>
      </div>
    </div>
  )
}

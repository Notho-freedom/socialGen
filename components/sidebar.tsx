"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Home,
  PlusCircle,
  History,
  Settings,
  BarChart3,
  Calendar,
  Users,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const navigation = [
    {
      name: "Vue d'ensemble",
      href: "/dashboard",
      icon: Home,
      current: pathname === "/dashboard",
    },
    {
      name: "Nouveau post",
      href: "/dashboard/create",
      icon: PlusCircle,
      current: pathname === "/dashboard/create",
    },
    {
      name: "Historique",
      href: "/dashboard/history",
      icon: History,
      current: pathname === "/dashboard/history",
    },
    {
      name: "Planification",
      href: "/dashboard/schedule",
      icon: Calendar,
      current: pathname === "/dashboard/schedule",
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
      current: pathname === "/dashboard/analytics",
    },
  ]

  const tools = [
    {
      name: "Templates",
      href: "/dashboard/templates",
      icon: Zap,
      current: pathname === "/dashboard/templates",
    },
    {
      name: "Équipe",
      href: "/dashboard/team",
      icon: Users,
      current: pathname === "/dashboard/team",
    },
    {
      name: "Paramètres",
      href: "/dashboard/settings",
      icon: Settings,
      current: pathname === "/dashboard/settings",
    },
  ]

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Toggle Button */}
      <div className="flex h-16 items-center justify-end px-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          {/* Main Navigation */}
          <div className="space-y-1">
            {!collapsed && (
              <h2 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Principal</h2>
            )}
            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={item.current ? "secondary" : "ghost"}
                      className={cn("w-full justify-start", collapsed && "px-2", item.current && "bg-secondary")}
                    >
                      <Icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
                      {!collapsed && <span>{item.name}</span>}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Tools */}
          <div className="space-y-1">
            {!collapsed && (
              <h2 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Outils</h2>
            )}
            <nav className="space-y-1">
              {tools.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={item.current ? "secondary" : "ghost"}
                      className={cn("w-full justify-start", collapsed && "px-2", item.current && "bg-secondary")}
                    >
                      <Icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
                      {!collapsed && <span>{item.name}</span>}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

"use client"

import * as React from "react"
import { Palette, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const themes = [
  {
    name: "Light",
    value: "light",
    color: "bg-white",
    description: "Classique et épuré",
  },
  {
    name: "Blue Pro",
    value: "blue-pro",
    color: "bg-gradient-to-r from-blue-500 to-blue-600",
    description: "Professionnel et moderne",
  },
  {
    name: "Purple Modern",
    value: "purple-modern",
    color: "bg-gradient-to-r from-purple-500 to-purple-600",
    description: "Créatif et élégant",
  },
  {
    name: "Green Fresh",
    value: "green-fresh",
    color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    description: "Frais et naturel",
  },
  {
    name: "Orange Creative",
    value: "orange-creative",
    color: "bg-gradient-to-r from-orange-500 to-orange-600",
    description: "Énergique et créatif",
  },
  {
    name: "Rose Elegant",
    value: "rose-elegant",
    color: "bg-gradient-to-r from-rose-500 to-rose-600",
    description: "Élégant et sophistiqué",
  },
]

export function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = React.useState("light")

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light"
    setCurrentTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (theme: string) => {
    document.documentElement.className = theme
    localStorage.setItem("theme", theme)
  }

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme)
    applyTheme(theme)
  }

  const currentThemeData = themes.find((theme) => theme.value === currentTheme)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <div className={`w-4 h-4 rounded-full ${currentThemeData?.color || "bg-gray-200"}`} />
          <Palette className="absolute inset-0 w-4 h-4 opacity-0 hover:opacity-100 transition-opacity" />
          <span className="sr-only">Changer le thème</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="p-2">
          <p className="text-sm font-medium mb-2">Choisir un thème</p>
          <div className="grid gap-1">
            {themes.map((theme) => (
              <DropdownMenuItem
                key={theme.value}
                onClick={() => handleThemeChange(theme.value)}
                className="flex items-center gap-3 p-2 cursor-pointer"
              >
                <div className={`w-4 h-4 rounded-full ${theme.color} border border-border`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{theme.name}</span>
                    {currentTheme === theme.value && <Check className="w-3 h-3 text-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{theme.description}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

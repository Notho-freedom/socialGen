"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Palette, Check } from "lucide-react"

const themes = [
  {
    id: "light",
    name: "Light",
    description: "Classique et épuré",
    color: "bg-white border-2 border-gray-200",
  },
  {
    id: "blue-pro",
    name: "Blue Pro",
    description: "Professionnel et moderne",
    color: "bg-blue-600",
  },
  {
    id: "purple-modern",
    name: "Purple Modern",
    description: "Créatif et élégant",
    color: "bg-purple-600",
  },
  {
    id: "green-fresh",
    name: "Green Fresh",
    description: "Frais et naturel",
    color: "bg-emerald-600",
  },
  {
    id: "orange-creative",
    name: "Orange Creative",
    description: "Énergique et créatif",
    color: "bg-orange-600",
  },
  {
    id: "rose-elegant",
    name: "Rose Elegant",
    description: "Élégant et sophistiqué",
    color: "bg-rose-600",
  },
]

export function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light"
    setCurrentTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (themeId: string) => {
    const root = document.documentElement
    root.className = root.className.replace(/theme-\w+/g, "")
    root.classList.add(`theme-${themeId}`)
  }

  const changeTheme = (themeId: string) => {
    setCurrentTheme(themeId)
    localStorage.setItem("theme", themeId)
    applyTheme(themeId)
  }

  const currentThemeData = themes.find((theme) => theme.id === currentTheme)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Palette className="h-4 w-4" />
          <span className="sr-only">Changer le thème</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="p-2">
          <p className="text-sm font-medium mb-2">Choisir un thème</p>
          <div className="space-y-1">
            {themes.map((theme) => (
              <DropdownMenuItem
                key={theme.id}
                onClick={() => changeTheme(theme.id)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className={`w-4 h-4 rounded-full ${theme.color}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{theme.name}</span>
                    {currentTheme === theme.id && <Check className="h-4 w-4" />}
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

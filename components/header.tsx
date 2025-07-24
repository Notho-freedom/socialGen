"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedButton } from "@/components/animated-button"
import { Menu, X, Sparkles } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: "Fonctionnalités", href: "#features" },
    { name: "Tarifs", href: "#pricing" },
    { name: "À propos", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold transition-colors group-hover:text-primary">SocialGen</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-primary hover:scale-105"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="transition-all duration-200 hover:scale-105" asChild>
            <Link href="/login">Connexion</Link>
          </Button>
          <AnimatedButton size="sm" asChild>
            <Link href="/dashboard">Tableau de bord</Link>
          </AnimatedButton>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="transition-all duration-200 hover:scale-110"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 transition-transform duration-200 rotate-90" />
            ) : (
              <Menu className="h-5 w-5 transition-transform duration-200" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-64 opacity-100 border-b" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          {navigation.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className="block text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-primary hover:translate-x-2"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex flex-col space-y-2 pt-4 border-t">
            <Button variant="ghost" size="sm" className="justify-start" asChild>
              <Link href="/login">Connexion</Link>
            </Button>
            <AnimatedButton size="sm" className="justify-start" asChild>
              <Link href="/dashboard">Tableau de bord</Link>
            </AnimatedButton>
          </div>
        </div>
      </div>
    </header>
  )
}

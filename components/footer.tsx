"use client"

import Link from "next/link"
import { Sparkles, Twitter, Facebook, Instagram, Linkedin, Github } from "lucide-react"
import { FadeIn } from "@/components/fade-in"

export function Footer() {
  const footerLinks = {
    product: [
      { name: "Fonctionnalités", href: "#features" },
      { name: "Tarifs", href: "#pricing" },
      { name: "API", href: "/api-docs" },
      { name: "Intégrations", href: "/integrations" },
    ],
    company: [
      { name: "À propos", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Carrières", href: "/careers" },
      { name: "Presse", href: "/press" },
    ],
    support: [
      { name: "Centre d'aide", href: "/help" },
      { name: "Documentation", href: "/docs" },
      { name: "Contact", href: "/contact" },
      { name: "Statut", href: "/status" },
    ],
    legal: [
      { name: "Confidentialité", href: "/privacy" },
      { name: "Conditions", href: "/terms" },
      { name: "Cookies", href: "/cookies" },
      { name: "RGPD", href: "/gdpr" },
    ],
  }

  const socialLinks = [
    { name: "Twitter", href: "https://twitter.com/socialgen", icon: Twitter },
    { name: "Facebook", href: "https://facebook.com/socialgen", icon: Facebook },
    { name: "Instagram", href: "https://instagram.com/socialgen", icon: Instagram },
    { name: "LinkedIn", href: "https://linkedin.com/company/socialgen", icon: Linkedin },
    { name: "GitHub", href: "https://github.com/socialgen", icon: Github },
  ]

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-16">
        <FadeIn>
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center space-x-2 group mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold transition-colors group-hover:text-primary">SocialGen</span>
              </Link>
              <p className="text-sm text-muted-foreground mb-4">
                Créez du contenu viral pour vos réseaux sociaux avec l'intelligence artificielle.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="text-muted-foreground transition-all duration-200 hover:text-primary hover:scale-110"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{social.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Links */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:col-span-4">
              <div>
                <h3 className="text-sm font-semibold mb-4">Produit</h3>
                <ul className="space-y-3">
                  {footerLinks.product.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-all duration-200 hover:text-primary hover:translate-x-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-4">Entreprise</h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-all duration-200 hover:text-primary hover:translate-x-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-4">Support</h3>
                <ul className="space-y-3">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-all duration-200 hover:text-primary hover:translate-x-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-4">Légal</h3>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-all duration-200 hover:text-primary hover:translate-x-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2024 SocialGen. Tous droits réservés.</p>
            <p className="text-sm text-muted-foreground mt-2 sm:mt-0">Fait avec ❤️ en France</p>
          </div>
        </FadeIn>
      </div>
    </footer>
  )
}

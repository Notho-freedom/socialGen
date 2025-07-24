import Link from "next/link"
import { Sparkles, Twitter, Linkedin, Github, Mail } from "lucide-react"

export function Footer() {
  const footerLinks = {
    product: [
      { name: "Fonctionnalités", href: "#features" },
      { name: "Tarifs", href: "#pricing" },
      { name: "API", href: "#api" },
      { name: "Intégrations", href: "#integrations" },
    ],
    company: [
      { name: "À propos", href: "#about" },
      { name: "Blog", href: "#blog" },
      { name: "Carrières", href: "#careers" },
      { name: "Contact", href: "#contact" },
    ],
    legal: [
      { name: "Confidentialité", href: "#privacy" },
      { name: "Conditions", href: "#terms" },
      { name: "Cookies", href: "#cookies" },
      { name: "RGPD", href: "#gdpr" },
    ],
  }

  const socialLinks = [
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "GitHub", href: "#", icon: Github },
    { name: "Email", href: "mailto:contact@socialgen.com", icon: Mail },
  ]

  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">SocialGen</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Générez automatiquement du contenu optimisé pour tous vos réseaux sociaux avec l'intelligence
              artificielle.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Produit</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Entreprise</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Légal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} SocialGen. Tous droits réservés.</p>
          <p className="text-sm text-muted-foreground mt-2 sm:mt-0">Fait avec ❤️ en France</p>
        </div>
      </div>
    </footer>
  )
}

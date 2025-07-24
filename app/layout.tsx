import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const metadata: Metadata = {
  title: "SocialGen - Générateur de Posts IA",
  description:
    "Créez automatiquement des posts optimisés pour tous vos réseaux sociaux avec l'intelligence artificielle",
  keywords: ["réseaux sociaux", "IA", "génération de contenu", "marketing", "automation"],
  authors: [{ name: "SocialGen Team" }],
  creator: "SocialGen",
  publisher: "SocialGen",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://socialgen.vercel.app"),
  openGraph: {
    title: "SocialGen - Générateur de Posts IA",
    description:
      "Créez automatiquement des posts optimisés pour tous vos réseaux sociaux avec l'intelligence artificielle",
    url: "https://socialgen.vercel.app",
    siteName: "SocialGen",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SocialGen - Générateur de Posts IA",
    description:
      "Créez automatiquement des posts optimisés pour tous vos réseaux sociaux avec l'intelligence artificielle",
    creator: "@socialgen",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DemoBanner } from "@/components/demo-banner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Sparkles, Zap, Target, BarChart3, Calendar, Users, CheckCircle, ArrowRight, Star } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Sparkles,
      title: "Génération IA",
      description: "Créez du contenu engageant en quelques secondes grâce à l'intelligence artificielle avancée.",
    },
    {
      icon: Target,
      title: "Multi-plateformes",
      description: "Optimisez vos posts pour LinkedIn, Twitter, Instagram, Facebook et TikTok automatiquement.",
    },
    {
      icon: Calendar,
      title: "Planification",
      description: "Programmez vos publications à l'avance et maintenez une présence constante.",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Suivez les performances de vos contenus avec des métriques détaillées.",
    },
    {
      icon: Zap,
      title: "Génération d'images",
      description: "Créez des visuels impactants adaptés à votre contenu et votre marque.",
    },
    {
      icon: Users,
      title: "Gestion d'équipe",
      description: "Collaborez efficacement avec votre équipe sur la création de contenu.",
    },
  ]

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Marketing Manager",
      company: "TechStart",
      content:
        "SocialGen AI a révolutionné notre stratégie de contenu. Nous créons 3x plus de posts en 2x moins de temps !",
      rating: 5,
    },
    {
      name: "Pierre Martin",
      role: "Freelance",
      company: "Consultant Digital",
      content: "Parfait pour les freelances ! Je peux maintenant gérer plusieurs clients sans sacrifier la qualité.",
      rating: 5,
    },
    {
      name: "Sophie Laurent",
      role: "CEO",
      company: "InnovateCorp",
      content: "L'IA génère du contenu de qualité qui correspond parfaitement à notre ton et notre audience.",
      rating: 5,
    },
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "9€",
      period: "/mois",
      description: "Parfait pour débuter",
      features: ["50 posts générés/mois", "3 plateformes", "Planification basique", "Support email"],
      popular: false,
    },
    {
      name: "Pro",
      price: "29€",
      period: "/mois",
      description: "Pour les professionnels",
      features: [
        "200 posts générés/mois",
        "Toutes les plateformes",
        "Planification avancée",
        "Analytics détaillées",
        "Génération d'images",
        "Support prioritaire",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "99€",
      period: "/mois",
      description: "Pour les équipes",
      features: [
        "Posts illimités",
        "Gestion d'équipe",
        "API access",
        "White-label",
        "Support dédié",
        "Formation personnalisée",
      ],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Demo Banner */}
        <div className="container py-4">
          <DemoBanner />
        </div>

        {/* Hero Section */}
        <section className="container py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-4">
              <Sparkles className="mr-1 h-3 w-3" />
              Propulsé par l'IA
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Créez du contenu
              <span className="text-primary"> viral</span> en
              <span className="text-primary"> quelques clics</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Générez automatiquement du contenu engageant pour tous vos réseaux sociaux. Notre IA s'adapte à votre ton,
              votre audience et vos objectifs marketing.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8">
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                Voir la démo
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Tout ce dont vous avez besoin</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Une suite complète d'outils pour dominer les réseaux sociaux
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-muted/50 py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ils nous font confiance</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Découvrez ce que nos utilisateurs disent de SocialGen AI
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="text-sm">"{testimonial.content}"</blockquote>
                    <div className="mt-4">
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} • {testimonial.company}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="container py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Tarifs simples et transparents</h2>
            <p className="mt-4 text-lg text-muted-foreground">Choisissez le plan qui correspond à vos besoins</p>
          </div>
          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                {plan.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Le plus populaire</Badge>}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-6 w-full" variant={plan.popular ? "default" : "outline"}>
                    Commencer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Prêt à révolutionner votre contenu ?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Rejoignez des milliers de créateurs qui utilisent déjà SocialGen AI
              </p>
              <div className="mt-8">
                <Link href="/dashboard">
                  <Button size="lg" variant="secondary" className="text-lg px-8">
                    Commencer maintenant
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

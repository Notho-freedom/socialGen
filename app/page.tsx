import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, Target, BarChart3, Clock, Users, CheckCircle, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      icon: Sparkles,
      title: "IA Générative",
      description: "Créez du contenu unique et engageant grâce à l'intelligence artificielle avancée",
    },
    {
      icon: Target,
      title: "Multi-plateformes",
      description: "Optimisez vos posts pour LinkedIn, Twitter, Instagram, Facebook et TikTok",
    },
    {
      icon: Clock,
      title: "Planification",
      description: "Programmez vos publications à l'avance pour une présence constante",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Suivez les performances de vos contenus avec des métriques détaillées",
    },
    {
      icon: Zap,
      title: "Génération rapide",
      description: "Créez des posts professionnels en quelques secondes seulement",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Travaillez en équipe et gérez les approbations facilement",
    },
  ]

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Marketing Manager",
      company: "TechStart",
      content:
        "SocialGen a révolutionné notre stratégie de contenu. Nous créons maintenant 3x plus de posts avec une qualité constante.",
      rating: 5,
    },
    {
      name: "Pierre Martin",
      role: "Freelance",
      company: "Consultant Digital",
      content:
        "Un outil indispensable pour gérer mes clients. L'IA génère du contenu parfaitement adapté à chaque secteur.",
      rating: 5,
    },
    {
      name: "Sophie Laurent",
      role: "Community Manager",
      company: "Fashion Brand",
      content: "Interface intuitive et résultats impressionnants. Mes posts génèrent 40% d'engagement en plus !",
      rating: 5,
    },
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "9€",
      period: "/mois",
      description: "Parfait pour débuter",
      features: ["50 posts par mois", "3 plateformes", "Templates de base", "Support email"],
      popular: false,
    },
    {
      name: "Pro",
      price: "29€",
      period: "/mois",
      description: "Pour les professionnels",
      features: [
        "200 posts par mois",
        "Toutes les plateformes",
        "Templates premium",
        "Analytics avancées",
        "Planification",
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
        "Collaboration équipe",
        "API personnalisée",
        "Formation dédiée",
        "Support 24/7",
        "Manager dédié",
      ],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2">
              <Sparkles className="mr-2 h-4 w-4" />
              Nouveau : IA GPT-4 intégrée
            </Badge>

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Créez du contenu
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"> viral </span>
              en quelques clics
            </h1>

            <p className="mb-8 text-xl text-muted-foreground sm:text-2xl">
              Générez automatiquement des posts optimisés pour tous vos réseaux sociaux grâce à l'intelligence
              artificielle. Gagnez du temps, boostez votre engagement.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="px-8 py-6 text-lg" asChild>
                <Link href="/dashboard">
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg bg-transparent">
                Voir la démo
              </Button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Essai gratuit 14 jours
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Aucune carte requise
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Annulation à tout moment
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
              Tout ce dont vous avez besoin pour réussir
            </h2>
            <p className="text-xl text-muted-foreground">
              Des outils puissants pour créer, planifier et analyser vos contenus sur tous les réseaux sociaux
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">Ils nous font confiance</h2>
            <p className="text-xl text-muted-foreground">
              Découvrez comment SocialGen transforme la création de contenu pour des milliers d'utilisateurs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 bg-background shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base leading-relaxed">"{testimonial.content}"</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
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
      <section id="pricing" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">Tarifs simples et transparents</h2>
            <p className="text-xl text-muted-foreground">
              Choisissez le plan qui correspond à vos besoins. Changez ou annulez à tout moment.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : "border-border"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="px-4 py-1">Plus populaire</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={plan.popular ? "default" : "outline"} size="lg">
                    Commencer maintenant
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl">
              Prêt à révolutionner votre contenu ?
            </h2>
            <p className="mb-8 text-xl text-primary-foreground/80">
              Rejoignez des milliers de créateurs qui utilisent déjà SocialGen pour booster leur présence en ligne
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" className="px-8 py-6 text-lg" asChild>
                <Link href="/dashboard">
                  Essayer gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                Planifier une démo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

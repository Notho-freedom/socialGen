import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedButton } from "@/components/animated-button"
import { FadeIn } from "@/components/fade-in"
import { StaggerContainer } from "@/components/stagger-container"
import { AnimatedCounter } from "@/components/animated-counter"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Sparkles, Target, BarChart3, Users, Clock, CheckCircle, Star, ArrowRight, Play, Shield } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      icon: Sparkles,
      title: "IA Avancée",
      description: "Génération de contenu intelligent adaptée à chaque plateforme sociale",
    },
    {
      icon: Target,
      title: "Multi-Plateformes",
      description: "Créez du contenu optimisé pour LinkedIn, Twitter, Instagram, Facebook et plus",
    },
    {
      icon: Clock,
      title: "Planification",
      description: "Programmez vos publications à l'avance pour une présence constante",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Suivez les performances et optimisez votre stratégie de contenu",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Travaillez en équipe avec des outils de collaboration intégrés",
    },
    {
      icon: Shield,
      title: "Sécurisé",
      description: "Vos données sont protégées avec un chiffrement de niveau entreprise",
    },
  ]

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Marketing Manager",
      company: "TechCorp",
      content:
        "SocialGen a révolutionné notre stratégie de contenu. Nous créons maintenant 3x plus de posts en 2x moins de temps !",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Pierre Martin",
      role: "Entrepreneur",
      company: "StartupXYZ",
      content:
        "L'IA de SocialGen comprend parfaitement notre ton et notre audience. C'est comme avoir un expert marketing dans l'équipe.",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Sophie Laurent",
      role: "Community Manager",
      company: "AgenceDigital",
      content: "Mes clients sont ravis des résultats. L'engagement a augmenté de 150% depuis qu'on utilise SocialGen.",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "29",
      period: "mois",
      description: "Parfait pour les entrepreneurs et petites entreprises",
      features: [
        "50 posts générés/mois",
        "3 plateformes sociales",
        "Planification basique",
        "Analytics essentiels",
        "Support email",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "79",
      period: "mois",
      description: "Idéal pour les équipes marketing et agences",
      features: [
        "200 posts générés/mois",
        "Toutes les plateformes",
        "Planification avancée",
        "Analytics détaillés",
        "Collaboration équipe",
        "Support prioritaire",
        "Templates personnalisés",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "199",
      period: "mois",
      description: "Pour les grandes entreprises avec besoins spécifiques",
      features: [
        "Posts illimités",
        "Toutes les plateformes",
        "IA personnalisée",
        "Analytics avancés",
        "Gestion multi-comptes",
        "Support dédié",
        "Intégrations API",
        "Formation équipe",
      ],
      popular: false,
    },
  ]

  const stats = [
    { value: 10000, label: "Utilisateurs actifs", suffix: "+" },
    { value: 500000, label: "Posts générés", suffix: "+" },
    { value: 98, label: "Satisfaction client", suffix: "%" },
    { value: 24, label: "Support disponible", suffix: "/7" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <FadeIn delay={200}>
              <Badge variant="secondary" className="mb-6 animate-pulse">
                <Sparkles className="mr-2 h-4 w-4" />
                Nouveau : IA GPT-4 intégrée
              </Badge>
            </FadeIn>

            <FadeIn delay={400}>
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Créez du contenu
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-pulse">
                  {" "}
                  viral{" "}
                </span>
                en quelques clics
              </h1>
            </FadeIn>

            <FadeIn delay={600}>
              <p className="mb-8 text-xl text-muted-foreground sm:text-2xl">
                Générez automatiquement des posts optimisés pour tous vos réseaux sociaux avec l'intelligence
                artificielle. Gagnez du temps, augmentez votre engagement.
              </p>
            </FadeIn>

            <FadeIn delay={800}>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <AnimatedButton size="lg" className="text-lg group" asChild>
                  <Link href="/dashboard">
                    Commencer gratuitement
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </AnimatedButton>
                <AnimatedButton variant="outline" size="lg" className="text-lg bg-transparent group">
                  <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  Voir la démo
                </AnimatedButton>
              </div>
            </FadeIn>

            <FadeIn delay={1000}>
              <p className="mt-4 text-sm text-muted-foreground">
                Essai gratuit 14 jours • Aucune carte bancaire requise
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <StaggerContainer className="grid grid-cols-2 gap-8 md:grid-cols-4" staggerDelay={150}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl font-bold text-primary lg:text-4xl transition-transform group-hover:scale-110">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-muted-foreground lg:text-base">{stat.label}</div>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
                Tout ce dont vous avez besoin pour réussir
              </h2>
              <p className="text-xl text-muted-foreground">
                Des outils puissants et intuitifs pour transformer votre présence sur les réseaux sociaux
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" staggerDelay={100}>
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:-translate-y-1 group"
              >
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <feature.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <CardTitle className="text-xl transition-colors group-hover:text-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">Ils nous font confiance</h2>
              <p className="text-xl text-muted-foreground">
                Découvrez comment SocialGen transforme la stratégie de contenu de nos clients
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" staggerDelay={150}>
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 group"
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div>
                      <div className="font-semibold transition-colors group-hover:text-primary">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} • {testimonial.company}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400 transition-transform duration-300 hover:scale-125"
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">Tarifs simples et transparents</h2>
              <p className="text-xl text-muted-foreground">
                Choisissez le plan qui correspond à vos besoins. Changez ou annulez à tout moment.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-8 lg:grid-cols-3" staggerDelay={200}>
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group ${
                  plan.popular
                    ? "border-primary shadow-lg scale-105 animate-pulse"
                    : "border-border hover:border-primary/20"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 animate-bounce">Plus populaire</Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl transition-colors group-hover:text-primary">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold transition-transform group-hover:scale-110">{plan.price}€</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 group/item">
                        <CheckCircle className="h-5 w-5 text-green-500 transition-transform group-hover/item:scale-110" />
                        <span className="text-sm transition-colors group-hover/item:text-primary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <AnimatedButton className="w-full" variant={plan.popular ? "default" : "outline"} size="lg">
                    Commencer maintenant
                  </AnimatedButton>
                </CardContent>
              </Card>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
              Prêt à transformer votre présence sociale ?
            </h2>
            <p className="mb-8 text-xl opacity-90">
              Rejoignez des milliers d'entreprises qui font confiance à SocialGen
            </p>
            <div className="mx-auto max-w-md">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Votre email professionnel"
                  className="bg-white text-foreground transition-all duration-300 focus:scale-105"
                />
                <AnimatedButton variant="secondary" size="lg">
                  Commencer
                </AnimatedButton>
              </div>
              <p className="mt-2 text-sm opacity-75">Essai gratuit 14 jours • Aucun engagement</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  )
}

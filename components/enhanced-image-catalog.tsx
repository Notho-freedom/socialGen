"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/loading-spinner"
import { FadeIn } from "@/components/fade-in"
import { AnimatedButton } from "@/components/animated-button"
import {
  Upload,
  Sparkles,
  ImageIcon,
  Check,
  Palette,
  Camera,
  Lightbulb,
  TrendingUp,
  Briefcase,
  Heart,
  Zap,
  Globe,
  Search,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface EnhancedImageCatalogProps {
  onImageSelect: (imageUrl: string) => void
  selectedImage?: string
  postContent?: string
  platform?: string
}

const imageCategories = [
  {
    id: "business",
    name: "Business",
    icon: Briefcase,
    color: "bg-blue-100 text-blue-700",
    images: [
      "/placeholder.svg?height=300&width=400&text=Business+Meeting",
      "/placeholder.svg?height=300&width=400&text=Office+Space",
      "/placeholder.svg?height=300&width=400&text=Team+Work",
      "/placeholder.svg?height=300&width=400&text=Presentation",
    ],
  },
  {
    id: "technology",
    name: "Technologie",
    icon: Zap,
    color: "bg-purple-100 text-purple-700",
    images: [
      "/placeholder.svg?height=300&width=400&text=AI+Technology",
      "/placeholder.svg?height=300&width=400&text=Digital+Innovation",
      "/placeholder.svg?height=300&width=400&text=Code+Development",
      "/placeholder.svg?height=300&width=400&text=Future+Tech",
    ],
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    icon: Heart,
    color: "bg-pink-100 text-pink-700",
    images: [
      "/placeholder.svg?height=300&width=400&text=Healthy+Living",
      "/placeholder.svg?height=300&width=400&text=Work+Life+Balance",
      "/placeholder.svg?height=300&width=400&text=Travel+Adventure",
      "/placeholder.svg?height=300&width=400&text=Food+Culture",
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: TrendingUp,
    color: "bg-green-100 text-green-700",
    images: [
      "/placeholder.svg?height=300&width=400&text=Social+Media+Growth",
      "/placeholder.svg?height=300&width=400&text=Brand+Strategy",
      "/placeholder.svg?height=300&width=400&text=Digital+Campaign",
      "/placeholder.svg?height=300&width=400&text=Analytics+Data",
    ],
  },
  {
    id: "creative",
    name: "Créatif",
    icon: Palette,
    color: "bg-orange-100 text-orange-700",
    images: [
      "/placeholder.svg?height=300&width=400&text=Creative+Design",
      "/placeholder.svg?height=300&width=400&text=Art+Inspiration",
      "/placeholder.svg?height=300&width=400&text=Color+Palette",
      "/placeholder.svg?height=300&width=400&text=Abstract+Art",
    ],
  },
  {
    id: "nature",
    name: "Nature",
    icon: Globe,
    color: "bg-emerald-100 text-emerald-700",
    images: [
      "/placeholder.svg?height=300&width=400&text=Beautiful+Landscape",
      "/placeholder.svg?height=300&width=400&text=Ocean+View",
      "/placeholder.svg?height=300&width=400&text=Mountain+Peak",
      "/placeholder.svg?height=300&width=400&text=Forest+Path",
    ],
  },
]

const imageStyles = [
  { id: "professional", name: "Professionnel", icon: Lightbulb, color: "bg-blue-100 text-blue-700" },
  { id: "creative", name: "Créatif", icon: Palette, color: "bg-purple-100 text-purple-700" },
  { id: "tech", name: "Technologie", icon: TrendingUp, color: "bg-green-100 text-green-700" },
  { id: "marketing", name: "Marketing", icon: Camera, color: "bg-orange-100 text-orange-700" },
]

export function EnhancedImageCatalog({
  onImageSelect,
  selectedImage,
  postContent,
  platform,
}: EnhancedImageCatalogProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<any[]>([])
  const [selectedStyle, setSelectedStyle] = useState("professional")
  const [selectedCategory, setSelectedCategory] = useState("business")
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: "Fichier trop volumineux",
            description: "La taille maximale autorisée est de 10MB.",
            variant: "destructive",
          })
          return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          setUploadedImages((prev) => [...prev, result])
        }
        reader.readAsDataURL(file)
      }
    })

    toast({
      title: "Images uploadées !",
      description: `${files.length} image(s) ajoutée(s) à votre catalogue.`,
    })
  }

  const generateImages = async () => {
    if (!postContent?.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez d'abord saisir du contenu pour générer des images adaptées.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: postContent,
          style: selectedStyle,
          platform: platform || "linkedin",
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la génération")
      }

      const data = await response.json()
      setGeneratedImages(data.images || [])

      toast({
        title: "Images générées !",
        description: `${data.images?.length || 0} images créées selon votre contenu.`,
      })
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Impossible de générer les images. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const currentCategory = imageCategories.find((cat) => cat.id === selectedCategory)
  const filteredImages = currentCategory?.images.filter((image) =>
    searchQuery ? image.toLowerCase().includes(searchQuery.toLowerCase()) : true,
  )

  return (
    <FadeIn>
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            Catalogue d'Images
          </CardTitle>
          <CardDescription>Choisissez parmi notre collection ou uploadez vos propres images</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="catalog" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="catalog">Catalogue</TabsTrigger>
              <TabsTrigger value="generate">Générer IA</TabsTrigger>
              <TabsTrigger value="upload">Uploader</TabsTrigger>
            </TabsList>

            <TabsContent value="catalog" className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher des images..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <Label>Catégories</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {imageCategories.map((category) => {
                    const Icon = category.icon
                    return (
                      <AnimatedButton
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        className={`flex items-center gap-2 h-auto py-2 text-xs ${
                          selectedCategory === category.id ? "scale-105" : "hover:scale-105"
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <Icon className="h-3 w-3" />
                        {category.name}
                      </AnimatedButton>
                    )
                  })}
                </div>
              </div>

              {/* Images Grid */}
              {filteredImages && filteredImages.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>{currentCategory?.name}</Label>
                    <Badge variant="secondary" className={currentCategory?.color}>
                      {filteredImages.length} images
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {filteredImages.map((imageUrl, index) => (
                      <div
                        key={index}
                        className={`relative cursor-pointer group rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                          selectedImage === imageUrl
                            ? "border-primary shadow-lg"
                            : "border-transparent hover:border-primary/50"
                        }`}
                        onClick={() => onImageSelect(imageUrl)}
                      >
                        <img
                          src={imageUrl || "/placeholder.svg"}
                          alt={`Catalog image ${index + 1}`}
                          className="w-full aspect-[4/3] object-cover"
                        />
                        {selectedImage === imageUrl && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <div className="bg-primary text-primary-foreground rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="generate" className="space-y-4">
              {/* Style Selection */}
              <div className="space-y-3">
                <Label>Style d'image</Label>
                <div className="grid grid-cols-2 gap-2">
                  {imageStyles.map((style) => {
                    const Icon = style.icon
                    return (
                      <AnimatedButton
                        key={style.id}
                        variant={selectedStyle === style.id ? "default" : "outline"}
                        className={`flex items-center gap-2 h-auto py-2 ${
                          selectedStyle === style.id ? "scale-105" : "hover:scale-105"
                        }`}
                        onClick={() => setSelectedStyle(style.id)}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-xs">{style.name}</span>
                      </AnimatedButton>
                    )
                  })}
                </div>
              </div>

              {/* Generate Button */}
              <AnimatedButton
                onClick={generateImages}
                disabled={isGenerating || !postContent?.trim()}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Générer des images
                  </>
                )}
              </AnimatedButton>

              {/* Generated Images Grid */}
              {generatedImages.length > 0 && (
                <div className="space-y-3">
                  <Label>Images générées</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {generatedImages.map((image, index) => (
                      <div
                        key={image.id || index}
                        className={`relative cursor-pointer group rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                          selectedImage === image.url
                            ? "border-primary shadow-lg"
                            : "border-transparent hover:border-primary/50"
                        }`}
                        onClick={() => onImageSelect(image.url)}
                      >
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={`Generated image ${index + 1}`}
                          className="w-full aspect-square object-cover"
                        />
                        {selectedImage === image.url && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <div className="bg-primary text-primary-foreground rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="upload" className="space-y-4">
              {/* Upload Area */}
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-all duration-300 hover:bg-primary/5"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-2">Cliquez pour uploader ou glissez-déposez vos images</p>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP jusqu'à 10MB</p>
              </div>

              <Input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Uploaded Images Grid */}
              {uploadedImages.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Vos images</Label>
                    <Badge variant="secondary">{uploadedImages.length} images</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {uploadedImages.map((imageUrl, index) => (
                      <div
                        key={index}
                        className={`relative cursor-pointer group rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                          selectedImage === imageUrl
                            ? "border-primary shadow-lg"
                            : "border-transparent hover:border-primary/50"
                        }`}
                        onClick={() => onImageSelect(imageUrl)}
                      >
                        <img
                          src={imageUrl || "/placeholder.svg"}
                          alt={`Uploaded image ${index + 1}`}
                          className="w-full aspect-square object-cover"
                        />
                        {selectedImage === imageUrl && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <div className="bg-primary text-primary-foreground rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </FadeIn>
  )
}

"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AnimatedButton } from "@/components/animated-button"
import { LoadingSpinner } from "@/components/loading-spinner"
import { FadeIn } from "@/components/fade-in"
import { ImageIcon, Upload, Search, Sparkles, Camera, Briefcase, Heart, Zap, Leaf, Palette } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface EnhancedImageCatalogProps {
  onImageSelect: (imageUrl: string) => void
  selectedImage?: string
  postContent: string
  platform: string
}

const imageCategories = [
  { id: "business", name: "Business", icon: Briefcase, color: "bg-blue-100 text-blue-700" },
  { id: "technology", name: "Technologie", icon: Zap, color: "bg-purple-100 text-purple-700" },
  { id: "lifestyle", name: "Lifestyle", icon: Heart, color: "bg-pink-100 text-pink-700" },
  { id: "marketing", name: "Marketing", icon: Sparkles, color: "bg-orange-100 text-orange-700" },
  { id: "creative", name: "Créatif", icon: Palette, color: "bg-indigo-100 text-indigo-700" },
  { id: "nature", name: "Nature", icon: Leaf, color: "bg-green-100 text-green-700" },
]

const sampleImages = {
  business: [
    "/placeholder.svg?height=300&width=400&text=Business+Meeting",
    "/placeholder.svg?height=300&width=400&text=Office+Space",
    "/placeholder.svg?height=300&width=400&text=Team+Work",
    "/placeholder.svg?height=300&width=400&text=Presentation",
  ],
  technology: [
    "/placeholder.svg?height=300&width=400&text=AI+Technology",
    "/placeholder.svg?height=300&width=400&text=Digital+Innovation",
    "/placeholder.svg?height=300&width=400&text=Code+Development",
    "/placeholder.svg?height=300&width=400&text=Tech+Gadgets",
  ],
  lifestyle: [
    "/placeholder.svg?height=300&width=400&text=Coffee+Break",
    "/placeholder.svg?height=300&width=400&text=Work+Life+Balance",
    "/placeholder.svg?height=300&width=400&text=Wellness",
    "/placeholder.svg?height=300&width=400&text=Inspiration",
  ],
  marketing: [
    "/placeholder.svg?height=300&width=400&text=Social+Media",
    "/placeholder.svg?height=300&width=400&text=Brand+Strategy",
    "/placeholder.svg?height=300&width=400&text=Content+Creation",
    "/placeholder.svg?height=300&width=400&text=Analytics",
  ],
  creative: [
    "/placeholder.svg?height=300&width=400&text=Design+Process",
    "/placeholder.svg?height=300&width=400&text=Creative+Ideas",
    "/placeholder.svg?height=300&width=400&text=Art+Studio",
    "/placeholder.svg?height=300&width=400&text=Innovation",
  ],
  nature: [
    "/placeholder.svg?height=300&width=400&text=Green+Environment",
    "/placeholder.svg?height=300&width=400&text=Sustainability",
    "/placeholder.svg?height=300&width=400&text=Natural+Beauty",
    "/placeholder.svg?height=300&width=400&text=Eco+Friendly",
  ],
}

export function EnhancedImageCatalog({
  onImageSelect,
  selectedImage,
  postContent,
  platform,
}: EnhancedImageCatalogProps) {
  const [activeCategory, setActiveCategory] = useState("business")
  const [searchQuery, setSearchQuery] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string>("")

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Fichier trop volumineux",
          description: "La taille maximale autorisée est de 10MB.",
          variant: "destructive",
        })
        return
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Format non supporté",
          description: "Veuillez sélectionner un fichier image (JPG, PNG, GIF).",
          variant: "destructive",
        })
        return
      }

      try {
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string
          setUploadedImage(imageUrl)
          onImageSelect(imageUrl)
          toast({
            title: "Image uploadée !",
            description: "Votre image a été ajoutée avec succès.",
          })
        }
        reader.readAsDataURL(file)
      } catch (error) {
        toast({
          title: "Erreur d'upload",
          description: "Impossible de charger l'image. Veuillez réessayer.",
          variant: "destructive",
        })
      }
    },
    [onImageSelect],
  )

  const generateAIImage = async () => {
    if (!postContent.trim()) {
      toast({
        title: "Contenu requis",
        description: "Veuillez d'abord générer du contenu pour créer une image adaptée.",
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
          platform,
          style: "professional",
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la génération")
      }

      const data = await response.json()
      onImageSelect(data.imageUrl)

      toast({
        title: "Image générée !",
        description: "Une image IA adaptée à votre contenu a été créée.",
      })
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Impossible de générer l'image. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const filteredImages = sampleImages[activeCategory as keyof typeof sampleImages] || []

  return (
    <FadeIn>
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Catalogue d'Images</CardTitle>
            </div>
            <Badge variant="secondary">{selectedImage ? "Image sélectionnée" : "Aucune image"}</Badge>
          </div>
          <CardDescription>Choisissez une image ou uploadez la vôtre</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher des images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Upload Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Upload Personnel</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                <p className="text-xs text-muted-foreground mt-1">JPG, PNG, GIF - Max 10MB</p>
              </div>
              <AnimatedButton
                onClick={generateAIImage}
                disabled={isGenerating || !postContent.trim()}
                variant="outline"
                className="group"
              >
                {isGenerating ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Génération...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                    Générer avec IA
                  </>
                )}
              </AnimatedButton>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Catégories</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {imageCategories.map((category) => {
                const Icon = category.icon
                return (
                  <AnimatedButton
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category.id)}
                    className={`justify-start transition-all duration-200 ${
                      activeCategory === category.id ? "scale-105 shadow-md" : "hover:scale-105"
                    }`}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {category.name}
                  </AnimatedButton>
                )
              })}
            </div>
          </div>

          {/* Image Grid */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Images Disponibles</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {uploadedImage && (
                <div
                  className={`relative group cursor-pointer rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 ${
                    selectedImage === uploadedImage ? "ring-2 ring-primary shadow-lg" : ""
                  }`}
                  onClick={() => onImageSelect(uploadedImage)}
                >
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Image uploadée"
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="text-xs">
                      <Upload className="h-3 w-3 mr-1" />
                      Uploadée
                    </Badge>
                  </div>
                  {selectedImage === uploadedImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-primary text-primary-foreground rounded-full p-2">
                        <Camera className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {filteredImages.map((imageUrl, index) => (
                <div
                  key={index}
                  className={`relative group cursor-pointer rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 ${
                    selectedImage === imageUrl ? "ring-2 ring-primary shadow-lg" : ""
                  }`}
                  onClick={() => onImageSelect(imageUrl)}
                >
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt={`Image ${activeCategory} ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  {selectedImage === imageUrl && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-primary text-primary-foreground rounded-full p-2">
                        <Camera className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {selectedImage && (
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Image sélectionnée</p>
                <AnimatedButton
                  variant="ghost"
                  size="sm"
                  onClick={() => onImageSelect("")}
                  className="text-destructive hover:text-destructive"
                >
                  Supprimer
                </AnimatedButton>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </FadeIn>
  )
}

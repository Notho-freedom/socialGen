"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadingSpinner } from "@/components/loading-spinner"
import { FadeIn } from "@/components/fade-in"
import { AnimatedButton } from "@/components/animated-button"
import { Upload, Sparkles, ImageIcon, Check, Palette, Camera, Lightbulb, TrendingUp } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ImageCatalogProps {
  onImageSelect: (imageUrl: string) => void
  selectedImage?: string
  postContent?: string
  platform?: string
}

const imageStyles = [
  { id: "professional", name: "Professionnel", icon: Lightbulb, color: "bg-blue-100 text-blue-700" },
  { id: "creative", name: "Créatif", icon: Palette, color: "bg-purple-100 text-purple-700" },
  { id: "tech", name: "Technologie", icon: TrendingUp, color: "bg-green-100 text-green-700" },
  { id: "marketing", name: "Marketing", icon: Camera, color: "bg-orange-100 text-orange-700" },
]

export function ImageCatalog({ onImageSelect, selectedImage, postContent, platform }: ImageCatalogProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<any[]>([])
  const [selectedStyle, setSelectedStyle] = useState("professional")
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
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

  return (
    <FadeIn>
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            Catalogue d'Images
          </CardTitle>
          <CardDescription>Uploadez vos images ou générez-en automatiquement selon votre contenu</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="generate">Générer IA</TabsTrigger>
              <TabsTrigger value="upload">Uploader</TabsTrigger>
            </TabsList>

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
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Cliquez pour uploader ou glissez-déposez vos images</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP jusqu'à 10MB</p>
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
                  <Label>Vos images</Label>
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

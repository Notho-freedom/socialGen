"use client"
import { Button } from "@/components/ui/button"
import { Copy, Heart, MessageCircle, Send, MoreHorizontal } from "lucide-react"
import { useState } from "react"

export function SocialPreviewCard({
  platform = "linkedin",
  text = "",
  imageUrl = "",
  user = { name: "Jean Dupont", avatar: "/public/placeholder-user.jpg", job: "Consultant Marketing" },
  onCopy,
}: {
  platform?: "linkedin" | "twitter" | "facebook" | "instagram"
  text: string
  imageUrl?: string
  user?: { name: string; avatar: string; job?: string }
  onCopy?: () => void
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (onCopy) onCopy()
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  if (platform === "twitter") {
    return (
      <div className="max-w-md w-full rounded-xl border bg-white dark:bg-zinc-900 shadow-lg overflow-hidden animate-fade-in-up">
        {/* Header Twitter */}
        <div className="flex items-center gap-3 p-4 border-b bg-[#f7f9fa] dark:bg-zinc-800">
          <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover border" />
          <div className="flex-1">
            <div className="font-semibold text-sm text-zinc-900 dark:text-white leading-tight">{user.name}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-300">@{user.name.replace('@', '')}</div>
          </div>
          <Button variant="ghost" size="icon" className="hover:bg-zinc-200 dark:hover:bg-zinc-700">
            <MoreHorizontal className="h-5 w-5 text-zinc-500" />
          </Button>
        </div>
        {/* Contenu */}
        <div className="p-4">
          <div className="text-[15px] text-zinc-800 dark:text-zinc-100 whitespace-pre-line mb-3 animate-fade-in">
            {text || <span className="text-zinc-400">Votre tweet apparaîtra ici...</span>}
          </div>
          {imageUrl && (
            <img src={imageUrl} alt="Aperçu" className="w-full rounded-lg mb-3 border animate-fade-in-up" />
          )}
          <div className="flex items-center gap-2 mt-2">
            <Button variant="ghost" size="icon" onClick={handleCopy} className="transition-transform duration-200 hover:scale-110">
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copier</span>
            </Button>
            {copied && <span className="text-green-600 text-xs animate-fade-in">Copié !</span>}
          </div>
        </div>
        {/* Actions Twitter */}
        <div className="flex justify-between items-center px-4 py-2 border-t bg-[#f7f9fa] dark:bg-zinc-800">
          <button className="flex items-center gap-1 text-zinc-500 hover:text-blue-500 transition-colors text-sm font-medium">
            <Heart className="h-4 w-4" /> Like
          </button>
          <button className="flex items-center gap-1 text-zinc-500 hover:text-blue-500 transition-colors text-sm font-medium">
            <MessageCircle className="h-4 w-4" /> Répondre
          </button>
          <button className="flex items-center gap-1 text-zinc-500 hover:text-blue-500 transition-colors text-sm font-medium">
            <Send className="h-4 w-4" /> Retweeter
          </button>
        </div>
      </div>
    )
  }

  if (platform === "facebook") {
    return (
      <div className="max-w-md w-full rounded-xl border bg-white dark:bg-zinc-900 shadow-lg overflow-hidden animate-fade-in-up">
        {/* Header Facebook */}
        <div className="flex items-center gap-3 p-4 border-b bg-[#f0f2f5] dark:bg-zinc-800">
          <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover border" />
          <div className="flex-1">
            <div className="font-semibold text-sm text-zinc-900 dark:text-white leading-tight">{user.name}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-300">il y a 1 min</div>
          </div>
          <Button variant="ghost" size="icon" className="hover:bg-zinc-200 dark:hover:bg-zinc-700">
            <MoreHorizontal className="h-5 w-5 text-zinc-500" />
          </Button>
        </div>
        {/* Contenu */}
        <div className="p-4">
          <div className="text-[15px] text-zinc-800 dark:text-zinc-100 whitespace-pre-line mb-3 animate-fade-in">
            {text || <span className="text-zinc-400">Votre post Facebook apparaîtra ici...</span>}
          </div>
          {imageUrl && (
            <img src={imageUrl} alt="Aperçu" className="w-full rounded-lg mb-3 border animate-fade-in-up" />
          )}
          <div className="flex items-center gap-2 mt-2">
            <Button variant="ghost" size="icon" onClick={handleCopy} className="transition-transform duration-200 hover:scale-110">
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copier</span>
            </Button>
            {copied && <span className="text-green-600 text-xs animate-fade-in">Copié !</span>}
          </div>
        </div>
        {/* Actions Facebook */}
        <div className="flex justify-between items-center px-4 py-2 border-t bg-[#f0f2f5] dark:bg-zinc-800">
          <button className="flex items-center gap-1 text-zinc-500 hover:text-blue-700 transition-colors text-sm font-medium">
            <Heart className="h-4 w-4" /> J’aime
          </button>
          <button className="flex items-center gap-1 text-zinc-500 hover:text-blue-700 transition-colors text-sm font-medium">
            <MessageCircle className="h-4 w-4" /> Commenter
          </button>
          <button className="flex items-center gap-1 text-zinc-500 hover:text-blue-700 transition-colors text-sm font-medium">
            <Send className="h-4 w-4" /> Partager
          </button>
        </div>
      </div>
    )
  }

  if (platform === "instagram") {
    return (
      <div className="max-w-md w-full rounded-xl border bg-white dark:bg-zinc-900 shadow-lg overflow-hidden animate-fade-in-up">
        {/* Header Instagram */}
        <div className="flex items-center gap-3 p-4 border-b bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 dark:from-pink-700 dark:to-yellow-600">
          <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover border-2 border-pink-500" />
          <div className="flex-1">
            <div className="font-semibold text-sm text-white leading-tight">{user.name}</div>
          </div>
          <Button variant="ghost" size="icon" className="hover:bg-pink-200/30">
            <MoreHorizontal className="h-5 w-5 text-white" />
          </Button>
        </div>
        {/* Contenu */}
        <div className="p-4">
          {imageUrl && (
            <img src={imageUrl} alt="Aperçu" className="w-full rounded-lg mb-3 border animate-fade-in-up" />
          )}
          <div className="text-[15px] text-zinc-800 dark:text-zinc-100 whitespace-pre-line mb-3 animate-fade-in">
            {text || <span className="text-zinc-400">Votre post Instagram apparaîtra ici...</span>}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Button variant="ghost" size="icon" onClick={handleCopy} className="transition-transform duration-200 hover:scale-110">
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copier</span>
            </Button>
            {copied && <span className="text-green-600 text-xs animate-fade-in">Copié !</span>}
          </div>
        </div>
        {/* Actions Instagram */}
        <div className="flex justify-between items-center px-4 py-2 border-t bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 dark:from-pink-700 dark:to-yellow-600">
          <button className="flex items-center gap-1 text-white hover:text-yellow-200 transition-colors text-sm font-medium">
            <Heart className="h-4 w-4" /> J’aime
          </button>
          <button className="flex items-center gap-1 text-white hover:text-yellow-200 transition-colors text-sm font-medium">
            <MessageCircle className="h-4 w-4" /> Commenter
          </button>
          <button className="flex items-center gap-1 text-white hover:text-yellow-200 transition-colors text-sm font-medium">
            <Send className="h-4 w-4" /> Partager
          </button>
        </div>
      </div>
    )
  }

  // LinkedIn par défaut
  return (
    <div className="max-w-md w-full rounded-xl border bg-white dark:bg-zinc-900 shadow-lg overflow-hidden animate-fade-in-up">
      {/* Header LinkedIn */}
      <div className="flex items-center gap-3 p-4 border-b bg-[#f3f6f8] dark:bg-zinc-800">
        <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover border" />
        <div className="flex-1">
          <div className="font-semibold text-sm text-zinc-900 dark:text-white leading-tight">{user.name}</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-300">{user.job || "Professionnel"}</div>
          <div className="text-xs text-zinc-400 mt-0.5">Il y a 1 min • <span className="inline-block w-2 h-2 bg-blue-600 rounded-full align-middle"></span></div>
        </div>
        <Button variant="ghost" size="icon" className="hover:bg-zinc-200 dark:hover:bg-zinc-700">
          <MoreHorizontal className="h-5 w-5 text-zinc-500" />
        </Button>
      </div>
      {/* Contenu */}
      <div className="p-4">
        <div className="text-[15px] text-zinc-800 dark:text-zinc-100 whitespace-pre-line mb-3 animate-fade-in">
          {text || <span className="text-zinc-400">Votre texte LinkedIn apparaîtra ici...</span>}
        </div>
        {imageUrl && (
          <img src={imageUrl} alt="Aperçu" className="w-full rounded-lg mb-3 border animate-fade-in-up" />
        )}
        <div className="flex items-center gap-2 mt-2">
          <Button variant="ghost" size="icon" onClick={handleCopy} className="transition-transform duration-200 hover:scale-110">
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copier</span>
          </Button>
          {copied && <span className="text-green-600 text-xs animate-fade-in">Copié !</span>}
        </div>
      </div>
      {/* Actions LinkedIn */}
      <div className="flex justify-between items-center px-4 py-2 border-t bg-[#f3f6f8] dark:bg-zinc-800">
        <button className="flex items-center gap-1 text-zinc-500 hover:text-blue-700 transition-colors text-sm font-medium">
          <Heart className="h-4 w-4" /> J’aime
        </button>
        <button className="flex items-center gap-1 text-zinc-500 hover:text-blue-700 transition-colors text-sm font-medium">
          <MessageCircle className="h-4 w-4" /> Commenter
        </button>
        <button className="flex items-center gap-1 text-zinc-500 hover:text-blue-700 transition-colors text-sm font-medium">
          <Send className="h-4 w-4" /> Partager
        </button>
      </div>
    </div>
  )
} 
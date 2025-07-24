"use client"

import type React from "react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode
  ripple?: boolean
}

export function AnimatedButton({ children, className, ripple = true, onClick, ...props }: AnimatedButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const newRipple = { x, y, id: Date.now() }

      setRipples((prev) => [...prev, newRipple])

      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
      }, 600)
    }

    onClick?.(e)
  }

  return (
    <Button
      className={cn("relative overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95", className)}
      onClick={handleClick}
      {...props}
    >
      {children}
      {ripple &&
        ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 animate-ping"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
          />
        ))}
    </Button>
  )
}

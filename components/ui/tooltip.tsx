"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TooltipProps {
  children: React.ReactNode
  content: string
  variant?: "navbar" | "button" | "default"
  position?: "top" | "bottom" | "left" | "right"
}

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function Tooltip({ children, content, variant = "default", position = "top" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)

  const computeCoords = () => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const tooltipWidth = 120
    const tooltipHeight = 40

    let x = 0
    let y = 0

    switch (position) {
      case "top":
        x = rect.left + rect.width / 2 - tooltipWidth / 2
        y = rect.top - tooltipHeight - 8
        break
      case "bottom":
        x = rect.left + rect.width / 2 - tooltipWidth / 2
        y = rect.bottom + 8
        break
      case "left":
        x = rect.left - tooltipWidth - 8
        y = rect.top + rect.height / 2 - tooltipHeight / 2
        break
      case "right":
        x = rect.right + 8
        y = rect.top + rect.height / 2 - tooltipHeight / 2
        break
    }

    setCoords({ x, y })
  }

  const getVariantStyles = () => {
    switch (variant) {
      case "navbar":
        return "bg-primary text-primary-foreground border-primary/20"
      case "button":
        return "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-primary/30 shadow-lg"
      default:
        return "bg-popover text-popover-foreground border-border"
    }
  }

  const getAnimationVariant = () => {
    switch (variant) {
      case "navbar":
        return {
          initial: { opacity: 0, y: 5, scale: 0.95 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 5, scale: 0.95 },
        }
      case "button":
        return {
          initial: { opacity: 0, scale: 0.8, y: 10 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.8, y: 10 },
        }
      default:
        return {
          initial: { opacity: 0, y: 5 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 5 },
        }
    }
  }

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={() => { setIsVisible(true); computeCoords() }}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-block"
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            {...getAnimationVariant()}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: coords.x,
              top: coords.y,
              zIndex: 9999,
            }}
            className={`
              px-3 py-1.5 rounded-lg text-xs font-medium
              backdrop-blur-md border
              pointer-events-none whitespace-nowrap
              ${getVariantStyles()}
            `}
          >
            {content}
            {/* Arrow */}
            <div
              className={`
                absolute w-2 h-2 rotate-45 border
                ${variant === "navbar" ? "bg-primary border-primary/20" : ""}
                ${variant === "button" ? "bg-primary border-primary/30" : ""}
                ${variant === "default" ? "bg-popover border-border" : ""}
                ${position === "top" ? "bottom-[-5px] left-1/2 -translate-x-1/2 border-t-0 border-l-0" : ""}
                ${position === "bottom" ? "top-[-5px] left-1/2 -translate-x-1/2 border-b-0 border-r-0" : ""}
                ${position === "left" ? "right-[-5px] top-1/2 -translate-y-1/2 border-l-0 border-b-0" : ""}
                ${position === "right" ? "left-[-5px] top-1/2 -translate-y-1/2 border-r-0 border-t-0" : ""}
              `}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

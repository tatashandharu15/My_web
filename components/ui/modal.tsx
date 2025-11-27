"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useEffect } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  variant?: "slide" | "fade" | "scale"
}

export function Modal({ isOpen, onClose, children, title, variant = "fade" }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const modalVariants = {
    slide: {
      hidden: { x: "100%", opacity: 0 },
      visible: { x: 0, opacity: 1 },
      exit: { x: "100%", opacity: 0 },
    },
    fade: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8, y: 20 },
      visible: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.8, y: 20 },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="relative w-full max-w-lg bg-card rounded-2xl shadow-2xl border border-border overflow-hidden"
              variants={modalVariants[variant]}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {title && (
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h2 className="text-xl font-bold">{title}</h2>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}

              {/* Content */}
              <div className="p-6">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

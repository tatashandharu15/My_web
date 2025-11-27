"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"

const navItems = [
  { name: "nav.home", path: "/" },
  { name: "nav.about", path: "/about" },
  { name: "nav.skills", path: "/skills" },
  { name: "nav.resume", path: "/resume" },
  { name: "nav.projects", path: "/projects" },
  { name: "nav.news", path: "/news" },
  { name: "nav.services", path: "/services" }, // Changed from /#services to /services to point to dedicated services page
  { name: "nav.contact", path: "/contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const { theme, resolvedTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  

  const menuVariants: Variants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%" },
  }

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 },
    }),
  }

  const navbarVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  }

  const logoVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 },
    },
  }

  const navItemVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
    hover: {
      y: -2,
      transition: { duration: 0.2 },
    },
  }

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-effect shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Animated logo with hover effect */}
          <Link href="/" className="relative">
            <motion.div variants={logoVariants} whileHover="hover">
              <div className="h-10">
                <Image
                  src="/tataslogohitam.png"
                  alt="Tatas Handharu Sworo Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto block dark:hidden"
                />
                <Image
                  src="/tataslogoputih.png"
                  alt="Tatas Handharu Sworo Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto hidden dark:block"
                />
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <TooltipProvider>
            <motion.div className="hidden md:flex items-center gap-8" variants={navbarVariants}>
              {navItems.map((item, index) => (
                <motion.div key={item.path} variants={navItemVariants} custom={index}>
                  <Tooltip content={t(`tooltip.${item.name}`)} variant="navbar" position="bottom">
                    <Link
                      href={item.path}
                      className={`relative text-sm font-medium transition-all duration-300 hover:text-primary ${
                        pathname === item.path ? "text-primary" : "text-foreground/80"
                      }`}
                    >
                      {/* Animated underline for active link */}
                      <motion.span
                        className="relative inline-block"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                        suppressHydrationWarning
                      >
                        {t(item.name)}
                        {pathname === item.path && (
                          <motion.div
                            layoutId="activeLink"
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </motion.span>
                    </Link>
                  </Tooltip>
                </motion.div>
              ))}
              {/* Animation to theme and language toggles */}
              <motion.div variants={navItemVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <LanguageToggle />
              </motion.div>
              <motion.div variants={navItemVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <ThemeToggle />
              </motion.div>
            </motion.div>
          </TooltipProvider>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <LanguageToggle />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <ThemeToggle />
            </motion.div>
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-in Menu */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-64 bg-card border-l border-border shadow-2xl z-50 md:hidden"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex flex-col h-full p-6">
                {/* Close button */}
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Navigation items */}
                <nav className="flex flex-col gap-4">
                  {navItems.map((item, i) => (
                    <motion.div key={item.path} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                      <Link
                        href={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:bg-muted ${
                          pathname === item.path ? "text-primary bg-primary/10" : "text-foreground/80"
                        }`}
                      >
                        <span suppressHydrationWarning>{t(item.name)}</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

"use client"

import * as React from "react"
import { Moon, Sun, Monitor, Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (typeof document === "undefined") return
    const el = document.documentElement
    if (theme === "brown") {
      el.classList.remove("dark")
      el.classList.add("brown")
    } else {
      el.classList.remove("brown")
    }
  }, [theme])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full">
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  const Icon = (theme === "brown") ? Palette : resolvedTheme === "dark" ? Moon : resolvedTheme === "light" ? Sun : Monitor


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full transition-all duration-300 hover:scale-105"
        >
          <Icon className="h-5 w-5 transition-transform duration-300" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("system")} className={theme === "system" ? "bg-accent" : ""}>
          <Monitor className="mr-2 h-4 w-4" /> System
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("light")} className={resolvedTheme === "light" && theme !== "brown" ? "bg-accent" : ""}>
          <Sun className="mr-2 h-4 w-4" /> Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className={resolvedTheme === "dark" && theme !== "brown" ? "bg-accent" : ""}>
          <Moon className="mr-2 h-4 w-4" /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("brown")} className={theme === "brown" ? "bg-accent" : ""}>
          <Palette className="mr-2 h-4 w-4" /> Brown
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

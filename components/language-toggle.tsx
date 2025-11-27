"use client"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full transition-all duration-300 hover:scale-105">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-accent" : ""}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("id")} className={language === "id" ? "bg-accent" : ""}>
          Bahasa Indonesia
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

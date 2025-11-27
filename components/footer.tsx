"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Github, Linkedin, Mail, Phone } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"

export default function Footer() {
  const { t } = useLanguage()
  const { theme, resolvedTheme } = useTheme()
  const currentYear = new Date().getFullYear()


  

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8">
                <Image
                  src="/tataslogohitam.png"
                  alt="Tatas Handharu Sworo Logo"
                  width={32}
                  height={32}
                  className="h-8 w-auto block dark:hidden"
                />
                <Image
                  src="/tataslogoputih.png"
                  alt="Tatas Handharu Sworo Logo"
                  width={32}
                  height={32}
                  className="h-8 w-auto hidden dark:block"
                />
              </div>
              <h3 className="text-xl font-bold font-serif">Tatas Handharu Sworo</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("home.roles")}
              <br />
              {t("footer.tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.quickLinks")}</h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("nav.about")}
              </Link>
              <Link href="/skills" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("nav.skills")}
              </Link>
              <Link
                href="/projects"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("nav.projects")}
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("nav.contact")}
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.connect")}</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/tatashandharu15"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/tatas-handharu"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:tatas.handharu@gmail.com"
                className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Mail size={20} />
              </a>
              <a
                href="tel:+6285156105762"
                className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} Tatas Handharu Sworo. {t("footer.rights")}.
          </p>
        </div>
      </div>
    </footer>
  )
}

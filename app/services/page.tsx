"use client"

import { useLanguage } from "@/contexts/language-context"
import { CheckCircle2 } from "lucide-react"
import * as Icons from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { fetchJSON } from "@/lib/api"

type ServiceItem = {
  name: string
  description: string
  icon_name?: string
  items?: string[]
}

function toPascalCase(name?: string): string | undefined {
  if (!name) return undefined
  return name
    .split(/[-_\s]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("")
}

function IconPreview({ iconName }: { iconName?: string }) {
  const pascal = toPascalCase(iconName)
  const Icon = (Icons as any)[pascal || ""] || (Icons as any)["HelpCircle"]
  return <Icon className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
}

export default function ServicesPage() {
  const { t } = useLanguage()
  const [services, setServices] = useState<ServiceItem[]>([])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const data = await fetchJSON<ServiceItem[]>("/api/services")
      if (!mounted) return
      if (data && Array.isArray(data) && data.length > 0) {
        setServices(data)
      } else {
        // Fallback minimal dummy
        setServices([
          {
            name: t("home.services.service1.title"),
            description: t("home.services.service1.desc"),
            icon_name: "help-circle",
            items: [
              t("home.services.service1.item1"),
              t("home.services.service1.item2"),
              t("home.services.service1.item3"),
            ],
          },
          {
            name: t("home.services.service2.title"),
            description: t("home.services.service2.desc"),
            icon_name: "help-circle",
            items: [
              t("home.services.service2.item1"),
              t("home.services.service2.item2"),
              t("home.services.service2.item3"),
            ],
          },
        ])
      }
    })()
    return () => {
      mounted = false
    }
  }, [t])

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("home.services.title")}</h1>
          <p className="text-lg text-muted-foreground">{t("home.services.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 rounded-2xl backdrop-blur-md bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <IconPreview iconName={service.icon_name} />
              <h3 className="text-2xl font-bold mb-3">{service.name}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

              <ul className="space-y-3">
                {(service.items || []).map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

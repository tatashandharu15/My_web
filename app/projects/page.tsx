"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { useEffect, useState } from "react"
import { fetchJSON, getFileSrc } from "@/lib/api"
import Image from "next/image"

export default function ProjectsPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<"data" | "software">("data")
  const [visibleCount, setVisibleCount] = useState(3)
  const [projects, setProjects] = useState<Array<{
    title: string
    description: string
    tags?: string[]
    image?: string
    github_url?: string
    demo_url?: string
    category?: "data" | "software"
  }>>([])

  const inferCategory = (tags?: string[]): "data" | "software" => {
    const dataKeywords = [
      "python",
      "pandas",
      "numpy",
      "ml",
      "machine",
      "learning",
      "ai",
      "deep",
      "tensorflow",
      "keras",
      "pytorch",
      "nlp",
      "data",
      "analytics",
      "lstm",
      "streamlit",
    ]
    const t = (tags || []).map((x) => x.toLowerCase())
    const isData = t.some((tag) => dataKeywords.some((k) => tag.includes(k)))
    return isData ? "data" : "software"
  }

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const data = await fetchJSON<Array<any>>("/api/projects")
      if (!mounted) return
      if (data && Array.isArray(data) && data.length > 0) {
        setProjects(
          data.map((p) => ({
            title: p.title,
            description: p.description,
            tags: p.tags || [],
            image: p.image,
            github_url: p.github_url,
            demo_url: p.demo_url,
            category: (p.category === "data" || p.category === "software") ? p.category : inferCategory(p.tags || []),
          })),
        )
      } else {
        // Fallback minimal dummy when API fails
        setProjects([
          {
            title: t("projects.project1.title"),
            description: t("projects.project1.desc"),
            tags: ["Fallback"],
            image: "/placeholder.jpg",
            github_url: "#",
            demo_url: "#",
            category: "data",
          },
          {
            title: t("projects.software1.title"),
            description: t("projects.software1.desc"),
            tags: ["Fallback"],
            image: "/placeholder.jpg",
            github_url: "#",
            demo_url: "#",
            category: "software",
          },
        ])
      }
    })()
    return () => {
      mounted = false
    }
  }, [t])

  const currentProjects = projects.filter((p) => p.category === activeTab)
  const visibleProjects = currentProjects.slice(0, visibleCount)
  const hasMore = visibleCount < currentProjects.length

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, currentProjects.length))
  }

  const handleTabChange = (tab: "data" | "software") => {
    setActiveTab(tab)
    setVisibleCount(3)
  }

  return (
    <div className="min-h-screen px-6 pt-32 pb-20">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 animate-in fade-in duration-1000">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-balance">{t("projects.title")}</h1>
          <p className="text-lg text-muted-foreground">{t("projects.subtitle")}</p>
        </div>

        <div className="flex justify-center animate-in fade-in duration-700">
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50">
            <button
              onClick={() => handleTabChange("data")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                activeTab === "data"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("projects.dataScience")}
            </button>
            <button
              onClick={() => handleTabChange("software")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                activeTab === "software"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("projects.softwareEngineering")}
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, index) => (
            <Card
              key={index}
              className="animate-in slide-in-from-bottom duration-700 hover:shadow-lg transition-all overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-video overflow-hidden bg-muted relative">
                <Image
                  src={getFileSrc(project.image)}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(project.tags || []).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                  <a href={project.github_url || "#"} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    {t("projects.viewCode")}
                  </a>
                </Button>
                <Button size="sm" className="flex-1" asChild>
                  <a href={project.demo_url || "#"} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {t("projects.viewProject")}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center animate-in fade-in duration-500">
            <Button
              onClick={loadMore}
              variant="outline"
              size="lg"
              className="px-8 py-6 text-base font-medium rounded-full bg-background/50 backdrop-blur-sm border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {t("projects.loadMore")}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

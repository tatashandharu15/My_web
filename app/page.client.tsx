"use client"

import Link from "next/link"
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  Cpu,
  Terminal,
  Layers,
  Sparkles,
  ExternalLink,
  Newspaper,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import * as Icons from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"
import Image from "next/image"
import { fetchJSON, getFileSrc } from "@/lib/api"

function TypewriterText({ roles }: { roles: string[] }) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[currentRoleIndex]
    const typingSpeed = isDeleting ? 50 : 100
    const pauseDuration = 2000

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentText.length < currentRole.length) {
            setCurrentText(currentRole.slice(0, currentText.length + 1))
          } else {
            // Finished typing, pause then start deleting
            setTimeout(() => setIsDeleting(true), pauseDuration)
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1))
          } else {
            // Finished deleting, move to next role
            setIsDeleting(false)
            setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length)
          }
        }
      },
      isDeleting ? typingSpeed : currentText.length === currentRole.length ? pauseDuration : typingSpeed,
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentRoleIndex, roles])

  return (
    <span className="inline-block min-h-[1.5em]">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default function Home() {
  const { t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [roles, setRoles] = useState<string[]>([])
  type HeroSlide = { title: string; subtitle: string; image?: string; cta?: string }
  type ServiceCard = { title: string; desc?: string; image?: string; icon_name?: string; items?: string[] }
  type LatestProjectCard = { title: string; desc?: string; image?: string; tags?: string[]; link?: string }
  type TechNewsCard = { title: string; desc?: string; image?: string; date?: string; category?: string; link?: string }

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([])

  const [services, setServices] = useState<ServiceCard[]>([])
  const [latestProjects, setLatestProjects] = useState<LatestProjectCard[]>([])
  const [techNews, setTechNews] = useState<TechNewsCard[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  function toPascalCase(name?: string) {
    if (!name) return ""
    return name
      .replace(/[^a-zA-Z0-9]+/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join("")
  }

  function IconPreview({ iconName, className }: { iconName?: string; className?: string }) {
    const key = toPascalCase(iconName)
    const IconComp = (Icons as any)[key] || Icons.HelpCircle
    return <IconComp className={className} />
  }

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const data = await fetchJSON<any>("/api/home")
        if (!mounted) return
        if (data) {
          if (Array.isArray(data.roles) && data.roles.length > 0) {
            setRoles(data.roles)
          }
          if (Array.isArray(data.hero_slides) && data.hero_slides.length > 0) {
            setHeroSlides(
              data.hero_slides.map((s: any) => ({
                title: s.title,
                subtitle: s.subtitle,
                image: getFileSrc(s.image),
                cta: s.cta,
              })),
            )
          }
          const sSec = data.services_section
          if (sSec && Array.isArray(sSec.services) && sSec.services.length > 0) {
            setServices(
              sSec.services.map((s: any) => ({
                title: s.title ?? s.name,
                desc: s.desc ?? s.description,
                image: getFileSrc(s.image),
                icon_name: s.icon_name,
                items: Array.isArray(s.items) ? s.items : [],
              })),
            )
          }
          const lpSec = data.latest_projects_section
          if (lpSec && Array.isArray(lpSec.projects) && lpSec.projects.length > 0) {
            setLatestProjects(
              lpSec.projects.map((p: any) => ({
                title: p.title,
                desc: p.desc ?? p.description,
                image: getFileSrc(p.image),
                tags: Array.isArray(p.tech) ? p.tech : Array.isArray(p.tags) ? p.tags : [],
                link: p.link ?? "/projects",
              })),
            )
          }
          const newsList = await fetchJSON<any[]>("/api/news")
          if (Array.isArray(newsList) && newsList.length > 0) {
            setTechNews(
              newsList.slice(0, 3).map((n: any) => ({
                title: n.title,
                desc: n.desc,
                image: getFileSrc(n.image),
                date: n.date,
                category: n.category,
                link: `/news/${n.slug}`,
              })),
            )
          } else {
            const tnSec = data.tech_news_section
            if (tnSec && Array.isArray(tnSec.news) && tnSec.news.length > 0) {
              setTechNews(
                tnSec.news.slice(0, 3).map((n: any) => ({
                  title: n.title,
                  desc: n.desc ?? n.description,
                  image: getFileSrc(n.image),
                  date: n.date,
                  category: n.category,
                  link: n.link ?? "/news",
                })),
              )
            }
          }
        }
        setError(null)
      } catch (e: any) {
        if (!mounted) return
        setError("Gagal memuat data homepage")
      } finally {
        if (mounted) setIsLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (heroSlides.length === 0) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  const nextSlide = () => {
    if (heroSlides.length === 0) return
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }
  const prevSlide = () => {
    if (heroSlides.length === 0) return
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* <AnimatedBackground /> removed as it's not in the updates and might conflict with the new hero background */}

      {/* Background gradient and blobs removed as they are replaced by hero banner */}

      <TooltipProvider>
        {heroSlides.length > 0 ? (
          <section className="relative h-[600px] md:h-[700px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0">
                  <Image
                    src={heroSlides[currentSlide].image || "/placeholder.svg"}
                    alt="Hero"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0">
              <div className="relative h-full flex items-center px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto w-full">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="max-w-3xl space-y-6"
                  >
                    {roles.length > 0 && (
                      <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                        <span className="text-primary font-semibold text-sm">
                          <TypewriterText roles={roles} />
                        </span>
                      </div>
                    )}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-balance">
                      {heroSlides[currentSlide].title}
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                      {heroSlides[currentSlide].subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        asChild
                        size="lg"
                        className="rounded-full px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                      >
                        <Link href={currentSlide === 0 ? "/projects" : currentSlide === 1 ? "/services" : "/projects"}>
                          {heroSlides[currentSlide].cta}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="rounded-full px-8 py-6 text-lg backdrop-blur-sm bg-background/50 border-2 hover:bg-background transition-all duration-300"
                      >
                        <Link href="/contact">{t("home.getInTouch")}</Link>
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-300 shadow-lg"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-300 shadow-lg"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="absolute top-8 right-8 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm text-sm font-semibold">
              {currentSlide + 1} / {heroSlides.length}
            </div>
          </section>
        ) : (
          <section className="relative h-[600px] md:h-[700px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/80" />
            <div className="relative h-full flex items-center px-6 md:px-12 lg:px-20">
              <div className="max-w-7xl mx-auto w-full">
                <h1 className="text-3xl md:text-4xl font-bold">
                  {isLoading ? "Memuat konten..." : "Hero slider tidak tersedia"}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {isLoading ? "Mohon tunggu" : error ? "API offline atau belum ada konten." : ""}
                </p>
              </div>
            </div>
          </section>
        )}

        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group relative overflow-hidden rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-8 space-y-4">
                  <div className="p-4 rounded-2xl bg-primary/10 w-fit">
                    <Cpu className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{t("home.feature1.title")}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t("home.feature1.desc")}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group relative overflow-hidden rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-8 space-y-4">
                  <div className="p-4 rounded-2xl bg-primary/10 w-fit">
                    <Terminal className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{t("home.feature2.title")}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t("home.feature2.desc")}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group relative overflow-hidden rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-8 space-y-4">
                  <div className="p-4 rounded-2xl bg-primary/10 w-fit">
                    <Layers className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{t("home.feature3.title")}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t("home.feature3.desc")}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6">{t("home.services.title")}</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t("home.services.subtitle")}
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {services.map((svc, idx) => (
                <motion.div
                  key={`svc-${idx}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * (idx + 1) }}
                  className="group rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={svc.image || "/placeholder.svg"}
                      alt={svc.title || "Service"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <div className="p-3 rounded-xl bg-primary/90 backdrop-blur-sm">
                        <IconPreview iconName={svc.icon_name} className="h-8 w-8 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-bold">{svc.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{svc.desc}</p>
                    {Array.isArray(svc.items) && svc.items.length > 0 && (
                      <ul className="space-y-2 text-sm">
                        {svc.items.map((it, i) => (
                          <li key={`svcitem-${i}`} className="flex items-start gap-2">
                            <span className="text-primary mt-1">✓</span>
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Projects Section */}
        <section className="py-24 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles className="h-8 w-8 text-primary" />
                <h2 className="text-5xl md:text-6xl font-bold">{t("home.latestProjects.title")}</h2>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t("home.latestProjects.subtitle")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {latestProjects.map((proj, idx) => (
                <motion.div
                  key={`lp-${idx}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * (idx + 1) }}
                  className="group rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={proj.image || "/placeholder.svg"}
                      alt={proj.title || "Project"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold">{proj.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{proj.desc}</p>
                    {Array.isArray(proj.tags) && proj.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {proj.tags.map((tech, i) => (
                          <span
                            key={`tag-${i}`}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <Button asChild size="sm" variant="outline" className="w-full rounded-xl bg-transparent">
                      <Link href={proj.link || "/projects"}>
                        {t("home.latestProjects.readMore")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg shadow-xl">
                <Link href="/projects">
                  {t("home.latestProjects.viewAll")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Tech News Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Newspaper className="h-8 w-8 text-primary" />
                <h2 className="text-5xl md:text-6xl font-bold">{t("home.techNews.title")}</h2>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t("home.techNews.subtitle")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {techNews.map((news, idx) => (
                <motion.div
                  key={`news-${idx}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * (idx + 1) }}
                  className="group rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={news.image || "/placeholder.svg"}
                      alt={news.title || "Tech News"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{news.date || "-"}</span>
                      <span>•</span>
                      {news.category && (
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">{news.category}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold">{news.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{news.desc}</p>
                    <Button asChild size="sm" variant="outline" className="w-full rounded-xl bg-transparent">
                      <Link href={news.link || "/news"}>
                        {t("home.techNews.readMore")}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg bg-transparent">
                <Link href="/news">
                  {t("home.techNews.viewAll")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold">{t("home.connect")}</h2>
              <div className="flex gap-6 justify-center flex-wrap">
                <Tooltip content={t("tooltip.button.github")} variant="button" position="top">
                  <a
                    href="https://github.com/tatashandharu15"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 shadow-lg border border-border"
                  >
                    <Github size={24} />
                    <span className="font-medium">GitHub</span>
                  </a>
                </Tooltip>
                <Tooltip content={t("tooltip.button.linkedin")} variant="button" position="top">
                  <a
                    href="https://www.linkedin.com/in/tatas-handharu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 shadow-lg border border-border"
                  >
                    <Linkedin size={24} />
                    <span className="font-medium">LinkedIn</span>
                  </a>
                </Tooltip>
                <Tooltip content={t("tooltip.button.email")} variant="button" position="top">
                  <a
                    href="mailto:tatas.handharu@gmail.com"
                    className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 shadow-lg border border-border"
                  >
                    <Mail size={24} />
                    <span className="font-medium">Email</span>
                  </a>
                </Tooltip>
                <Tooltip content={t("tooltip.button.phone")} variant="button" position="top">
                  <a
                    href="tel:+6285156105762"
                    className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 shadow-lg border border-border"
                  >
                    <Phone size={24} />
                    <span className="font-medium">Phone</span>
                  </a>
                </Tooltip>
              </div>
            </motion.div>
          </div>
        </section>
      </TooltipProvider>
    </div>
  )
}

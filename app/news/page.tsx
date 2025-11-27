"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, Tag, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { motion, type Variants } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { fetchJSON, getFileSrc } from "@/lib/api"

export default function NewsPage() {
  const { t } = useLanguage()
  const [newsArticles, setNewsArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const data = await fetchJSON<any[]>("/api/news")
      if (mounted) {
        setNewsArticles(data || [])
        setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("news.backHome")}
            </Link>
          </Button>
          <h1 className="text-5xl font-bold font-serif mb-4">{t("news.title")}</h1>
          <p className="text-lg text-muted-foreground">{t("news.subtitle")}</p>
        </motion.div>

        <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
          {loading && (
            <div className="text-muted-foreground">{t("common.loading") || "Loading..."}</div>
          )}
          {!loading && newsArticles.length === 0 && (
            <div className="text-muted-foreground">{t("news.empty") || "No articles yet"}</div>
          )}
          {newsArticles.map((article) => (
            <motion.div
              key={article.slug}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group rounded-3xl backdrop-blur-md bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden"
            >
              <div className="md:flex">
                <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden">
                  <Image
                    src={getFileSrc(article.image) || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent md:bg-gradient-to-r" />
                </div>

                <div className="p-8 md:w-3/5">
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      <span>{article.category}</span>
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{article.desc}</p>
                  <Button asChild variant="outline" className="rounded-xl bg-transparent">
                    <Link href={`/news/${article.slug}`}>
                      {t("news.readMore")}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

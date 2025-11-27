"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, Tag, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { motion, useScroll, useTransform } from "framer-motion"
import { useParams } from "next/navigation"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { fetchJSON, getFileSrc } from "@/lib/api"

export default function NewsArticlePage() {
  const { t } = useLanguage()
  const params = useParams()
  const slug = params.slug as string
  const headerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  const [article, setArticle] = useState<any | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const data = await fetchJSON<any>(`/api/news/slug/${slug}`)
      if (mounted) setArticle(data)
    })()
    return () => { mounted = false }
  }, [slug])

  return (
    <div className="min-h-screen">
      <div ref={headerRef} className="relative h-[60vh] overflow-hidden">
        <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
          <Image src={getFileSrc(article?.image) || "/placeholder.svg"} alt={article?.title || "News"} fill className="object-cover" priority />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
      </div>

      <div className="relative -mt-32 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Button asChild variant="ghost" className="mb-6 backdrop-blur-sm bg-background/50">
              <Link href="/news">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("news.backToNews")}
              </Link>
            </Button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{article?.date || "-"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <span>{article?.category || "-"}</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">{article?.title || t("news.title")}</h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <div className="p-8 rounded-3xl backdrop-blur-md bg-card/50 border border-border/50">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{article?.content || t("news.empty")}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex gap-4"
            >
              <Button variant="outline" className="rounded-xl bg-transparent">
                <Share2 className="mr-2 h-4 w-4" />
                {t("news.share")}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

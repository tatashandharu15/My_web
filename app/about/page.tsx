"use client"

import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"
import { fetchJSON } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { Code2, Rocket, Lightbulb, Camera } from "lucide-react"
import { motion, type Variants } from "framer-motion"

export default function AboutPage() {
  const { t, language } = useLanguage()
  const [aboutData, setAboutData] = useState<Record<string, string> | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await fetchJSON<any>("/api/about")
        if (mounted && data && typeof data.data === "object") {
          setAboutData(data.data)
        }
      } catch (e) {
        // ignore, use translations fallback
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
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 -z-10" />

      {/* Animated background blobs */}
      <div className="absolute top-40 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000 -z-10" />

      <div className="min-h-screen px-6 pt-32 pb-20">
        <motion.div className="max-w-6xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
          {/* Header */}
          <motion.div className="text-center space-y-4 mb-16" variants={itemVariants}>
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-balance">{(language === 'en' ? aboutData?.page_title_en : aboutData?.page_title) || t("about.pageTitle")}</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{(language === 'en' ? aboutData?.page_subtitle_en : aboutData?.page_subtitle) || t("about.pageSubtitle")}</p>
          </motion.div>

          <motion.div className="mb-12" variants={itemVariants}>
            <Card className="backdrop-blur-md bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 shadow-xl">
              <CardContent className="p-8 md:p-10 space-y-6 text-center">
                <div className="flex items-center justify-center gap-2 text-primary">
                  <h2 className="text-xl md:text-2xl font-bold font-serif">{(language === 'en' ? aboutData?.in_short_title_en : aboutData?.in_short_title) || t("about.inShort")}</h2>
                </div>
                <p className="text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
                  {(language === 'en' ? aboutData?.in_short_text_en : aboutData?.in_short_text) || t("about.inShortText")}
                </p>
                <div className="pt-4 border-t border-primary/20">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <h3 className="text-lg md:text-xl font-bold font-serif">{(language === 'en' ? aboutData?.mission_title_en : aboutData?.mission_title) || t("about.mission")}</h3>
                  </div>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    {(language === 'en' ? aboutData?.mission_text_en : aboutData?.mission_text) || t("about.missionText")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left column - Text content */}
            <motion.div className="space-y-8" variants={containerVariants}>
              {/* Introduction */}
              <motion.div variants={cardVariants}>
                <Card className="backdrop-blur-md bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-8 space-y-4">
                    <h2 className="text-2xl font-bold font-serif">{(language === 'en' ? aboutData?.intro_title_en : aboutData?.intro_title) || t("about.intro")}</h2>
                    <p className="text-muted-foreground leading-relaxed">{(language === 'en' ? aboutData?.intro_text_en : aboutData?.intro_text) || t("about.introText")}</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Technical Expertise */}
              <motion.div variants={cardVariants}>
                <Card className="backdrop-blur-md bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                  <CardContent className="p-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Code2 className="h-6 w-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold font-serif">{(language === 'en' ? aboutData?.expertise_title_en : aboutData?.expertise_title) || t("about.expertise")}</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{(language === 'en' ? aboutData?.expertise_text_en : aboutData?.expertise_text) || t("about.expertiseText")}</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* What I Build */}
              <motion.div variants={cardVariants}>
                <Card className="backdrop-blur-md bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                  <CardContent className="p-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Rocket className="h-6 w-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold font-serif">{(language === 'en' ? aboutData?.build_title_en : aboutData?.build_title) || t("about.build")}</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{(language === 'en' ? aboutData?.build_text_en : aboutData?.build_text) || t("about.buildText")}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Right column - More content */}
            <motion.div className="space-y-8" variants={containerVariants}>
              {/* What Drives Me */}
              <motion.div variants={cardVariants}>
                <Card className="backdrop-blur-md bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                  <CardContent className="p-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Lightbulb className="h-6 w-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold font-serif">{(language === 'en' ? aboutData?.drives_title_en : aboutData?.drives_title) || t("about.drives")}</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{(language === 'en' ? aboutData?.drives_text_en : aboutData?.drives_text) || t("about.drivesText")}</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Interests */}
              <motion.div variants={cardVariants}>
                <Card className="backdrop-blur-md bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                  <CardContent className="p-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Camera className="h-6 w-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold font-serif">{(language === 'en' ? aboutData?.interests_title_en : aboutData?.interests_title) || t("about.interests")}</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{(language === 'en' ? aboutData?.interests_text_en : aboutData?.interests_text) || t("about.interestsText")}</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Illustration placeholder */}
              <motion.div variants={cardVariants} className="hidden lg:block">
                <div className="relative h-64 rounded-2xl backdrop-blur-md bg-gradient-to-br from-primary/20 to-primary/5 border border-border/50 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Code2 className="h-16 w-16 text-primary mx-auto opacity-50" />
                      <p className="text-sm text-muted-foreground">Data + Code = Impact</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

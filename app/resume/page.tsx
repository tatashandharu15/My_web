"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { API_URL, fetchJSON } from "@/lib/api"
import { Download, GraduationCap, Briefcase, Award, Trophy } from "lucide-react"

export default function ResumePage() {
  const { t } = useLanguage()
  type EducationItem = {
    degree: string
    institution: string
    period: string
    details: string
  }

  type ExperienceItem = {
    position: string
    company: string
    period: string
    description: string
  }

  type AchievementItem = {
    title: string
    date: string
    description: string
  }

  type ResumeContent = {
    education: EducationItem[]
    experience: ExperienceItem[]
    certifications: string[]
    achievements: AchievementItem[]
    download_url?: string
  }

  const [resume, setResume] = useState<ResumeContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await fetchJSON<ResumeContent>("/api/resume")
        if (!mounted) return
        if (data) setResume(data)
      } catch (err) {
        // ignore and show empty-state
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  // Helper untuk memisahkan judul sertifikasi dan tanggal di akhir dalam tanda kurung
  const parseCertification = (text: string): { title: string; date?: string } => {
    const match = text.match(/^(.*)\s*\(([^)]+)\)\s*$/)
    if (match) {
      return { title: match[1].trim(), date: match[2].trim() }
    }
    return { title: text.trim() }
  }

  return (
    <div className="min-h-screen px-6 pt-32 pb-20">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 animate-in fade-in duration-1000">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-balance">{t("resume.title")}</h1>
          <p className="text-lg text-muted-foreground">{t("resume.subtitle")}</p>
          <Button
            size="lg"
            className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            asChild
          >
            <a href={`${API_URL}/api/resume/download`} download>
              <Download className="mr-2 h-5 w-5" />
              {t("resume.download")}
            </a>
          </Button>
        </div>

        {/* Education */}
        <Card className="animate-in slide-in-from-bottom duration-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              {t("resume.education")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {loading && <p className="text-sm text-muted-foreground">Loading education...</p>}
            {!loading && (resume?.education ?? []).length === 0 && (
              <p className="text-sm text-muted-foreground">No education data yet.</p>
            )}
            {((resume?.education ?? []).slice().reverse()).map((edu, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-xl font-semibold">{edu.degree}</h3>
                <p className="text-muted-foreground font-medium">{edu.institution}</p>
                <p className="text-sm text-muted-foreground">{edu.period}</p>
                <p className="text-sm text-muted-foreground">{edu.details}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="animate-in slide-in-from-bottom duration-700 delay-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              {t("resume.experience")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {loading && <p className="text-sm text-muted-foreground">Loading experience...</p>}
            {!loading && (resume?.experience ?? []).length === 0 && (
              <p className="text-sm text-muted-foreground">No experience data yet.</p>
            )}
            {((resume?.experience ?? []).slice().reverse()).map((exp, index) => (
              <div key={index} className="space-y-2 border-l-2 border-primary pl-4">
                <h3 className="text-xl font-semibold">{exp.position}</h3>
                <p className="text-muted-foreground font-medium">{exp.company}</p>
                <p className="text-sm text-muted-foreground">{exp.period}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card className="animate-in slide-in-from-bottom duration-700 delay-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              {t("resume.certifications")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading && <p className="text-sm text-muted-foreground">Loading certifications...</p>}
            {!loading && (resume?.certifications ?? []).length === 0 && (
              <p className="text-sm text-muted-foreground">No certifications yet.</p>
            )}
            <ul className="space-y-3">
              {((resume?.certifications ?? []).slice().reverse()).map((cert, index) => {
                const { title, date } = parseCertification(cert)
                return (
                  <li key={index} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <div className="flex w-full items-baseline justify-between gap-4">
                      <span className="text-muted-foreground flex-1">{title}</span>
                      {date && (
                        <span className="text-muted-foreground text-sm whitespace-nowrap">{date}</span>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          </CardContent>
        </Card>

        <Card className="animate-in slide-in-from-bottom duration-700 delay-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              Achievements & Recognitions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {loading && <p className="text-sm text-muted-foreground">Loading achievements...</p>}
            {!loading && (resume?.achievements ?? []).length === 0 && (
              <p className="text-sm text-muted-foreground">No achievements yet.</p>
            )}
            {((resume?.achievements ?? []).slice().reverse()).map((achievement, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-semibold">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">{achievement.date}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{achievement.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

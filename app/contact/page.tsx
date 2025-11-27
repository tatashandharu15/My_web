"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Mail, Phone, Github, Linkedin, Globe, CheckCircle } from "lucide-react"
import { useEffect } from "react"
import { fetchJSON, API_URL } from "@/lib/api"
import { Modal } from "@/components/ui/modal"

const WEB3FORMS_ACCESS_KEY = "082aea54-3476-4660-ac06-b3da459168e3"

export default function ContactPage() {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const form = new FormData()
      form.append("access_key", WEB3FORMS_ACCESS_KEY)
      form.append("name", formData.name)
      form.append("email", formData.email)
      form.append("subject", formData.subject)
      form.append("message", `${formData.message}\n\nPhone: ${formData.phone || "-"}`)
      form.append("phone", formData.phone)
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: form })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error("Submit failed")
      await fetch(`${API_URL}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          phone: formData.phone,
          message: formData.message,
        }),
      })
      setFormData({ name: "", email: "", subject: "", phone: "", message: "" })
      setShowSuccessModal(true)
    } catch (err) {
      // optional: handle error UI
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const [contactInfo, setContactInfo] = useState([
    { icon: MapPin, label: t("contact.location"), value: t("contact.locationValue") },
    { icon: Mail, label: t("contact.emailLabel"), value: t("contact.emailValue"), link: "mailto:tatas.handharu@gmail.com" },
    { icon: Phone, label: t("contact.phone"), value: t("contact.phoneValue"), link: "tel:+6285156105762" },
  ])

  useEffect(() => {
    // Fetch dynamic contact info from backend; fallback to translations if unavailable
    ;(async () => {
      const info = await fetchJSON<{ id: number; location: string; email: string; phone: string; created_at: string }>("/api/contact_info/")
      if (info) {
        setContactInfo([
          { icon: MapPin, label: t("contact.location"), value: info.location },
          { icon: Mail, label: t("contact.emailLabel"), value: info.email, link: `mailto:${info.email}` },
          { icon: Phone, label: t("contact.phone"), value: info.phone, link: `tel:${info.phone.replace(/\s+/g, '')}` },
        ])
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      link: "https://github.com/tatashandharu15",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/tatas-handharu",
    },
    {
      icon: Globe,
      label: "Portfolio",
      link: "https://tatashandharu15.github.io",
    },
  ]

  return (
    <div className="min-h-screen px-6 pt-32 pb-20">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 animate-in fade-in duration-1000">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-balance">{t("contact.title")}</h1>
          <p className="text-lg text-muted-foreground">{t("contact.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <Card className="lg:col-span-2 animate-in slide-in-from-bottom duration-700">
            <CardHeader>
              <CardTitle>{t("contact.send")}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("contact.name")}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t("contact.name")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("contact.email")}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t("contact.email")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("contact.phone")}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t("contact.phone")}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">{t("contact.subject")}</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder={t("contact.subject")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t("contact.message")}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={t("contact.message")}
                    rows={6}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? t("contact.sending") : t("contact.send")}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="animate-in slide-in-from-bottom duration-700 delay-100">
              <CardHeader>
                <CardTitle>{t("contact.info")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 mt-1">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">{info.label}</p>
                      {info.link ? (
                        <a href={info.link} className="text-sm text-foreground hover:text-primary transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm text-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="animate-in slide-in-from-bottom duration-700 delay-200">
              <CardHeader>
                <CardTitle>{t("contact.social")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{social.label}</span>
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={t("contact.success")}
        variant="scale"
      >
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-green-500/10">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
          </div>
          <p className="text-muted-foreground">{t("contact.successMessage")}</p>
          <Button onClick={() => setShowSuccessModal(false)} className="w-full">
            {t("contact.close")}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

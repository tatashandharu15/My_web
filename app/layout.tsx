import type React from "react"
import type { Metadata } from "next"
import { Poppins, Raleway } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { cookies } from "next/headers"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-raleway",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: { canonical: "/" },
  title: "Tatas Handharu Sworo | Data Scientist & AI Engineer",
  description:
    "Professional Data Scientist specializing in Machine Learning, Deep Learning, and AI Engineering. Building data-driven solutions that create real impact.",
  keywords: ["Data Scientist", "Machine Learning", "AI Engineer", "Deep Learning", "Python", "TensorFlow", "PyTorch"],
  generator: "Tatas Handharu Sworo"
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const initialLanguageCookie = cookieStore.get("language")?.value
  const initialLanguage = initialLanguageCookie === "id" ? "id" : "en"
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${raleway.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider initialLanguage={initialLanguage}>
            <Suspense
              fallback={
                <div className="px-6 py-4 border-b">
                  <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Skeleton className="h-8 w-28" />
                    <div className="flex gap-3">
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  </div>
                </div>
              }
            >
              <Navbar />
            </Suspense>
            <main className="min-h-screen">{children}</main>
            <Suspense
              fallback={
                <div className="px-6 py-8 border-t">
                  <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-5 w-64" />
                    <Skeleton className="h-5 w-40" />
                  </div>
                </div>
              }
            >
              <Footer />
            </Suspense>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

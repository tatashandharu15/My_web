import HomeClient from "@/components/home-client"
import { fetchJSON, getFileSrc } from "@/lib/api"

type HeroSlide = { title: string; subtitle: string; image?: string; cta?: string }
type ServiceCard = { title: string; desc?: string; image?: string; icon_name?: string; items?: string[] }
type LatestProjectCard = { title: string; desc?: string; image?: string; tags?: string[]; link?: string }
type TechNewsCard = { title: string; desc?: string; image?: string; date?: string; category?: string; link?: string }

export const revalidate = 60

export default async function Home() {
  const data = await fetchJSON<any>("/api/home")
  const roles: string[] = Array.isArray(data?.roles) ? data.roles : []
  const heroSlides: HeroSlide[] = Array.isArray(data?.hero_slides)
    ? data.hero_slides.map((s: any) => ({ title: s.title, subtitle: s.subtitle, image: getFileSrc(s.image), cta: s.cta }))
    : []
  const services: ServiceCard[] = Array.isArray(data?.services_section?.services)
    ? data.services_section.services.map((s: any) => ({ title: s.title ?? s.name, desc: s.desc ?? s.description, image: getFileSrc(s.image), icon_name: s.icon_name, items: Array.isArray(s.items) ? s.items : [] }))
    : []
  const lpSec = data?.latest_projects_section
  const latestProjects: LatestProjectCard[] = Array.isArray(lpSec?.projects)
    ? lpSec.projects.map((p: any) => ({ title: p.title, desc: p.desc ?? p.description, image: getFileSrc(p.image), tags: Array.isArray(p.tech) ? p.tech : Array.isArray(p.tags) ? p.tags : [], link: p.link ?? "/projects" }))
    : []

  const newsList = await fetchJSON<any[]>("/api/news")
  const techNews: TechNewsCard[] = Array.isArray(newsList) && newsList.length > 0
    ? newsList.slice(0, 3).map((n: any) => ({ title: n.title, desc: n.desc, image: getFileSrc(n.image), date: n.date, category: n.category, link: `/news/${n.slug}` }))
    : Array.isArray(data?.tech_news_section?.news)
      ? data.tech_news_section.news.slice(0, 3).map((n: any) => ({ title: n.title, desc: n.desc ?? n.description, image: getFileSrc(n.image), date: n.date, category: n.category, link: n.link ?? "/news" }))
      : []

  return <HomeClient roles={roles} heroSlides={heroSlides} services={services} latestProjects={latestProjects} techNews={techNews} />
}
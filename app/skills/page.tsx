"use client"

import type React from "react"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { fetchJSON, getLogoSrc } from "@/lib/api"
import {
  Code,
  Database,
  Wrench,
  Brain,
  Lightbulb,
  Users,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Award,
  Target,
} from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function SkillsPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<"data" | "software">("data")
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isUserInteracting) {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current)
      }
      interactionTimeoutRef.current = setTimeout(() => {
        setIsUserInteracting(false)
      }, 3000)
    }
    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current)
      }
    }
  }, [isUserInteracting])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
      setIsUserInteracting(true)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollContainerRef.current) {
      setIsDragging(true)
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
      setScrollLeft(scrollContainerRef.current.scrollLeft)
      setIsUserInteracting(true)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current) {
      e.preventDefault()
      scrollContainerRef.current.scrollLeft += e.deltaY
      setIsUserInteracting(true)
    }
  }

  const [skills, setSkills] = useState<Array<{ name: string; logo_url?: string }>>([])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const data = await fetchJSON<Array<any>>("/api/skills")
      if (!mounted) return
      if (data && Array.isArray(data) && data.length > 0) {
        setSkills(data.map((s) => ({ name: s.name, logo_url: s.logo_url })))
      } else {
        // Minimal fallback
        setSkills([
          { name: "Skill", logo_url: "/placeholder-logo.png" },
          { name: "Tech", logo_url: "/placeholder-logo.png" },
        ])
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const skillIcons: Record<string, any> = {
    Python: Code,
    SQL: Database,
    Pandas: Code,
    NumPy: Code,
    Matplotlib: Code,
    Streamlit: Code,
    Keras: Code,
    "Scikit-learn": Code,
    Seaborn: Code,
    TensorFlow: Code,
    PyTorch: Code,
    FastAPI: Code,
    PostgreSQL: Database,
    MongoDB: Database,
    Tableau: Code,
    "Google Looker Studio": Code,
    Git: Code,
    "Google Colaboratory": Code,
    "Jupyter Notebook": Code,
    "Visual Studio Code": Code,
    GPT: Code,
    RapidMiner: Code,
    Docker: Code,
    "MS Excel": Code,
    "Google Sheet": Code,
    "Data Cleaning and Preprocessing": Code,
    "Exploratory Data Analysis (EDA)": Code,
    "Data Extraction & Transformation": Code,
    "Statistical Analysis": Code,
    "Machine Learning Algorithms": Code,
    "Models Development": Code,
    "Deep Learning Techniques": Code,
    "Recommendation System": Code,
    "Computer Vision": Code,
    "Natural Language Processing (NLP)": Code,
    "Generative AI": Code,
    "Large Language Model": Code,
    "Prompt Engineering": Code,
    "API Development & Integrations": Code,
    "Data Science": Code,
    "Data Analyst": Code,
    "Big Data": Code,
    Pentaho: Code,
    DBMS: Code,
    RDBMS: Code,
    "Data Warehouse": Code,
    "Data Lake": Code,
    "Data Mart": Code,
    "Problem-solving": Code,
    "Analytical and Critical Thinking": Code,
    "Communication and Collaboration": Code,
    Adaptability: Code,
    Teamwork: Code,
    "Attention to Detail": Code,
    "Growth Mindset": Code,
    Creativity: Code,
    // Software Engineer Skills
    "Data Structure": Code,
    Algorithm: Code,
    "Big O": Code,
    OOP: Code,
    "Functional Programming": Code,
    "SOLID Principles": Code,
    "Version Control": Code,
    GitHub: Code,
    GitLab: Code,
    "Design Pattern": Code,
    MVC: Code,
    Factory: Code,
    Singleton: Code,
    Observer: Code,
    "Software Architecture": Code,
    Layered: Code,
    Microservices: Code,
    "Clean Architecture": Code,
    Testing: Code,
    "Unit test": Code,
    "Integration test": Code,
    "CI/CD testing": Code,
    pytest: Code,
    Jest: Code,
    Mocha: Code,
    Postman: Code,
    "Node.js": Code,
    Go: Code,
    Java: Code,
    PHP: Code,
    Django: Code,
    "Express.js": Code,
    Laravel: Code,
    "API Design": Code,
    "RESTful API": Code,
    GraphQL: Code,
    gRPC: Code,
    MySQL: Database,
    Redis: Database,
    "Authentication & Authorization": Code,
    JWT: Code,
    OAuth2: Code,
    "Session Management": Users,
    "Caching & Performance": Code,
    CDN: Code,
    "Async I/O": Code,
    "Background Processing": Code,
    Celery: Code,
    RabbitMQ: Code,
    Kafka: Code,
    "Deployment Backend": Code,
    Nginx: Code,
    Gunicorn: Code,
    HTML5: Code,
    CSS3: Code,
    "JavaScript (ES6+)": Code,
    "React.js": Code,
    "Next.js": Code,
    "Vue.js": Code,
    Svelte: Code,
    "Tailwind CSS": Code,
    Bootstrap: Code,
    ShadCN: Code,
    MUI: Code,
    "State Management": Code,
    Redux: Code,
    Zustand: Code,
    Recoil: Code,
    "Context API": Code,
    "API Integration": Code,
    Fetch: Code,
    Axios: Code,
    WebSocket: Code,
    "React Testing Library": Code,
    "Performance & SEO": Code,
    "Lazy load": Code,
    "SSR/SSG": Code,
    "Google Lighthouse": Code,
    Containerization: Code,
    Podman: Code,
    Orchestration: Code,
    "Docker Swarm": Code,
    "CI/CD": Code,
    "GitHub Actions": Code,
    "GitLab CI": Code,
    "Monitoring & Logging": Code,
    Prometheus: Code,
    Grafana: Code,
    "ELK Stack": Code,
    "Cloud Platform": Code,
    AWS: Code,
    GCP: Code,
    Azure: Code,
    DigitalOcean: Code,
    "Server Management": Code,
    Linux: Code,
    "Shell scripting": Code,
    "Infrastructure as Code": Code,
    Terraform: Code,
    Ansible: Code,
    "System Design": Code,
    Scalability: Code,
    "Load Balancing": Code,
    "Fault Tolerance": Code,
    "Architecture Pattern": Code,
    "Monolith vs Microservice": Code,
    "Event-driven": Code,
    "CI/CD Principles": Code,
    "Testing Strategy": Code,
    Unit: Code,
    Integration: Code,
    Regression: Code,
    "Load Test": Code,
    "Agile / Scrum": Code,
    "Sprint Planning": Code,
    "Iterasi Cepat": Code,
    "Code Quality & Review": Code,
    Refactoring: Code,
    "Static Analysis": Code,
    SonarQube: Code,
    ESLint: Code,
    Documentation: Code,
    Swagger: Code,
    Markdown: Code,
    Notion: Code,
    "Project Management": Code,
    Jira: Code,
    ClickUp: Code,
    Trello: Code,
    Communication: Code,
    Slack: Code,
    Discord: Code,
    "Microsoft Teams": Code,
    "Documentation & Design": Code,
    Figma: Code,
    Miro: Code,
    "Problem Solving": Code,
    Debugging: Code,
    "Analytical Thinking": Code,
    "Versioning & Branching": Code,
    GitFlow: Code,
    "trunk-based development": Code,
    "API Documentation": Code,
    "Postman Collections": Code,
    "Security Awareness": Code,
    OWASP: Code,
    Encryption: Code,
    "SQL Injection": Code,
    "Data Engineering Basic": Code,
    ETL: Code,
    "Pipeline Data": Code,
    Airflow: Code,
    dbt: Code,
    "Machine Learning Integration": Code,
    MLflow: Code,
    "Automation & Scripting": Code,
    Bash: Code,
    "Python Automation": Code,
    "Performance Optimization": Code,
    Profiling: Code,
    "Load Balancer": Code,
  }

  const dataEngineerSkills = [
    {
      icon: Code,
      title: t("skills.programming"),
      skills: ["Python", "SQL", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    },
    {
      icon: Brain,
      title: t("skills.ml"),
      skills: [
        "Data Cleaning and Preprocessing",
        "Exploratory Data Analysis (EDA)",
        "Data Extraction & Transformation",
        "Statistical Analysis",
        "Machine Learning Algorithms",
        "Models Development",
        "Deep Learning Techniques",
        "Recommendation System",
        "Computer Vision",
        "Natural Language Processing (NLP)",
      ],
    },
    {
      icon: Wrench,
      title: t("skills.tools"),
      skills: [
        "Tableau",
        "Google Looker Studio",
        "Jupyter Notebook",
        "Google Colaboratory",
        "RapidMiner",
        "MS Excel",
        "Google Sheet",
        "GPT",
      ],
    },
    {
      icon: Lightbulb,
      title: t("skills.other"),
      skills: [
        "Generative AI",
        "Large Language Model",
        "Prompt Engineering",
        "Data Science",
        "Data Analyst",
        "Big Data",
        "Pentaho",
      ],
    },
    {
      icon: Database,
      title: t("skills.databases"),
      skills: ["SQL", "PostgreSQL", "MongoDB", "DBMS", "RDBMS", "Data Warehouse", "Data Lake", "Data Mart"],
    },
    {
      icon: Users,
      title: "Soft Skills",
      skills: [
        "Problem-solving",
        "Analytical and Critical Thinking",
        "Communication and Collaboration",
        "Adaptability",
        "Teamwork",
        "Attention to Detail",
        "Growth Mindset",
        "Creativity",
      ],
    },
  ]

  const softwareEngineerSkills = [
    {
      icon: Code,
      title: t("skills.fundamentals"),
      skills: [
        "Data Structure",
        "Algorithm",
        "Big O",
        "OOP",
        "Functional Programming",
        "SOLID Principles",
        "Version Control",
        "Git",
        "GitHub",
        "GitLab",
        "Design Pattern",
        "MVC",
        "Factory",
        "Singleton",
        "Observer",
        "Software Architecture",
        "Layered",
        "Microservices",
        "Clean Architecture",
        "Testing",
        "Unit test",
        "Integration test",
        "CI/CD testing",
        "pytest",
        "Jest",
        "Mocha",
        "Postman",
      ],
    },
    {
      icon: Code,
      title: t("skills.backend"),
      skills: [
        "Python",
        "Node.js",
        "Go",
        "Java",
        "PHP",
        "Django",
        "FastAPI",
        "Express.js",
        "Laravel",
        "RESTful API",
        "GraphQL",
        "gRPC",
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Redis",
        "JWT",
        "OAuth2",
        "Session Management",
        "Caching & Performance",
        "CDN",
        "Async I/O",
        "Celery",
        "RabbitMQ",
        "Kafka",
        "Docker",
        "Nginx",
        "Gunicorn",
      ],
    },
    {
      icon: Code,
      title: t("skills.frontend"),
      skills: [
        "HTML5",
        "CSS3",
        "JavaScript (ES6+)",
        "React.js",
        "Next.js",
        "Vue.js",
        "Svelte",
        "Tailwind CSS",
        "Bootstrap",
        "ShadCN",
        "MUI",
        "Redux",
        "Zustand",
        "Recoil",
        "Context API",
        "Fetch",
        "Axios",
        "WebSocket",
        "Jest",
        "React Testing Library",
        "Lazy load",
        "SSR/SSG",
        "Google Lighthouse",
      ],
    },
    {
      icon: Code,
      title: t("skills.devops"),
      skills: [
        "Docker",
        "Podman",
        "Kubernetes",
        "Docker Swarm",
        "GitHub Actions",
        "Jenkins",
        "GitLab CI",
        "Prometheus",
        "Grafana",
        "ELK Stack",
        "AWS",
        "GCP",
        "Azure",
        "DigitalOcean",
        "Linux",
        "Shell scripting",
        "Nginx",
        "Terraform",
        "Ansible",
      ],
    },
    {
      icon: Code,
      title: t("skills.concepts"),
      skills: [
        "System Design",
        "Scalability",
        "Load Balancing",
        "Fault Tolerance",
        "Monolith vs Microservice",
        "Event-driven",
        "CI/CD Principles",
        "Unit",
        "Integration",
        "Regression",
        "Load Test",
        "Agile / Scrum",
        "Sprint Planning",
        "Refactoring",
        "Static Analysis",
        "SonarQube",
        "ESLint",
        "Swagger",
        "Markdown",
        "Notion",
      ],
    },
    {
      icon: Code,
      title: t("skills.professional"),
      skills: [
        "Project Management",
        "Jira",
        "ClickUp",
        "Trello",
        "Notion",
        "Slack",
        "Discord",
        "Microsoft Teams",
        "Figma",
        "Miro",
        "Problem Solving",
        "Debugging",
        "Analytical Thinking",
        "GitFlow",
        "trunk-based development",
        "Swagger",
        "Postman Collections",
      ],
    },
    {
      icon: Code,
      title: t("skills.other"),
      skills: [
        "Security Awareness",
        "OWASP",
        "Encryption",
        "SQL Injection",
        "ETL",
        "Pipeline Data",
        "Airflow",
        "dbt",
        "Pandas",
        "Machine Learning Integration",
        "TensorFlow",
        "FastAPI",
        "MLflow",
        "Bash",
        "Python Automation",
        "Profiling",
        "Load Balancer",
        "CDN",
      ],
    },
  ]

  const skillCategories = activeTab === "data" ? dataEngineerSkills : softwareEngineerSkills

  const statsData = [
    {
      title: "Total Skills",
      value: activeTab === "data" ? "85+" : "120+",
      icon: Award,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Years Experience",
      value: "3+",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Projects Completed",
      value: "50+",
      icon: Target,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Technologies",
      value: "75+",
      icon: Code,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ]

  const proficiencyData =
    activeTab === "data"
      ? [
          { skill: "Python", proficiency: 95 },
          { skill: "SQL", proficiency: 90 },
          { skill: "Machine Learning", proficiency: 88 },
          { skill: "Deep Learning", proficiency: 85 },
          { skill: "Data Visualization", proficiency: 92 },
          { skill: "Statistical Analysis", proficiency: 87 },
        ]
      : [
          { skill: "JavaScript", proficiency: 92 },
          { skill: "React/Next.js", proficiency: 90 },
          { skill: "Node.js", proficiency: 88 },
          { skill: "System Design", proficiency: 85 },
          { skill: "DevOps", proficiency: 82 },
          { skill: "API Development", proficiency: 90 },
        ]

  const categoryDistribution =
    activeTab === "data"
      ? [
          { name: "Programming", value: 25 },
          { name: "ML/AI", value: 30 },
          { name: "Tools", value: 20 },
          { name: "Databases", value: 15 },
          { name: "Soft Skills", value: 10 },
        ]
      : [
          { name: "Backend", value: 30 },
          { name: "Frontend", value: 25 },
          { name: "DevOps", value: 20 },
          { name: "Concepts", value: 15 },
          { name: "Professional", value: 10 },
        ]

  const radarData =
    activeTab === "data"
      ? [
          { subject: "Programming", A: 95, fullMark: 100 },
          { subject: "ML/AI", A: 88, fullMark: 100 },
          { subject: "Data Analysis", A: 92, fullMark: 100 },
          { subject: "Visualization", A: 90, fullMark: 100 },
          { subject: "Big Data", A: 80, fullMark: 100 },
          { subject: "Statistics", A: 87, fullMark: 100 },
        ]
      : [
          { subject: "Backend", A: 90, fullMark: 100 },
          { subject: "Frontend", A: 92, fullMark: 100 },
          { subject: "DevOps", A: 82, fullMark: 100 },
          { subject: "System Design", A: 85, fullMark: 100 },
          { subject: "Testing", A: 88, fullMark: 100 },
          { subject: "Security", A: 80, fullMark: 100 },
        ]

  const growthData = [
    { month: "Jan", skills: 65 },
    { month: "Feb", skills: 70 },
    { month: "Mar", skills: 75 },
    { month: "Apr", skills: 82 },
    { month: "May", skills: 88 },
    { month: "Jun", skills: 95 },
  ]

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

  return (
    <div className="min-h-screen px-6 pt-32 pb-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 animate-in fade-in duration-1000">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-balance">{t("skills.title")}</h1>
        </div>

        {/* Mini Navbar */}
        <div className="flex justify-center animate-in slide-in-from-top duration-700">
          <div className="inline-flex items-center gap-1.5 p-0.5 bg-muted/40 backdrop-blur-sm rounded-full border border-border/40">
            <button
              onClick={() => setActiveTab("data")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                activeTab === "data"
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("skills.dataEngineer")}
            </button>
            <button
              onClick={() => setActiveTab("software")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                activeTab === "software"
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("skills.softwareEngineer")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in slide-in-from-top duration-700">
          {statsData.map((stat, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        

        {/* Technology Stack */}
        <div className="animate-in slide-in-from-bottom duration-700 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-serif font-bold">Technology Stack</h2>
            <p className="text-muted-foreground">
              {t("skills.techStackSubtitle") || "Tools and technologies I work with"}
            </p>
          </div>

          <div className="relative group">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            {/* Scroll buttons */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Scrollable container */}
            <div
              ref={scrollContainerRef}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              className={`overflow-hidden py-8 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            >
              <div
                className={`flex gap-8 ${!isUserInteracting ? "animate-scroll" : ""}`}
                onMouseEnter={() => setIsUserInteracting(true)}
                onMouseLeave={() => setIsUserInteracting(false)}
              >
                {/* First set of logos (dynamic from backend) */}
                {skills.map((tech, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 flex flex-col items-center gap-3 group cursor-pointer"
                  >
                    <div className="relative w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 bg-background/50 backdrop-blur-sm rounded-xl p-3 border border-border/50">
                      <Image
                        src={getLogoSrc(tech.logo_url)}
                        alt={`${tech.name} logo`}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-xs font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                      {tech.name}
                    </span>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {skills.map((tech, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 flex flex-col items-center gap-3 group cursor-pointer"
                  >
                    <div className="relative w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 bg-background/50 backdrop-blur-sm rounded-xl p-3 border border-border/50">
                      <Image
                        src={getLogoSrc(tech.logo_url)}
                        alt={`${tech.name} logo`}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-xs font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="animate-in slide-in-from-bottom duration-700 hover:shadow-lg transition-all"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-lg">{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => {
                    const SkillIcon = skillIcons[skill] || Code
                    return (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="text-sm flex items-center gap-1.5 px-3 py-1.5"
                      >
                        <SkillIcon className="h-3.5 w-3.5" />
                        <span>{skill}</span>
                      </Badge>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
      `}</style>
    </div>
  )
}

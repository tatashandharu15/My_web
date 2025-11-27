"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "id"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.resume": "Resume",
    "nav.projects": "Projects",
    "nav.news": "News",
    "nav.services": "Services", // Added Services navigation
    "nav.contact": "Contact",

    // Home Page
    "home.welcome": "Welcome to my portfolio",
    "home.greeting": "Hi, I'm",
    "home.roles": "Data Scientist | AI Engineer | Software Engineer | Full-Stack Developer",
    "home.tagline":
      "Driven by data and inspired by innovation. Building intelligent systems that transform data into meaningful impact.",
    "home.viewWork": "View My Work",
    "home.getInTouch": "Get In Touch",
    "home.connect": "Connect with me",
    "home.feature1.title": "AI & Data Science",
    "home.feature1.desc": "Building machine learning and deep learning models for intelligent automation.",
    "home.feature2.title": "Software Engineering",
    "home.feature2.desc": "Designing scalable backend systems and APIs for real-world AI integration.",
    "home.feature3.title": "Full-Stack Development",
    "home.feature3.desc": "Creating seamless web experiences from backend logic to frontend design.",
    "home.newProject.title": "Latest Project",
    "home.newProject.subtitle": "Check out my most recent AI & data engineering work",
    "home.newProject.projectTitle": "AI-Powered Stock Price Prediction System",
    "home.newProject.projectDesc":
      "Developed a comprehensive LSTM-based system for predicting Indonesia Stock Exchange (IDX) prices with high accuracy. The system includes real-time data processing, advanced feature engineering, and an interactive dashboard for visualization.",
    "home.newProject.viewProject": "View Project",
    "home.newProject.viewCode": "View Code",
    "home.newProject.imageAlt": "Project Preview",

    // Latest Projects Section
    "home.latestProjects.title": "Latest Projects",
    "home.latestProjects.subtitle": "Recent work showcasing my expertise in AI and software development",
    "home.latestProjects.project1.title": "AI Stock Price Prediction",
    "home.latestProjects.project1.desc":
      "LSTM-based system for predicting Indonesia Stock Exchange prices with real-time data processing and interactive visualization dashboard.",
    "home.latestProjects.project2.title": "NLP Sentiment Analysis",
    "home.latestProjects.project2.desc":
      "Advanced sentiment analysis tool using transformer models to analyze customer feedback and social media sentiment at scale.",
    "home.latestProjects.project3.title": "Full-Stack Analytics Dashboard",
    "home.latestProjects.project3.desc":
      "Modern web application built with Next.js and React for real-time business analytics and data visualization.",
    "home.latestProjects.readMore": "Read More",
    "home.latestProjects.viewAll": "View All Projects",

    // Tech News Section
    "home.techNews.title": "Tech Industry News",
    "home.techNews.subtitle": "Stay updated with the latest trends in AI, data science, and software engineering",
    "home.techNews.news1.title": "AI Breakthroughs in 2025: What's Next?",
    "home.techNews.news1.desc":
      "Exploring the latest advancements in artificial intelligence, from GPT-5 to multimodal AI systems transforming industries.",
    "home.techNews.news1.date": "January 15, 2025",
    "home.techNews.news1.category": "Artificial Intelligence",
    "home.techNews.news2.title": "The Future of Data Engineering",
    "home.techNews.news2.desc":
      "How modern data engineering practices are evolving with real-time processing, streaming architectures, and cloud-native solutions.",
    "home.techNews.news2.date": "January 10, 2025",
    "home.techNews.news2.category": "Data Engineering",
    "home.techNews.news3.title": "LLM Applications in Enterprise",
    "home.techNews.news3.desc":
      "Practical applications of large language models in business: from customer service automation to intelligent document processing.",
    "home.techNews.news3.date": "January 5, 2025",
    "home.techNews.news3.category": "Machine Learning",
    "home.techNews.readMore": "Read More",
    "home.techNews.viewAll": "View All News",

    // About Page
    "about.pageTitle": "Get to Know Me",
    "about.pageSubtitle": "Bridging AI research and real-world engineering",
    "about.inShort": "In Short",
    "about.inShortText":
      "I'm a Data Scientist who codes like a Software Engineer, and a Software Engineer who thinks like a Data Scientist.",
    "about.mission": "My Mission",
    "about.missionText":
      "To design, build, and deploy intelligent systems that empower people and businesses through data and AI.",
    "about.intro": "Hello! I'm Tatas Handharu Sworo",
    "about.introText":
      "A professional Data Scientist and Software Engineer currently working in the technology industry. I specialize in Data Science, Machine Learning, Deep Learning, AI Engineering, and Full-Stack Software Development. My work bridges the gap between AI research and real-world engineering — transforming data into scalable, production-ready systems.",
    "about.expertise": "Technical Expertise",
    "about.expertiseText":
      "Python, SQL, JavaScript, FastAPI, Django, React, Next.js, TensorFlow, PyTorch, LangChain, Docker, PostgreSQL, AWS, and more. I combine data science with software engineering to build intelligent, scalable systems.",
    "about.build": "What I Build",
    "about.buildText":
      "AI-powered web applications, machine learning pipelines, LLM-based assistants, full-stack dashboards, and production-ready data systems that solve real-world problems.",
    "about.drives": "What Drives Me",
    "about.drivesText":
      "I'm passionate about merging data and software — building intelligent systems that learn, adapt, and scale. I believe in creating technology that makes a meaningful impact.",
    "about.education": "Education",
    "about.experience": "Experience",
    "about.interests": "Interests",
    "about.interestsText":
      "I enjoy exploring new technologies, contributing to open-source projects, reading, hiking, and photography. Always learning, always building.",

    // Skills Page
    "skills.title": "Skills & Expertise",
    "skills.subtitle": "Technologies and tools I work with",
    "skills.techStackSubtitle": "Tools and technologies I work with",
    "skills.dataEngineer": "Data Engineer & Scientist",
    "skills.softwareEngineer": "Software Engineer & Developer",
    "skills.ml": "Machine Learning",
    "skills.dl": "Deep Learning",
    "skills.programming": "Programming Languages",
    "skills.frameworks": "Frameworks & Libraries",
    "skills.tools": "Tools & Platforms",
    "skills.databases": "Databases",
    "skills.cloud": "Cloud & DevOps",
    "skills.other": "Other Skills",
    "skills.fundamentals": "Fundamental Skills",
    "skills.backend": "Backend Development",
    "skills.frontend": "Frontend Development",
    "skills.devops": "DevOps & System Engineering",
    "skills.concepts": "Software Engineering Concepts",
    "skills.professional": "Professional & Collaboration",
    "skills.bonus": "Bonus Skills",

    // Resume Page
    "resume.title": "Resume",
    "resume.subtitle": "My professional journey",
    "resume.download": "Download Resume",
    "resume.education": "Education",
    "resume.experience": "Experience",
    "resume.certifications": "Certifications",
    "resume.publications": "Publications",
    "resume.degree": "Bachelor of Informatics",
    "resume.university": "University of Technology Yogyakarta",
    "resume.graduationYear": "2021 - 2025",
    "resume.gpa": "GPA: 3.49/4.00",
    "resume.position1": "Data Scientist",
    "resume.company1": "SIBERINDO",
    "resume.period1": "April 2025 - Present",
    "resume.desc1":
      "Spearheading the development and deployment of machine learning models for classification, prediction, and process automation. Conducting advanced EDA, designing prompts for LLMs, building RESTful APIs with FastAPI and Streamlit, and architecting end-to-end ML solutions.",
    "resume.position2": "Assistant Lecturer",
    "resume.company2": "University of Technology Yogyakarta",
    "resume.period2": "January 2024 - June 2024",
    "resume.desc2":
      "Teaching assistant for Big Data Analytics, Object-Oriented Programming, Information Technology Applications, Coding & Machine Learning, and Machine Learning courses. Guiding students in data processing with RapidMiner, Excel, Python, and SQL.",
    "resume.position3": "Big Data Analytics Intern",
    "resume.company3": "PT Kimia Farma",
    "resume.period3": "December 2024 - February 2025",
    "resume.desc3":
      "Studied data warehouse, data lake, and data mart concepts. Created interactive dashboards for pharmaceutical company data using Google Data Studio and worked with DBMS/RDBMS using SQL.",
    "resume.position4": "Data Science Intern",
    "resume.company4": "PT ID/X Partners",
    "resume.period4": "September 2024 - December 2024",
    "resume.desc4":
      "Built machine learning models for predictive analytics, conducted EDA using Python and SQL, and explored data preprocessing techniques including cleaning, transformation, and feature engineering.",

    // Projects Page
    "projects.title": "My Projects",
    "projects.subtitle": "Showcasing my work in data science and AI",
    "projects.dataScience": "Data Science & AI",
    "projects.softwareEngineering": "Software Engineering",
    "projects.viewProject": "View Project",
    "projects.viewCode": "View Code",
    "projects.loadMore": "Load More Projects",
    "projects.project1.title": "Customer Churn Prediction",
    "projects.project1.desc":
      "Built a machine learning model to predict customer churn with 92% accuracy using ensemble methods and feature engineering.",
    "projects.project2.title": "Image Classification System",
    "projects.project2.desc":
      "Developed a deep learning CNN model for multi-class image classification achieving 95% accuracy on test data.",
    "projects.project3.title": "Sentiment Analysis Tool",
    "projects.project3.desc":
      "Created an NLP-based sentiment analysis tool using transformers to analyze customer reviews and feedback.",
    "projects.project4.title": "Sales Forecasting Dashboard",
    "projects.project4.desc":
      "Built an interactive dashboard with time series forecasting models to predict sales trends and patterns.",
    "projects.project5.title": "Recommendation Engine",
    "projects.project5.desc":
      "Implemented a collaborative filtering recommendation system for personalized product suggestions.",
    "projects.project6.title": "Anomaly Detection System",
    "projects.project6.desc":
      "Developed an unsupervised learning system to detect anomalies in network traffic and security logs.",
    "projects.software1.title": "Portfolio Website",
    "projects.software1.desc":
      "Built a modern, responsive portfolio website using Next.js, React, and Tailwind CSS with dark mode support.",
    "projects.software2.title": "Backend RESTful API",
    "projects.software2.desc":
      "Developed a scalable REST API using FastAPI and PostgreSQL with authentication, rate limiting, and comprehensive documentation.",
    "projects.software3.title": "Task Management App",
    "projects.software3.desc":
      "Created a full-stack task management application with real-time updates using React, Node.js, and MongoDB.",
    "projects.software4.title": "Data Visualization Dashboard",
    "projects.software4.desc":
      "Built an interactive data visualization dashboard using Streamlit and Plotly for business analytics.",
    "projects.software5.title": "DevOps Automation Pipeline",
    "projects.software5.desc":
      "Implemented CI/CD pipeline with Docker, Kubernetes, and GitHub Actions for automated testing and deployment.",
    "projects.software6.title": "E-commerce Platform",
    "projects.software6.desc":
      "Developed a full-featured e-commerce platform with payment integration using Next.js, Stripe, and Prisma.",

    // Contact Page
    "contact.title": "Get In Touch",
    "contact.subtitle": "Let's work together on your next project",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.success": "Message sent successfully!",
    "contact.successMessage": "Thank you for reaching out! I'll get back to you as soon as possible.",
    "contact.close": "Close",
    "contact.error": "Failed to send message. Please try again.",
    "contact.info": "Contact Information",
    "contact.location": "Location",
    "contact.locationValue": "Jakarta, Indonesia",
    "contact.phone": "Phone",
    "contact.phoneValue": "+62 851 5610 5762",
    "contact.emailLabel": "Email",
    "contact.emailValue": "tatas.handharu@gmail.com",
    "contact.social": "Social Media",

    // Footer
    "footer.tagline": "Building intelligent solutions with data",
    "footer.quickLinks": "Quick Links",
    "footer.connect": "Connect",
    "footer.rights": "All rights reserved",

    // Navbar tooltips
    "tooltip.nav.home": "Go to homepage",
    "tooltip.nav.about": "Learn about me",
    "tooltip.nav.skills": "View my skills",
    "tooltip.nav.resume": "See my resume",
    "tooltip.nav.projects": "Browse projects",
    "tooltip.nav.news": "Browse news",
    "tooltip.nav.services": "View services", // Added Services tooltip
    "tooltip.nav.contact": "Get in touch",

    // Button tooltips
    "tooltip.button.viewWork": "Explore my portfolio",
    "tooltip.button.contact": "Send me a message",
    "tooltip.button.github": "View my GitHub profile",
    "tooltip.button.linkedin": "Connect on LinkedIn",
    "tooltip.button.email": "Send me an email",
    "tooltip.button.phone": "Call me directly",

    // Services section translations
    "home.services.title": "Services",
    "home.services.subtitle": "How I can help bring your ideas to life",
    "home.services.service1.title": "AI & Machine Learning",
    "home.services.service1.desc": "Building intelligent systems that learn from data and make accurate predictions.",
    "home.services.service1.item1": "Custom ML model development",
    "home.services.service1.item2": "Deep learning & neural networks",
    "home.services.service1.item3": "NLP & computer vision solutions",
    "home.services.service2.title": "Data Analytics & Visualization",
    "home.services.service2.desc": "Transforming raw data into actionable insights through powerful analytics.",
    "home.services.service2.item1": "Interactive dashboards & reports",
    "home.services.service2.item2": "Statistical analysis & forecasting",
    "home.services.service2.item3": "Business intelligence solutions",
    "home.services.service3.title": "Software & API Development",
    "home.services.service3.desc": "Creating scalable, production-ready applications and APIs.",
    "home.services.service3.item1": "RESTful API development",
    "home.services.service3.item2": "Full-stack web applications",
    "home.services.service3.item3": "Cloud deployment & DevOps",

    // News Page
    "news.title": "Tech Industry News",
    "news.subtitle": "Stay updated with the latest trends in AI, data science, and software engineering",
    "news.backHome": "Back to Home",
    "news.readMore": "Read More",
    "news.backToNews": "Back to News",
    "news.share": "Share Article",
    "news.article1.content": `Artificial Intelligence continues to evolve at an unprecedented pace in 2025. The latest breakthroughs in large language models, particularly GPT-5 and its competitors, are pushing the boundaries of what's possible with AI.

Key developments include:

• Multimodal AI systems that seamlessly integrate text, images, video, and audio processing
• Improved reasoning capabilities that allow AI to tackle complex problem-solving tasks
• Enhanced efficiency with smaller, more powerful models that can run on edge devices
• Better alignment with human values through advanced RLHF techniques

The impact on industries is profound. Healthcare is seeing AI-powered diagnostic tools with near-human accuracy. Finance is leveraging AI for fraud detection and risk assessment. Manufacturing is implementing AI-driven predictive maintenance systems.

However, challenges remain. Ethical considerations around AI deployment, data privacy concerns, and the need for transparent AI decision-making processes are at the forefront of industry discussions.

As we move forward, the focus is shifting from "Can AI do this?" to "How can we responsibly integrate AI into our systems?" The future of AI is not just about technological advancement, but about creating systems that augment human capabilities while maintaining ethical standards.`,
    "news.article2.content": `Data engineering is undergoing a fundamental transformation as organizations demand real-time insights and scalable data infrastructure. The traditional batch processing paradigm is giving way to streaming-first architectures.

Modern data engineering practices include:

• Real-time data pipelines using Apache Kafka, Flink, and Pulsar
• Cloud-native data platforms leveraging AWS, GCP, and Azure services
• Data mesh architectures that decentralize data ownership
• DataOps practices for continuous integration and deployment of data pipelines
• Advanced data quality monitoring and observability tools

The rise of the lakehouse architecture is bridging the gap between data lakes and data warehouses, offering the best of both worlds. Technologies like Delta Lake, Apache Iceberg, and Apache Hudi are enabling ACID transactions on data lakes.

Machine learning operations (MLOps) are becoming integral to data engineering workflows. Data engineers are now responsible for building pipelines that not only process data but also serve ML models in production.

The skill set required for modern data engineers is expanding. Beyond SQL and Python, proficiency in distributed systems, cloud platforms, and containerization technologies like Docker and Kubernetes is becoming essential.

Looking ahead, the focus is on building self-service data platforms that empower data scientists and analysts while maintaining governance and security standards.`,
    "news.article3.content": `Large Language Models (LLMs) are moving beyond chatbots and content generation into mission-critical enterprise applications. Organizations are discovering innovative ways to leverage LLMs for business value.

Key enterprise applications include:

• Intelligent document processing and information extraction
• Automated customer service with context-aware responses
• Code generation and software development assistance
• Business intelligence through natural language queries
• Knowledge management and enterprise search

The challenge lies in making LLMs reliable and trustworthy for enterprise use. Techniques like Retrieval-Augmented Generation (RAG) are helping ground LLM responses in factual data, reducing hallucinations and improving accuracy.

Fine-tuning LLMs on domain-specific data is becoming more accessible. Organizations are creating specialized models that understand their industry jargon, business processes, and regulatory requirements.

Security and privacy considerations are paramount. Enterprises are implementing on-premises LLM deployments, using techniques like differential privacy, and establishing clear data governance policies.

The cost of running LLMs is decreasing with more efficient architectures and quantization techniques. This is making LLM adoption feasible for mid-sized companies, not just tech giants.

As LLMs mature, we're seeing a shift from general-purpose models to specialized, task-specific models that excel in particular domains. The future of enterprise AI is about choosing the right model for the right task, not just using the biggest model available.`,
  },
  id: {
    // Navigation
    "nav.home": "Beranda",
    "nav.about": "Tentang",
    "nav.skills": "Keahlian",
    "nav.resume": "Resume",
    "nav.projects": "Proyek",
    "nav.news": "Berita",
    "nav.services": "Layanan", // Added Services navigation in Indonesian
    "nav.contact": "Kontak",

    // Home Page
    "home.welcome": "Selamat datang di portofolio saya",
    "home.greeting": "Halo, saya",
    "home.roles": "Data Scientist | AI Engineer | Software Engineer | Full-Stack Developer",
    "home.tagline":
      "Didorong oleh data dan terinspirasi oleh inovasi. Membangun sistem cerdas yang mengubah data menjadi dampak yang bermakna.",
    "home.viewWork": "Lihat Karya Saya",
    "home.getInTouch": "Hubungi Saya",
    "home.connect": "Terhubung dengan saya",
    "home.feature1.title": "AI & Data Science",
    "home.feature1.desc": "Membangun model machine learning dan deep learning untuk otomasi cerdas.",
    "home.feature2.title": "Software Engineering",
    "home.feature2.desc": "Merancang sistem backend yang scalable dan API untuk integrasi AI dunia nyata.",
    "home.feature3.title": "Full-Stack Development",
    "home.feature3.desc": "Menciptakan pengalaman web yang seamless dari logika backend hingga desain frontend.",
    "home.newProject.title": "Proyek Terbaru",
    "home.newProject.subtitle": "Lihat karya terbaru saya di bidang AI & data engineering",
    "home.newProject.projectTitle": "Sistem Prediksi Harga Saham Berbasis AI",
    "home.newProject.projectDesc":
      "Mengembangkan sistem berbasis LSTM yang komprehensif untuk memprediksi harga saham Bursa Efek Indonesia (BEI) dengan akurasi tinggi. Sistem ini mencakup pemrosesan data real-time, feature engineering tingkat lanjut, dan dashboard interaktif untuk visualisasi.",
    "home.newProject.viewProject": "Lihat Proyek",
    "home.newProject.viewCode": "Lihat Kode",
    "home.newProject.imageAlt": "Pratinjau Proyek",

    // Latest Projects Section (Indonesian)
    "home.latestProjects.title": "Proyek Terbaru",
    "home.latestProjects.subtitle":
      "Karya terbaru yang menampilkan keahlian saya di bidang AI dan pengembangan software",
    "home.latestProjects.project1.title": "Prediksi Harga Saham AI",
    "home.latestProjects.project1.desc":
      "Sistem berbasis LSTM untuk memprediksi harga saham Bursa Efek Indonesia dengan pemrosesan data real-time dan dashboard visualisasi interaktif.",
    "home.latestProjects.project2.title": "Analisis Sentimen NLP",
    "home.latestProjects.project2.desc":
      "Tool analisis sentimen canggih menggunakan model transformer untuk menganalisis feedback pelanggan dan sentimen media sosial dalam skala besar.",
    "home.latestProjects.project3.title": "Dashboard Analitik Full-Stack",
    "home.latestProjects.project3.desc":
      "Aplikasi web modern yang dibangun dengan Next.js dan React untuk analitik bisnis real-time dan visualisasi data.",
    "home.latestProjects.readMore": "Baca Selengkapnya",
    "home.latestProjects.viewAll": "Lihat Semua Proyek",

    // Tech News Section (Indonesian)
    "home.techNews.title": "Berita Industri Teknologi",
    "home.techNews.subtitle": "Tetap update dengan tren terbaru di AI, data science, dan software engineering",
    "home.techNews.news1.title": "Terobosan AI di 2025: Apa Selanjutnya?",
    "home.techNews.news1.desc":
      "Menjelajahi kemajuan terbaru dalam kecerdasan buatan, dari GPT-5 hingga sistem AI multimodal yang mengubah industri.",
    "home.techNews.news1.date": "15 Januari 2025",
    "home.techNews.news1.category": "Kecerdasan Buatan",
    "home.techNews.news2.title": "Masa Depan Data Engineering",
    "home.techNews.news2.desc":
      "Bagaimana praktik data engineering modern berkembang dengan pemrosesan real-time, arsitektur streaming, dan solusi cloud-native.",
    "home.techNews.news2.date": "10 Januari 2025",
    "home.techNews.news2.category": "Data Engineering",
    "home.techNews.news3.title": "Aplikasi LLM di Perusahaan",
    "home.techNews.news3.desc":
      "Aplikasi praktis large language models dalam bisnis: dari otomasi layanan pelanggan hingga pemrosesan dokumen cerdas.",
    "home.techNews.news3.date": "5 Januari 2025",
    "home.techNews.news3.category": "Machine Learning",
    "home.techNews.readMore": "Baca Selengkapnya",
    "home.techNews.viewAll": "Lihat Semua Berita",

    // About Page
    "about.pageTitle": "Mari Mengenal Saya",
    "about.pageSubtitle": "Menjembatani riset AI dan rekayasa dunia nyata",
    "about.inShort": "Singkatnya",
    "about.inShortText":
      "Saya adalah Data Scientist yang coding seperti Software Engineer, dan Software Engineer yang berpikir seperti Data Scientist.",
    "about.mission": "Misi Saya",
    "about.missionText":
      "Merancang, membangun, dan men-deploy sistem cerdas yang memberdayakan orang dan bisnis melalui data dan AI.",
    "about.intro": "Halo! Saya Tatas Handharu Sworo",
    "about.introText":
      "Seorang Data Scientist dan Software Engineer profesional yang saat ini bekerja di industri teknologi. Saya berspesialisasi dalam Data Science, Machine Learning, Deep Learning, AI Engineering, dan Full-Stack Software Development. Pekerjaan saya menjembatani kesenjangan antara riset AI dan rekayasa dunia nyata — mengubah data menjadi sistem yang scalable dan siap produksi.",
    "about.expertise": "Keahlian Teknis",
    "about.expertiseText":
      "Python, SQL, JavaScript, FastAPI, Django, React, Next.js, TensorFlow, PyTorch, LangChain, Docker, PostgreSQL, AWS, dan lainnya. Saya menggabungkan data science dengan software engineering untuk membangun sistem cerdas yang scalable.",
    "about.build": "Apa yang Saya Bangun",
    "about.buildText":
      "Aplikasi web berbasis AI, pipeline machine learning, asisten berbasis LLM, dashboard full-stack, dan sistem data siap produksi yang menyelesaikan masalah dunia nyata.",
    "about.drives": "Apa yang Mendorong Saya",
    "about.drivesText":
      "Saya bersemangat menggabungkan data dan software — membangun sistem cerdas yang belajar, beradaptasi, dan berkembang. Saya percaya dalam menciptakan teknologi yang memberikan dampak bermakna.",
    "about.education": "Pendidikan",
    "about.experience": "Pengalaman",
    "about.interests": "Minat",
    "about.interestsText":
      "Saya senang menjelajahi teknologi baru, berkontribusi pada proyek open-source, membaca, mendaki, dan fotografi. Selalu belajar, selalu membangun.",

    // Skills Page
    "skills.title": "Keahlian & Expertise",
    "skills.subtitle": "Teknologi dan alat yang saya gunakan",
    "skills.techStackSubtitle": "Tools dan teknologi yang saya gunakan",
    "skills.dataEngineer": "Data Engineer & Scientist",
    "skills.softwareEngineer": "Software Engineer & Developer",
    "skills.ml": "Machine Learning",
    "skills.dl": "Deep Learning",
    "skills.programming": "Bahasa Pemrograman",
    "skills.frameworks": "Framework & Library",
    "skills.tools": "Tools & Platform",
    "skills.databases": "Database",
    "skills.cloud": "Cloud & DevOps",
    "skills.other": "Keahlian Lainnya",
    "skills.fundamentals": "Keahlian Fundamental",
    "skills.backend": "Pengembangan Backend",
    "skills.frontend": "Pengembangan Frontend",
    "skills.devops": "DevOps & System Engineering",
    "skills.concepts": "Konsep Software Engineering",
    "skills.professional": "Profesional & Kolaborasi",
    "skills.bonus": "Keahlian Bonus",

    // Resume Page
    "resume.title": "Resume",
    "resume.subtitle": "Perjalanan profesional saya",
    "resume.download": "Unduh Resume",
    "resume.education": "Pendidikan",
    "resume.experience": "Pengalaman",
    "resume.certifications": "Sertifikasi",
    "resume.publications": "Publikasi",
    "resume.degree": "Sarjana Informatika",
    "resume.university": "Universitas Teknologi Yogyakarta",
    "resume.graduationYear": "2021 - 2025",
    "resume.gpa": "IPK: 3.49/4.00",
    "resume.position1": "Data Scientist",
    "resume.company1": "SIBERINDO",
    "resume.period1": "April 2025 - Sekarang",
    "resume.desc1":
      "Memimpin pengembangan dan deployment model machine learning untuk klasifikasi, prediksi, dan otomasi proses. Melakukan EDA tingkat lanjut, merancang prompt untuk LLM, membangun RESTful API dengan FastAPI dan Streamlit, serta merancang solusi ML end-to-end.",
    "resume.position2": "Asisten Dosen",
    "resume.company2": "Universitas Teknologi Yogyakarta",
    "resume.period2": "Januari 2024 - Juni 2024",
    "resume.desc2":
      "Asisten pengajar untuk mata kuliah Big Data Analytics, Pemrograman Berorientasi Objek, Aplikasi Teknologi Informasi, Coding & Machine Learning, dan Machine Learning. Membimbing mahasiswa dalam pemrosesan data dengan RapidMiner, Excel, Python, dan SQL.",
    "resume.position3": "Magang Big Data Analytics",
    "resume.company3": "PT Kimia Farma",
    "resume.period3": "Desember 2024 - Februari 2025",
    "resume.desc3":
      "Mempelajari konsep data warehouse, data lake, dan data mart. Membuat dashboard interaktif untuk data perusahaan farmasi menggunakan Google Data Studio dan bekerja dengan DBMS/RDBMS menggunakan SQL.",
    "resume.position4": "Magang Data Science",
    "resume.company4": "PT ID/X Partners",
    "resume.period4": "September 2024 - Desember 2024",
    "resume.desc4":
      "Membangun model machine learning untuk analitik prediktif, melakukan EDA menggunakan Python dan SQL, serta mempelajari teknik preprocessing data termasuk cleaning, transformasi, dan feature engineering.",

    // Projects Page
    "projects.title": "Proyek Saya",
    "projects.subtitle": "Menampilkan karya saya di bidang data science dan AI",
    "projects.dataScience": "Data Science & AI",
    "projects.softwareEngineering": "Software Engineering",
    "projects.viewProject": "Lihat Proyek",
    "projects.viewCode": "Lihat Kode",
    "projects.loadMore": "Muat Lebih Banyak Proyek",
    "projects.project1.title": "Prediksi Customer Churn",
    "projects.project1.desc":
      "Membangun model machine learning untuk memprediksi customer churn dengan akurasi 92% menggunakan ensemble methods dan feature engineering.",
    "projects.project2.title": "Sistem Klasifikasi Gambar",
    "projects.project2.desc":
      "Mengembangkan model CNN deep learning untuk klasifikasi gambar multi-kelas dengan akurasi 95% pada data test.",
    "projects.project3.title": "Tool Analisis Sentimen",
    "projects.project3.desc":
      "Membuat tool analisis sentimen berbasis NLP menggunakan transformers untuk menganalisis review dan feedback pelanggan.",
    "projects.project4.title": "Dashboard Forecasting Penjualan",
    "projects.project4.desc":
      "Membangun dashboard interaktif dengan model forecasting time series untuk memprediksi tren dan pola penjualan.",
    "projects.project5.title": "Mesin Rekomendasi",
    "projects.project5.desc":
      "Mengimplementasikan sistem rekomendasi collaborative filtering untuk saran produk yang dipersonalisasi.",
    "projects.project6.title": "Sistem Deteksi Anomali",
    "projects.project6.desc":
      "Mengembangkan sistem unsupervised learning untuk mendeteksi anomali dalam traffic jaringan dan log keamanan.",
    "projects.software1.title": "Website Portfolio",
    "projects.software1.desc":
      "Membangun website portfolio modern dan responsif menggunakan Next.js, React, dan Tailwind CSS dengan dukungan dark mode.",
    "projects.software2.title": "Backend RESTful API",
    "projects.software2.desc":
      "Mengembangkan REST API yang scalable menggunakan FastAPI dan PostgreSQL dengan autentikasi, rate limiting, dan dokumentasi lengkap.",
    "projects.software3.title": "Aplikasi Manajemen Tugas",
    "projects.software3.desc":
      "Membuat aplikasi manajemen tugas full-stack dengan update real-time menggunakan React, Node.js, dan MongoDB.",
    "projects.software4.title": "Dashboard Visualisasi Data",
    "projects.software4.desc":
      "Membangun dashboard visualisasi data interaktif menggunakan Streamlit dan Plotly untuk analitik bisnis.",
    "projects.software5.title": "Pipeline Otomasi DevOps",
    "projects.software5.desc":
      "Mengimplementasikan pipeline CI/CD dengan Docker, Kubernetes, dan GitHub Actions untuk testing dan deployment otomatis.",
    "projects.software6.title": "Platform E-commerce",
    "projects.software6.desc":
      "Mengembangkan platform e-commerce lengkap dengan integrasi pembayaran menggunakan Next.js, Stripe, dan Prisma.",

    // Contact Page
    "contact.title": "Hubungi Saya",
    "contact.subtitle": "Mari bekerja sama untuk proyek Anda selanjutnya",
    "contact.name": "Nama",
    "contact.email": "Email",
    "contact.subject": "Subjek",
    "contact.message": "Pesan",
    "contact.send": "Kirim Pesan",
    "contact.sending": "Mengirim...",
    "contact.success": "Pesan berhasil dikirim!",
    "contact.successMessage": "Terima kasih telah menghubungi! Saya akan segera membalas pesan Anda.",
    "contact.close": "Tutup",
    "contact.error": "Gagal mengirim pesan. Silakan coba lagi.",
    "contact.info": "Informasi Kontak",
    "contact.location": "Lokasi",
    "contact.locationValue": "Jakarta, Indonesia",
    "contact.phone": "Telepon",
    "contact.phoneValue": "+62 851 5610 5762",
    "contact.emailLabel": "Email",
    "contact.emailValue": "tatas.handharu@gmail.com",
    "contact.social": "Media Sosial",

    // Footer
    "footer.tagline": "Membangun solusi cerdas dengan data",
    "footer.quickLinks": "Tautan Cepat",
    "footer.connect": "Terhubung",
    "footer.rights": "Hak cipta dilindungi",

    // Navbar tooltips
    "tooltip.nav.home": "Ke halaman utama",
    "tooltip.nav.about": "Pelajari tentang saya",
    "tooltip.nav.skills": "Lihat keahlian saya",
    "tooltip.nav.resume": "Lihat resume saya",
    "tooltip.nav.projects": "Jelajahi proyek",
    "tooltip.nav.news": "Lihat berita",
    "tooltip.nav.services": "Lihat layanan", // Added Services tooltip in Indonesian
    "tooltip.nav.contact": "Hubungi saya",

    // Button tooltips
    "tooltip.button.viewWork": "Jelajahi portofolio saya",
    "tooltip.button.contact": "Kirim pesan",
    "tooltip.button.github": "Lihat profil GitHub saya",
    "tooltip.button.linkedin": "Terhubung di LinkedIn",
    "tooltip.button.email": "Kirim email",
    "tooltip.button.phone": "Hubungi langsung",

    // Services section translations in Indonesian
    "home.services.title": "Layanan",
    "home.services.subtitle": "Bagaimana saya dapat membantu mewujudkan ide Anda",
    "home.services.service1.title": "AI & Machine Learning",
    "home.services.service1.desc": "Membangun sistem cerdas yang belajar dari data dan membuat prediksi akurat.",
    "home.services.service1.item1": "Pengembangan model ML kustom",
    "home.services.service1.item2": "Deep learning & neural networks",
    "home.services.service1.item3": "Solusi NLP & computer vision",
    "home.services.service2.title": "Analitik & Visualisasi Data",
    "home.services.service2.desc": "Mengubah data mentah menjadi wawasan yang dapat ditindaklanjuti.",
    "home.services.service2.item1": "Dashboard & laporan interaktif",
    "home.services.service2.item2": "Analisis statistik & forecasting",
    "home.services.service2.item3": "Solusi business intelligence",
    "home.services.service3.title": "Pengembangan Software & API",
    "home.services.service3.desc": "Membuat aplikasi dan API yang scalable dan siap produksi.",
    "home.services.service3.item1": "Pengembangan RESTful API",
    "home.services.service3.item2": "Aplikasi web full-stack",
    "home.services.service3.item3": "Cloud deployment & DevOps",

    // News Page
    "news.title": "Berita Industri Teknologi",
    "news.subtitle": "Tetap update dengan tren terbaru di AI, data science, dan software engineering",
    "news.backHome": "Kembali ke Beranda",
    "news.readMore": "Baca Selengkapnya",
    "news.backToNews": "Kembali ke Berita",
    "news.share": "Bagikan Artikel",
    "news.article1.content": `Kecerdasan Buatan terus berkembang dengan kecepatan yang belum pernah terjadi sebelumnya di tahun 2025. Terobosan terbaru dalam large language models, khususnya GPT-5 dan kompetitornya, mendorong batas-batas kemungkinan AI.

Perkembangan utama meliputi:

• Sistem AI multimodal yang mengintegrasikan pemrosesan teks, gambar, video, dan audio secara mulus
• Kemampuan penalaran yang ditingkatkan yang memungkinkan AI menangani tugas pemecahan masalah yang kompleks
• Efisiensi yang lebih baik dengan model yang lebih kecil namun lebih powerful yang dapat berjalan di edge devices
• Alignment yang lebih baik dengan nilai-nilai manusia melalui teknik RLHF tingkat lanjut

Dampaknya pada industri sangat mendalam. Kesehatan melihat alat diagnostik berbasis AI dengan akurasi mendekati manusia. Keuangan memanfaatkan AI untuk deteksi fraud dan penilaian risiko. Manufaktur mengimplementasikan sistem pemeliharaan prediktif berbasis AI.

Namun, tantangan tetap ada. Pertimbangan etis seputar deployment AI, kekhawatiran privasi data, dan kebutuhan akan proses pengambilan keputusan AI yang transparan berada di garis depan diskusi industri.

Saat kita bergerak maju, fokus bergeser dari "Bisakah AI melakukan ini?" menjadi "Bagaimana kita dapat mengintegrasikan AI secara bertanggung jawab ke dalam sistem kita?" Masa depan AI bukan hanya tentang kemajuan teknologi, tetapi tentang menciptakan sistem yang meningkatkan kemampuan manusia sambil mempertahankan standar etika.`,
    "news.article2.content": `Data engineering mengalami transformasi fundamental karena organisasi menuntut wawasan real-time dan infrastruktur data yang scalable. Paradigma batch processing tradisional memberikan jalan kepada arsitektur streaming-first.

Praktik data engineering modern meliputi:

• Pipeline data real-time menggunakan Apache Kafka, Flink, dan Pulsar
• Platform data cloud-native memanfaatkan layanan AWS, GCP, dan Azure
• Arsitektur data mesh yang mendesentralisasi kepemilikan data
• Praktik DataOps untuk continuous integration dan deployment pipeline data
• Tools monitoring kualitas data dan observability tingkat lanjut

Munculnya arsitektur lakehouse menjembatani kesenjangan antara data lakes dan data warehouses, menawarkan yang terbaik dari kedua dunia. Teknologi seperti Delta Lake, Apache Iceberg, dan Apache Hudi memungkinkan transaksi ACID pada data lakes.

Machine learning operations (MLOps) menjadi integral dalam workflow data engineering. Data engineers sekarang bertanggung jawab membangun pipeline yang tidak hanya memproses data tetapi juga melayani model ML di production.

Skill set yang diperlukan untuk data engineers modern berkembang. Selain SQL dan Python, kemahiran dalam sistem terdistribusi, platform cloud, dan teknologi containerization seperti Docker dan Kubernetes menjadi esensial.

Ke depan, fokusnya adalah membangun platform data self-service yang memberdayakan data scientists dan analysts sambil mempertahankan standar governance dan security.`,
    "news.article3.content": `Large Language Models (LLMs) bergerak melampaui chatbots dan pembuatan konten ke dalam aplikasi enterprise mission-critical. Organisasi menemukan cara inovatif untuk memanfaatkan LLMs untuk nilai bisnis.

Aplikasi enterprise utama meliputi:

• Pemrosesan dokumen cerdas dan ekstraksi informasi
• Layanan pelanggan otomatis dengan respons yang context-aware
• Pembuatan kode dan bantuan pengembangan software
• Business intelligence melalui query bahasa natural
• Manajemen pengetahuan dan pencarian enterprise

Tantangannya terletak pada membuat LLMs reliable dan trustworthy untuk penggunaan enterprise. Teknik seperti Retrieval-Augmented Generation (RAG) membantu mendasarkan respons LLM pada data faktual, mengurangi halusinasi dan meningkatkan akurasi.

Fine-tuning LLMs pada data domain-specific menjadi lebih accessible. Organisasi membuat model khusus yang memahami jargon industri mereka, proses bisnis, dan persyaratan regulasi.

Pertimbangan keamanan dan privasi adalah yang terpenting. Enterprises mengimplementasikan deployment LLM on-premises, menggunakan teknik seperti differential privacy, dan menetapkan kebijakan data governance yang jelas.

Biaya menjalankan LLMs menurun dengan arsitektur yang lebih efisien dan teknik quantization. Ini membuat adopsi LLM layak untuk perusahaan menengah, bukan hanya raksasa teknologi.

Saat LLMs matang, kita melihat pergeseran dari model general-purpose ke model khusus task-specific yang unggul dalam domain tertentu. Masa depan enterprise AI adalah tentang memilih model yang tepat untuk tugas yang tepat, bukan hanya menggunakan model terbesar yang tersedia.`,
  },
}

export function LanguageProvider({ children, initialLanguage }: { children: React.ReactNode; initialLanguage?: Language }) {
  const [language, setLanguage] = useState<Language>(initialLanguage ?? "en")
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    if (mounted) {
      try {
        localStorage.setItem("language", lang)
      } catch {}
      try {
        document.cookie = `language=${lang}; path=/; max-age=${60 * 60 * 24 * 365}`
      } catch {}
    }
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

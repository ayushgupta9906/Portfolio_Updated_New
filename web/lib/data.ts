import { Github, Linkedin, Mail, Twitter, Instagram, ExternalLink } from "lucide-react";

export const siteConfig = {
  name: "Ayush Gupta",
  title: "Creative Technologist",
  description: "Crafting digital experiences with Code, AI, and 3D.",
  email: "ayush150152@gmail.com",
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/ayushgupta9906",
      icon: Github,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/ayushgupta9906",
      icon: Linkedin,
    },
    {
      name: "Email",
      url: "mailto:ayush150152@gmail.com",
      icon: Mail,
    }
  ],
};

export const experience = [
  {
    role: "Software Developer",
    company: "Newgen Software Technologies Ltd.",
    period: "July 2025 - Present",
    location: "Noida, India",
    description: [
      "Developing scalable enterprise workflows using Java, SQL, and Spring Boot, delivering 15+ enhancements and cutting downtime by 20%.",
      "Optimizing backend services and database queries, improving application response times by 30% across key business modules.",
      "Built reusable Java utilities for API validation, request processing, and deployment support, achieving zero rollback incidents in production.",
      "Designed Spring Boot REST APIs for BMW Customer Portal including contract details, customer information retrieval, and secure document upload services."
    ]
  },
  {
    role: "Software Developer Intern",
    company: "Newgen Software Technologies Ltd.",
    period: "Mar 2025 - June 2025",
    location: "Noida, India",
    description: [
      "Worked extensively with databases and SQL, implementing PL/SQL procedures, triggers, and cursors for business logic automation.",
      "Developed and tested stored procedures and database-side validations to support BPM and ECM workflows.",
      "Built basic REST APIs using Java Spring to expose database operations and integrate internal services.",
      "Supported debugging, deployment, and performance optimization across enterprise modules."
    ]
  },
  {
    role: "SDE Intern",
    company: "LENSKART",
    period: "June 2024 - July 2024",
    description: [
      "Designed and developed a pioneering Remote Optometry Service, allowing eye tests without in-store optometrists, thus enhancing test quality.",
      "Implemented a staff allocation solution in Lenskart stores, enhancing user experience with dedicated staff and reducing dropouts by over 13%.",
      "Developed a feature specifically for kids' eye tests, incorporating engaging methods to ensure a comfortable experience for children."
    ]
  },
  {
    role: "Product Designer",
    company: "Freelance",
    period: "April 2024 - May 2024",
    description: [
      "Designed intuitive UIs with Adobe XD and Sketch, collaborating on responsive designs using HTML, CSS, and JavaScript frameworks.",
      "Utilized SolidWorks and AutoCAD for precise 3D modeling, integrating computational geometry to optimize designs for manufacturing.",
      "Leveraged SQL and NoSQL databases for user data analysis, driving design decisions and enhancements."
    ]
  },
  {
    role: "Web Developer",
    company: "SAE-ZHCET",
    period: "April 2023 - Feb 2024",
    description: [
      "Developed a responsive web app for optimal user experience across devices.",
      "Managing the platform and community, developing and deploying solutions using ReactJs, MongoDB, NodeJs and Google Cloud Platform."
    ]
  },
  {
    role: "Summer Research Intern",
    company: "Indian Institute of Technology Roorkee (IITR)",
    period: "Jun 2023 - Aug 2023",
    description: [
      "Hazard identification methodology modeling using Machine Learning.",
      "Conducted hazard identification using advanced algorithms and the PHA Works framework; identified and mitigated 50+ potential safety risks, resulting in a 40% decrease in workplace incidents."
    ]
  },
  {
    role: "Summer Research Intern",
    company: "Indian Institute of Technology Goa (IITG)",
    period: "Jun 2023 - Aug 2023",
    description: [
      "Led the Mechanical design of an Ornithopter, responsible for designing, sourcing, testing.",
      "Improved subassemblies, reducing BOM costs of Wings by 25%."
    ]
  }
];


// Complete tech stack from resume
export const skills = [
  // Languages
  { name: "TypeScript", level: 95, category: "Languages" },
  { name: "JavaScript", level: 95, category: "Languages" },
  { name: "Java", level: 90, category: "Languages" },
  { name: "Python", level: 85, category: "Languages" },
  { name: "C/C++", level: 80, category: "Languages" },
  { name: "SQL", level: 90, category: "Languages" },

  // Frontend Frameworks
  { name: "Next.js", level: 95, category: "Frontend" },
  { name: "React.js", level: 95, category: "Frontend" },
  { name: "React Server Components", level: 90, category: "Frontend" },
  { name: "Three.js / R3F", level: 80, category: "Frontend" },

  // Backend Frameworks
  { name: "Node.js", level: 90, category: "Backend" },
  { name: "Express.js", level: 90, category: "Backend" },
  { name: "NestJS", level: 85, category: "Backend" },
  { name: "Spring Boot", level: 85, category: "Backend" },

  // Databases
  { name: "PostgreSQL", level: 90, category: "Database" },
  { name: "MongoDB", level: 90, category: "Database" },
  { name: "MySQL", level: 85, category: "Database" },
  { name: "Redis", level: 85, category: "Database" },
  { name: "MS SQL", level: 80, category: "Database" },

  // DevOps & Cloud
  { name: "Docker", level: 85, category: "DevOps" },
  { name: "Kubernetes", level: 70, category: "DevOps" },
  { name: "AWS", level: 80, category: "Cloud" },
  { name: "Azure", level: 75, category: "Cloud" },
  { name: "GCP", level: 75, category: "Cloud" },
  { name: "CI/CD", level: 80, category: "DevOps" },
  { name: "Jenkins", level: 75, category: "DevOps" },

  // Architecture & Patterns
  { name: "Microservices", level: 85, category: "Architecture" },
  { name: "REST APIs", level: 95, category: "Architecture" },
  { name: "WebSockets", level: 85, category: "Architecture" },

  // Tools
  { name: "Git & GitHub", level: 95, category: "Tools" },
  { name: "Figma", level: 80, category: "Tools" },
  { name: "Postman", level: 90, category: "Tools" },
  { name: "Kafka", level: 70, category: "Tools" },
  { name: "Maven", level: 75, category: "Tools" },
];

export const heroRoles = [
  "Creative Technologist",
  "Full-Stack Engineer",
  "3D Web Enthusiast",
  "AI Integrator"
];

export const aboutContent = {
  title: "Software Engineer & Full-Stack Developer",
  description: [
    "Transforming complex problems into elegant solutions through code.",
    "Specializing in scalable enterprise systems, modern web architectures, and intelligent automation.",
    "Currently building production-grade applications at Newgen Software Technologies.",
    "Passionate about clean code, system design, and pushing technological boundaries."
  ],
  location: "Noida, India",
  resumeUrl: "/Ayush_Gupta_Resume.pdf",
};

// Real projects from resume and portfolio
export const projects = [
  {
    title: "BosDB – Browser Based Database with Version Control",
    description: "Architected a browser-based database platform with a native Git-like version control system for schema and data changes. Enabled commits, branches, merges, cherry-pick, and rollback directly on live databases.",
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "MongoDB", "Redis", "Docker"],
    links: {
      demo: "https://bosdb.vercel.app",
      code: "https://github.com/ayushgupta9906/BosDB"
    },
    image: "/project_placeholder.png"
  },
  {
    title: "LaserX Clothing Store",
    description: "Built a production-grade e-commerce platform with advanced filtering, product variants, and media-rich catalogs. Integrated Google OAuth, JWT authentication, and Stripe payments with secure multi-currency checkout.",
    tech: ["React.js", "Next.js", "Express.js", "MongoDB", "Stripe", "Nodemailer"],
    links: {
      demo: "https://laserx-store.vercel.app",
      code: "https://github.com/ayushgupta9906/LaserX"
    },
    image: "/project_placeholder.png"
  },
  {
    title: "Portfolio Website",
    description: "Modern, interactive portfolio showcasing projects and experience with 3D animations, dark mode, and responsive design. Built with latest web technologies.",
    tech: ["Next.js", "TypeScript", "Three.js", "Framer Motion", "Tailwind CSS"],
    links: {
      demo: "https://ayushgdev.vercel.app",
      code: "https://github.com/ayushgupta9906/Portfolio_Updated_New"
    },
    image: "/project_placeholder.png"
  },
  {
    title: "SafeMaX Security",
    description: "AI-Powered VAPT & Cybersecurity Dashboard for vulnerability assessment and penetration testing with machine learning-based threat detection.",
    tech: ["Next.js", "Python", "TensorFlow", "MongoDB", "FastAPI"],
    links: {
      demo: "https://safemax-security.vercel.app",
      code: "https://github.com/ayushgupta9906/SafeMaX"
    },
    image: "/project_placeholder.png"
  },
  {
    title: "India's Got Latent",
    description: "Interactive platform inspired by talent shows, featuring real-time voting, user submissions, and engaging UI/UX for discovering hidden talents.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io"],
    links: {
      demo: "https://indiasgotlatent.vercel.app",
      code: "https://github.com/ayushgupta9906/IndiaGotLatent"
    },
    image: "/project_placeholder.png"
  },
  {
    title: "LaserX Acad",
    description: "Educational learning management system with course management, student tracking, assignments, and interactive learning modules.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Redux", "Tailwind CSS"],
    links: {
      demo: "https://laserx-acad.vercel.app",
      code: "https://github.com/ayushgupta9906/LaserXAcad"
    },
    image: "/project_placeholder.png"
  },
  {
    title: "SAE ZHCET Website",
    description: "Developed responsive web application for SAE-ZHCET automotive club, managing events, team, and community using modern web stack.",
    tech: ["React.js", "Node.js", "MongoDB", "Express.js", "Google Cloud"],
    links: {
      demo: "https://saezhcet.in",
      code: "https://github.com/ayushgupta9906/SAE-Website"
    },
    image: "/project_placeholder.png"
  },
  {
    title: "Remote Optometry Service",
    description: "Pioneered remote eye testing solution for LENSKART, enabling tests without in-store optometrists. Implemented intelligent staff allocation reducing dropouts by 13%.",
    tech: ["React", "Node.js", "MongoDB", "WebRTC"],
    links: { demo: "#", code: "#" },
    image: "/project_placeholder.png"
  }
];

export const education = [
  {
    degree: "B.Tech Mechanical Engineering",
    institution: "ZHCET, AMU",
    period: "2021 - 2025",
    status: "Graduated",
    notes: "Pivoted to Computational Design & Software Engineering. Specialized in Full-Stack Development, AI/ML, and Modern Web Technologies."
  },
  {
    degree: "Higher Secondary (XII) - Science",
    institution: "Kendriya Vidyalaya JLA Bareilly Cantt",
    period: "2020 - 2021",
    status: "94.6%",
    notes: "Physics, Chemistry, Mathematics - Strong foundation in engineering fundamentals."
  },
  {
    degree: "Secondary (X)",
    institution: "Kendriya Vidyalaya JLA Bareilly Cantt",
    period: "2018 - 2019",
    status: "94.8%",
    notes: "Academic excellence across all subjects with focus on Mathematics and Science."
  }
];

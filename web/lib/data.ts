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

// "Now doing job" implies current employment. Adding a placeholder for current role.
export const experience = [
  {
    role: "Software Engineer",
    company: "Current Company", // Placeholder, waiting for resume data
    period: "Present",
    description: [
      "Building scalable applications with Next.js and Cloud Native technologies.",
      "Integrting Generative AI agents into production workflows.",
      "Optimizing frontend performance for high-traffic dashboards."
    ]
  },
  {
    role: "SDE Intern",
    company: "LENSKART",
    period: "June 2024 - July 2024",
    description: [
      "Designed and developed a pioneering Remote Optometry Service.",
      "Implemented intelligent staff allocation algorithms.",
      "Enhanced user engagement through gamified features."
    ]
  },
  {
    role: "Product Designer",
    company: "Freelance",
    period: "April 2024 - May 2024",
    description: [
      "Crafted high-fidelity prototypes using Figma & Spline.",
      "3D Modeling for web assets using Blender."
    ]
  }
];

// COOLER / NEW TECH STACK
export const skills = [
  { name: "Next.js 15", level: 95, category: "Core" },
  { name: "TypeScript", level: 95, category: "Core" },
  { name: "React Server Components", level: 90, category: "Core" },
  { name: "Rust", level: 60, category: "Backend" },
  { name: "Go (Golang)", level: 70, category: "Backend" },
  { name: "PostgreSQL", level: 85, category: "Database" },
  { name: "Three.js / R3F", level: 80, category: "Creative" },
  { name: "GLSL Shaders", level: 65, category: "Creative" },
  { name: "Generative AI (LLMs)", level: 85, category: "AI" },
  { name: "LangChain", level: 80, category: "AI" },
];

export const heroRoles = [
  "Creative Technologist",
  "Full-Stack Engineer",
  "3D Web Enthusiast",
  "AI Integrator"
];

export const aboutContent = {
  title: "The Architect",
  description: [
    "I don't just write code; I build digital ecosystems.",
    "Merging the precision of Engineering with the boundless creativity of 3D Web & AI.",
    "Currently architecting the future of web interfaces.",
    "Always betting on the bleeding edge."
  ],
  location: "India",
  resumeUrl: "/Ayush_Gupta_Resume.pdf", // User pointed to files folder
};

// Simplified, higher impact projects
export const projects = [
  {
    title: "SafeMaX Sentinel",
    description: "AI-Powered VAPT & Cybersecurity Dashboard.",
    tech: ["Next.js", "Python", "TensorFlow", "MongoDB"],
    links: { demo: "#", code: "#" },
    image: "/project_placeholder.png"
  },
  {
    title: "LaserX E-Comm",
    description: "Immersive 3D Commerce Experience.",
    tech: ["R3F", "WebGL", "Stripe", "Zustand"],
    links: { demo: "#", code: "#" },
    image: "/project_placeholder.png"
  },
  {
    title: "Neural Mailer",
    description: "Agentic Email Automation System.",
    tech: ["OpenAI API", "Node.js", "Redis"],
    links: { demo: "#", code: "#" },
    image: "/project_placeholder.png"
  }
];

export const education = [
  {
    degree: "B.Tech Mechanical Engineering",
    institution: "ZHCET, AMU",
    period: "2021 - 2025",
    status: "Graduating",
    notes: "Pivoted to Computational Design & Software Engineering"
  }
];

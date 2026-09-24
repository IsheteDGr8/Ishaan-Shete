import type { Credential } from "./types";

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  name: "Ishaan Shete",
  shortName: "Ishaan",
  role: "Software engineer, AI and cloud",
  location: "Seattle, WA",
  title: "Ishaan Shete · Software engineer, AI and cloud",
  description:
    "I'm Ishaan Shete, a software engineer in Seattle. I build AI and cloud systems end to end: agentic tools, APIs, data stores and the interfaces people use.",
  intro: [
    "I build AI systems and get them in front of real users. I lead backend engineering on an agentic HR copilot at Quadrant Technologies, which placed 1st of 9 teams and was selected for production rollout.",
    "I work across the stack: Python and FastAPI services, TypeScript and Next.js interfaces, and Azure or AWS underneath. I graduated from the University of Washington in Computer Science and Software Engineering in June 2026.",
  ],
  availability: {
    open: true,
    headline: "Open to full-time roles",
    roles: ["Forward Deployed Engineer", "AI & Cloud Engineer", "Software Engineer"],
  },
  email: "ishaanbshete@gmail.com",
  phone: { display: "+1 (425) 985-1489", href: "tel:+14259851489" },
  resume: {
    href: "/Ishaan-Shete-Resume.pdf",
    fileName: "Ishaan-Shete-Resume.pdf",
    label: "Résumé (PDF)",
  },
  portrait: {
    alt: "Ishaan Shete smiling, outdoors in front of a rock face",
    tag: "Ishaan Shete",
  },
  scene: {
    caption: "Seattle, WA",
  },
  social: {
    github: "https://github.com/IsheteDGr8",
    linkedin: "https://www.linkedin.com/in/ishaan-shete/",
  },
} as const;

export const credentials: Credential[] = [
  {
    label: "B.S. Computer Science & Software Engineering",
    detail: "University of Washington, 2026 · GPA 3.74",
  },
  {
    label: "1st of 9 teams",
    detail: "AI HR Copilot, Quadrant Technologies internship",
  },
  {
    label: "Master's-level Machine Learning",
    detail: "Plus coursework in distributed systems, OS and computer vision",
  },
];

export const pages = {
  work: {
    title: "Work",
    eyebrow: "Projects",
    lede: "Systems I've built end to end, from the model or the data store to the interface people use. Each one has a write-up covering the problem, what I built, the hard part and how it was measured.",
  },
  experience: {
    title: "Experience",
    eyebrow: "2025 – 2026",
    lede: "Where I've worked, what I was responsible for and what shipped.",
  },
  capabilities: {
    title: "Capabilities",
    eyebrow: "What I work with",
    lede: "Grouped by the kind of problem, each linked to the projects that show it.",
  },
  about: {
    title: "About",
    eyebrow: "Hi, I'm Ishaan",
    lede: "Software engineer in Seattle, working across AI, cloud and full-stack systems.",
    body: [
      "I graduated from the University of Washington in June 2026 with a B.S. in Computer Science and Software Engineering and a 3.74 GPA.",
      "I'm an AI and cloud intern at Quadrant Technologies, working on agentic AI, Azure Cosmos DB and strict PII redaction. I was President of the UW Cricket Club, where I built Cricky and ran 11 events for 1,200+ attendees, and I worked on cooling for a Mars rover arm with TrickFire Robotics.",
      "I want to keep deepening my skills in software engineering and AI, and to build things that make a real difference for the people who use them. I'm looking for full-time roles as a Forward Deployed Engineer, AI & Cloud Engineer or Software Engineer.",
      "Outside of code, I've played tabla for 18 years. Taal AI grew out of that.",
    ],
    facts: [
      { label: "Based in", value: "Seattle, WA" },
      { label: "Education", value: "B.S. CSSE, University of Washington, 2026" },
      { label: "Focus", value: "AI systems, cloud, full-stack" },
      { label: "Tabla", value: "18 years" },
    ],
  },
  contact: {
    title: "Contact",
    eyebrow: "Get in touch",
    lede: "Email is the fastest way to reach me. Phone and LinkedIn work too.",
  },
  notFound: {
    title: "This page wandered off the trail",
    lede: "The page you're looking for doesn't exist or has moved.",
  },
} as const;

export const navigation = [
  { label: "Work", href: "/work" },
  { label: "Experience", href: "/experience" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

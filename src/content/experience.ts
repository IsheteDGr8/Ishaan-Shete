import type { Role } from "./types";

export const roles: Role[] = [
  {
    id: "quadrant",
    organisation: "Quadrant Technologies",
    title: "Software Engineering Intern, AI & Cloud",
    start: "Jul 2026",
    end: "Sep 2026",
    highlights: [
      "Led backend engineering for an AI HR Copilot that placed 1st of 9 teams and was selected for production rollout.",
      "Connected a Python FastAPI backend, a Next.js frontend and Azure Cosmos DB to automate résumé screening, ticketing and compliance tracking.",
      "Designed tool calling across 149 capabilities and 11 MCP integrations, with human-in-the-loop guardrails and cloud cost held under budget.",
    ],
    projectSlugs: ["hr-copilot"],
  },
  {
    id: "cricket-club",
    organisation: "Cricket Club UWB",
    title: "Lead Developer",
    start: "Feb 2026",
    end: "Jul 2026",
    highlights: [
      "Built Cricky, a mobile-first match and tournament app handling 3,600+ ball-by-ball updates for 100+ active users.",
      "Synced game state across devices through Firebase with sub-second latency.",
      "Wrote the scoring rules engine and role-based access for admin data entry.",
    ],
    projectSlugs: ["cricky"],
  },
  {
    id: "grader",
    organisation: "University of Washington",
    title: "Grader, CSS 475 Database Systems",
    start: "Mar 2026",
    end: "Jun 2026",
    highlights: [
      "Evaluated 670+ assignments with feedback on SQL optimisation, cloud hosting and state management.",
    ],
    projectSlugs: [],
  },
  {
    id: "trickfire",
    organisation: "TrickFire Robotics",
    title: "Robotics Software Engineer, Cooling",
    start: "Jan 2025",
    end: "Jun 2026",
    highlights: [
      "Engineered air cooling for a Mars rover arm with 7 engineers across disciplines, increasing arm lifespan by 400%.",
      "Implemented low-latency UART between an NVIDIA Orin and an Arduino in Python.",
      "Wrote sensor-driven DC fan control in C++ that keeps temperatures below 100°F.",
    ],
    projectSlugs: [],
  },
];

export const education = {
  degree: "B.S. Computer Science & Software Engineering",
  school: "University of Washington",
  start: "Sep 2023",
  end: "Jun 2026",
  gpa: "3.74 / 4.0",
  coursework: [
    "Machine Learning (Master's level)",
    "Computer Vision",
    "Parallel & Distributed Systems",
    "Operating Systems",
    "Database Systems",
    "Cybersecurity",
    "Data Structures & Algorithms",
    "Web Development",
  ],
};

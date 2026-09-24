import type { CapabilityGroup } from "./types";

export const capabilityGroups: CapabilityGroup[] = [
  {
    id: "ai",
    title: "AI systems",
    summary: "Agents with tools and guardrails, multi-agent reasoning, and models trained from my own data.",
    items: ["MCP tool calling", "Human-in-the-loop design", "Multi-agent orchestration", "LangChain", "Hugging Face", "OpenHands", "TensorFlow", "PyTorch", "Keras", "Librosa", "NumPy", "Amazon Bedrock"],
    projectSlugs: ["hr-copilot", "permitpilot", "taal-ai"],
  },
  {
    id: "cloud",
    title: "Cloud & data",
    summary: "Services and stores that stay available and inside budget.",
    items: ["Azure", "Azure Cosmos DB", "Azure SQL", "Blob Storage", "AI Foundry", "App Service", "Azure DevOps", "Azure OpenAI", "AWS", "GCP", "Terraform", "Firebase", "Supabase", "PostgreSQL", "MongoDB", "Neo4j", "Databricks"],
    projectSlugs: ["hr-copilot", "cricky", "taal-ai"],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    summary: "Typed APIs between models, databases and interfaces.",
    items: ["FastAPI", "Node.js", "Express", "Django", "REST APIs"],
    projectSlugs: ["hr-copilot", "permitpilot", "taal-ai"],
  },
  {
    id: "frontend",
    title: "Frontend",
    summary: "Interfaces people use on their phones and at their desks.",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Angular"],
    projectSlugs: ["hr-copilot", "permitpilot", "cricky", "tip-of-the-iceberg"],
  },
  {
    id: "systems",
    title: "Systems & vision",
    summary: "Code close to the hardware and classical computer vision.",
    items: ["C++", "OpenCV", "UART", "NVIDIA Orin", "Arduino"],
    projectSlugs: ["road-sign-detection"],
  },
];

export const languages = ["Python", "TypeScript", "JavaScript", "C++", "C", "Java", "C#", "SQL", "HTML", "CSS"];

export const tools = ["GitHub", "Docker", "Cursor", "Claude Code", "Codex", "Copilot", "Amazon Q", "Tableau", "Power BI", "Excel", "Jupyter"];

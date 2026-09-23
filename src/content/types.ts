export type ExternalLink = {
  label: string;
  href: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type ProjectTag = "AI" | "Cloud" | "Full-stack" | "Systems";

export type ArchitectureStep = {
  label: string;
  detail: string;
};

export type Project = {
  slug: string;
  title: string;
  context: string;
  year: string;
  summary: string;
  tags: ProjectTag[];
  stack: string[];
  metrics: Metric[];
  problem: string;
  role: string;
  built: string[];
  hardPart: string;
  whyItMatters: string;
  evaluation: string;
  architecture: ArchitectureStep[];
  links: ExternalLink[];
  featured: boolean;
};

export type Role = {
  id: string;
  organisation: string;
  title: string;
  start: string;
  end: string;
  location?: string;
  highlights: string[];
  projectSlugs: string[];
};

export type CapabilityGroup = {
  id: string;
  title: string;
  summary: string;
  items: string[];
  projectSlugs: string[];
};

export type Credential = {
  label: string;
  detail: string;
};

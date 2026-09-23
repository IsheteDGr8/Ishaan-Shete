import { navigation, site } from "./site";
import { projects } from "./projects";

export type Command =
  | { id: string; group: "Pages" | "Projects"; label: string; kind: "route"; href: string }
  | { id: string; group: "Links"; label: string; kind: "external"; href: string }
  | { id: string; group: "Actions"; label: string; kind: "copy-email" | "toggle-theme" | "download-resume" };

export const commands: Command[] = [
  { id: "page-home", group: "Pages", label: "Home", kind: "route", href: "/" },
  ...navigation.map((n) => ({ id: `page-${n.href.slice(1)}`, group: "Pages" as const, label: n.label, kind: "route" as const, href: n.href })),
  ...projects.map((p) => ({
    id: `project-${p.slug}`,
    group: "Projects" as const,
    label: p.title,
    kind: "route" as const,
    href: `/work/${p.slug}`,
  })),
  { id: "action-copy", group: "Actions", label: "Copy email address", kind: "copy-email" },
  { id: "action-resume", group: "Actions", label: "Download résumé", kind: "download-resume" },
  { id: "action-theme", group: "Actions", label: "Toggle dark theme", kind: "toggle-theme" },
  { id: "link-github", group: "Links", label: "GitHub", kind: "external", href: site.social.github },
  { id: "link-linkedin", group: "Links", label: "LinkedIn", kind: "external", href: site.social.linkedin },
];

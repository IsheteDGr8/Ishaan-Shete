"use client";

import { useState } from "react";
import type { Project, ProjectTag } from "@/content/types";
import { ProjectCard } from "./project-card";

export function WorkFilter({ projects, tags }: { projects: Project[]; tags: ProjectTag[] }) {
  const [active, setActive] = useState<ProjectTag | "All">("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.tags.includes(active));
  const options: (ProjectTag | "All")[] = ["All", ...tags];

  return (
    <>
      <div className="js-only flex-wrap items-center gap-2" role="group" aria-label="Filter projects by area">
        {options.map((tag) => {
          const count = tag === "All" ? projects.length : projects.filter((p) => p.tags.includes(tag)).length;
          return (
            <button
              key={tag}
              type="button"
              aria-pressed={active === tag}
              onClick={() => setActive(tag)}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink-2 transition-colors hover:border-ink-3 hover:text-ink aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-accent-ink"
            >
              {tag}
              <span className="tabular-nums opacity-70">{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
        {active === "All" ? "" : ` tagged ${active}`}
      </p>

      <ul className="mt-10 grid gap-5 md:grid-cols-2">
        {shown.map((p) => (
          <li key={p.slug} className="flex">
            <ProjectCard project={p} reveal={false} className="w-full" />
          </li>
        ))}
      </ul>
    </>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";

type Props = {
  project: Project;
  size?: "default" | "lead";
  className?: string;
  reveal?: boolean;
};

export function ProjectCard({ project, size = "default", className = "", reveal = true }: Props) {
  const lead = size === "lead";
  const metrics = project.metrics.slice(0, lead ? 4 : 2);

  return (
    <article
      data-reveal={reveal ? "" : undefined}
      className={`group relative flex flex-col rounded-[1.75rem] border border-line bg-surface p-7 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-ink/25 hover:shadow-[0_24px_48px_-28px_rgb(0_0_0/0.25)] sm:p-9 ${
        lead ? "lg:grid lg:grid-cols-[1.1fr_1fr] lg:gap-14" : ""
      } ${className}`}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow">
            {project.context} · {project.year}
          </p>
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-ink-2 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </div>
        <h3 className={`mt-5 font-bold ${lead ? "text-[clamp(2rem,3vw+0.5rem,3.25rem)] leading-none" : "text-3xl"}`}>
          <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 after:rounded-[1.75rem]">
            {project.title}
          </Link>
        </h3>
        <p className="prose-width mt-4 text-ink-2">{project.summary}</p>

        <dl className={`mt-8 grid gap-x-6 gap-y-5 ${lead ? "grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4" : "grid-cols-2"}`}>
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-1 text-sm leading-snug text-ink-3">{m.label}</dt>
              <dd className="font-display text-3xl font-bold tracking-tight text-ink">{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={lead ? "mt-10 lg:mt-0" : "mt-auto pt-10"}>
        <p className="eyebrow mb-3">How it fits together</p>
        <ol className={`relative ${lead ? "space-y-2.5" : "flex flex-wrap gap-2"}`} aria-label={`${project.title} architecture`}>
          {project.architecture.map((step, i) =>
            lead ? (
              <li key={step.label} className="flex items-center gap-4 rounded-2xl border border-line bg-canvas px-4 py-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent-soft text-xs font-semibold tabular-nums text-accent">
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block font-medium leading-tight">{step.label}</span>
                  <span className="block text-sm text-ink-3">{step.detail}</span>
                </span>
              </li>
            ) : (
              <li key={step.label} className="rounded-full border border-line bg-canvas px-3 py-1.5 text-sm text-ink-2">
                <span className="mr-1.5 tabular-nums text-accent">{i + 1}</span>
                {step.label}
              </li>
            ),
          )}
        </ol>
      </div>
    </article>
  );
}

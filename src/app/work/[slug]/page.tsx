import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { ExternalLink } from "@/components/external-link";
import { JsonLd } from "@/components/json-ld";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: project.title, description: project.summary, url: `/work/${project.slug}` },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const sections = [
    { id: "problem", title: "The problem", body: project.problem },
    { id: "role", title: "My role", body: project.role },
    { id: "hard-part", title: "The hard part", body: project.hardPart },
    { id: "why", title: "Why it matters", body: project.whyItMatters },
    { id: "evaluation", title: "How it was measured", body: project.evaluation },
  ];

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.summary,
          url: `${site.url}/work/${project.slug}`,
          dateCreated: project.year,
          author: { "@type": "Person", name: site.name, url: site.url },
          keywords: project.stack.join(", "),
        }}
      />

      <header className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_80%_0%,black,transparent_65%)]"
        />
        <div className="shell relative pb-14 pt-10 md:pb-20 md:pt-14">
          <Link href="/work" className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 hover:text-ink">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            All work
          </Link>
          <p className="eyebrow mt-10">
            {project.context} · {project.year}
          </p>
          <h1 className="mt-4 text-[clamp(2.75rem,6vw+0.5rem,6.5rem)] font-bold leading-[0.95]">{project.title}</h1>
          <p className="prose-width mt-6 text-lede text-ink-2">{project.summary}</p>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Stack">
            {project.stack.map((s) => (
              <li key={s} className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-ink-2">
                {s}
              </li>
            ))}
          </ul>

          {project.links.length > 0 ? (
            <ul className="mt-8 flex flex-wrap gap-3">
              {project.links.map((l, i) => (
                <li key={l.href}>
                  <ExternalLink
                    href={l.href}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5 ${
                      i === 0 ? "bg-accent text-accent-ink" : "border border-ink/15 bg-surface text-ink"
                    }`}
                  >
                    {l.label}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </ExternalLink>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </header>

      <section aria-label="Results" className="shell">
        <dl className="grid grid-cols-2 border-y border-line md:grid-cols-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="flex flex-col-reverse justify-end border-line py-7 pr-4 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-6">
              <dt className="mt-1.5 text-sm text-ink-2">{m.label}</dt>
              <dd className="font-display text-[clamp(1.75rem,2.5vw+0.5rem,2.75rem)] font-bold tracking-tight">{m.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="shell mt-16 grid gap-16 lg:grid-cols-[1fr_2fr]">
        <nav aria-label="On this page" className="hidden lg:block">
          <ul className="sticky top-28 space-y-2 text-sm">
            {[...sections.slice(0, 2), { id: "built", title: "What I built" }, ...sections.slice(2), { id: "architecture", title: "Architecture" }].map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-ink-2 hover:text-accent">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-14">
          {sections.slice(0, 2).map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28">
              <h2 id={`${s.id}-h`} className="text-3xl font-bold">
                {s.title}
              </h2>
              <p className="prose-width mt-4 text-lede text-ink-2">{s.body}</p>
            </section>
          ))}

          <section id="built" aria-labelledby="built-h" className="scroll-mt-28">
            <h2 id="built-h" className="text-3xl font-bold">
              What I built
            </h2>
            <ul className="prose-width mt-5 space-y-3">
              {project.built.map((b) => (
                <li key={b} className="flex gap-3 text-lede text-ink-2">
                  <span aria-hidden="true" className="mt-[0.6em] size-2 shrink-0 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </section>

          {sections.slice(2).map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28">
              <h2 id={`${s.id}-h`} className="text-3xl font-bold">
                {s.title}
              </h2>
              <p className="prose-width mt-4 text-lede text-ink-2">{s.body}</p>
            </section>
          ))}
        </div>
      </div>

      <section id="architecture" aria-labelledby="architecture-h" className="shell mt-20 scroll-mt-28">
        <h2 id="architecture-h" className="text-3xl font-bold">
          Architecture
        </h2>
        <div className="mt-6">
          <ArchitectureDiagram title={project.title} steps={project.architecture} />
        </div>
      </section>

      <nav aria-label="Next project" className="shell mt-24">
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-wrap items-end justify-between gap-6 rounded-[1.75rem] border border-line bg-surface p-8 transition-colors hover:border-accent sm:p-10"
        >
          <span>
            <span className="eyebrow block">Next project</span>
            <span className="mt-3 block font-display text-[clamp(2rem,3vw+0.5rem,3.5rem)] font-bold leading-none tracking-tight">
              {next.title}
            </span>
          </span>
          <span className="grid size-14 place-items-center rounded-full bg-accent text-accent-ink transition-transform group-hover:translate-x-1">
            <ArrowRight className="size-6" aria-hidden="true" />
          </span>
        </Link>
      </nav>
    </article>
  );
}

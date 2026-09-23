import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download, Mail } from "lucide-react";
import { credentials, site } from "@/content/site";
import { featuredProjects } from "@/content/projects";
import { roles } from "@/content/experience";
import { HeroVisual } from "@/components/hero-visual";
import { CopyEmail } from "@/components/copy-email";
import { ExternalLink } from "@/components/external-link";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { JsonLd } from "@/components/json-ld";

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: "Seattle", addressRegion: "WA", addressCountry: "US" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Washington" },
  sameAs: [site.social.github, site.social.linkedin],
};

export default function HomePage() {
  const [lead, ...rest] = featuredProjects;

  return (
    <>
      <JsonLd data={personLd} />

      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]"
        />
        <div className="shell relative grid items-center gap-14 pb-20 pt-14 md:pt-20 lg:grid-cols-[1.3fr_1fr] lg:gap-10 lg:pb-28 lg:pt-24">
          <div>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-ink-2">
              <span className="status-dot size-2 rounded-full bg-accent" aria-hidden="true" />
              {site.availability.headline} · {site.location}
            </p>

            <h1 id="hero-title" className="mt-7 text-hero font-bold">
              {site.name}
            </h1>
            <p className="mt-5 font-display text-[clamp(1.5rem,2.2vw+0.75rem,2.5rem)] font-medium leading-tight tracking-tight text-ink-2">
              {site.role}
            </p>

            <div className="prose-width mt-8 space-y-4 text-lede text-ink-2">
              {site.intro.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-medium text-accent-ink transition-transform hover:-translate-y-0.5"
              >
                See my work
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <a
                href={site.resume.href}
                download={site.resume.fileName}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-surface px-6 py-3.5 font-medium text-ink transition-colors hover:border-ink/40"
              >
                <Download className="size-4" aria-hidden="true" />
                Download résumé
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-2" aria-label="Elsewhere">
              <li>
                <ExternalLink href={site.social.github} className="inline-flex items-center gap-2 hover:text-ink">
                  <GitHubIcon className="size-4" /> GitHub
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href={site.social.linkedin} className="inline-flex items-center gap-2 hover:text-ink">
                  <LinkedInIcon className="size-4" /> LinkedIn
                </ExternalLink>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-ink">
                  <Mail className="size-4" aria-hidden="true" /> {site.email}
                </a>
              </li>
            </ul>
          </div>

          <HeroVisual />
        </div>
      </section>

      <section aria-label="Credentials" className="shell">
        <ul className="grid border-y border-line md:grid-cols-3">
          {credentials.map((c, i) => (
            <li
              key={c.label}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              className="border-line py-7 md:px-8 md:first:pl-0 [&:not(:first-child)]:border-t md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-t-0"
            >
              <p className="font-display text-2xl font-semibold tracking-tight">{c.label}</p>
              <p className="mt-1.5 text-ink-2">{c.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="work-title" className="shell mt-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title" className="mt-3 text-title font-bold">
              Projects
            </h2>
          </div>
          <Link href="/work" className="group inline-flex items-center gap-1.5 font-medium text-accent">
            All projects
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <ProjectCard project={lead} size="lead" className="md:col-span-2 xl:col-span-3" />
          {rest.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              className={i === rest.length - 1 && rest.length % 2 === 1 ? "md:col-span-2 xl:col-span-1" : ""}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="experience-title" className="shell mt-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow">2025 – 2026</p>
            <h2 id="experience-title" className="mt-3 text-title font-bold">
              Experience
            </h2>
            <Link href="/experience" className="group mt-6 inline-flex items-center gap-1.5 font-medium text-accent">
              Full history
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
          <ol className="divide-y divide-line border-y border-line">
            {roles.map((role) => (
              <li key={role.id} data-reveal className="grid gap-2 py-7 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <p className="text-sm tabular-nums text-ink-3">
                  {role.start} – {role.end}
                </p>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {role.title}
                    <span className="text-ink-3"> · {role.organisation}</span>
                  </h3>
                  <p className="prose-width mt-2 text-ink-2">{role.highlights[0]}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="contact-title" className="shell mt-32">
        <div data-reveal className="relative overflow-hidden rounded-[2rem] bg-accent-soft px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
          <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow !text-ink-2">Contact</p>
              <h2 id="contact-title" className="mt-3 text-title font-bold">
                Email is the fastest way to reach me.
              </h2>
              <a
                href={`mailto:${site.email}`}
                className="mt-6 inline-flex items-center gap-2 break-all font-display text-[clamp(1.375rem,2.4vw+0.5rem,2.5rem)] font-semibold tracking-tight text-accent underline decoration-accent/30 decoration-2 underline-offset-8 hover:decoration-accent"
              >
                {site.email}
                <ArrowUpRight className="size-7 shrink-0" aria-hidden="true" />
              </a>
            </div>
            <div className="space-y-5">
              <p className="text-ink-2">
                {site.availability.headline}:{" "}
                <span className="text-ink">{site.availability.roles.join(", ")}</span>.
              </p>
              <div className="flex flex-wrap gap-3">
                <CopyEmail email={site.email} className="bg-surface" />
                <a
                  href={site.phone.href}
                  className="inline-flex items-center rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink-2 hover:text-ink"
                >
                  {site.phone.display}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

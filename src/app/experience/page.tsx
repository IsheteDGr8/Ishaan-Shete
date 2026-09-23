import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { pages, site } from "@/content/site";
import { education, roles } from "@/content/experience";
import { getProject } from "@/content/projects";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: pages.experience.title,
  description: pages.experience.lede,
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader eyebrow={pages.experience.eyebrow} title={pages.experience.title} lede={pages.experience.lede}>
        <a
          href={site.resume.href}
          download={site.resume.fileName}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-surface px-5 py-3 text-sm font-medium hover:border-ink/40"
        >
          <Download className="size-4" aria-hidden="true" />
          Download résumé
        </a>
      </PageHeader>

      <section aria-labelledby="roles-h" className="shell">
        <h2 id="roles-h" className="sr-only">
          Roles
        </h2>
        <ol className="relative space-y-5 before:absolute before:bottom-6 before:left-[11px] before:top-6 before:w-px before:bg-line md:before:left-[calc(12rem+11px)]">
          {roles.map((role) => (
            <li key={role.id} data-reveal className="relative grid gap-4 md:grid-cols-[12rem_1fr] md:gap-0">
              <p className="pl-10 pt-7 text-sm tabular-nums text-ink-3 md:pl-0 md:pr-8 md:text-right">
                {role.start} – {role.end}
              </p>
              <span
                aria-hidden="true"
                className="absolute left-[5px] top-8 size-[13px] rounded-full border-2 border-accent bg-canvas md:left-[calc(12rem+5px)]"
              />
              <div className="ml-10 rounded-[1.5rem] border border-line bg-surface p-6 sm:p-8">
                <p className="eyebrow">{role.organisation}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">{role.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {role.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-ink-2">
                      <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
                {role.projectSlugs.length > 0 ? (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {role.projectSlugs.map((slug) => {
                      const p = getProject(slug);
                      if (!p) return null;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/work/${slug}`}
                            className="group inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3.5 py-1.5 text-sm font-medium text-accent"
                          >
                            Read the {p.title} case study
                            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="education-h" className="shell mt-24">
        <div className="grid gap-10 rounded-[2rem] bg-accent-soft p-8 sm:p-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow !text-ink-2">Education</p>
            <h2 id="education-h" className="mt-3 text-[clamp(2rem,3vw+0.5rem,3rem)] font-bold leading-none">
              {education.school}
            </h2>
            <p className="mt-4 text-ink">{education.degree}</p>
            <p className="mt-1 text-sm tabular-nums text-ink-2">
              {education.start} – {education.end} · GPA {education.gpa}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-ink-2">Coursework</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {education.coursework.map((c) => (
                <li key={c} className="rounded-full bg-surface px-3.5 py-1.5 text-sm text-ink">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

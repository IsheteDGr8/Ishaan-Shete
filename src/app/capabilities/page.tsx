import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pages } from "@/content/site";
import { capabilityGroups, languages, tools } from "@/content/capabilities";
import { getProject } from "@/content/projects";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: pages.capabilities.title,
  description: pages.capabilities.lede,
  alternates: { canonical: "/capabilities" },
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageHeader eyebrow={pages.capabilities.eyebrow} title={pages.capabilities.title} lede={pages.capabilities.lede} />

      <section aria-label="Capability groups" className="shell">
        <ul className="grid gap-5 md:grid-cols-2">
          {capabilityGroups.map((g, i) => (
            <li
              key={g.id}
              data-reveal
              className={`flex flex-col rounded-[1.75rem] border border-line bg-surface p-7 sm:p-9 ${
                i === 0 ? "md:col-span-2" : ""
              }`}
            >
              <p className="eyebrow tabular-nums">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 text-3xl font-bold">{g.title}</h2>
              <p className="prose-width mt-3 text-ink-2">{g.summary}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${g.title} skills`}>
                {g.items.map((item) => (
                  <li key={item} className="rounded-full border border-line bg-canvas px-3 py-1.5 text-sm text-ink">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <h3 className="text-sm font-medium text-ink-3">Shown in</h3>
                <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                  {g.projectSlugs.map((slug) => {
                    const p = getProject(slug);
                    if (!p) return null;
                    return (
                      <li key={slug}>
                        <Link href={`/work/${slug}`} className="group inline-flex items-center gap-1 font-medium text-accent">
                          {p.title}
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Languages and tools" className="shell mt-20 grid gap-10 border-t border-line pt-14 md:grid-cols-2">
        {[
          { title: "Languages", items: languages },
          { title: "Tools", items: tools },
        ].map((block) => (
          <div key={block.title}>
            <h2 className="text-2xl font-bold">{block.title}</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {block.items.map((item) => (
                <li key={item} className="rounded-full bg-surface-2 px-3.5 py-1.5 text-sm text-ink">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}

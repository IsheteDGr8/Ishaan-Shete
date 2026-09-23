import type { Metadata } from "next";
import { pages } from "@/content/site";
import { projects, projectTags } from "@/content/projects";
import { PageHeader } from "@/components/page-header";
import { WorkFilter } from "@/components/work-filter";

export const metadata: Metadata = {
  title: pages.work.title,
  description: pages.work.lede,
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader eyebrow={pages.work.eyebrow} title={pages.work.title} lede={pages.work.lede} />
      <section aria-labelledby="projects-h" className="shell">
        <h2 id="projects-h" className="sr-only">
          All projects
        </h2>
        <WorkFilter projects={projects} tags={projectTags} />
      </section>
    </>
  );
}

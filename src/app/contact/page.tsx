import type { Metadata } from "next";
import { ArrowUpRight, Download, MapPin, Phone } from "lucide-react";
import { pages, site } from "@/content/site";
import { PageHeader } from "@/components/page-header";
import { CopyEmail } from "@/components/copy-email";
import { ExternalLink } from "@/components/external-link";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { MenuLandscape } from "@/components/menu-landscape";
import { PauseOffscreen } from "@/components/pause-offscreen";

export const metadata: Metadata = {
  title: pages.contact.title,
  description: pages.contact.lede,
  alternates: { canonical: "/contact" },
};

const tile =
  "group flex h-full items-center justify-between gap-4 rounded-[1.5rem] border border-line bg-surface p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-accent";

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow={pages.contact.eyebrow} title={pages.contact.title} lede={pages.contact.lede} />

      <section aria-label="Contact details" className="shell">
        <div className="overflow-hidden rounded-[2rem] border border-line bg-accent-soft">
          <div className="p-8 sm:p-12 lg:p-16">
            <p className="text-ink-2">
              {site.availability.headline}: <span className="text-ink">{site.availability.roles.join(", ")}</span>.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-flex items-center gap-3 break-all font-display text-[clamp(1.6rem,4vw+0.5rem,4rem)] font-bold leading-tight tracking-tight text-accent underline decoration-accent/30 decoration-2 underline-offset-[10px] hover:decoration-accent"
            >
              {site.email}
              <ArrowUpRight className="size-[0.8em] shrink-0" aria-hidden="true" />
            </a>
            <div className="mt-8">
              <CopyEmail email={site.email} className="bg-surface" />
            </div>
          </div>
          <PauseOffscreen>
            <MenuLandscape width={1200} className="h-28 sm:h-auto" />
          </PauseOffscreen>
        </div>

        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <li>
            <a href={site.phone.href} className={tile}>
              <span>
                <span className="eyebrow block">Phone</span>
                <span className="mt-1.5 block font-medium">{site.phone.display}</span>
              </span>
              <Phone className="size-5 text-accent" aria-hidden="true" />
            </a>
          </li>
          <li>
            <ExternalLink href={site.social.linkedin} className={tile}>
              <span>
                <span className="eyebrow block">LinkedIn</span>
                <span className="mt-1.5 block font-medium">in/ishaan-shete</span>
              </span>
              <LinkedInIcon className="size-5 text-accent" />
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href={site.social.github} className={tile}>
              <span>
                <span className="eyebrow block">GitHub</span>
                <span className="mt-1.5 block font-medium">IsheteDGr8</span>
              </span>
              <GitHubIcon className="size-5 text-accent" />
            </ExternalLink>
          </li>
          <li>
            <a href={site.resume.href} download={site.resume.fileName} className={tile}>
              <span>
                <span className="eyebrow block">Résumé</span>
                <span className="mt-1.5 block font-medium">PDF download</span>
              </span>
              <Download className="size-5 text-accent" aria-hidden="true" />
            </a>
          </li>
        </ul>
        <p className="mt-6 flex items-center gap-2 text-sm text-ink-3">
          <MapPin className="size-4" aria-hidden="true" />
          {site.location}
        </p>
      </section>
    </>
  );
}

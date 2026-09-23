import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import portrait from "@/assets/ishaan-shete.jpg";
import { pages, site } from "@/content/site";
import { PageHeader } from "@/components/page-header";
import { PauseOffscreen } from "@/components/pause-offscreen";
import { WaterfallScene } from "@/components/waterfall-scene";

export const metadata: Metadata = {
  title: pages.about.title,
  description: pages.about.lede,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const about = pages.about;

  return (
    <>
      <PageHeader eyebrow={about.eyebrow} title={about.title} lede={about.lede} />

      <section aria-label="About me" className="shell grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-[460px] lg:mx-0">
          <PauseOffscreen className="aspect-[6/7] overflow-hidden rounded-[2rem] border border-line">
            <WaterfallScene />
          </PauseOffscreen>
          <div className="absolute inset-x-8 bottom-8 rotate-[2deg] rounded-[1.5rem] border border-line bg-surface p-2 shadow-[0_24px_48px_-20px_rgb(0_0_0/0.35)] sm:inset-x-14">
            <Image
              src={portrait}
              alt={site.portrait.alt}
              placeholder="blur"
              sizes="(min-width: 1024px) 340px, 70vw"
              className="aspect-square w-full rounded-[1.1rem] object-cover"
            />
          </div>
        </div>

        <div>
          <div className="prose-width space-y-5 text-lede text-ink-2">
            {about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <dl className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2">
            {about.facts.map((f) => (
              <div key={f.label} className="bg-surface p-5">
                <dt className="eyebrow">{f.label}</dt>
                <dd className="mt-1.5 font-medium text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-medium text-accent-ink transition-transform hover:-translate-y-0.5"
            >
              See my work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-surface px-6 py-3.5 font-medium hover:border-ink/40"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

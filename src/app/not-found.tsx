import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { navigation, pages } from "@/content/site";
import { MenuLandscape } from "@/components/menu-landscape";
import { PauseOffscreen } from "@/components/pause-offscreen";

export default function NotFound() {
  return (
    <section className="shell pt-16 md:pt-24">
      <div className="overflow-hidden rounded-[2rem] border border-line bg-surface">
        <div className="p-8 sm:p-12 lg:p-16">
          <p className="eyebrow">404</p>
          <h1 className="mt-4 max-w-[16ch] text-[clamp(2.5rem,5vw+0.5rem,5rem)] font-bold leading-[0.95]">
            {pages.notFound.title}
          </h1>
          <p className="mt-5 text-lede text-ink-2">{pages.notFound.lede}</p>
          <Link
            href="/"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-medium text-accent-ink"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            Back home
          </Link>
          <nav aria-label="Other pages" className="mt-10">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-ink-2">
              {navigation.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-accent">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <PauseOffscreen>
          <MenuLandscape width={1200} className="h-28 sm:h-auto" />
        </PauseOffscreen>
      </div>
    </section>
  );
}

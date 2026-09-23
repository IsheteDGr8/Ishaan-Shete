import Link from "next/link";
import { navigation, site } from "@/content/site";
import { ExternalLink } from "./external-link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="shell grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl font-semibold tracking-tight">{site.name}</p>
          <p className="mt-2 text-sm text-ink-2">
            {site.role} · {site.location}
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-2 hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="space-y-2 text-sm">
          <li>
            <a href={`mailto:${site.email}`} className="text-ink-2 hover:text-ink">
              {site.email}
            </a>
          </li>
          <li>
            <ExternalLink href={site.social.github} className="text-ink-2 hover:text-ink">
              GitHub
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href={site.social.linkedin} className="text-ink-2 hover:text-ink">
              LinkedIn
            </ExternalLink>
          </li>
        </ul>
      </div>
      <div className="shell border-t border-line py-6 text-xs text-ink-3">
        <p>© {new Date().getFullYear()} {site.name}. Built with Next.js.</p>
      </div>
    </footer>
  );
}

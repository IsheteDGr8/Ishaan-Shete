import Link from "next/link";
import { site } from "@/content/site";
import { NavLinks } from "./nav-links";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";
import { CommandPalette } from "./command-palette";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-canvas/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-2.5 font-display text-[1.0625rem] font-semibold tracking-tight">
          <span
            aria-hidden="true"
            className="grid size-7 place-items-center rounded-lg bg-accent text-[0.8125rem] font-bold text-accent-ink transition-transform duration-300 group-hover:-rotate-6"
          >
            IS
          </span>
          {site.name}
        </Link>
        <div className="flex items-center gap-1">
          <nav aria-label="Primary">
            <NavLinks />
          </nav>
          <div className="ml-2">
            <CommandPalette />
          </div>
          <a
            href={site.resume.href}
            download={site.resume.fileName}
            className="ml-2 hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-canvas transition-opacity hover:opacity-85 sm:inline-block"
          >
            Résumé
          </a>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

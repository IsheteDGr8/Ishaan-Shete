"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Download, Mail, Menu, X } from "lucide-react";
import { navigation, site } from "@/content/site";
import { ExternalLink } from "./external-link";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { PoolScene } from "./pool-scene";

const links = [{ label: "Home", href: "/" }, ...navigation];

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const closeRef = useRef<HTMLButtonElement>(null);
  const open = () => {
    dialogRef.current?.showModal();
    closeRef.current?.focus();
  };
  const close = () => dialogRef.current?.close();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const tiles = [
    { key: "email", label: "Email", icon: <Mail className="size-5" aria-hidden="true" />, href: `mailto:${site.email}` },
    { key: "resume", label: "Résumé", icon: <Download className="size-5" aria-hidden="true" />, href: site.resume.href, download: site.resume.fileName },
    { key: "github", label: "GitHub", icon: <GitHubIcon className="size-5" />, href: site.social.github, external: true },
    { key: "linkedin", label: "LinkedIn", icon: <LinkedInIcon className="size-5" />, href: site.social.linkedin, external: true },
  ];

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="grid size-10 place-items-center rounded-full text-ink-2 hover:bg-surface-2 hover:text-ink lg:hidden"
        aria-label="Open menu"
        aria-haspopup="dialog"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        className="menu-panel m-0 ml-auto h-dvh max-h-none w-full max-w-[420px] overflow-hidden rounded-l-[2rem] border-l border-line bg-canvas p-0 text-ink"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="flex items-center justify-between px-6 pt-5">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink-2">
              <span className="status-dot size-1.5 rounded-full bg-accent" aria-hidden="true" />
              {site.availability.headline}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="group grid size-11 place-items-center rounded-full bg-surface-2 transition-colors hover:bg-ink hover:text-canvas"
              aria-label="Close menu"
            >
              <X className="size-5 transition-transform duration-300 group-hover:rotate-90" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-5 px-4 [@media(max-height:760px)]:mt-3">
            <ul>
              {links.map((item, i) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href} className="menu-item" style={stagger(i)}>
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className="group flex items-center gap-4 rounded-2xl px-3 py-1.5 transition-colors hover:bg-surface-2 [@media(max-height:760px)]:py-1"
                    >
                      <span className="w-7 text-xs font-medium tabular-nums text-ink-3 group-aria-[current=page]:text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[1.85rem] font-semibold leading-tight [@media(max-height:760px)]:text-[1.6rem] tracking-tight transition-[color,translate] duration-300 group-hover:translate-x-1 group-hover:text-accent group-aria-[current=page]:text-accent">
                        {item.label}
                      </span>
                      <ArrowRight
                        className="ml-auto size-5 -translate-x-2 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-aria-[current=page]:translate-x-0 group-aria-[current=page]:opacity-100"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <ul className="mt-5 grid grid-cols-2 gap-2.5 px-6" aria-label="Quick links">
            {tiles.map((t, i) => {
              const cls =
                "flex h-full items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm font-medium [@media(max-height:760px)]:py-2.5 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent-soft";
              const inner = (
                <>
                  <span className="text-accent">{t.icon}</span>
                  {t.label}
                </>
              );
              return (
                <li key={t.key} className="menu-item" style={stagger(links.length + i)}>
                  {t.external ? (
                    <ExternalLink href={t.href} className={cls}>
                      {inner}
                    </ExternalLink>
                  ) : (
                    <a href={t.href} download={t.download} className={cls}>
                      {inner}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="menu-item mx-6 mt-3 flex items-center justify-between rounded-2xl border border-line bg-surface py-1.5 pl-4 pr-1.5" style={stagger(links.length + 4)}>
            <span className="text-sm font-medium text-ink-2">Theme</span>
            <ThemeToggle />
          </div>

          <div className="mt-auto flex flex-1 flex-col justify-end pt-5">
            <p className="px-6 pb-2 text-xs text-ink-3">
              {site.name} · {site.location}
            </p>
            <div className="relative max-h-[230px] min-h-32 flex-1">
              <PoolScene className="absolute inset-0 size-full" />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

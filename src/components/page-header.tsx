import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_80%_0%,black,transparent_65%)]"
      />
      <div className="shell relative pb-14 pt-16 md:pb-20 md:pt-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 text-[clamp(2.75rem,6vw+0.5rem,6.5rem)] font-bold leading-[0.95]">{title}</h1>
        {lede ? <p className="prose-width mt-6 text-lede text-ink-2">{lede}</p> : null}
        {children}
      </div>
    </header>
  );
}

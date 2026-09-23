"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/content/site";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="hidden items-center gap-1 lg:flex">
      {navigation.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className="rounded-full px-3.5 py-2 text-[0.9375rem] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink aria-[current=page]:bg-surface-2 aria-[current=page]:text-ink"
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

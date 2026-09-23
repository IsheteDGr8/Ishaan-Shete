"use client";

import { Moon, Sun } from "lucide-react";

export function toggleTheme() {
  const dark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {}
}

export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="grid size-10 place-items-center rounded-full text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
      aria-label="Toggle dark theme"
    >
      <Sun className="theme-icon-light size-[18px]" aria-hidden="true" />
      <Moon className="theme-icon-dark size-[18px]" aria-hidden="true" />
    </button>
  );
}

"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, CornerDownLeft, Search } from "lucide-react";
import { commands, type Command } from "@/content/commands";
import { site } from "@/content/site";
import { toggleTheme } from "./theme-toggle";

function matches(command: Command, query: string) {
  const q = query.trim().toLowerCase();
  return q === "" || `${command.label} ${command.group}`.toLowerCase().includes(q);
}

export function CommandPalette() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState("");

  const results = commands.filter((c) => matches(c, query));
  const current = results[Math.min(active, results.length - 1)];

  function open() {
    setQuery("");
    setActive(0);
    setStatus("");
    dialogRef.current?.showModal();
    inputRef.current?.focus();
  }

  function close() {
    dialogRef.current?.close();
  }

  useEffect(() => {
    function onKey(e: globalThis.KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (dialog.open) {
          dialog.close();
          return;
        }
        setQuery("");
        setActive(0);
        setStatus("");
        dialog.showModal();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function run(command: Command) {
    switch (command.kind) {
      case "route":
        close();
        router.push(command.href);
        return;
      case "external":
        close();
        window.open(command.href, "_blank", "noopener,noreferrer");
        return;
      case "download-resume": {
        close();
        const a = document.createElement("a");
        a.href = site.resume.href;
        a.download = site.resume.fileName;
        a.click();
        return;
      }
      case "toggle-theme":
        toggleTheme();
        setStatus("Theme changed");
        return;
      case "copy-email":
        try {
          await navigator.clipboard.writeText(site.email);
          setStatus("Email address copied");
        } catch {
          setStatus(`Copy failed. The address is ${site.email}`);
        }
        return;
    }
  }

  function onInputKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter" && current) {
      e.preventDefault();
      void run(current);
    }
  }

  const optionId = (c: Command) => `${listId}-${c.id}`;

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="hidden items-center gap-2 rounded-full border border-line bg-surface py-1.5 pl-3 pr-1.5 text-sm text-ink-2 transition-colors hover:border-ink-3 hover:text-ink md:inline-flex"
        aria-haspopup="dialog"
        aria-label="Search the site"
      >
        <Search className="size-4" aria-hidden="true" />
        <span>Search</span>
        <kbd className="rounded-md border border-line bg-canvas px-1.5 py-0.5 font-body text-xs text-ink-3">Ctrl K</kbd>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Command palette"
        className="palette mx-auto mt-[12vh] w-[min(640px,calc(100%-2rem))] overflow-hidden rounded-[1.5rem] border border-line bg-surface p-0 text-ink shadow-[0_40px_80px_-24px_rgb(0_0_0/0.35)]"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="flex items-center gap-3 border-b border-line px-5">
          <Search className="size-5 shrink-0 text-ink-3" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={current ? optionId(current) : undefined}
            aria-autocomplete="list"
            aria-label="Search pages, projects and actions"
            placeholder="Search pages, projects, actions…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            className="h-14 w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-3"
          />
          <kbd className="rounded-md border border-line px-1.5 py-0.5 text-xs text-ink-3">Esc</kbd>
        </div>

        <ul id={listId} role="listbox" aria-label="Results" className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
          {results.length === 0 ? (
            <li role="presentation" className="px-4 py-8 text-center text-sm text-ink-2">
              Nothing matches “{query}”.
            </li>
          ) : (
            results.map((c, i) => {
              const selected = c === current;
              const groupStart = i === 0 || results[i - 1].group !== c.group;
              return (
                <li key={c.id} role="presentation">
                  {groupStart ? (
                    <p role="presentation" className="eyebrow px-3 pb-1.5 pt-3">
                      {c.group}
                    </p>
                  ) : null}
                  <div
                    id={optionId(c)}
                    role="option"
                    aria-selected={selected}
                    onMouseMove={() => setActive(i)}
                    onClick={() => void run(c)}
                    className="flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[0.9375rem] aria-selected:bg-accent-soft aria-selected:text-ink"
                  >
                    <span>{c.label}</span>
                    {c.kind === "external" ? (
                      <ArrowUpRight className="size-4 text-ink-3" aria-hidden="true" />
                    ) : selected ? (
                      <CornerDownLeft className="size-4 text-accent" aria-hidden="true" />
                    ) : null}
                  </div>
                </li>
              );
            })
          )}
        </ul>
        <p className="sr-only" aria-live="polite">
          {status || `${results.length} results`}
        </p>
        {status ? <p className="border-t border-line px-5 py-3 text-sm text-accent">{status}</p> : null}
      </dialog>
    </>
  );
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";

function afterLoadAndIdle(fn: () => void) {
  let cancelled = false;
  const idle = () => {
    if (cancelled) return;
    if ("requestIdleCallback" in window) window.requestIdleCallback(() => !cancelled && fn(), { timeout: 2500 });
    else setTimeout(() => !cancelled && fn(), 800);
  };
  if (document.readyState === "complete") idle();
  else window.addEventListener("load", idle, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener("load", idle);
  };
}

export function PauseOffscreen({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    let observer: IntersectionObserver | undefined;
    const cancel = afterLoadAndIdle(() => {
      observer = new IntersectionObserver(([entry]) => {
        el.dataset.paused = entry.isIntersecting ? "false" : "true";
      });
      observer.observe(el);
    });
    return () => {
      cancel();
      observer?.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={className} data-paused="true">
      {children}
    </div>
  );
}

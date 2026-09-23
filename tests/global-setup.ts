import type { FullConfig } from "@playwright/test";
import { routes } from "./routes";

export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0].use.baseURL;
  for (const path of [...routes, "/sitemap.xml", "/robots.txt"]) {
    const res = await fetch(`${baseURL}${path}`);
    if (!res.ok) throw new Error(`Warm-up failed: ${path} returned ${res.status}`);
  }
}

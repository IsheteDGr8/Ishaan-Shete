import type { MetadataRoute } from "next";
import { navigation, site } from "@/content/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", ...navigation.map((n) => n.href), ...projects.map((p) => `/work/${p.slug}`)];
  return routes.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.startsWith("/work/") ? 0.7 : 0.8,
  }));
}

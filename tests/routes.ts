import { navigation } from "../src/content/site";
import { projects } from "../src/content/projects";

export const staticRoutes = ["/", ...navigation.map((n) => n.href)];
export const projectRoutes = projects.map((p) => `/work/${p.slug}`);
export const routes = [...staticRoutes, ...projectRoutes];

export const viewports = [
  { width: 360, height: 740 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];

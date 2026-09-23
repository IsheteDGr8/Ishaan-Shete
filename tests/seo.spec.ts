import { expect, test } from "@playwright/test";
import { site } from "../src/content/site";
import { projects } from "../src/content/projects";
import { routes } from "./routes";

const EM_DASH = "\u2014";

for (const path of routes) {
  test(`metadata and copy · ${path}`, async ({ page }) => {
    await page.goto(path);
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");

    expect(title.length).toBeGreaterThan(5);
    expect(description?.length ?? 0).toBeGreaterThan(30);
    expect(canonical).toBe(path === "/" ? site.url : `${site.url}${path}`);
    expect(await page.locator("h1").count()).toBe(1);

    const text = await page.locator("body").innerText();
    expect(text.includes(EM_DASH), "em dash in rendered text").toBe(false);
    expect(title.includes(EM_DASH), "em dash in title").toBe(false);
    expect(description?.includes(EM_DASH), "em dash in description").toBe(false);

    const levels = await page.$$eval("h1,h2,h3,h4,h5,h6", (hs) => hs.map((h) => Number(h.tagName[1])));
    for (let i = 1; i < levels.length; i++) expect(levels[i] - levels[i - 1], `heading jump at ${i}`).toBeLessThanOrEqual(1);
  });
}

test("home page has valid Person JSON-LD", async ({ page }) => {
  await page.goto("/");
  const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
  const data = JSON.parse(raw ?? "{}");
  expect(data["@type"]).toBe("Person");
  expect(data.name).toBe(site.name);
  expect(data.sameAs).toEqual([site.social.github, site.social.linkedin]);
});

for (const p of projects) {
  test(`case study JSON-LD · ${p.slug}`, async ({ page }) => {
    await page.goto(`/work/${p.slug}`);
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) ?? "{}");
    expect(data.name).toBe(p.title);
    expect(await page.title()).toContain(p.title);
  });
}

test("sitemap lists every route with absolute URLs", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const path of routes) {
    const url = path === "/" ? site.url : `${site.url}${path}`;
    expect(xml).toContain(`<loc>${url}</loc>`);
  }
});

test("robots allows crawling and points at the sitemap", async ({ request }) => {
  const txt = await (await request.get("/robots.txt")).text();
  expect(txt).toContain("Allow: /");
  expect(txt).toContain(`Sitemap: ${site.url}/sitemap.xml`);
});

test("security headers are present on every route", async ({ request }) => {
  for (const path of [...routes, "/does-not-exist"]) {
    const res = await request.get(path);
    const h = res.headers();
    expect(h["content-security-policy"], path).toContain("default-src 'self'");
    expect(h["content-security-policy"], path).toContain("frame-ancestors 'none'");
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["x-frame-options"]).toBe("DENY");
    expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(h["permissions-policy"]).toContain("camera=()");
    expect(h["strict-transport-security"]).toContain("max-age=");
    expect(h["x-powered-by"]).toBeUndefined();
  }
});

test("no source maps are served", async ({ page, request }) => {
  await page.goto("/");
  const scripts = await page.$$eval("script[src]", (s) => s.map((x) => (x as HTMLScriptElement).src));
  expect(scripts.length).toBeGreaterThan(0);
  for (const src of scripts) {
    const res = await request.get(`${src}.map`);
    expect(res.status(), `${src}.map`).toBe(404);
  }
});

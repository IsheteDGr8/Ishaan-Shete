import { expect, test } from "@playwright/test";
import { navigation, pages, site } from "../src/content/site";
import { projects, projectTags } from "../src/content/projects";
import { routes } from "./routes";
import { hydrated } from "./helpers";

test("primary nav reaches every page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await hydrated(page);
  const primary = page.getByRole("navigation", { name: "Primary" });
  for (const item of navigation) {
    await primary.getByRole("link", { name: item.label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${item.href}$`));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(item.label);
    await expect(primary.getByRole("link", { name: item.label, exact: true })).toHaveAttribute("aria-current", "page");
  }
});

test("mobile menu opens, traps focus in a dialog, closes and returns focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await hydrated(page);
  const trigger = page.getByRole("button", { name: "Open menu" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Site menu" });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();

  await trigger.click();
  await dialog.getByRole("link", { name: /Work/ }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(dialog).toBeHidden();
});

test("command palette finds a project and navigates to it", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await hydrated(page);
  const target = projects[projects.length - 1];

  await page.keyboard.press("Control+k");
  const dialog = page.getByRole("dialog", { name: "Command palette" });
  await expect(dialog).toBeVisible();
  const input = dialog.getByRole("combobox");
  await expect(input).toBeFocused();
  await input.fill(target.title);
  await expect(dialog.getByRole("option").first()).toHaveText(target.title);
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(new RegExp(`/work/${target.slug}$`));
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(target.title);
  await expect(dialog).toBeHidden();

  await page.getByRole("button", { name: "Search the site" }).click();
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(page.getByRole("button", { name: "Search the site" })).toBeFocused();
});

test("work filters show the projects for each tag", async ({ page }) => {
  await page.goto("/work");
  await hydrated(page);
  const cards = page.locator("main article");
  await expect(cards).toHaveCount(projects.length);
  for (const tag of projectTags) {
    const button = page.getByRole("button", { name: new RegExp(`^${tag}\\b`) });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    const expected = projects.filter((p) => p.tags.includes(tag));
    await expect(cards).toHaveCount(expected.length);
    for (const p of expected) await expect(page.getByRole("heading", { name: p.title, exact: true })).toBeVisible();
  }
  await page.getByRole("button", { name: /^All\b/ }).click();
  await expect(cards).toHaveCount(projects.length);
});

test("theme choice persists across reloads and pages", async ({ page }) => {
  await page.goto("/");
  await hydrated(page);
  const html = page.locator("html");
  await expect(html).not.toHaveClass(/\bdark\b/);
  await page.getByRole("button", { name: "Toggle dark theme" }).first().click();
  await expect(html).toHaveClass(/\bdark\b/);
  await page.reload();
  await expect(html).toHaveClass(/\bdark\b/);
  await page.goto("/about");
  await expect(html).toHaveClass(/\bdark\b/);
  await page.getByRole("button", { name: "Toggle dark theme" }).first().click();
  await page.reload();
  await expect(html).not.toHaveClass(/\bdark\b/);
});

test("résumé downloads as a PDF", async ({ page, request }) => {
  await page.goto("/");
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("link", { name: "Download résumé" }).click(),
  ]);
  expect(download.suggestedFilename()).toBe(site.resume.fileName);
  const res = await request.get(site.resume.href);
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("application/pdf");
});

test("unknown routes return a real 404 page", async ({ page }) => {
  for (const path of ["/definitely-not-here", "/work/not-a-project"]) {
    const res = await page.goto(path);
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(pages.notFound.title);
    await expect(page.getByRole("link", { name: "Back home" })).toBeVisible();
  }
});

test("every internal link resolves", async ({ page, request }) => {
  const found = new Set<string>();
  for (const path of routes) {
    await page.goto(path);
    const hrefs = await page.$$eval("a[href^='/']", (as) => as.map((a) => a.getAttribute("href")!.split("#")[0]));
    hrefs.forEach((h) => found.add(h));
  }
  for (const href of found) {
    const res = await request.get(href);
    expect(res.status(), href).toBe(200);
  }
});

test("keyboard focus is never trapped and stays visible", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await hydrated(page);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();

  const seen: string[] = [];
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      return { inFooter: !!el.closest("footer"), outlined: cs.outlineStyle !== "none" && cs.outlineWidth !== "0px", tag: el.tagName };
    });
    if (!info) continue;
    expect(info.outlined, `focus ring on ${info.tag}`).toBe(true);
    seen.push(info.inFooter ? "footer" : "main");
    if (info.inFooter) break;
  }
  expect(seen).toContain("footer");
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  for (const path of routes) {
    test(`${path} renders all content`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const hidden = await page.$$eval("[data-reveal]", (els) => els.filter((e) => getComputedStyle(e).opacity !== "1").length);
      expect(hidden).toBe(0);
    });
  }

  test("work index lists every project", async ({ page }) => {
    await page.goto("/work");
    for (const p of projects) await expect(page.getByRole("heading", { name: p.title, exact: true })).toBeVisible();
  });
});

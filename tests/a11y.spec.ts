import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { routes } from "./routes";
import { ready, setTheme } from "./helpers";

const MIN_RATIO = 1.6;

for (const theme of ["light", "dark"] as const) {
  for (const path of routes) {
    test(`axe WCAG 2.2 AA · ${theme} · ${path}`, async ({ page }) => {
      await setTheme(page, theme);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      await ready(page);
      await page.evaluate(() => document.documentElement.classList.add("reveal-all"));
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
      expect(summary).toEqual([]);
    });

    test(`contrast walker · ${theme} · ${path}`, async ({ page }) => {
      await setTheme(page, theme);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      await ready(page);
      await page.evaluate(() => document.documentElement.classList.add("reveal-all"));

      const failures = await page.evaluate((min) => {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 1;
        const ctx = canvas.getContext("2d", { willReadFrequently: true })!;

        const rgba = (css: string) => {
          ctx.clearRect(0, 0, 1, 1);
          ctx.fillStyle = "#000";
          ctx.fillStyle = css;
          ctx.fillRect(0, 0, 1, 1);
          const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
          return { r, g, b, a: a / 255 };
        };
        const over = (top: ReturnType<typeof rgba>, bottom: ReturnType<typeof rgba>) => ({
          r: top.r * top.a + bottom.r * (1 - top.a),
          g: top.g * top.a + bottom.g * (1 - top.a),
          b: top.b * top.a + bottom.b * (1 - top.a),
          a: 1,
        });
        const lum = ({ r, g, b }: { r: number; g: number; b: number }) => {
          const f = (c: number) => {
            const s = c / 255;
            return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
          };
          return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
        };

        const background = (el: Element) => {
          const layers: ReturnType<typeof rgba>[] = [];
          for (let node: Element | null = el; node; node = node.parentElement) {
            const c = rgba(getComputedStyle(node).backgroundColor);
            if (c.a > 0) layers.push(c);
            if (c.a >= 1) break;
          }
          let base = rgba(getComputedStyle(document.documentElement).backgroundColor);
          if (base.a < 1) base = { r: 255, g: 255, b: 255, a: 1 };
          for (let i = layers.length - 1; i >= 0; i--) base = over(layers[i], base);
          return base;
        };

        const out: string[] = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          const text = n.textContent?.trim();
          const el = n.parentElement;
          if (!text || !el) continue;
          const cs = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          if (cs.visibility === "hidden" || rect.width === 0 || rect.height === 0 || el.closest("[aria-hidden='true'],dialog:not([open]),.sr-only,svg")) continue;
          const bg = background(el);
          const fg = over(rgba(cs.color), bg);
          const [a, b] = [lum(fg), lum(bg)].sort((x, y) => y - x);
          const ratio = (a + 0.05) / (b + 0.05);
          if (ratio < min) out.push(`${ratio.toFixed(2)}:1 "${text.slice(0, 40)}"`);
        }
        return out;
      }, MIN_RATIO);

      expect(failures).toEqual([]);
    });
  }
}

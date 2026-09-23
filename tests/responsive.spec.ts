import { expect, test } from "@playwright/test";
import { routes, viewports } from "./routes";
import { collectProblems, ready } from "./helpers";

for (const vp of viewports) {
  test.describe(`${vp.width}px`, () => {
    test.use({ viewport: vp });

    for (const path of routes) {
      test(`${path} renders cleanly`, async ({ page }) => {
        const problems = collectProblems(page);
        await page.goto(path);
        await ready(page);
        await page.waitForLoadState("load");

        const layout = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth - window.innerWidth,
          brokenImages: [...document.images].filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src),
        }));

        expect(layout.overflow, "horizontal overflow in px").toBeLessThanOrEqual(0);
        expect(layout.brokenImages).toEqual([]);
        expect(problems).toEqual([]);
      });
    }
  });
}

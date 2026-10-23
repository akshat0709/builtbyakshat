import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility Audits", () => {
  const routes = [
    "/",
    "/experience",
    "/built",
    "/built/orange-taxi",
    "/security",
    "/colophon",
    "/uses",
    "/contact",
  ];

  for (const route of routes) {
    test(`route ${route} meets WCAG AA standards`, async ({ page }) => {
      await page.goto(route);
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});

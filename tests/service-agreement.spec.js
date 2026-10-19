import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import AxeBuilder from "@axe-core/playwright";

const source = readFileSync(
  new URL("../src/content/service-agreement.md", import.meta.url),
  "utf8",
);
const normalize = (text) => text.replace(/\s+/g, " ").trim();
// Strip only the formatting used in this document, retaining every word,
// punctuation mark, signature blank, and section number for comparison.
const expectedText = normalize(
  source
    .replace(/^#{1,6} /gm, "")
    .replace(/^-{3,}\s*$/gm, "")
    .replace(/^- +/gm, "")
    .replaceAll("**", "")
    .replaceAll("\\_", "_"),
);

for (const width of [390, 1440]) {
  test(`complete agreement and navigation at ${width}px`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const footerLink = page.locator("footer").getByRole("link", {
      name: "Service Agreement",
      exact: true,
    });
    await expect(footerLink).toHaveAttribute("href", "/service-agreement");
    await footerLink.click();
    await expect(page).toHaveURL(/\/service-agreement\/?$/);
    await expect(page).toHaveTitle("Service Agreement | Jacob Websites");
    await page.reload();
    const document = page.locator(".agreement-document");
    await expect(document).toBeVisible();
    expect(normalize(await document.innerText())).toBe(expectedText);
    await expect(document.locator("h2")).toHaveCount(43);
    await expect(document).toContainText("Last updated: October 2026");
    await expect(page.getByRole("note")).toContainText(
      "Publishing this page does not represent a client’s acceptance.",
    );
    await expect(
      page.locator("footer").getByRole("link", {
        name: "Service Agreement",
        exact: true,
      }),
    ).toHaveAttribute("aria-current", "page");

    for (const theme of ["dark", "light"]) {
      await page.evaluate((value) => {
        localStorage.setItem("jw-theme", value);
      }, theme);
      await page.reload();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    }
    if (width < 700) {
      await page.getByRole("button", { name: "Menu +" }).click();
    }
    const workLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "Work", exact: true });
    await expect(workLink).toHaveAttribute("href", "/#work");
    await workLink.click();
    await expect(page).toHaveURL(/\/#work$/);
    await expect(
      page.getByRole("heading", { name: "Recent work" }),
    ).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("agreement remains publicly readable without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();
  await page.goto("/service-agreement");
  await expect(page).toHaveTitle("Service Agreement | Jacob Websites");
  expect(normalize(await page.locator(".agreement-document").innerText())).toBe(
    expectedText,
  );
  await context.close();
});

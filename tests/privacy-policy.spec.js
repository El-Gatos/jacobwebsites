import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import AxeBuilder from "@axe-core/playwright";

const source = readFileSync(
  new URL("../src/content/privacy-policy.md", import.meta.url),
  "utf8",
);
const normalize = (text) => text.replace(/\s+/g, " ").trim();
const expectedText = normalize(
  source
    .replace(/^#{1,6} /gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replaceAll("`", ""),
);

for (const width of [390, 1440]) {
  test(`privacy policy and navigation at ${width}px`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const footerLink = page.locator("footer").getByRole("link", {
      name: "Privacy Policy",
      exact: true,
    });
    await expect(footerLink).toHaveAttribute("href", "/privacy-policy");
    await footerLink.click();
    await expect(page).toHaveURL(/\/privacy-policy\/?$/);
    await expect(page).toHaveTitle("Privacy Policy | Jacob Websites");
    await page.reload();

    const article = page.getByRole("article", { name: "Privacy Policy" });
    await expect(article).toBeVisible();
    expect(normalize(await article.innerText())).toBe(expectedText);
    await expect(article.locator("h1")).toHaveText("Privacy Policy");
    await expect(page.locator("footer").getByRole("link", {
      name: "Privacy Policy",
      exact: true,
    })).toHaveAttribute("aria-current", "page");

    for (const theme of ["dark", "light"]) {
      await page.evaluate((value) => localStorage.setItem("jw-theme", value), theme);
      await page.reload();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      expect(await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      )).toBe(true);
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    }

    if (width < 700) {
      await page.getByRole("button", { name: "Menu +" }).click();
    }
    const contactLink = page.getByRole("navigation").getByRole("link", {
      name: "Free mockup",
      exact: true,
    });
    await expect(contactLink).toHaveAttribute("href", "/#contact");
    await contactLink.click();
    await expect(page).toHaveURL(/\/#contact$/);
    expect(errors).toEqual([]);
  });
}

test("privacy policy is readable without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto("/privacy-policy/");
  await expect(page).toHaveTitle("Privacy Policy | Jacob Websites");
  expect(normalize(await page.getByRole("article", {
    name: "Privacy Policy",
  }).innerText())).toBe(expectedText);
  await context.close();
});

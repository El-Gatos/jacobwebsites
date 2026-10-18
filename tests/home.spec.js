import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("responsive page, themes, reduced motion, and accessibility", async ({
  page,
}) => {
  let errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  for (const theme of ["dark", "light"]) {
    await page.evaluate((t) => {
      localStorage.setItem("jw-theme", t);
    }, theme);
    await page.reload();
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  }
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page
      .locator(".ticker>div")
      .evaluate((e) => getComputedStyle(e).animationName),
  ).toBe("none");
  expect(errors).toEqual([]);
});
test("navigation, project dialog, services, and honest inquiry draft", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu +" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Work" })
    .click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.getByRole("button", { name: "Menu +" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  const trigger = page.getByRole("button", { name: "Explore project: KMA" });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText("not commissioned");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.locator(".service summary").first().click();
  await expect(page.locator(".service").first()).toHaveAttribute("open", "");
  await page.getByRole("button", { name: "Prepare my inquiry" }).click();
  await expect(page.getByRole("status")).toHaveCount(0);
  await page.getByLabel("Your name").fill("Test Person");
  await page.getByLabel("Email address").fill("test@example.com");
  await page
    .getByLabel("A little about the project")
    .fill("A new website for an independent local business.");
  await page
    .locator(".choice")
    .filter({ has: page.getByRole("radio", { name: /Website rebuild/ }) })
    .click();
  await page.getByRole("button", { name: "Prepare my inquiry" }).click();
  await expect(page.getByRole("status")).toContainText(
    "No message has been sent",
  );
  const href = await page
    .getByRole("link", { name: "Open email draft" })
    .getAttribute("href");
  expect(decodeURIComponent(href)).toContain("Website rebuild");
  expect(href).toContain("mailto:hello@jacobwebsites.com");
  await page.getByLabel("Your name").fill("Changed");
  await expect(page.getByRole("status")).toHaveCount(0);
});

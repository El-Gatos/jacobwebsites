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
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduce");
  expect(
    await page
      .locator(".flow-connector svg")
      .evaluate((e) => getComputedStyle(e).animationName),
  ).toBe("none");
  expect(errors).toEqual([]);
});
test("navigation, project dialog, services, and honest inquiry draft", async ({
  page,
}) => {
  await page.route("https://formsubmit.co/**", (route) =>
    route.fulfill({ status: 500, contentType: "text/html", body: "error" }),
  );
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
  await page.getByRole("button", { name: "Get my free mockup" }).click();
  await expect(page.getByRole("status")).toHaveCount(0);
  await page.getByLabel("Your name").fill("Test Person");
  await page.getByLabel("Email address").fill("test@example.com");
  await page
    .getByLabel("Your business & what you need")
    .fill("A new website for an independent local business.");
  await page
    .locator(".choice")
    .filter({ has: page.getByRole("radio", { name: /Website rebuild/ }) })
    .click();
  await page.getByRole("button", { name: "Get my free mockup" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your message wasn’t sent",
  );
  const href = await page
    .getByRole("link", { name: "Open email draft" })
    .getAttribute("href");
  expect(decodeURIComponent(href)).toContain("Website rebuild");
  expect(href).toContain("mailto:jacob@jacobwebsites.com");
  await page.getByLabel("Your name").fill("Changed");
  await expect(page.getByRole("status")).toHaveCount(0);
});

test("trade demo updates, portrait photo, and free mockup offer", async ({
  page,
}) => {
  await page.goto("/");
  const demo = page.getByRole("complementary", {
    name: "Explore a sample business website",
  });
  await demo.getByRole("button", { name: "Shop", exact: true }).click();
  await expect(
    demo.getByRole("button", { name: "Shop", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(demo).toContainText("gift shop near me");
  await expect(demo).toContainText("Find something worth keeping.");
  await demo.getByRole("button", { name: "Studio", exact: true }).click();
  await expect(demo).toContainText("photographer near me");
  await expect(page.locator(".portrait img")).toHaveAttribute("src", "/me.webp");
  await expect(page.locator("#contact")).toContainText(
    "A full website build is a separate paid project",
  );
  await page
    .getByRole("link", { name: "Get my free mockup", exact: true })
    .click();
  await expect(page).toHaveURL(/#contact$/);
});

test("motion control persists and honors system preference until overridden", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const control = page.getByRole("button", {
    name: "Reduce motion",
    exact: true,
  });
  await expect(control).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduce");
  await control.click();
  await expect(control).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
  await page.reload();
  await expect(control).toHaveAttribute("aria-pressed", "false");
  await control.click();
  await page.reload();
  await expect(control).toHaveAttribute("aria-pressed", "true");
  expect(
    await page
      .locator(".flow-connector svg")
      .evaluate((e) => getComputedStyle(e).animationName),
  ).toBe("none");
  const current = await page.locator("html").getAttribute("data-theme");
  await page.getByRole("button", { name: /Switch to .* theme/ }).click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme",
    current === "dark" ? "light" : "dark",
  );
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduce");
});
test("maintenance offering, clean navigation, and GitHub link", async ({
  page,
}) => {
  let posted = null;
  await page.route("https://formsubmit.co/ajax/jacob@jacobwebsites.com", (route) => {
    posted = route.request().postDataJSON();
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: "true", message: "ok" }),
    });
  });
  await page.goto("/");
  await expect(
    page
      .getByRole("navigation")
      .getByRole("link", { name: "Work", exact: true }),
  ).toHaveText("Work");
  await page.getByText("Website maintenance", { exact: true }).click();
  await expect(page.locator(".service[open]")).toContainText(
    "Ongoing content changes",
  );
  await expect(page.getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href",
    "https://github.com/El-Gatos",
  );
  await page
    .locator(".choice")
    .filter({
      has: page.getByRole("radio", { name: "Maintenance", exact: true }),
    })
    .click();
  await page.getByLabel("Your name").fill("Test User");
  await page.getByLabel("Email address").fill("test@example.com");
  await page
    .getByLabel("Your business & what you need")
    .fill("Maintenance for my local shop website.");
  await page.getByRole("button", { name: "Ask about maintenance" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your maintenance inquiry was sent",
  );
  expect(posted._subject).toContain("Website maintenance inquiry");
  expect(posted.email).toBe("test@example.com");
});

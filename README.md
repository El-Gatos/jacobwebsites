# Jacob Websites

Independent React website for jacobwebsites.com. Vite, React, and self-hosted fonts; no UI or animation framework.

## Run

```sh
npm ci
npm run dev
npm run build
npm run preview
npm test
```

The inquiry form creates a local email draft; it does not send or save submissions. Before publishing, confirm ownership and delivery for hello@jacobwebsites.com. No backend is configured. KMA is labeled as an independent, uncommissioned concept. Project visuals are CSS artwork, not screenshots of shipped client work.

Theme follows the system on first visit, persists the explicit choice, and works without animation. Navigation, project dialogs, native service disclosures, and form fields support keyboards. Reduced motion disables animations and smooth scrolling.

## Tests

Install the test browser with `npx playwright install chromium`, then `npm test`. The suite starts Vite, checks mobile and desktop overflow, theme persistence, mobile navigation, dialog focus restoration, validation and draft generation, reduced motion, and axe accessibility in both themes.

Fonts: Barlow Condensed and DM Sans, distributed under the SIL Open Font License. License files are in public/fonts.

Not deployed.

# Jacob Websites

Independent React website for jacobwebsites.com, for independent businesses in Moreno Valley and beyond. Vite, React, and self-hosted fonts; no UI or animation framework.

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

## Photo placeholder

Add your portrait as `public/jacob-portrait.jpg`, then set `JACOB_PHOTO` in `src/main.jsx` to `"/jacob-portrait.jpg"`. The layout uses a 4:5 crop with object-fit cover. The neutral placeholder remains until configured; missing images fall back without a broken image.

## Motion and offer

Staggered headline entrances, SVG route drawing, keyed trade-demo transitions, pointer tilt on project cards, section entrances, a scroll progress line, and a circular theme reveal. All respect reduced motion. No infinite decorative animation. The free offer covers a homepage design mockup; full builds are explicitly paid.

The header Reduce motion button overrides the system preference and persists the choice. Without a saved choice, the site follows the operating system, including changes made while the page is open. Reduced motion disables CSS animation, smooth scrolling, pointer tilt, and the circular theme reveal.

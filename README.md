# Jacob Websites

Website for jacobwebsites.com: web design, development, and maintenance for independent businesses in Moreno Valley and beyond. Built with Vite, React, and self-hosted fonts; no UI or animation framework.

Live preview: https://jacobwebsites.vercel.app (deployed on Vercel).

## Run

```sh
npm ci
npm run dev
npm run build
npm run preview
npm test
```

## Contact form

The free mockup form sends through [FormSubmit](https://formsubmit.co) to jacob@jacobwebsites.com, with no backend to maintain.

- **First-time setup:** the first submission triggers a confirmation email from FormSubmit to jacob@jacobwebsites.com. Click the link in it to activate the form. Until then, submissions are not delivered.
- **Honest states:** the form only says "sent" when FormSubmit confirms it. If sending fails, it tells the visitor nothing was sent and offers an email draft to jacob@jacobwebsites.com instead.
- **Spam:** a hidden `_honey` field catches basic bots.
- The address is also shown in the contact section and footer, so visitors can always email directly.

## Photo

The portrait is `public/me.webp` (720px wide, about 120KB). To replace it, export a new photo at 720px wide as WebP and keep the same filename. If the image fails to load, the frame stays empty rather than showing placeholder text.

## Accessibility and motion

Theme follows the system on first visit and persists an explicit choice. Navigation, project dialogs, native service disclosures, and form fields work with a keyboard. Reduced motion (system setting or the header toggle) disables animations, smooth scrolling, pointer tilt, and the circular theme reveal.

## Tests

Install the test browser with `npx playwright install chromium`, then run `npm test`. The suite starts Vite and checks mobile and desktop overflow, theme persistence, mobile navigation, dialog focus restoration, form sending and its email fallback (FormSubmit is mocked, so tests never send real email), reduced motion, and axe accessibility in both themes.

## Credits

Fonts: Barlow Condensed and DM Sans, under the SIL Open Font License. License files are in `public/fonts`.

KMA is labeled on the site as an independent, uncommissioned concept. Project visuals are CSS artwork, not screenshots of shipped client work.

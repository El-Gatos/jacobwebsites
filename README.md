# Jacob Websites

Website for jacobwebsites.com: web design, development, and maintenance for independent businesses in SoCal and beyond. Built with Vite, React, and self-hosted fonts; no UI or animation framework.

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
- **Honest states:** the form only says "sent" when FormSubmit confirms it. It waits up to 60 seconds for acknowledgement. An explicit rejection offers an email draft; a timeout, connection error, or unreadable response says delivery is unconfirmed and discourages duplicate submissions.
- **Spam:** a hidden `_honey` field catches basic bots.
- The address is also shown in the contact section and footer, so visitors can always email directly.

## Photo

The portrait is `public/me.webp` (720px wide, about 120KB). To replace it, export a new photo at 720px wide as WebP and keep the same filename. If the image fails to load, the frame stays empty rather than showing placeholder text.

## Accessibility and motion

Theme follows the system on first visit and persists an explicit choice. Navigation, project dialogs, native service disclosures, and form fields work with a keyboard. Reduced motion (system setting or the header toggle) disables animations, smooth scrolling, pointer tilt, and the circular theme reveal.

## Tests

Install the test browser with `npx playwright install chromium`, then run `npm test`. The suite starts Vite and checks mobile and desktop overflow, theme persistence, mobile navigation, dialog focus restoration, form sending and its email fallback (FormSubmit is mocked, so tests never send real email), reduced motion, and axe accessibility in both themes.

## Service Agreement

The public document is served at `/service-agreement`, with its own title and canonical URL. The shared footer links directly to that route; navigation from the document returns to the homepage sections.

`src/content/service-agreement.md` is the approved source. It is copied verbatim from `Jacob-Websites-Service-Agreement-Final.md`, including all 41 numbered sections and both signature sections. Do not reformat or edit its wording without explicit review. The separate public-reference note is outside the agreement.

Vite renders the Markdown into the initial HTML and a separate, deferred React chunk. The document is readable without JavaScript and does not add its text to the homepage JavaScript bundle. The Markdown renderer runs only at build time.

After `npm run build`, run `npm run test:agreement-content` to verify the approved source hash, all sections, and the complete rendered agreement. `tests/service-agreement.spec.js` covers the direct footer link, refresh, desktop/mobile layouts, both themes, mobile navigation, and reading without JavaScript. Browser checks require the Playwright browser as described above.

## Credits

Fonts: Barlow Condensed and DM Sans, under the SIL Open Font License. License files are in `public/fonts`.

KMA is labeled on the site as an independent, uncommissioned concept. Project visuals are CSS artwork, not screenshots of shipped client work.

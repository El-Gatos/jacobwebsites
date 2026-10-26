import { defineConfig } from "vite";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const agreementPath = new URL(
  "./src/content/service-agreement.md",
  import.meta.url,
);
const agreementHtml = marked.parse(readFileSync(agreementPath, "utf8"), {
  gfm: false,
  breaks: false,
});
const publicCopyNote =
  '<p class="agreement-reference" role="note">Public reference copy. Publishing this page does not represent a client’s acceptance.</p>';

function agreementRoute(server) {
  server.middlewares.use((request, _response, next) => {
    const [path, query] = (request.url || "").split("?");
    if (path === "/service-agreement" || path === "/service-agreement/") {
      request.url =
        "/service-agreement/index.html" + (query ? "?" + query : "");
    }
    next();
  });
}

export default defineConfig({
  plugins: [
    {
      name: "service-agreement-document",
      configureServer: agreementRoute,
      configurePreviewServer: agreementRoute,
      resolveId(id) {
        if (id === "virtual:service-agreement") return "\0service-agreement";
      },
      load(id) {
        if (id === "\0service-agreement") {
          this.addWatchFile(fileURLToPath(agreementPath));
          return `export const html = ${JSON.stringify(agreementHtml)}; export const note = ${JSON.stringify(publicCopyNote)};`;
        }
      },
      transformIndexHtml(html) {
        return html.replace(
          "<!-- agreement-content -->",
          `<main id="main" class="agreement-main"><div class="agreement-page">${publicCopyNote}<article class="agreement-document" aria-label="Website Services and Care Agreement">${agreementHtml}</article></div></main>`,
        );
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL("./index.html", import.meta.url)),
        agreement: fileURLToPath(
          new URL("./service-agreement/index.html", import.meta.url),
        ),
        terms: fileURLToPath(new URL("./terms/index.html", import.meta.url)),
        privacy: fileURLToPath(new URL("./privacy/index.html", import.meta.url)),
        legal: fileURLToPath(new URL("./legal/index.html", import.meta.url)),
      },
    },
  },
});

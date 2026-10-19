import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { marked } from "marked";

const read = (path) =>
  readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("agreement source and built page preserve the approved document", () => {
  const source = read("src/content/service-agreement.md");
  assert.equal(
    createHash("sha256").update(source).digest("hex"),
    "843a5f5640144c9b2f360661647546ad19356410a134cdc0e692aa2e0a28e5b0",
    "The approved agreement changed; obtain explicit review before updating its recorded hash.",
  );
  const built = read("dist/service-agreement/index.html");
  const article = built.match(/<article[^>]*>([\s\S]*?)<\/article>/)?.[1];
  assert.equal(article, marked.parse(source, { gfm: false, breaks: false }));
  assert.equal((article.match(/<h2>/g) || []).length, 43);
  assert.match(built, /<title>Service Agreement \| Jacob Websites<\/title>/);
  assert.match(built, /Last updated: October 2026/);
  assert.match(
    built,
    /canonical"\s+href="https:\/\/www.jacobwebsites.com\/service-agreement"/,
  );
  assert.ok(built.indexOf("Publishing this page") < built.indexOf("<article"));
  assert.doesNotMatch(article, /Publishing this page/);
  assert.ok(
    read("public/sitemap.xml").includes(
      "https://www.jacobwebsites.com/service-agreement",
    ),
  );
});

import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const projects = [
  { slug: "coffeecat", title: "CoffeeCat", metric: "NETWORK CALLS" },
  { slug: "codehusk", title: "CodeHuskAI", metric: "ANALYSIS" },
  { slug: "cremeai", title: "CrèmeAI", metric: "RUNTIME" },
];

test("static export includes the home page and metadata routes", () => {
  assert.equal(existsSync("out/index.html"), true);
  assert.equal(existsSync("out/sitemap.xml"), true);
  assert.equal(existsSync("out/robots.txt"), true);
});

test("home page export contains core anchors and assets", () => {
  const html = readFileSync("out/index.html", "utf8");

  for (const anchor of ["top", "extension", "work", "about", "contact"]) {
    assert.match(html, new RegExp(`id="${anchor}"`));
  }

  assert.match(html, /\/art\/buddy\.webp/);
});

test("project pages export as static directory indexes", () => {
  for (const { slug, title, metric } of projects) {
    const path = `out/work/${slug}/index.html`;
    assert.equal(existsSync(path), true, `${path} was not exported`);

    const html = readFileSync(path, "utf8");
    assert.match(html, new RegExp(`/work/${slug}/`));
    assert.match(html, new RegExp(title));
    assert.match(html, new RegExp(metric));
    assert.match(html, /View repository/);
    assert.match(html, /Back to work/);
  }
});

test("sitemap uses deterministic dates and includes project routes", () => {
  const sitemap = readFileSync("out/sitemap.xml", "utf8");

  assert.doesNotMatch(sitemap, /T\d{2}:\d{2}:\d{2}/);
  assert.match(sitemap, /2026-07-26/);

  for (const { slug } of projects) {
    assert.match(sitemap, new RegExp(`/work/${slug}/`));
  }
});

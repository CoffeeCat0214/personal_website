import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

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

test("sitemap uses deterministic last modified date", () => {
  const sitemap = readFileSync("out/sitemap.xml", "utf8");

  assert.doesNotMatch(sitemap, /T\d{2}:\d{2}:\d{2}/);
  assert.match(sitemap, /2026-07-26/);
});

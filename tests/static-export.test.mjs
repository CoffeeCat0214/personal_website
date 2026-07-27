import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const projects = [
  { slug: "coffeecat", title: "CoffeeCat", metric: "NETWORK CALLS" },
  { slug: "codehusk", title: "CodeHuskAI", metric: "ANALYSIS" },
  { slug: "cremeai", title: "CrèmeAI", metric: "RUNTIME" },
];

/* Read out of the content source rather than hardcoded here. This file is .mjs
   and runs against the built export with no TypeScript step, so it cannot import
   the module -- but a literal date copied into the assertion fails the next time
   site.lastUpdated is bumped, which is a test that breaks on correct changes and
   teaches you to edit the test rather than look at it. Scraping the one field
   keeps the real contract: what the sitemap publishes is what the content says.
   See docs/deployment.md. */
function contentLastUpdated() {
  const source = readFileSync("src/content/identity.ts", "utf8");
  const match = source.match(/lastUpdated:\s*"(\d{4}-\d{2}-\d{2})"/);
  assert.ok(match, "identity.ts has no lastUpdated date to compare against");
  return match[1];
}

test("static export includes the home page and metadata routes", () => {
  assert.equal(existsSync("out/index.html"), true);
  assert.equal(existsSync("out/sitemap.xml"), true);
  assert.equal(existsSync("out/robots.txt"), true);
});

test("home page export contains core anchors and assets", () => {
  /* out/home/index.html, not out/index.html. The site moved off "/" when the
     gate took that route; asserting against the old path would pass forever on
     whatever "/" happened to contain. */
  const html = readFileSync("out/home/index.html", "utf8");

  for (const anchor of ["top", "extension", "cremeai"]) {
    assert.match(html, new RegExp(`id="${anchor}"`));
  }

  assert.match(html, /\/art\/hero-cat-cool\.png/);
  assert.equal(existsSync("out/art/hero-cat-cool.png"), true);
  assert.match(html, /aria-label="Visual mode"/);
  assert.match(html, /aria-pressed="true"/);
  assert.match(html, />Glam<\/button>/);
  assert.match(html, />Grind<\/button>/);
  assert.match(html, /data-separator="projects"/);
  assert.match(html, /data-separator="bubble"/);
  assert.match(html, /EVEN IN THE AGE/);
  assert.match(html, /Focus without network access\./);
  assert.match(html, /Serverless Discord assistant\./);
  assert.match(html, /Hero_[^\"]+ tone-pink/);
  assert.match(html, /View CoffeeCat/);
  assert.match(html, /Request path/);
  assert.match(html, /Start focus/);
  assert.match(html, /class="Confetti_[^"]+" aria-hidden="true"/);
  assert.doesNotMatch(html, /Testing/);
  assert.doesNotMatch(html, /whether a tool can be genuinely useful/);
  assert.doesNotMatch(html, /CodeHuskAI/);
});

/* The two routes have to stay genuinely different documents. The failure this
   guards against is a refactor that quietly puts the gate back into the site
   layout, or the site back onto "/" -- both of which leave a build that works
   when clicked through and is wrong in every other respect: duplicate content
   on two URLs, the nav on the gate, the TL;DR above every act. */
test("the gate and the site are separate documents", () => {
  const gate = readFileSync("out/index.html", "utf8");
  const home = readFileSync("out/home/index.html", "utf8");

  // The gate carries no site chrome and none of the acts.
  for (const anchor of ["extension", "cremeai"]) {
    assert.doesNotMatch(gate, new RegExp(`id="${anchor}"`), `gate should not contain #${anchor}`);
  }
  assert.doesNotMatch(gate, /Skip to content/, "gate should not render the site chrome");

  // The site carries the acts but not the gate's TL;DR.
  assert.doesNotMatch(home, /TL;DR/, "the TL;DR belongs to the gate alone");
  assert.match(home, /Skip to content/);

  /* Every nav anchor on the site points into /home/, never bare "/#". A bare
     anchor would land on the gate, which has no acts, and fail silently. */
  assert.doesNotMatch(home, /href="\/#/, 'site links must not target "/#"');
  assert.match(home, /href="\/home\/#cremeai"/);

  // And the gate's only way forward is the site.
  assert.match(gate, /href="\/home\/?"/);
});

/* The gate is the one section on the site whose content is gambled on a client
   component behaving: GateLock holds the page there, and Gate itself renders no
   copy of its own that a crawler could not reach. This asserts the opposite --
   that the TL;DR is in the shipped HTML, not assembled after hydration.

   Worth having because the failure is silent. If the gate were ever refactored
   into a client component, or its copy moved behind an effect, the page would
   still look correct in a browser while serving crawlers and no-JS visitors a
   scroll hint and nothing else. Nothing else in the suite would notice. */
test("entry gate ships its copy in the static HTML", () => {
  const html = readFileSync("out/index.html", "utf8");
  const source = readFileSync("src/content/home.ts", "utf8");

  /* Scraped from the content module rather than pasted here, matching the
     lastUpdated convention above: the contract is that whatever the content
     says is what the export publishes, not that it says one specific sentence
     somebody typed into a test a year ago.

     Scoped to the tldr declaration rather than scraped from the whole file --
     `text:` is a generic enough key that a future content addition elsewhere in
     home.ts would otherwise start silently contributing assertions here. */
  const block = source.match(/export const tldr: Tldr = \{([\s\S]*?)\n\};/);
  assert.ok(block, "home.ts has no tldr declaration to compare against");

  const heading = block[1].match(/heading:\s*"([^"]+)"/);
  assert.ok(heading, "the tldr declaration has no heading");

  /* Every run, not just the long ones. Item 3 is three short runs either side of
     the emphasis, and a length threshold would quietly skip exactly the item
     whose markup is least trivial. */
  const items = [...block[1].matchAll(/text:\s*\n?\s*"([^"]+)"/g)].map((m) => m[1]);
  assert.ok(items.length >= 3, `expected at least 3 TL;DR item runs, found ${items.length}`);

  const decoded = html.replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, "&");

  assert.ok(
    decoded.includes(heading[1]),
    "the TL;DR heading is missing from out/index.html"
  );

  for (const item of items) {
    const plain = item.replace(/\\"/g, '"').replace(/’/g, "’");
    assert.ok(
      decoded.includes(plain),
      `TL;DR item missing from out/index.html: ${plain.slice(0, 48)}...`
    );
  }

  /* The emphasis is content, not decoration -- "Glam & Grind" is the one phrase
     on the gate carrying weight, and it renders through a <strong>. */
  assert.match(html, /<strong[^>]*>Glam &amp; Grind<\/strong>/);
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
  assert.match(sitemap, new RegExp(contentLastUpdated()));

  for (const { slug } of projects) {
    assert.match(sitemap, new RegExp(`/work/${slug}/`));
  }
});

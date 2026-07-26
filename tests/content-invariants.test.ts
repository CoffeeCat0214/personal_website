import assert from "node:assert/strict";
import test from "node:test";
import { flagship, homeSections, navSections, tools } from "../src/content";

const contentTones = new Set(["sage", "pink", "forest"]);
const panelTones = new Set(["lilac", "orange"]);

function sectionIds() {
  return new Set(
    homeSections.map((section) => {
      if (section.kind === "runner") return section.runner.id;
      if (section.kind === "panel") return section.panel.id;
      return section.id;
    })
  );
}

test("home section ids are unique", () => {
  const ids = homeSections.map((section) => {
    if (section.kind === "runner") return section.runner.id;
    if (section.kind === "panel") return section.panel.id;
    return section.id;
  });

  assert.equal(new Set(ids).size, ids.length);
});

test("navigation is derived from act sections", () => {
  const expected = homeSections.flatMap((section) =>
    section.kind === "act" ? [{ id: section.id, label: section.navLabel }] : []
  );

  assert.deepEqual(navSections, expected);
});

test("navigation targets real sections", () => {
  const ids = sectionIds();

  for (const section of navSections) {
    assert.equal(ids.has(section.id), true, `${section.id} is missing from homeSections`);
  }
});

test("panels point at real following act sections", () => {
  const ids = sectionIds();

  for (const section of homeSections) {
    if (section.kind !== "panel") continue;
    assert.equal(ids.has(section.precedes), true, `${section.panel.id} precedes ${section.precedes}`);
  }
});

test("act sections only use body-copy tones", () => {
  for (const section of homeSections) {
    if (section.kind !== "act") continue;
    assert.equal(contentTones.has(section.tone), true, `${section.id} uses ${section.tone}`);
  }
});

test("panels and runners only use display-only tones", () => {
  for (const section of homeSections) {
    if (section.kind === "panel") {
      assert.equal(panelTones.has(section.panel.tone), true, `${section.panel.id} uses ${section.panel.tone}`);
    }

    if (section.kind === "runner") {
      assert.equal(panelTones.has(section.runner.tone), true, `${section.runner.id} uses ${section.runner.tone}`);
    }
  }
});

test("projects carry evidence fields", () => {
  assert.ok(flagship.tests);
  assert.notEqual(flagship.metrics.length, 0);
  assert.notEqual(flagship.tech.length, 0);
  assert.notEqual(flagship.beats.length, 0);

  for (const tool of tools) {
    assert.ok(tool.tests, `${tool.id} is missing tests`);
    assert.notEqual(tool.metrics.length, 0, `${tool.id} is missing metrics`);
    assert.notEqual(tool.tech.length, 0, `${tool.id} is missing tech`);
    assert.ok(tool.href, `${tool.id} is missing href`);
  }
});

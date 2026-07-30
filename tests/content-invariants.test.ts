import assert from "node:assert/strict";
import test from "node:test";
import {
  CONTENT_TONES,
  FIGURE_NAMES,
  HOME_ROUTE,
  featuredProject,
  getProjectBySlug,
  homeNavSections,
  homeSections,
  navSections,
  projectRoutes,
  projects,
  supportingProjects,
} from "../src/content";

const contentTones = new Set(CONTENT_TONES);
const figureNames = new Set(FIGURE_NAMES);

function sectionIds(): Set<string> {
  return new Set<string>(
    homeSections.map((section) => section.id)
  );
}

test("home section ids are unique", () => {
  const ids = Array.from(sectionIds());
  assert.equal(new Set(ids).size, ids.length);
});

test("navigation is route-aware and derived from act sections", () => {
  const expectedHomeNav = homeSections.flatMap((section) =>
    section.kind === "act" ? [{ id: section.id, label: section.navLabel }] : []
  );
  const expectedRouteNav = expectedHomeNav.map((section) => ({
    label: section.label,
    href: `${HOME_ROUTE}#${section.id}`,
    kind: "home-anchor",
  }));

  assert.deepEqual(homeNavSections, expectedHomeNav);
  assert.deepEqual(navSections, expectedRouteNav);
});

test("navigation targets real homepage sections", () => {
  const ids = sectionIds();

  for (const section of homeNavSections) {
    assert.equal(ids.has(section.id), true, `${section.id} is missing from homeSections`);
  }

  /* Anchors resolve against HOME_ROUTE, not "/". The gate owns "/" and has no
     acts on it, so a nav href that still pointed at /#cremeai would land on the
     TL;DR and silently do nothing -- which is exactly the regression this
     assertion exists to catch. */
  for (const section of navSections) {
    const anchor = section.href.replace(`${HOME_ROUTE}#`, "");
    assert.equal(
      section.href.startsWith(`${HOME_ROUTE}#`),
      true,
      `${section.href} does not point into ${HOME_ROUTE}`
    );
    assert.equal(ids.has(anchor), true, `${section.href} is missing from homeSections`);
  }
});

test("tones only appear on legal surfaces", () => {
  for (const section of homeSections) {
    if (section.kind === "act") {
      assert.equal(contentTones.has(section.tone), true, `${section.id} uses ${section.tone}`);
    }
  }

  for (const project of projects) {
    assert.equal(contentTones.has(project.tone), true, `${project.slug} uses ${project.tone}`);
  }
});

test("project catalog has stable routes and required metadata", () => {
  const slugs = projects.map((project) => project.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.equal(projectRoutes.length, projects.length);

  for (const project of projects) {
    assert.equal(getProjectBySlug(project.slug), project);
    assert.equal(figureNames.has(project.figure), true, `${project.slug} uses ${project.figure}`);
    assert.ok(project.metadata.title, `${project.slug} is missing metadata title`);
    assert.ok(project.metadata.description, `${project.slug} is missing metadata description`);
    assert.ok(project.lastUpdated, `${project.slug} is missing lastUpdated`);
    assert.ok(project.repoHref, `${project.slug} is missing repoHref`);
    assert.notEqual(project.metrics.length, 0, `${project.slug} is missing metrics`);
    assert.notEqual(project.tech.length, 0, `${project.slug} is missing tech`);
    assert.notEqual(project.caseStudy.length, 0, `${project.slug} is missing case study`);
  }

  for (const route of projectRoutes) {
    assert.equal(route.href, `/work/${route.slug}/`);
    assert.ok(getProjectBySlug(route.slug), `${route.slug} route has no project`);
  }
});

test("homepage project previews point to catalog projects", () => {
  assert.ok(featuredProject.homeAnchorId);
  assert.equal(sectionIds().has(featuredProject.homeAnchorId), true);
  assert.deepEqual(
    supportingProjects.map((project) => project.slug),
    ["cremeai"],
    "the public work index keeps CrèmeAI as the only supporting project"
  );

  for (const project of supportingProjects) {
    assert.ok(getProjectBySlug(project.slug), `${project.slug} is missing from projects`);
  }
});

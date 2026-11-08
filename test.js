#!/usr/bin/env node
/**
 * Unit tests for the generator itself.
 *
 * WHY THIS EXISTS
 * check.js tests the *output* — links resolve, headings are right, nothing is broken. It does
 * not test the code that produced the output. The portfolio's own case study listed that as a
 * gap, so this closes it rather than leaving it as a known hole.
 *
 * The things tested here are the ones that fail silently and expensively: escaping (a missed
 * case corrupts a page without erroring), the base-path rewrite (gets the subpath deploy
 * wrong and the site renders unstyled), and the data invariants the editorial rules depend on.
 *
 * No framework. Node's built-in test runner, run with: npm test
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { esc, escJsonLd, prose, inline, when, list, link, pill } from './src/lib/html.js';
import projects from './src/data/projects.js';
import skillCategories, { TIERS } from './src/data/skills.js';
import { verificationCases } from './src/data/verification.js';
import { howItWorks } from './src/data/how-it-works.js';
import site from './src/data/site.js';
import profile from './src/data/profile.js';

/* ───────────────── escaping ───────────────── */

test('esc handles every character that breaks markup', () => {
  assert.equal(esc('<script>'), '&lt;script&gt;');
  assert.equal(esc('a & b'), 'a &amp; b');
  assert.equal(esc('say "hi"'), 'say &quot;hi&quot;');
  assert.equal(esc("it's"), 'it&#39;s');
});

test('esc escapes the ampersand first, so entities are not double-formed', () => {
  // If & were escaped after <, "&lt;" would become "&amp;lt;".
  assert.equal(esc('<&>'), '&lt;&amp;&gt;');
});

test('esc renders null and undefined as empty, not as the word', () => {
  assert.equal(esc(null), '');
  assert.equal(esc(undefined), '');
  assert.equal(esc(0), '0'); // but zero is a real value
});

test('escJsonLd neutralises a closing script tag', () => {
  const out = escJsonLd({ bio: '</script><img onerror=x>' });
  assert.ok(!out.includes('</script>'));
  assert.ok(out.includes('\\u003c'));
});

/* ───────────────── prose ───────────────── */

test('prose splits on blank lines and collapses soft wraps', () => {
  const out = prose('one\n      two\n\n      three');
  assert.equal(out, '<p>one two</p>\n<p>three</p>');
});

test('prose escapes its content', () => {
  assert.ok(prose('5 < 6').includes('5 &lt; 6'));
});

test('prose returns empty for empty input rather than an empty paragraph', () => {
  assert.equal(prose(''), '');
  assert.equal(prose(null), '');
});

test('inline collapses all whitespace to single spaces', () => {
  assert.equal(inline('  a \n\n  b  '), 'a b');
});

/* ───────────────── helpers ───────────────── */

test('when renders the truthy branch and supports a fallback', () => {
  assert.equal(when(true, () => 'yes', () => 'no'), 'yes');
  assert.equal(when(false, () => 'yes', () => 'no'), 'no');
  assert.equal(when(false, () => 'yes'), '');
  assert.equal(when(true, 'plain'), 'plain');
});

test('list maps with an index and returns empty for nothing', () => {
  assert.equal(list(['a', 'b'], (x, i) => `${i}${x}`), '0a\n1b');
  assert.equal(list([], (x) => x), '');
  assert.equal(list(null, (x) => x), '');
});

test('link marks external links safe and leaves internal ones alone', () => {
  const ext = link('https://example.com', 'Example');
  assert.ok(ext.includes('target="_blank"'));
  assert.ok(ext.includes('rel="noopener noreferrer"'));

  const int = link('/about/', 'About');
  assert.ok(!int.includes('target='));
  assert.ok(!int.includes('rel='));
});

test('link escapes a label containing markup', () => {
  assert.ok(link('/x/', '<b>').includes('&lt;b&gt;'));
});

test('pill escapes its label', () => {
  assert.ok(pill('<x>', 'live').includes('&lt;x&gt;'));
});

/* ───────────────── base path rewriting ─────────────────
   This is the logic that breaks a subpath deploy if it is wrong, and the symptom is a
   completely unstyled page rather than an error. Worth testing directly. */

const applyBasePath = (html, BASE) =>
  !BASE ? html : html.replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`);

test('base path prefixes root-relative hrefs and srcs', () => {
  assert.equal(applyBasePath('<a href="/about/">', '/p'), '<a href="/p/about/">');
  assert.equal(applyBasePath('<script src="/a.js">', '/p'), '<script src="/p/a.js">');
});

test('base path leaves absolute URLs and protocol-relative URLs alone', () => {
  const html = '<a href="https://x.com/"><a href="mailto:a@b.c"><a href="//cdn/x">';
  assert.equal(applyBasePath(html, '/p'), html);
});

test('base path is a no-op when empty, so a root deploy is untouched', () => {
  assert.equal(applyBasePath('<a href="/x/">', ''), '<a href="/x/">');
});

/* ───────────────── content invariants ─────────────────
   These encode the editorial rules. A future edit that breaks one fails the test run. */

test('every project has the fields the case-study template requires', () => {
  const required = [
    'slug', 'title', 'subtitle', 'tagline', 'category', 'status', 'period', 'role',
    'meta', 'oneLiner', 'metrics', 'overview', 'problem', 'solution', 'stack',
    'responsibilities', 'process', 'challenges', 'testing', 'statusDetail', 'future',
  ];
  for (const p of projects) {
    for (const f of required) {
      assert.ok(p[f], `project "${p.slug}" is missing ${f}`);
    }
  }
});

test('every project states what is NOT built', () => {
  for (const p of projects) {
    assert.ok(
      Array.isArray(p.statusDetail.notBuilt) && p.statusDetail.notBuilt.length > 0,
      `project "${p.slug}" has no notBuilt list — the editorial rule requires one`,
    );
  }
});

test('project slugs are unique', () => {
  const seen = new Set();
  for (const p of projects) {
    assert.ok(!seen.has(p.slug), `duplicate slug: ${p.slug}`);
    seen.add(p.slug);
  }
});

test('meta descriptions stay within what search engines display', () => {
  for (const p of projects) {
    assert.ok(p.meta.length <= 160, `meta for "${p.slug}" is ${p.meta.length} chars`);
  }
});

test('every how-it-works entry points at a real project', () => {
  const slugs = new Set(projects.map((p) => p.slug));
  for (const key of Object.keys(howItWorks)) {
    assert.ok(slugs.has(key), `how-it-works has an orphan entry: ${key}`);
  }
});

test('every skill uses a defined tier and cites evidence', () => {
  for (const cat of skillCategories) {
    for (const s of cat.skills) {
      assert.ok(TIERS[s.tier], `skill "${s.name}" has unknown tier "${s.tier}"`);
      assert.ok(s.evidence && s.evidence.length > 20, `skill "${s.name}" has no real evidence`);
    }
  }
});

test('skills never reference a project that no longer exists', () => {
  const slugs = new Set(projects.map((p) => p.slug));
  for (const cat of skillCategories) {
    for (const s of cat.skills) {
      for (const ref of s.projects || []) {
        assert.ok(slugs.has(ref), `skill "${s.name}" references missing project "${ref}"`);
      }
    }
  }
});

test('no undemonstrable technology is claimed as a skill', () => {
  // These belong on the roadmap, never in the skills list. See src/data/skills.js.
  const banned = ['AWS', 'Azure', 'Kubernetes', 'Docker', 'TensorFlow', 'scikit-learn', 'React'];
  for (const cat of skillCategories) {
    for (const s of cat.skills) {
      for (const b of banned) {
        assert.ok(
          !new RegExp(`\\b${b}\\b`, 'i').test(s.name),
          `skill list claims "${b}" via "${s.name}"`,
        );
      }
    }
  }
});

test('verification cases carry no identifying context', () => {
  // Anonymised deliberately. A future edit that names the domain fails here.
  const banned = ['forex', 'trading', 'MT5', 'MQL5', 'broker', 'XAUUSD', 'MetaTrader'];
  for (const c of verificationCases) {
    const text = [c.title, c.what, c.whyItMattered, c.whatIDid, c.lesson, c.relevance].join(' ');
    for (const b of banned) {
      assert.ok(
        !new RegExp(`\\b${b}\\b`, 'i').test(text),
        `verification case "${c.id}" mentions "${b}"`,
      );
    }
  }
});

test('contact details are present and the email is not a business address', () => {
  assert.ok(profile.contact.email.includes('@'));
  assert.ok(
    !/mcpautomation|apexdrawdown/i.test(profile.contact.email),
    'contact email points at a business domain',
  );
  assert.ok(profile.contact.linkedin.startsWith('https://'));
});

test('site baseUrl is absolute and has no trailing slash', () => {
  assert.ok(/^https?:\/\//.test(site.baseUrl), 'baseUrl must be absolute');
  assert.ok(!site.baseUrl.endsWith('/'), 'baseUrl must not end with a slash');
});

import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  pageMetadata,
  siteRobots,
  siteSettings,
  siteSitemap,
} from '../../src/lib/site-metadata.ts';

const origin = 'https://portfolio.example.test';
const page = {
  title: 'APC — Portfolio',
  description: 'Project description',
  path: '/work/apc',
  siteName: 'Park Moonseok',
};

test('missing URL cannot expose indexable metadata or guessed absolute URLs', () => {
  for (const flag of [undefined, '', 'false', 'true']) {
    const settings = siteSettings(undefined, flag);
    const meta = pageMetadata(settings, page);
    assert.deepEqual(meta.robots, { index: false, follow: false });
    assert.equal(meta.metadataBase, undefined);
    assert.equal(meta.alternates, undefined);
    assert.equal(meta.openGraph.url, undefined);
    assert.equal(meta.openGraph.images, undefined);
    assert.equal(meta.twitter.images, undefined);
    assert.deepEqual(siteSitemap(settings, ['apc']), []);
    assert.deepEqual(siteRobots(settings), {
      rules: { userAgent: '*', allow: '/' },
    });
  }
});

test('a configured preview has share URLs but remains excluded from indexing', () => {
  for (const flag of [undefined, '', 'false']) {
    const settings = siteSettings(origin, flag);
    const meta = pageMetadata(settings, page);
    assert.equal(meta.alternates.canonical, `${origin}/work/apc`);
    assert.equal(meta.robots.index, false);
    assert.equal(siteRobots(settings).sitemap, undefined);
    assert.deepEqual(siteSitemap(settings, ['apc']), []);
    assert.deepEqual(siteRobots(settings).rules, {
      userAgent: '*',
      allow: '/',
    });
  }
});

test('explicit publication preserves per-page text and emits consistent share metadata', () => {
  const settings = siteSettings(`${origin}/`, 'true');
  assert.equal(settings.origin, origin);
  const meta = pageMetadata(settings, page);
  assert.equal(meta.title, page.title);
  assert.equal(meta.description, page.description);
  assert.equal(meta.openGraph.title, page.title);
  assert.equal(meta.twitter.description, page.description);
  assert.equal(meta.openGraph.url, `${origin}/work/apc`);
  assert.equal(meta.alternates.canonical, meta.openGraph.url);
  assert.deepEqual(meta.openGraph.images, meta.twitter.images);
  assert.equal(meta.openGraph.images[0].url, `${origin}/social/portfolio.png`);
  assert.equal(meta.twitter.card, 'summary_large_image');
  assert.deepEqual(meta.robots, { index: true, follow: true });
  assert.deepEqual(siteSitemap(settings, ['apc', 'emosave']), [
    { url: `${origin}/` },
    { url: `${origin}/work/apc` },
    { url: `${origin}/work/emosave` },
  ]);
  assert.deepEqual(siteRobots(settings), {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${origin}/sitemap.xml`,
  });
});

test('invalid publication configuration fails instead of silently publishing wrong URLs', () => {
  for (const url of [
    'portfolio.example.test',
    'http://portfolio.example.test',
    `${origin}/portfolio`,
    `${origin}?preview=1`,
    `${origin}#home`,
    `${origin}?`,
    `${origin}#`,
    `${origin}/nested/..`,
    'https:portfolio.example.test',
    'https://user:password@portfolio.example.test',
    'https://localhost:3100',
    'https://dev.localhost',
    'https://portfolio.local',
    'https://127.0.0.1',
    'https://[::1]',
  ]) {
    assert.throws(() => siteSettings(url, 'true'), /SITE_URL/, url);
  }
  for (const flag of ['TRUE', '1', 'yes', ' false ']) {
    assert.throws(() => siteSettings(origin, flag), /SITE_INDEXABLE/, flag);
  }
});

test('IP literal origins are rejected, including normalized and mapped addresses', () => {
  for (const host of [
    '10.0.0.1',
    '172.16.0.1',
    '192.168.1.1',
    '169.254.1.1',
    '0.0.0.0',
    '8.8.8.8',
    '127.1',
    '2130706433',
    '0x7f000001',
    '[::ffff:127.0.0.1]',
    '[fc00::1]',
    '[fe80::1]',
    '[2001:4860:4860::8888]',
  ]) {
    assert.throws(
      () => siteSettings('https://' + host, 'true'),
      /SITE_URL/,
      host
    );
  }
});

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadContent } from './content-loader.mjs';

const root = resolve(import.meta.dirname, '../..');
const { getProjects } = loadContent(resolve(root, 'src/lib/content.ts'));
const { site } = loadContent(resolve(root, 'src/content/site.ts'));
const origin = process.env.SITE_URL
  ? new URL(process.env.SITE_URL).origin
  : undefined;
const indexable = Boolean(origin && process.env.SITE_INDEXABLE === 'true');
const decode = (text) =>
  text
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'");
const tags = (html, tag) =>
  [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'g'))].map(([value]) =>
    Object.fromEntries(
      [...value.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, val]) => [
        key,
        decode(val),
      ])
    )
  );
const read = (path) =>
  readFileSync(resolve(root, '.next/server/app', path), 'utf8');
const pages = [
  {
    path: '/',
    file: 'index.html',
    title: `${site.name} — ${site.role}`,
    description: site.headline,
  },
  ...getProjects().map((p) => ({
    path: `/work/${p.slug}`,
    file: `work/${p.slug}.html`,
    title: `${p.title} — ${p.category} · Park Moonseok`,
    description: p.summary,
  })),
];

for (const page of pages) {
  test(`${page.path}: built metadata uses its own text and publication settings`, () => {
    const html = read(page.file);
    const meta = tags(html, 'meta');
    const value = (name) =>
      meta
        .filter((m) => m.name === name || m.property === name)
        .map((m) => m.content);
    assert.equal(
      decode(html.match(/<title>([^<]+)<\/title>/)?.[1] ?? ''),
      page.title
    );
    assert.deepEqual(value('description'), [page.description]);
    assert.deepEqual(value('og:title'), [page.title]);
    assert.deepEqual(value('og:description'), [page.description]);
    assert.deepEqual(value('twitter:description'), [page.description]);
    assert.deepEqual(value('robots'), [
      indexable ? 'index, follow' : 'noindex, nofollow',
    ]);
    assert.deepEqual(
      tags(html, 'link')
        .filter((m) => m.rel === 'canonical')
        .map((m) => new URL(m.href).href),
      origin ? [`${origin}${page.path}`] : []
    );
    assert.deepEqual(
      value('og:url').map((url) => new URL(url).href),
      origin ? [`${origin}${page.path}`] : []
    );
    for (const name of ['og:image', 'twitter:image']) {
      assert.deepEqual(
        value(name),
        origin ? [`${origin}/social/portfolio.png`] : []
      );
    }
    assert.deepEqual(value('twitter:card'), [
      origin ? 'summary_large_image' : 'summary',
    ]);
    if (origin) {
      assert.deepEqual(value('og:image:width'), ['1200']);
      assert.deepEqual(value('og:image:height'), ['630']);
    }
  });
}

test('404 never inherits the homepage canonical and is excluded from indexing', () => {
  const html = read('_not-found.html');
  assert.ok(
    tags(html, 'meta').some(
      (m) => m.name === 'robots' && m.content.includes('noindex')
    )
  );
  assert.equal(
    tags(html, 'link').filter((m) => m.rel === 'canonical').length,
    0
  );
});

test('built robots and sitemap agree with the publication policy', () => {
  const robots = read('robots.txt.body');
  const sitemap = read('sitemap.xml.body');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) =>
    decode(url)
  );
  assert.deepEqual(
    urls,
    indexable ? pages.map((p) => `${origin}${p.path}`) : []
  );
  assert.match(robots, /^Allow: \/$/m);
  assert.doesNotMatch(robots, /^Disallow:/m);
  if (indexable) {
    assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  } else {
    assert.doesNotMatch(robots, /^Sitemap:/m);
  }
});

test('share image exists at the published path with the advertised dimensions', () => {
  const png = readFileSync(resolve(root, 'public/social/portfolio.png'));
  assert.equal(png.subarray(1, 4).toString(), 'PNG');
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
});

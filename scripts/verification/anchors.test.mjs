import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadContent } from './content-loader.mjs';

const root = resolve(import.meta.dirname, '../..');
const { getProjects, groupsFor } = loadContent(
  resolve(root, 'src/lib/content.ts')
);
for (const project of getProjects()) {
  test(`${project.slug}: content links and contents groups exist in production HTML`, () => {
    const html = readFileSync(
      resolve(root, `.next/server/app/work/${project.slug}.html`),
      'utf8'
    );
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    assert.equal(ids.length, new Set(ids).size, 'duplicate rendered ids');
    const targets = new Set(groupsFor(project).map((g) => g.id));
    const collect = (value) => {
      if (!value || typeof value !== 'object') return;
      if (typeof value.target === 'string') targets.add(value.target);
      Object.values(value).forEach(collect);
    };
    collect(project);
    for (const condition of project.case.controlExperiment?.conditions ?? [])
      targets.add(condition.id);
    for (const target of targets)
      assert.ok(ids.includes(target), `missing target: ${target}`);
    const renderedGroups = [
      ...html.matchAll(
        /href="#(overview|system|work|engineering|interaction|current-state)"/g
      ),
    ].map((m) => m[1]);
    assert.deepEqual(
      [...new Set(renderedGroups)],
      groupsFor(project).map((g) => g.id)
    );
  });
}

test('ai: only the workflow and actual cases appear in the main landmark', () => {
  const html = readFileSync(resolve(root, '.next/server/app/ai.html'), 'utf8');
  assert.equal([...html.matchAll(/<main\b/g)].length, 1);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(ids.length, new Set(ids).size, 'duplicate rendered ids');
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
  const sections = [...main.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)];
  assert.deepEqual(
    sections.map((match) => match[1]),
    ['work', 'plaza-case']
  );
  assert.doesNotMatch(main, /aria-label="Contents"|#guidelines|#collaboration/);
  assert.ok(ids.includes('overview'), 'preserve existing overview links');
  assert.ok(
    ids.includes('engineering'),
    'preserve links to the verification example'
  );
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g))
    assert.ok(ids.includes(id), `missing target: ${id}`);
  for (const match of html.matchAll(/aria-(?:labelledby|controls)="([^"]+)"/g))
    for (const id of match[1].split(/\s+/))
      assert.ok(ids.includes(id), `missing accessible target: ${id}`);
});

test('ai: the workflow precedes the selectable real cases', () => {
  const html = readFileSync(resolve(root, '.next/server/app/ai.html'), 'utf8');
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
  const workflow = main.indexOf('id="work"');
  const gallery = main.indexOf('id="plaza-case"');
  assert.ok(workflow >= 0 && gallery > workflow);
  assert.ok(!main.slice(workflow, gallery).includes('블로그 자동화'));
  const cases = main.slice(gallery);
  const plaza = cases.indexOf('data-case="plaza"');
  const blog = cases.indexOf('data-case="blog"');
  assert.ok(plaza >= 0 && blog > plaza);
  const comparison = cases.slice(plaza, blog);
  for (const label of ['수정 전', '수정 후', '44가지 조건', '5건', '0건'])
    assert.ok(comparison.includes(label), label);
  for (const piece of ['label', 'panel'])
    assert.ok(comparison.includes(`data-piece="${piece}"`), piece);
  const automation = cases.slice(blog);
  for (const label of ['독자', '교정', '초안', '발행'])
    assert.ok(automation.includes(label), label);
});

for (const page of ['work/emosave', 'preview/emosave-editor']) {
  test(`${page}: embedded editor preserves landmarks and accessible descriptions`, () => {
    const html = readFileSync(
      resolve(root, `.next/server/app/${page}.html`),
      'utf8'
    );
    assert.equal([...html.matchAll(/<main\b/g)].length, 1);
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    assert.equal(ids.length, new Set(ids).size, 'duplicate rendered ids');
    const descriptions = [
      ...html.matchAll(/aria-describedby="([^"]+)"/g),
    ].flatMap((m) => m[1].split(/\s+/));
    for (const id of descriptions)
      assert.ok(ids.includes(id), `missing accessible description: ${id}`);
  });
}

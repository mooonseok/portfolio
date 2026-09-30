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

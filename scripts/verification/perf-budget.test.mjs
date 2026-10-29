import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { measureBundles } from './bundle-size.mjs';

const root = resolve(import.meta.dirname, '../..');
const budget = JSON.parse(
  readFileSync(resolve(import.meta.dirname, 'perf-budget.json'), 'utf8')
);
const { routes, largest } = measureBundles(root);

for (const [route, size] of Object.entries(routes)) {
  test(`${route}: first load JS ${size} kB stays within budget`, () => {
    const limit = budget.routes[route];
    assert.ok(
      limit !== undefined,
      `${route}: add a budget to scripts/verification/perf-budget.json`
    );
    assert.ok(size <= limit, `${route}: ${size} kB > ${limit} kB`);
  });
}

test(`largest chunk ${largest.size} kB stays within budget`, () => {
  assert.ok(
    largest.size <= budget.largestChunk,
    `${largest.file}: ${largest.size} kB > ${budget.largestChunk} kB`
  );
});

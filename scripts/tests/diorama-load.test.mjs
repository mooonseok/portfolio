import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  readStageLoadEnv,
  shouldLoadStage,
} from '../../src/lib/diorama-load.ts';

const fakeWindow = ({ reduced = false, saveData, webgl = true } = {}) => ({
  matchMedia: (query) => ({ matches: reduced && query.includes('reduce') }),
  navigator: saveData === undefined ? {} : { connection: { saveData } },
  ...(webgl
    ? { WebGLRenderingContext: function WebGLRenderingContext() {} }
    : {}),
});

const QUERY = '(prefers-reduced-motion: reduce)';

test('3D stage loads only with WebGL, motion allowed and no data saving', () => {
  assert.equal(
    shouldLoadStage({ reducedMotion: false, saveData: false, webgl: true }),
    true
  );
  assert.equal(
    shouldLoadStage({ reducedMotion: true, saveData: false, webgl: true }),
    false
  );
  assert.equal(
    shouldLoadStage({ reducedMotion: false, saveData: true, webgl: true }),
    false
  );
  assert.equal(
    shouldLoadStage({ reducedMotion: false, saveData: false, webgl: false }),
    false
  );
});

test('load environment reads reduced motion, Save-Data and WebGL support', () => {
  assert.deepEqual(readStageLoadEnv(fakeWindow(), QUERY), {
    reducedMotion: false,
    saveData: false,
    webgl: true,
  });
  assert.deepEqual(
    readStageLoadEnv(
      fakeWindow({ reduced: true, saveData: true, webgl: false }),
      QUERY
    ),
    { reducedMotion: true, saveData: true, webgl: false }
  );
});

test('missing Network Information API counts as no data saving', () => {
  const env = readStageLoadEnv(fakeWindow({ saveData: undefined }), QUERY);
  assert.equal(env.saveData, false);
  assert.equal(shouldLoadStage(env), true);
});

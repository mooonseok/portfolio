import assert from 'node:assert/strict';
import { test } from 'node:test';
import { scanScript } from '../boundaries/scan.mjs';
import { syntaxRules } from '../boundaries/syntax.mjs';
import { layering, isPresentational } from '../boundaries/rules.mjs';

test('regex backticks do not swallow later comments', () => {
  const source = 'const re = /["\'`]/g;\n' + '/' + '/ forbidden';
  assert.equal(scanScript(source).comments.length, 1);
});
test('slashes and escaped character classes inside regex are not comments', () => {
  assert.equal(
    scanScript(String.raw`const r = /[\/\\]foo/; const q = /https?:\/\//;`)
      .comments.length,
    0
  );
});
test('division remains code and comments remain detectable', () => {
  assert.equal(
    scanScript('const n = a / b; ' + '/' + '/ comment').comments.length,
    1
  );
});
test('nested template regex does not swallow code after the template', () => {
  const input = 'const s = `${/[`]/.test(x)}`;\n' + '/' + '/ comment';
  assert.equal(scanScript(input).comments.length, 1);
});
test('strings containing comment markers are valid', () => {
  assert.equal(
    scanScript('const s = "https://example.test";').comments.length,
    0
  );
});
test('React aliases and reversed enum comparisons are checked', () => {
  assert.equal(
    syntaxRules(
      "import {useState as st, createElement as h} from 'react'; st(0); h('div'); 'product' === p.kind;",
      true,
      false,
      false
    ).length,
    3
  );
});
test('primitive createElement and non-enumerated comparisons remain valid', () => {
  assert.equal(
    syntaxRules(
      "import {createElement} from 'react'; createElement('div'); 'hello' === p.title;",
      false,
      true,
      false
    ).length,
    0
  );
});
test('content cannot import hooks or lib and JSX views stay presentational', () => {
  assert.ok(layering(['content'], ['hooks']));
  assert.ok(layering(['content'], ['lib']));
  assert.equal(layering(['content'], ['constants']), null);
  assert.ok(isPresentational(['sections', 'sample-view.jsx']));
});

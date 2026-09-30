import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';

const root = resolve(import.meta.dirname, '../..');
const require = createRequire(import.meta.url);
const cache = new Map();
export function loadContent(file) {
  const path = file.endsWith('.ts')
    ? file
    : existsSync(`${file}.ts`)
      ? `${file}.ts`
      : resolve(file, 'index.ts');
  if (cache.has(path)) return cache.get(path).exports;
  const loaded = { exports: {} };
  cache.set(path, loaded);
  const js = ts.transpileModule(readFileSync(path, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const localRequire = (spec) =>
    spec.startsWith('@/')
      ? loadContent(resolve(root, 'src', spec.slice(2)))
      : spec.startsWith('.')
        ? loadContent(resolve(dirname(path), spec))
        : require(spec);
  new Function('require', 'module', 'exports', js)(
    localRequire,
    loaded,
    loaded.exports
  );
  return loaded.exports;
}

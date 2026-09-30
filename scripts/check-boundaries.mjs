import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { syntaxRules } from './boundaries/syntax.mjs';
import { isPresentational } from './boundaries/rules.mjs';
import { scanScript, scanStyle, lineAt } from './boundaries/scan.mjs';
import {
  comments,
  layering,
  lineCount,
  literalProps,
  presentational,
  rawTags,
} from './boundaries/rules.mjs';

const root = resolve(dirname(new URL(import.meta.url).pathname), '..');
const src = join(root, 'src');
const scripts = join(root, 'scripts');

const RULES = {
  layering: 'dependency direction',
  presentational: 'presentational purity',
  'raw-tag': 'raw HTML tag outside primitives',
  literal: 'string literal instead of constant',
  comment: 'comment',
  length: 'file length',
};

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return walk(p);
    return /\.([jt]sx?|mjs|css)$/.test(name) ? [p] : [];
  });
}

const parts = (file) => relative(src, file).split(sep);

function target(from, spec) {
  if (spec.startsWith('@/')) return spec.slice(2).split('/');
  if (spec.startsWith('.'))
    return relative(src, resolve(dirname(from), spec)).split(sep);
  return null;
}

function importsOf(file, scan) {
  const out = [];
  const re = /(?:from|import)\s+(['"])([^'"]+)\1/g;
  for (const m of scan.code.matchAll(re)) {
    out.push({
      spec: m[2],
      to: target(file, m[2]),
      line: lineAt(scan.code, m.index),
    });
  }
  return out;
}

const report = new Map();
const add = (file, rule, list) => {
  if (!list.length) return;
  const rel = relative(root, file);
  if (!report.has(rel)) report.set(rel, []);
  for (const [line, msg] of list) report.get(rel).push({ rule, line, msg });
};

for (const file of [...walk(src), ...walk(scripts)]) {
  const text = readFileSync(file, 'utf8');
  const rel = relative(root, file);
  const isStyle = file.endsWith('.css');
  const scan = isStyle ? scanStyle(text) : scanScript(text);
  add(file, 'comment', comments(scan));
  add(file, 'length', lineCount(rel, text));
  if (isStyle || !file.startsWith(src + sep)) continue;
  const from = parts(file);
  const imports = importsOf(file, scan);
  add(
    file,
    'layering',
    imports
      .map(({ to, spec, line }) => {
        const msg = to && layering(from, to);
        return msg ? [line, `${spec}: ${msg}`] : null;
      })
      .filter(Boolean)
  );
  add(file, 'presentational', presentational(from, imports, scan));
  add(file, 'raw-tag', rawTags(from, imports, scan));
  add(
    file,
    'literal',
    syntaxRules(
      text,
      isPresentational(from),
      from[0] === 'components' && from[1] === 'atoms',
      from[0] === 'constants'
    )
  );
  add(file, 'literal', literalProps(from, scan));
}

const area = (rel) => {
  const p = rel.split('/');
  if (p[0] !== 'src') return p[0];
  if (p[1] === 'components' || p[1] === 'sections')
    return p.slice(1, 3).join('/');
  return p[1];
};

if (!report.size) {
  console.log('Boundaries: OK');
  process.exit(0);
}

const byRule = {};
const byArea = {};
let total = 0;
for (const [rel, list] of [...report].sort(([a], [b]) => a.localeCompare(b))) {
  console.error(`\n${rel}`);
  for (const v of list.sort((a, b) => a.line - b.line)) {
    console.error(`  ${String(v.line).padStart(4)}  [${v.rule}] ${v.msg}`);
    byRule[v.rule] = (byRule[v.rule] ?? 0) + 1;
    byArea[area(rel)] = (byArea[area(rel)] ?? 0) + 1;
    total++;
  }
}
console.error(`\n${total} violations in ${report.size} files`);
console.error('by rule:');
for (const [r, n] of Object.entries(byRule))
  console.error(`  ${String(n).padStart(4)}  ${r} (${RULES[r]})`);
console.error('by area:');
for (const [a, n] of Object.entries(byArea).sort(([x], [y]) =>
  x.localeCompare(y)
))
  console.error(`  ${String(n).padStart(4)}  ${a}`);
process.exit(1);

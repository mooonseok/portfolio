import { attributes, lineAt, openingTags } from './scan.mjs';
import {
  BASE,
  COMPARE,
  DATA_IMPORTS,
  ENUM_PROPS,
  HOOK_CALL,
  LAYERS,
  LINE_ALLOW,
  LINK_ALLOWED,
  LITERAL_CALL,
  LITERAL_EXEMPT,
  MAX_LINES,
  NUMERIC_ENUM_PROPS,
  OBJECT_KEY,
  ONLY_FROM,
  PRESENTATIONAL_DIRS,
  PRESENTATIONAL_FILE,
  PROP_OWNER,
  RAW_ALLOWED,
  RAW_TAGS,
  SVG_ONLY,
  UI,
} from './config.mjs';

const under = (parts, prefixes) =>
  prefixes.some((p) => p.every((seg, i) => parts[i] === seg));

export function layering(from, to) {
  const [fTop, fSub] = from;
  const [tTop, tSub] = to;
  if (ONLY_FROM[fTop] && !ONLY_FROM[fTop].includes(tTop))
    return `${fTop} may only import ${ONLY_FROM[fTop].join(', ')}`;
  if (BASE.includes(fTop) && UI.includes(tTop))
    return `${fTop} must not depend on ${tTop}`;
  if (fTop === 'components') {
    if (tTop === 'sections' || tTop === 'app')
      return `components must not import ${tTop}`;
    if (tTop === 'components' && LAYERS.indexOf(tSub) > LAYERS.indexOf(fSub))
      return `${fSub} must not import ${tSub}`;
  }
  if (fTop === 'sections') {
    if (tTop === 'app') return 'sections must not import app';
    if (tTop === 'sections' && tSub !== fSub)
      return `section "${fSub}" must not import section "${tSub}"`;
  }
  return null;
}

export const isPresentational = (parts) =>
  under(parts, PRESENTATIONAL_DIRS) ||
  PRESENTATIONAL_FILE.test(parts[parts.length - 1]);

export function presentational(parts, imports, scan) {
  if (!isPresentational(parts)) return [];
  const out = [];
  for (const { to, spec, line } of imports) {
    if (to && DATA_IMPORTS.some((re) => re.test(to.join('/'))))
      out.push([line, `presentational file imports ${spec}`]);
  }
  for (const m of scan.bare.matchAll(HOOK_CALL)) {
    out.push([
      lineAt(scan.bare, m.index),
      `presentational file calls ${m[0].replace(/\s*\($/, '')}()`,
    ]);
  }
  return out;
}

export function rawTags(parts, imports, scan) {
  if (under(parts, RAW_ALLOWED)) return [];
  const out = [];
  for (const tag of openingTags(scan)) {
    if (!RAW_TAGS.has(tag.name)) continue;
    const svgOnly = under(parts, SVG_ONLY);
    out.push([
      lineAt(scan.bare, tag.index),
      `raw <${tag.name}>${svgOnly ? ' (only SVG elements are allowed here)' : ''}; use a primitive from components/atoms`,
    ]);
  }
  if (!under(parts, LINK_ALLOWED)) {
    for (const { spec, line } of imports)
      if (spec === 'next/link')
        out.push([
          line,
          'imports next/link; use NavLink from components/atoms/nav-link',
        ]);
  }
  return out;
}

const hasLiteral = (bareValue) => /['"`]/.test(bareValue);

export function literalProps(parts, scan) {
  if (under(parts, LITERAL_EXEMPT)) return [];
  const out = [];
  for (const tag of openingTags(scan)) {
    for (const attr of attributes(tag)) {
      const owners = PROP_OWNER[attr.name];
      if (owners && !owners.includes(tag.name)) continue;
      if (!owners && !ENUM_PROPS.has(attr.name)) continue;
      const literal = hasLiteral(attr.bareValue);
      const numeric =
        NUMERIC_ENUM_PROPS.has(attr.name) &&
        /^\{\s*-?\d+(\.\d+)?\s*\}$/.test(attr.value);
      if (literal || numeric)
        out.push([
          lineAt(scan.bare, tag.index + attr.offset),
          `<${tag.name} ${attr.name}=${attr.value.replace(/\s+/g, ' ').slice(0, 60)}>: use a constant from src/constants`,
        ]);
    }
  }
  const patterns = [
    [COMPARE, 'compares an enumerated value with a string literal'],
    [OBJECT_KEY, 'enumerated key set to a string literal'],
    [LITERAL_CALL, 'passes a string literal argument'],
  ];
  for (const [re, msg] of patterns) {
    for (const m of scan.bare.matchAll(re)) {
      const line = lineAt(scan.bare, m.index);
      const src = scan.code.split('\n')[line - 1].trim().slice(0, 70);
      out.push([line, `${msg}: ${src}`]);
    }
  }
  return out;
}

export function comments(scan) {
  return scan.comments.map((c) => [
    c.line,
    `comment: ${c.text.trim().slice(0, 60)}`,
  ]);
}

export function lineCount(rel, text) {
  const lines = text.replace(/\n$/, '').split('\n').length;
  if (lines <= MAX_LINES || LINE_ALLOW.has(rel)) return [];
  return [
    [
      1,
      `${lines} lines (max ${MAX_LINES}); split the file or add it to LINE_ALLOW with a reason`,
    ],
  ];
}

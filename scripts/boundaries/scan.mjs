import { regexRanges } from './syntax.mjs';

const blank = (s) => s.replace(/[^\n]/g, ' ');

const lineAt = (text, index) => text.slice(0, index).split('\n').length;

function readString(text, start, quote) {
  for (let i = start + 1; i < text.length; i++) {
    const ch = text[i];
    if (ch === '\\') i++;
    else if (ch === quote) return i + 1;
    else if (ch === '\n' && quote !== '`') return -1;
  }
  return text.length;
}

function readTemplate(text, start, regex) {
  let i = start + 1;
  while (i < text.length) {
    const ch = text[i];
    if (ch === '\\') i += 2;
    else if (ch === '`') return i + 1;
    else if (ch === '$' && text[i + 1] === '{') {
      let depth = 1;
      i += 2;
      while (i < text.length && depth > 0) {
        const c = text[i];
        if (regex.has(i)) {
          i = regex.get(i);
          continue;
        }
        if (c === '{') depth++;
        else if (c === '}') depth--;
        else if (c === "'" || c === '"') {
          const end = readString(text, i, c);
          if (end > 0) i = end - 1;
        } else if (c === '`') i = readTemplate(text, i, regex) - 1;
        i++;
      }
    } else i++;
  }
  return text.length;
}

export function scanScript(text) {
  const regex = regexRanges(text);
  let code = '';
  let bare = '';
  const comments = [];
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    const next = text[i + 1];
    if (regex.has(i)) {
      const end = regex.get(i);
      code += blank(text.slice(i, end));
      bare += blank(text.slice(i, end));
      i = end;
      continue;
    }
    if (ch === '/' && (next === '/' || next === '*')) {
      const end =
        next === '/'
          ? text.indexOf('\n', i) < 0
            ? text.length
            : text.indexOf('\n', i)
          : text.indexOf('*/', i + 2) < 0
            ? text.length
            : text.indexOf('*/', i + 2) + 2;
      const chunk = text.slice(i, end);
      comments.push({ line: lineAt(text, i), text: chunk.split('\n')[0] });
      code += blank(chunk);
      bare += blank(chunk);
      i = end;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      const end =
        ch === '`' ? readTemplate(text, i, regex) : readString(text, i, ch);
      if (end > 0) {
        const chunk = text.slice(i, end);
        code += chunk;
        bare += ch + blank(chunk.slice(1, -1)) + chunk.slice(-1);
        i = end;
        continue;
      }
    }
    code += ch;
    bare += ch;
    i++;
  }
  return { code, bare, comments };
}

export function scanStyle(text) {
  const comments = [];
  let bare = '';
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (ch === '/' && text[i + 1] === '*') {
      const close = text.indexOf('*/', i + 2);
      const end = close < 0 ? text.length : close + 2;
      comments.push({
        line: lineAt(text, i),
        text: text.slice(i, end).split('\n')[0],
      });
      bare += blank(text.slice(i, end));
      i = end;
      continue;
    }
    if (ch === "'" || ch === '"') {
      const end = readString(text, i, ch);
      if (end > 0) {
        bare += text.slice(i, end);
        i = end;
        continue;
      }
    }
    bare += ch;
    i++;
  }
  return { code: bare, bare, comments };
}

export function openingTags(scan) {
  const tags = [];
  const re = /(?<![\w$.)\]])<([A-Za-z][\w.]*)/g;
  for (const m of scan.bare.matchAll(re)) {
    let depth = 0;
    let end = m.index + m[0].length;
    for (; end < scan.bare.length; end++) {
      const c = scan.bare[end];
      if (c === '{') depth++;
      else if (c === '}') depth--;
      else if (c === '>' && depth === 0) break;
    }
    tags.push({
      name: m[1],
      index: m.index,
      bare: scan.bare.slice(m.index, end + 1),
      code: scan.code.slice(m.index, end + 1),
    });
  }
  return tags;
}

export function attributes(tag) {
  const attrs = [];
  let depth = 0;
  const { bare, code } = tag;
  for (let i = 0; i < bare.length; i++) {
    const c = bare[i];
    if (c === '{') depth++;
    else if (c === '}') depth--;
    if (depth !== 0 || !/[\s]/.test(c)) continue;
    const m = /^\s+([A-Za-z][\w-]*)=/.exec(bare.slice(i));
    if (!m) continue;
    const start = i + m[0].length;
    const open = bare[start];
    let stop = start;
    if (open === '{') {
      let d = 0;
      for (; stop < bare.length; stop++) {
        if (bare[stop] === '{') d++;
        else if (bare[stop] === '}' && --d === 0) break;
      }
      stop++;
    } else if (open === "'" || open === '"') {
      stop = bare.indexOf(open, start + 1) + 1;
    }
    attrs.push({
      name: m[1],
      offset: i + m[0].length - m[1].length - 1,
      value: code.slice(start, stop),
      bareValue: bare.slice(start, stop),
    });
    i = Math.max(i, stop - 1);
  }
  return attrs;
}

export { lineAt };

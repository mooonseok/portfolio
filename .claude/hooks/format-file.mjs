import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join, relative, isAbsolute } from 'node:path';

const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
const input = JSON.parse(readFileSync(0, 'utf8') || '{}');
const file = input.tool_input?.file_path;
const inside = (p) => {
  const rel = relative(root, p);
  return rel && !rel.startsWith('..') && !isAbsolute(rel);
};

if (file && existsSync(file) && inside(file)) {
  try {
    execFileSync(
      join(root, 'node_modules/.bin/prettier'),
      ['--write', '--ignore-unknown', '--log-level', 'warn', file],
      { cwd: root, stdio: ['ignore', 'ignore', 'pipe'] }
    );
  } catch (error) {
    process.stderr.write(String(error.stderr ?? error.message));
  }
}

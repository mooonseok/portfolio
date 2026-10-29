import { readFileSync } from 'node:fs';
import { commitMessageProblems } from './harness/commit-message.mjs';

const file = process.argv[2];
if (!file) {
  console.error('사용법: node scripts/check-commit-message.mjs <메시지 파일>');
  process.exit(2);
}

const problems = commitMessageProblems(readFileSync(file, 'utf8'));
if (problems.length) {
  console.error('커밋 메시지 규칙 위반 (AGENTS.md §3):');
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

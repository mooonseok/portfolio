export const TITLE_MAX = 36;

const SKIP = /^(Merge |Revert "|fixup! |squash! |amend! )/;
const TYPE_PREFIX = /^[A-Za-z]+(\([^)]*\))?!?:\s/;
const SENTENCE_END = /(습니다|합니다|했음|했다|한다|됐다)\.?$/;
const HYPE = ['대폭', '완벽', '획기적', '혁신적', '압도적'];
const SIGNATURE = [/co-authored-by:/i, /generated with/i, /🤖/];

export function cleanMessage(raw) {
  const lines = [];
  for (const line of raw.replace(/\r\n/g, '\n').split('\n')) {
    if (/^# -+ >8 -+$/.test(line)) break;
    if (line.startsWith('#')) continue;
    lines.push(line.trimEnd());
  }
  while (lines.length && !lines[0]) lines.shift();
  while (lines.length && !lines.at(-1)) lines.pop();
  return lines;
}

export function commitMessageProblems(raw) {
  const lines = cleanMessage(raw);
  const [title = '', gap, ...body] = lines;
  if (SKIP.test(title)) return [];
  const problems = [];
  const length = [...title].length;
  if (!title) problems.push('제목이 비어 있습니다');
  if (length > TITLE_MAX)
    problems.push(`제목이 ${length}자입니다. ${TITLE_MAX}자 이내로 줄이세요`);
  if (TYPE_PREFIX.test(title))
    problems.push('feat: 같은 영어 접두어 없이 한국어로 쓰세요');
  if (title.endsWith('.') || SENTENCE_END.test(title))
    problems.push('제목은 마침표나 서술형 없이 명사형으로 끝내세요');
  for (const word of HYPE.filter((w) => title.includes(w)))
    problems.push(`과장 표현 "${word}"을 빼세요`);
  if (gap !== undefined && gap !== '')
    problems.push('제목과 본문 사이에 빈 줄을 두세요');
  for (const line of body.filter(Boolean)) {
    if (!line.startsWith('- ') && !line.startsWith('  '))
      problems.push(`본문은 "- "로 시작하는 항목으로 쓰세요: ${line}`);
    else if (SENTENCE_END.test(line))
      problems.push(`본문 항목은 명사형으로 끝내세요: ${line}`);
  }
  if (lines.some((line) => SIGNATURE.some((re) => re.test(line))))
    problems.push('공동 작성자 트레일러나 도구 서명을 넣지 마세요');
  return problems;
}

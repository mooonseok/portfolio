import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  TITLE_MAX,
  commitMessageProblems,
} from '../harness/commit-message.mjs';

const ok = (text) => assert.deepEqual(commitMessageProblems(text), []);
const fails = (text, pattern) =>
  assert.ok(
    commitMessageProblems(text).some((p) => pattern.test(p)),
    `expected ${pattern} for: ${text}`
  );

test('a Korean noun-ending title with bullet body passes', () => {
  ok('마인드맵 노드 호버 확대 추가\n\n- 노드 확대\n- 연결선 강조 보완\n');
  ok('홈 3D 로딩 판단 함수 추가');
});
test('git comments and scissors are ignored', () => {
  ok('메뉴 순서 정리\n\n- 항목 재배치\n# Please enter the commit message\n');
  ok(
    '메뉴 순서 정리\n# ------------------------ >8 ------------------------\nx'
  );
});
test('merge, revert and fixup messages are skipped', () => {
  ok('Merge pull request #36 from mooonseok/diorama-load');
  ok('Revert "메뉴 순서 정리"');
  ok('fixup! 메뉴 순서 정리');
});
test(`titles longer than ${TITLE_MAX} characters fail by character count`, () => {
  ok('가'.repeat(TITLE_MAX));
  fails('가'.repeat(TITLE_MAX + 1), /36자 이내/);
});
test('type prefixes, sentence endings and hype fail', () => {
  fails('feat: 스플래시 추가', /접두어/);
  fails('fix(home): 메뉴 수정', /접두어/);
  fails('스플래시를 추가했습니다', /명사형/);
  fails('메뉴 정리.', /명사형/);
  fails('마인드맵 대폭 개선', /대폭/);
});
test('body needs a blank line and noun-ending bullets', () => {
  fails('메뉴 정리\n- 항목', /빈 줄/);
  fails('메뉴 정리\n\n항목 재배치', /"- "/);
  fails('메뉴 정리\n\n- 항목을 재배치했습니다', /명사형/);
  ok('메뉴 정리\n\n- 긴 항목\n  이어지는 줄');
});
test('agent signatures and co-author trailers fail', () => {
  fails('메뉴 정리\n\n- 항목\n\nCo-Authored-By: Bot <a@b.c>', /서명/);
  fails('메뉴 정리\n\n- 항목\n\n🤖 Generated with tool', /서명/);
});
test('an empty message fails', () => {
  fails('# only comments\n', /비어/);
});

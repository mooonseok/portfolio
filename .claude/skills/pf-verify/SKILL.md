---
name: pf-verify
description:
  포트폴리오 변경을 커밋하기 전에 돌리는 검증 진행표. 정적 검사 → 테스트·경계 →
  빌드 → 빌드 결과 검사(anchors, metadata, JS 크기 예산) → 4개 폭 브라우저 확인
  → 띄운 서버 정리 순서로 진행하고 결과를 보고한다.
---

# 포트폴리오 검증 진행표

AGENTS.md §5~6을 한 번에 돌리는 순서입니다. 실패하면 그 자리에서 멈추고 원인을
보고합니다. 검사를 통과시키려고 규칙을 약하게 바꾸거나 테스트를 지우지 않습니다.

## 순서

1. `pnpm format:check` → `pnpm lint` → `pnpm typecheck`
2. `pnpm test` → `pnpm check:boundaries`
3. `lsof -nP -iTCP:3100 -sTCP:LISTEN`으로 개발 서버가 꺼졌는지 확인한 뒤
   `pnpm build`
4. `pnpm check:anchors` → `pnpm check:metadata` → `pnpm check:perf`
5. 화면이 바뀐 경우: `pnpm start --port 3100`으로 띄우고 `agent-browser`로 390 /
   744 / 1024 / 1440px와 관련 선택 상태, 움직임 줄이기 상태를 확인합니다. 3D
   화면은 `perf-auditor`에 성능 확인을 맡길 수 있습니다.
6. 띄운 서버와 브라우저를 PID·포트 기준으로 끄고, `ps`와 `lsof`로 사라졌는지
   확인한 뒤에만 "종료했다"고 보고합니다.

## JS 크기 예산

- 예산은 `scripts/verification/perf-budget.json`에 있습니다. 경로별 첫 로딩
  JS(gzip)와 가장 큰 청크 크기를 봅니다.
- 새 경로가 생기면 예산이 없어서 검사가 실패합니다. 측정값을 보여 주고 사용자와
  예산을 정한 뒤 추가합니다.
- 예산을 넘으면 먼저 줄일 방법(dynamic import, 중복 의존성 제거)을 찾고, 그래도
  올려야 하면 사용자에게 확인한 뒤 `baseline` 설명과 함께 고칩니다.

## 보고

실행한 검사, 통과 여부, 실행하지 못한 검사와 이유를 나눠 씁니다. 코드만 확인한
것을 브라우저에서 확인했다고 쓰지 않습니다.

---
name: pf-build
description:
  포트폴리오에 새 기능(작업 현황 데이터, GitHub webhook, 마인드맵, 스플래시,
  메뉴 개편 등)의 코드를 짤 때 쓰는 진행표. 타입·상수 → 순수 함수와 테스트 →
  서버 데이터 → 컨테이너·뷰·클라이언트 조직 → 경계 검사 순서로 지금 아키텍처
  규칙 안에서 구현한다.
---

# 포트폴리오 코드 진행표

구조와 규칙의 원본은 HANDOFF.md §1~2입니다. 이 진행표는 순서만 정합니다.

## 순서

1. **타입과 상수.** 데이터 모양은 `src/dto/*.dto.ts`, 열거값은 `src/constants`에
   `as const`로 둡니다. 문자열 리터럴 prop은 쓰지 않습니다.
2. **순수 함수와 테스트를 먼저.** 브라우저 없이 확인할 수 있는 계산(병합 커밋
   제거, 공개 수준 가리기, 배치 좌표 등)은 `src/lib`에 두고
   `scripts/tests/<이름>.test.mjs`를 같이 만듭니다.
3. **서버 데이터.** GitHub 조회는 `src/lib/github/`에 둡니다.
   토큰(`GITHUB_TOKEN`)과 webhook 비밀값은 서버 코드에서만 읽고, 클라이언트
   파일에서 import하지 않습니다. webhook 경로는 서명 검증이 통과한 요청만 캐시를
   무효화합니다.
4. **컨테이너 → 뷰 → 클라이언트 조직.**
   - 컨테이너(`*-container.tsx`)가 데이터를 읽고 뷰 모델을 만듭니다.
   - 뷰(`*-view.tsx`)는 props만 받아 그립니다. hook, content, lib를 import하지
     않습니다.
   - three.js 장면은 `'use client'` 조직으로 분리하고 필요할 때
     불러옵니다(dynamic import). `threejs-fundamentals`, `threejs-geometry`,
     `threejs-materials`, `threejs-lighting` 스킬을 참고합니다.
5. **경계 검사.** `pnpm check:boundaries`가 통과해야 합니다. 새 계층이나 예외가
   필요하면 `scripts/boundaries/config.mjs`를 고치기 전에 사용자에게 확인합니다.

## 지킬 것

- 의존성 방향: app → sections → templates → organisms → molecules → atoms →
  hooks/lib → content → dto/constants. 섹션끼리 import하지 않습니다.
- 파일당 200줄 이하, 주석 없음, barrel 파일 없음, 파일명은 kebab-case, export는
  PascalCase.
- raw HTML 태그는 `components/atoms`에서만 씁니다.
- 새 의존성은 사용자 확인 후에만 추가합니다(승인된 것: gsap).
- 같은 화면을 그리는 코드가 이미 있으면(`diorama-load`, `relation-path` 등) 새로
  만들지 않고 재사용합니다.

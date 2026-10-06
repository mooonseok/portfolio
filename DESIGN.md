---
name: Park Moonseok — 면접 화이트보드
description: 프로젝트별 담당 영역과 구현 사례를 읽는 포트폴리오
colors:
  paper: '#f3f2ed'
  ink: '#161817'
  subtle: '#5f635f'
  hairline: '#d6d5cf'
  dark: '#111412'
  dark-sub: '#a9ada9'
  signal: '#d23a2e'
  board-white: '#fcfcfa'
  board-frame: '#d7dadc'
  board-edge: '#b8bcc0'
  marker-blue: '#1f5fd6'
  marker-green: '#177349'
  marker-ghost: '#a9ada9'
  note-paper: '#fff3b5'
  note-ink: '#342d15'
typography:
  display:
    fontFamily: 'GeneralSans, PretendardVariable, sans-serif'
    fontSize: 'clamp(40px, 12vw, 60px)'
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: '-0.025em'
  headline:
    fontFamily: 'GeneralSans, PretendardVariable, sans-serif'
    fontSize: '21px'
    fontWeight: 500
    lineHeight: 1.45
  body:
    fontFamily: 'GeneralSans, PretendardVariable, sans-serif'
    fontSize: '16px'
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: 'IBM Plex Mono, monospace'
    fontSize: '13px'
    fontWeight: 400
  body-tablet:
    fontSize: '17px'
  detail-copy:
    fontSize: '15px'
  tools-intro:
    fontSize: '18px'
  tab-title:
    fontSize: '19px'
  card-title:
    fontSize: '20px'
  section-detail:
    fontSize: '22px'
  section-title:
    fontSize: '28px'
  error-title:
    fontSize: '32px'
  error-title-tablet:
    fontSize: '48px'
  contact-display:
    fontSize: '24px'
rounded:
  board: '6px'
  square: '0px'
spacing:
  unit: '4px'
  mobile-margin: '20px'
  tablet-margin: '40px'
  laptop-margin: '48px'
  wide-margin: '64px'
components:
  board:
    backgroundColor: '{colors.board-white}'
    textColor: '{colors.ink}'
    rounded: '{rounded.board}'
    padding: '18px 16px 24px'
  note:
    backgroundColor: '{colors.note-paper}'
    textColor: '{colors.note-ink}'
  work-sheet:
    backgroundColor: '{colors.board-white}'
    textColor: '{colors.ink}'
    padding: 'clamp(20px, 3vw, 36px)'
  condition-chip:
    textColor: '{colors.ink}'
    padding: '8px 14px'
  condition-chip-selected:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
---

# Design System: Park Moonseok

## Overview

**Creative North Star: "면접 화이트보드"**

종이 바탕 위에 프로젝트별 담당 영역을 마커로 설명하는 포트폴리오입니다. 기존
서체와 헤더를 유지하고, 선과 메모가 읽는 순서를 돕습니다. 업무 내용은 활자로
충분히 설명하며 실험과 제품 개발의 경계를 표시합니다.

- 프로젝트 비교는 보드, 구체적인 기여는 노란 메모와 사례 본문으로 읽습니다.
- 색과 함께 실험 문구·점선을 사용합니다.
- 홈 소개는 사진 대신 담당 기능을 넓게 배치합니다.

## Colors

종이·먹색을 기본으로 파랑은 직접 개발·유지보수, 초록 점선은 실험, 빨강은 현재
선택에 사용합니다. 흐린 점선은 담당 범위 밖의 칸에만 씁니다. 본문 보조 글자는
subtle, 노란 메모는 note-paper / note-ink를 사용합니다. 홈 프로젝트는 모두 밝은
종이 바탕으로 통일합니다. APC 상세 페이지와 푸터의 어두운 바탕은 유지하며, 그
위의 밝은 판면은 ink로 씁니다.

## Typography

영문은 General Sans, 한국어는 Pretendard Variable, 보조 메타는 IBM Plex
Mono입니다. 모두 자체 호스팅하며 손글씨 폰트는 쓰지 않습니다. 폰트 선언의 실제
CSS family는 GeneralSans / PretendardVariable이며 위 frontmatter에는 표시용
이름을 기재합니다. 본문은 모바일 16px, 744px부터 17px입니다. 메모 본문은 16px /
1.75입니다. 히어로 이름은 모바일 clamp(40px, 12vw, 60px), 중간 화면은
clamp(40px, 4.5vw, 60px), 1440px부터 60px입니다. 소개 문장은 21px / 1.45,
1440px부터 25px입니다. 기술 스택의 분류와 기술명은 모두 본문 크기(모바일 16px,
744px부터 17px)로 맞추고 분류만 중간 굵기를 씁니다. 연락처 이메일은 모바일 20px,
744px부터 24px이며 GitHub 링크는 본문 크기입니다.

## Layout

4px 단위를 사용합니다. 744 / 1024 / 1440px에서 각각 전환합니다. 페이지 그리드는
4 / 8 / 12열이고, 좌우 여백은 20 / 40 / 48 / 64px, 열 간격은 16 / 20 / 20 /
24px입니다. 1024px부터 홈 보드는 프로젝트 5열과 담당 영역 5행의 subgrid입니다.
그 아래에서는 프로젝트별 칩 목록이며, 담당하지 않은 칸은 숨깁니다. 선택 메모는
데스크톱 보드 7번째 행에 놓입니다. 홈 담당 기능은 모바일 한 열, 1024px부터 두
열입니다. APC 탭과 Smart Farm 조건 설명은 가장 긴 패널만큼 높이를 확보합니다.
홈의 제품 프로젝트는 그룹 소제목 없이 같은 제목 위계와 구분선·간격으로 이어지며,
Smart Farm 앞에는 센서·제어 실험 제목을 유지합니다.

## Elevation & Depth

일반 본문은 평면입니다. 보드 프레임과 노란 메모에만 물체의 깊이를 줍니다. 보드
그림자: `inset 0 0 0 1px #eceeec, 0 22px 40px -28px rgb(27 31 36 / 0.45)`. 메모
그림자: `0 10px 18px -14px rgb(27 31 36 / 0.35)`.

## Shapes

보드 프레임은 7px 테두리, 1px 안쪽 외곽선과 6px 모서리입니다. 마커 SVG는 결정적
seed와 non-scaling-stroke를 사용합니다. 손그림은 선에만 적용합니다. 담당 기능
판면은 직각과 파란 상단선으로 구분합니다.

## Components

- **보드 버튼:** 최소 44px, 선택 시 빨간 원과 노란 메모 표시. 다시 누르면
  닫힙니다. aria-pressed / aria-expanded / aria-controls로 상태와 메모를
  연결합니다. 키보드 선택은 즉시 전환하고 포커스를 유지합니다.
- **범례:** 직접 개발·유지보수 / 실험 / 담당 범위 밖. 선은 호출 순서나 작업량이
  아닙니다.
- **상세 보드:** 담당 영역만 표시합니다. 헤더에 동일한 layer chips를 반복하지
  않습니다. 재구성 자료 고지와 선의 의미 설명은 보존합니다.
- **업무 판면:** 밝은 바탕, 먹색 본문, 20–36px 안쪽 여백. 기능별 제목과 설명을
  묶습니다.
- **탭·조건 칩:** 활성 상태는 배경·문구와 ARIA로 표현합니다. 누름은 120ms
  ease-out, reduced motion에서는 위치 이동을 생략합니다. 숨은 패널은 접근성
  트리와 탭 순서에서 제외합니다.
- **탐색:** 기존 헤더와 모바일 메뉴를 유지합니다. 홈 카드에는 사례 링크 하나를
  둡니다.
- **푸터 연락처:** 이메일과 GitHub는 내용 너비의 상시 1px 하단선과 최소 44px
  클릭 높이를 공유합니다. 정밀 포인터 hover, focus-visible, active에서는
  하단선을 signal 색으로 즉시 바꾸며, 키보드 포커스 테두리를 유지합니다.
- **404:** 한국어 안내와 프로젝트 보드로 돌아가는 링크를 보드 프레임 안에
  배치합니다.

## Do's and Don'ts

- Do 실제 담당한 업무와 유지보수 범위를 충분한 문장으로 적습니다.
- Do Smart Farm의 사무실 시험 모듈과 별도 LED 실험을 구분합니다.
- Do 실험 표시, 기간, 재구성 고지를 유지합니다.
- Don't 확인되지 않은 성과·수치·담당 범위를 추가하지 않습니다.
- Don't 회사명을 노출하지 않습니다.
- Don't 테마 전체를 교체하거나 사진 장식·섹션 일련번호·200 OK를 다시 넣지
  않습니다.

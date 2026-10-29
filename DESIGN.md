---
name: Park Moonseok — 성도 판화
description: GitHub 작업 현황과 프로젝트별 담당 영역·구현 사례를 읽는 포트폴리오
colors:
  night: '#0e1830'
  night-deep: '#0b1428'
  night-2: '#14213d'
  dark-2: '#111d38'
  night-line: '#2a3a5c'
  dark-rule: '#3a4a6c'
  moonlight: '#ebe3cb'
  dim: '#b4ad96'
  graphite: '#8d93a6'
  far: '#6a7899'
  vermilion: '#e0664a'
  board-white: '#111d38'
  board-frame: '#2a3a5c'
  board-edge: '#3a4a6c'
  board-tray: '#1b2a4a'
  marker-blue: '#8fb0e8'
  marker-green: '#7fc9a2'
  marker-red: '#e0664a'
  marker-ghost: '#6a7899'
  note-paper: '#ebe3cb'
  note-ink: '#0b1428'
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
  scope-meta:
    fontSize: '14px'
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
  orbit-label:
    fontFamily: 'GeneralSans, PretendardVariable, sans-serif'
    fontSize: '14px'
    fontWeight: 500
    lineHeight: 1
  orbit-panel-title:
    fontFamily: 'GeneralSans, PretendardVariable, sans-serif'
    fontSize: '22px'
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: '-0.01em'
  opener-line:
    fontFamily: 'GeneralSans, PretendardVariable, sans-serif'
    fontSize: 'clamp(30px, min(11vw, 14vh), 116px)'
    fontWeight: 760
    lineHeight: 1
    letterSpacing: '-0.04em'
  opener-name:
    fontFamily: 'GeneralSans, PretendardVariable, sans-serif'
    fontSize: 'clamp(72px, min(24vw, 30vh), 280px)'
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: '-0.06em'
  opener-kicker:
    fontSize: 'clamp(18px, min(3.4vw, 5vh), 40px)'
    fontWeight: 700
    letterSpacing: '-0.02em'
  opener-tag:
    fontSize: 'clamp(20px, min(4.4vw, 6vh), 52px)'
    fontWeight: 800
    letterSpacing: '-0.03em'
rounded:
  board: '6px'
  square: '0px'
  pill: '999px'
spacing:
  unit: '4px'
  mobile-margin: '20px'
  tablet-margin: '40px'
  laptop-margin: '48px'
  wide-margin: '64px'
components:
  board:
    backgroundColor: '{colors.board-white}'
    textColor: '{colors.moonlight}'
    rounded: '{rounded.board}'
    padding: '18px 16px 24px'
  note:
    backgroundColor: '{colors.note-paper}'
    textColor: '{colors.note-ink}'
  work-sheet:
    backgroundColor: '{colors.board-white}'
    textColor: '{colors.moonlight}'
    padding: 'clamp(20px, 3vw, 36px)'
  condition-chip:
    textColor: '{colors.moonlight}'
    padding: '8px 14px'
  condition-chip-selected:
    backgroundColor: '{colors.moonlight}'
    textColor: '{colors.night}'
  workshop-label-selected:
    backgroundColor: '{colors.note-paper}'
    textColor: '{colors.note-ink}'
  orbit-label:
    textColor: '{colors.dim}'
    typography: '{typography.orbit-label}'
    padding: '6px 8px'
  orbit-label-active:
    textColor: '{colors.moonlight}'
  orbit-panel:
    backgroundColor: 'rgb(14 24 48 / 0.86)'
    textColor: '{colors.moonlight}'
    rounded: '{rounded.square}'
    padding: '20px 22px 14px'
  opener-skip:
    backgroundColor: '{colors.night-2}'
    textColor: '{colors.dim}'
    rounded: '{rounded.pill}'
    padding: '0 18px'
    height: '44px'
---

# Design System: Park Moonseok

## Overview

**Creative North Star: "성도 판화"**

남색 밤하늘 위에 크림색 선을 새긴 성도(星圖) 판화처럼 작업을 보여 주는
포트폴리오입니다. 홈(`/`)은 최근 GitHub 작업을 달 궤도의 행성으로, 이력
페이지(`/portfolio`)는 프로젝트 작업실과 담당 범위를 보여 줍니다. 기존 서체와
헤더를 유지하고, 업무 내용은 활자로 충분히 설명하며 실험과 제품 개발의 경계를
표시합니다.

- 홈은 크림색 새김 행성과 초승달, 성도 테두리, 판독 패널로 읽습니다.
- 이력·사례 화면의 보드·작업실 모형·사례 본문은 구조를 그대로 두고 색만 밤 테마
  토큰으로 바꿨습니다. 화이트보드 메모와 작업실의 선택 이름표는 크림 종이로
  남겼습니다.
- 색과 함께 실험 문구·점선·새김 무늬를 사용합니다.

## Colors

`src/styles/globals.css`의 `@theme`는 밤 테마 이름과 기존 역할 이름을 같은
값으로 함께 둡니다. 컴포넌트는 기존 이름(`paper`, `ink`, `subtle` 등)을 그대로
쓰고, 홈 궤도와 오프닝은 밤 테마 이름을 씁니다.

- **바탕 남색:** night = paper `#0e1830`(페이지 바탕), night-deep = dark
  `#0b1428`(홈·오프닝·푸터의 `surface-dark`), night-2 = tint = placeholder
  `#14213d`(틴트·이미지 자리), dark-2 `#111d38`. 브라우저 테마색은 사이트
  `#0E1830`, 홈 `#0B1428`입니다.
- **크림 선·글자:** moonlight = ink `#ebe3cb`. 판면의 반투명 선은 hair
  `rgb(235 227 203 / 0.32)`입니다. 어두운 구간(`surface-dark`)과 어두운 흐름도도
  크림색 글자·선을 씁니다.
- **보조 글자:** dim = subtle = dark-sub `#b4ad96`. graphite `#8d93a6`는 어두운
  구간의 흐린 글자와 흐린 흐름도, far `#6a7899`는 홈 링크 밑줄의 기본색에
  씁니다.
- **구분선:** night-line = hairline = dark-line `#2a3a5c`, dark-rule `#3a4a6c`.
- **주홍:** vermilion = signal `#e0664a`. 선택·현재·신호에만 씁니다. 홈의 선택
  궤도·조준선·패널 상단 2px 선, 보드 선택 원(marker-red), 작업실 선택
  모형·이름표 테두리, 현재 상태 ●, CTA·푸터 링크 하단선이 해당합니다.
  오프닝에서는 이름 끝 점 하나에만 씁니다.
- **보드 토큰(`tokens.css`):** board-white `#111d38`, board-frame `#2a3a5c`,
  board-edge `#3a4a6c`, board-tray `#1b2a4a`, marker-ink `#ebe3cb`, marker-blue
  `#8fb0e8`(직접 개발·유지보수), marker-green `#7fc9a2`(실험 점선), marker-red
  `#e0664a`(현재 선택), marker-ghost `#6a7899`(담당 범위 밖·지우개), note-paper
  `#ebe3cb`, note-ink `#0b1428`.
- **크림 종이:** 화이트보드 메모와 작업실의 선택 이름표는 note-paper 바탕에
  note-ink 글자를 씁니다. 그 안의 층 이름·실험 표시는 marker-blue·marker-green을
  note-ink와 45%로 섞고, 서비스 설명은 note-ink 72%와 섞은 색입니다. 메모 안
  키보드 초점선도 note-ink입니다.
- **작업실 모형(`lib/diorama`):** 면 `#1b2a4a`, 홈 `#111d38`, 선 `#ebe3cb`, 담당
  표시 `#8fb0e8`, 선택 `#e0664a`.

## 판화 표현

- **새김:** 홈의 행성과 달은 셰이더(`lib/orbit/engrave.ts`)로 바탕 `#111d38`
  위에 크림 `#ebe3cb` 선만 새깁니다. 빛을 받는 쪽은 선이 굵어지고 가장자리에
  윤곽선이 생깁니다. 채색·그라데이션·광택 없이 선의 굵기와 밀도로 명암을 냅니다.
  장면 바탕은 night-deep이며 화면 전체에 5% 불투명도의 잡음 질감을 덮습니다.
- **프로젝트 구별:** 모든 행성은 같은 크림 한 색이고, 프로젝트는 새김 무늬와
  부속물로 구별합니다. 색으로만 구별하지 않습니다.
  - `site`: 격자 무늬와 기울어진 고리 두 겹
  - `text`: 가로줄 무늬와 위성 하나
  - `album`: 점 무늬와 위성 셋
  - `candle`: 사선 무늬와 도는 눈금 고리
- **견본:** 이름표 앞 14px와 패널 제목 앞 44px 견본(`OrbitSwatchView`)이 같은
  무늬를 원 하나에 줄여 그립니다. 선은 `currentColor` 1px이며
  `non-scaling-stroke`입니다.
- **달:** 중앙 초승달은 45° 사선 해칭과 날카로운 명암 경계로 새깁니다.
- **성도 테두리:** 반지름 방향 선 12개(불투명도 0.07), 바깥 원과 눈금
  120개(10개마다 길게, 5개마다 중간, 0.28)입니다.
- **궤도:** 기본 궤도는 크림 0.45, 선택 궤도는 주홍 1.0입니다. 궤도 호의 길이는
  최근 커밋 수 비율(한 바퀴의 10–90%), 행성 크기는 커밋 수의 제곱근에
  비례합니다.
- **표시 선:** 선택하지 않은 행성에는 네 귀 눈금(dim, 0.6), 선택한 행성에는 주홍
  1.5px 모서리 조준선을 그립니다.

## Typography

영문은 General Sans, 한국어는 Pretendard Variable, 보조 메타는 IBM Plex
Mono입니다. 모두 자체 호스팅하며 손글씨 폰트는 쓰지 않습니다. 폰트 선언의 실제
CSS family는 GeneralSans / PretendardVariable이며 위 frontmatter에는 표시용
이름을 기재합니다. 본문은 모바일 16px, 744px부터 17px입니다. 메모 본문은 16px /
1.75입니다. 히어로 이름은 모바일 clamp(40px, 12vw, 60px), 중간 화면은
clamp(40px, 4.5vw, 60px), 1440px부터 60px입니다. 소개 문장은 21px / 1.45,
1440px부터 25px입니다. 기술 스택의 분류와 기술명은 모두 본문 크기(모바일 16px,
744px부터 17px)로 맞추고 분류만 중간 굵기를 씁니다. 연락처 이메일은 모바일 20px,
744px부터 24px이며 GitHub 링크는 본문 크기입니다. 상세 프로젝트 제목은 모바일
36px, 744px부터 48px, 1024px부터 56px로 통일하고 줄바꿈을 허용합니다. 상세
소개는 18/20px, 역할은 본문 크기를 유지합니다.

홈 궤도의 이름표는 14px / 500, 패널 제목은 22px / 500(휴대폰 배치 19px), 제목 옆
태그는 13px, 사실 목록과 커밋 제목은 14px, 기준 날짜 안내는 13px, 이력 링크는
15px(휴대폰 배치 14px)입니다. 오프닝 글자 크기는 `tokens.css`의 `--fs-opener-*`
네 값이며 화면 폭과 높이 중 작은 쪽을 따릅니다. 세로
화면(`max-aspect-ratio: 3/4`)에서는 첫 줄을 clamp(44px, min(15vw, 9vh), 96px)의
세로 쌓기로 바꾸고, kicker는 clamp(22px, 6vw, 34px), 태그는 clamp(26px, 8vw,
44px)입니다.

## Layout

4px 단위를 사용합니다. 744 / 1024 / 1440px에서 각각 전환합니다. 페이지 그리드는
4 / 8 / 12열이고, 좌우 여백은 20 / 40 / 48 / 64px, 열 간격은 16 / 20 / 20 /
24px입니다.

**홈 궤도:** 한 화면(`100svh`, 최소 560px)을 채우고 좌우 여백은 20 / 40 / 48 /
64px(작은 화면은 안전 영역 포함)입니다. 판독 패널은 오른쪽에 붙고 폭은 330px,
1024–1279px에서 296px, 1440px부터 350px입니다. 744px 미만이거나 1024px 미만의
세로 화면은 휴대폰 배치로, 패널이 좌우 여백 사이를 채우고 744px부터는 가운데
min(460px, 70vw)입니다. 높이 520px 미만의 가로 화면은 가로 배치로, 패널이 위쪽
280px이 되고 설명과 커밋 목록을 숨깁니다. 이름표는 다른 행성·달·패널·헤더·이력
링크를 피해 빈자리로 옮기고, 자리가 없을 때만 숨깁니다. 선택한 이름표는 숨기지
않습니다. 이력 링크는 왼쪽 아래, 휴대폰 배치에서는 헤더 아래에 둡니다.

**이력·사례:** 1024px부터 이전 홈 구성의 보드는 프로젝트 5열과 담당 영역 5행의
subgrid입니다. 그 아래에서는 프로젝트별 칩 목록이며, 담당하지 않은 칸은
숨깁니다. 선택 메모는 데스크톱 보드 7번째 행에 놓입니다. 담당 기능은 모바일 한
열, 1024px부터 두 열입니다. APC 탭과 Smart Farm 조건 설명은 가장 긴 패널만큼
높이를 확보합니다. 제품 프로젝트는 그룹 소제목 없이 같은 제목 위계와
구분선·간격으로 이어지며, Smart Farm 앞에는 센서·제어 실험 제목을 유지합니다.
상세 도입부는 프로젝트명 → 기간·상태 → 소개 → 역할 전문 → 등록 페이지 링크를 한
축으로 읽습니다. 별도 개요 번호와 기간 사이드바는 두지 않으며 `#overview`는
도입부 시작을 가리킵니다. 본문 폭은 40em 이내이고, 담당 범위 목록은 모바일 32px,
744px부터 48px 간격을 둔 다음 구간에 배치합니다. 목록 폭은 56rem 이내이며 왼쪽
축을 공유합니다.

## Elevation & Depth

일반 본문은 평면입니다. 보드 프레임, 크림 메모, 홈 판독 패널에만 깊이를 줍니다.

- 보드 그림자:
  `inset 0 0 0 1px var(--board-edge), 0 22px 40px -28px color-mix(in srgb, var(--dark) 80%, transparent)`.
- 메모 그림자:
  `0 10px 18px -14px color-mix(in srgb, var(--dark) 80%, transparent)`.
- 판독 패널: `rgb(14 24 48 / 0.86)` 바탕과 10px 배경 흐림 위에 hair 1px, 4px
  night 간격, 크림 0.14 1px의 이중 테두리를 안쪽 그림자로 그립니다.
- 궤도 이름표: night-deep 글자 그림자 네 겹으로 장면 위에서 읽히게 합니다.

## Shapes

보드 프레임은 7px 테두리, 1px 안쪽 외곽선과 6px 모서리입니다. 마커 SVG는 결정적
seed와 non-scaling-stroke를 사용합니다. 손그림은 선에만 적용합니다. 담당 기능
판면은 직각과 marker-blue 상단선으로 구분합니다. 홈 패널과 오프닝 태그는 직각
이중 테두리, 오프닝 건너뛰기 버튼만 알약 모양(999px)입니다.

## Components

- **홈 궤도(`organisms/orbit`):** 최근 30일 커밋한 레포를 주제별 프로젝트 최대
  4개로 묶어 행성으로 그립니다. three.js 장면은 `aria-hidden`이고, 이름표마다
  원형 누름 영역 `button[aria-pressed][aria-controls]`이 같은 판독 패널을
  가리킵니다. 누름 영역 지름은 최소 48px입니다. 선택한 이름표는 dim에서
  moonlight로 바뀝니다. 초점선은 moonlight 2px 점선, 6px 간격입니다. 장면은
  드래그로 돌릴 수 있고 세로 스크롤은 막지 않습니다.
- **판독 패널:** 견본·제목·태그·한 줄 설명, 마지막 커밋·최근 커밋 수·레포를 정의
  목록으로, 그 아래 최근 커밋 제목(두 줄까지, 휴대폰 배치는 한 개)을 보여
  줍니다. 레포 링크는 최소 44px, far 밑줄이며 hover에서 moonlight 밑줄입니다.
  비공개 레포는 링크 대신 안내 문구를 보조색으로 씁니다. GitHub에서 받지 못하면
  기준 날짜를 패널 아래에 적습니다. 선택하지 않은 카드는 `inert`입니다.
- **오프닝(`organisms/opener`):** 홈 위를 덮는 night-deep 고정 화면으로, 탭
  세션당 한 번(`sessionStorage`) 재생합니다. 장면은 세 단어 줄(앱·웹·서버 원형
  메달 아이콘), 이름(kicker·세 음절·주홍 점·크림 이중 테두리 태그·퍼지는 원 두
  개), 끝 장면(사선 해칭 달, 타원 궤도 네 개, 점선 눈금 타원, 십자선) 순서이고
  메달 세 개가 궤도에 내려앉습니다. 장면 전환에는 크림 2px / 빈칸 5px 줄무늬
  와이프를 씁니다. 장면은 `aria-hidden`이고 같은 문장을 화면 낭독용으로 한 번
  둡니다. 건너뛰기 버튼은 오른쪽 아래, 높이 44px, night-2 바탕, night-line
  안쪽선, dim 14px 글자이며 Esc·Enter·Space로도 건너뜁니다. 끝나면 초점이 있던
  경우 본문 시작으로 옮깁니다. 스크립트가 시작하지 않으면 5초 뒤 CSS만으로
  숨겨지고, 움직임 줄이기에서는 줄과 이름만 페이드합니다. 전체 길이는
  `--dur-splash` 3150ms입니다.
- **보드 버튼:** 최소 44px, 선택 시 주홍 원과 크림 메모 표시. 다시 누르면
  닫힙니다. aria-pressed / aria-expanded / aria-controls로 상태와 메모를
  연결합니다. 키보드 선택은 즉시 전환하고 포커스를 유지합니다.
- **작업실 이름표:** 선택하면 2px marker-red 테두리와 크림 종이(note-paper /
  note-ink) 바탕으로 바뀝니다. 선택하지 않은 이름표는 hairline 테두리와 paper
  바탕입니다.
- **범례:** 직접 개발·유지보수 / 실험 / 담당 범위 밖. 선은 호출 순서나 작업량이
  아닙니다.
- **상세 담당 범위 목록:** 영역·담당 업무·확인된 기술을 정의 목록으로
  표시합니다. 프레임·배경색·연결선·범례 없이 행 사이에만 얇은 구분선을 둡니다.
  업무는 본문 크기, 영역과 기술은 14px이며 기술은 보조색입니다. 모바일에서는
  기술을 업무 아래로 내려 읽고, 744px부터 세 열로 정렬합니다. 기술이 없으면
  업무가 남은 폭을 사용합니다. 실험 항목에는 색 대신 '실험' 문구를 직접
  표시합니다.
- **재구성 고지:** 텍스트 목록과 분리하여 각 상세 페이지의 실제 도식 옆에 기존
  문구를 표시합니다. 이전 홈 구성의 화이트보드와 해당 연결선 설명은 유지합니다.
- **업무 판면:** board-white 남색 바탕, 크림 본문, 20–36px 안쪽 여백. 기능별
  제목과 설명을 묶습니다.
- **탭·조건 칩:** 활성 상태는 배경·문구와 ARIA로 표현합니다. 선택한 칩은 크림
  바탕에 남색 글자입니다. 누름은 120ms ease-out, reduced motion에서는 위치
  이동을 생략합니다. 숨은 패널은 접근성 트리와 탭 순서에서 제외합니다.
- **탐색:** 기존 헤더와 모바일 메뉴 구조를 유지하고, 메뉴는 작업 현황·이력·
  프로젝트·AI 활용·연락입니다. 홈에서는 헤더를 어두운 면 글자(크림)로 장면 위에
  띄웁니다. 사례 페이지의 뒤로 가기는 `/portfolio#work`로 갑니다.
- **NEXT:** 번호 없이 NEXT·프로젝트명·화살표를 하나의 링크 행으로 묶습니다.
  프로젝트명은 모바일 20px, 744px부터 24px이며 상시 밑줄과 최소 44px 클릭 높이를
  둡니다. 본문 끝 간격은 48/64/80px이고 키보드 포커스에 이동 효과를 넣지
  않습니다.
- **푸터 연락처:** 이메일과 GitHub는 내용 너비의 상시 1px 하단선과 최소 44px
  클릭 높이를 공유합니다. 정밀 포인터 hover, focus-visible, active에서는
  하단선을 signal 색으로 즉시 바꾸며, 키보드 포커스 테두리를 유지합니다.
- **404:** 한국어 안내와 프로젝트 보드로 돌아가는 링크를 보드 프레임 안에
  배치합니다.
- **AI 활용 방식:** 이력 페이지에서는 기술 스택 뒤에 같은 제목 축으로 짧은
  목록과 링크 하나만 둡니다. `/ai`는 상세 페이지 틀(도입부·목차·섹션·대표 구현
  사례)을 그대로 쓰고, 카드·큰 숫자·도구 로고 없이 구분선 목록과 사례 본문으로
  위계를 나눕니다. 지침은 적용 범위, 작업 흐름은 '요청에서 지침 반영까지' 여섯
  단계로 구분합니다. 작업 흐름은 업무 판면 위의 순서 목록이며 단계마다 하는
  일·확인 장치·항목을 처음부터 모두 보여 줍니다. 1024px부터 3×2 시계방향
  고리(아래 줄은 오른쪽에서 왼쪽), 그 아래는 세로 목록입니다. 단계 사이
  marker-blue 선은 처음 보일 때 한 번 그려지고 멈추며, 글자는 움직이지 않습니다.
  이 도식에는 선택이 없으므로 주홍 원과 크림 메모를 쓰지 않습니다. 교차 검토는
  작업 흐름 안에 설명하고, 검사 구현 사례가 앞의 작업 방식을 뒷받침합니다.

## Do's and Don'ts

- Do 실제 담당한 업무와 유지보수 범위를 충분한 문장으로 적습니다.
- Do Smart Farm의 사무실 시험 모듈과 별도 LED 실험을 구분합니다.
- Do 실험 표시, 기간, 재구성 고지를 유지합니다.
- Do 홈 프로젝트는 새김 무늬와 이름으로 구별하고, 주홍은 선택·현재·신호에만
  씁니다.
- Don't 확인되지 않은 성과·수치·담당 범위를 추가하지 않습니다.
- Don't 회사명을 노출하지 않습니다.
- Don't 프로젝트마다 다른 색을 주거나 행성에 채색·그라데이션·광택을 넣지
  않습니다.
- Don't 사진 장식·섹션 일련번호·200 OK를 다시 넣지 않습니다.

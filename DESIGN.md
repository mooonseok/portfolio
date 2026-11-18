---
name: mooonseok 프로젝트 광장
description:
  진행 중인 프로젝트와 참여 이력, AI 활용 방식을 읽는 개발자 포트폴리오
colors:
  dark: '#060513'
  paper: '#080613'
  dark-2: '#141122'
  night-2: '#1c172d'
  board-glow: '#24133e'
  board-active: '#432b72'
  dark-line: '#302945'
  hairline: '#463952'
  ink: '#f2eeff'
  subtle: '#bbb4d0'
  graphite: '#aaa1bb'
  signal: '#ac8bf9'
  action: '#6639ce'
typography:
  display:
    fontFamily: 'General Sans, Pretendard Variable, sans-serif'
    fontSize: 'clamp(44px, 6vw, 84px)'
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: '-0.05em'
  body:
    fontFamily: 'General Sans, Pretendard Variable, sans-serif'
    fontSize: '16px'
    fontWeight: 400
  signature:
    fontFamily: 'IBM Plex Mono, Pretendard Variable, monospace'
    fontWeight: 500
    fontSize: 'clamp(16px, 2.2vw, 23px)'
  plaza-label:
    fontSize: 'clamp(13px, 1.2vw, 18px)'
    lineHeight: 1.45
  panel-title:
    fontSize: '24px'
    lineHeight: 1.3
rounded:
  square: '0px'
  panel: '18px'
  card: '22px'
  pill: '999px'
spacing:
  unit: '4px'
  mobile-margin: '20px'
  tablet-margin: '40px'
  laptop-margin: '48px'
  wide-margin: '64px'
components:
  plaza-label:
    backgroundColor: '{colors.dark-2}'
    textColor: '{colors.ink}'
    rounded: '{rounded.square}'
    padding: '4px 11px'
  plaza-panel:
    backgroundColor: '{colors.dark-2}'
    textColor: '{colors.ink}'
    rounded: '{rounded.panel}'
    padding: '18px 24px'
  history-card:
    backgroundColor: '{colors.dark-2}'
    textColor: '{colors.ink}'
    rounded: '{rounded.card}'
    padding: 'clamp(20px, 3vw, 40px)'
  work-card:
    backgroundColor: '{colors.dark-2}'
    textColor: '{colors.ink}'
    rounded: '{rounded.card}'
    padding: 'clamp(20px, 3vw, 40px)'
  stage-node:
    backgroundColor: '#12101b'
    textColor: '{colors.ink}'
    rounded: '8px'
    padding: '6px 14px'
  case-link:
    backgroundColor: '{colors.action}'
    textColor: '{colors.ink}'
    rounded: '{rounded.pill}'
    padding: '0 20px'
---

# mooonseok 프로젝트 광장

## 홈

방문자는 등각 격자에 놓인 모형을 골라 진행 중인 프로젝트를 살펴봅니다. 모니터,
사진 앨범, 프린터, 시세 차트는 실루엣과 이름표로 구분합니다. 첫 화면은 공통
헤더와 광장으로 구성합니다.

바닥 타일의 가로·세로 대각선 비율은 **2:1**입니다. 데스크톱 SVG는 1160×655,
700px 이하 전용 SVG는 420×306의 좌표계를 사용합니다. 각 장면에 모형 위치를 따로
지정합니다. 모형은 같은 종횡비를 유지하며 배경은 정지합니다. 호버와 키보드
초점에서 모형이 150ms 동안 3px 올라가고 모션 감소 설정에서는 제자리에 머뭅니다.

프로젝트 선택 시 제목·설명, 최대 세 건의 변경내역, 마지막 커밋 날짜, 공개 저장소
링크 순으로 표시합니다. 긴 제목은 패널에서 줄바꿈합니다. 프로젝트를 선택하면
오른쪽에 255–366px 너비의 별도 칸을 확보해 패널과 이름표가 함께 보이게 합니다.
700px 이하 세로 화면과 580px 이하에서는 광장 아래로 패널을 내립니다. 배경과
모형은 `public/plaza/`, 선택 상태와 배치는
`src/sections/activity/components/plaza/`에서 관리합니다.

## 색과 서체

| 역할                 | 실제 토큰              | 색        |
| -------------------- | ---------------------- | --------- |
| 광장 외곽·푸터       | `--color-dark`         | `#060513` |
| 페이지 바탕          | `--color-paper`        | `#080613` |
| 패널·단계 카드       | `--color-dark-2`       | `#141122` |
| 내비게이션 표면      | `--color-night-2`      | `#1c172d` |
| 광장 중앙의 빛       | `--color-board-glow`   | `#24133e` |
| 선택한 이름표        | `--color-board-active` | `#432b72` |
| 경계와 구획선        | `--color-dark-line`    | `#302945` |
| 이름표와 카드 테두리 | `--color-hairline`     | `#463952` |
| 본문·제목            | `--color-ink`          | `#f2eeff` |
| 설명과 메타데이터    | `--color-subtle`       | `#bbb4d0` |
| 보조 표시            | `--color-graphite`     | `#aaa1bb` |
| 선택선·링크 강조     | `--color-signal`       | `#ac8bf9` |
| 상세 보기 버튼       | `--color-action`       | `#6639ce` |

모형은 라벤더 계열의 밝은 윗면, 어두운 옆면, 그림자를 사용합니다. 앨범 사진과
차트에 작은 민트색 디테일이 있습니다. 모형 속 색상은 SVG 자산에 포함됩니다.
인터페이스의 강조색은 선택 이름표·링크·현재 메뉴에 사용합니다.

영문 본문과 제목은 General Sans, 한글은 Pretendard Variable, 서명과 숫자
메타데이터는 IBM Plex Mono를 사용합니다. 상세 페이지 제목은 44–84px, 광장 패널
제목은 24px, 모바일 모형 이름표는 14px입니다. 한글은 어절 단위로 줄을 바꾸며
개념 이미지의 캡션은 이미지 바로 아래에 둡니다.

## 공통 탐색과 페이지

- 헤더에는 홈으로 연결되는 `mooonseok` 서명과 작업·이력·AI 활용 링크를 둡니다.
  넓은 화면에는 GitHub 프로필 링크도 표시합니다. 현재 메뉴는 채운 배경과
  `aria-current`로 표시합니다.
- **이력**에는 다섯 프로젝트의 선택 목록과 이미지·소개·기간·담당 업무 링크가
  있는 카드 하나를 둡니다. 태블릿부터 목록과 카드를 양옆에 놓고 작은 화면에서는
  두 열 선택 목록 아래에 카드를 붙입니다. 구현 사례와 기술 목록은 아래에서
  이어집니다.
- **프로젝트 상세**는 이력 복귀 링크, 제목·서비스 설명과 개념 이미지로
  시작합니다. 담당 역할·업무 카드는 영역마다 요약, 실제 작업과 기술을 보여
  줍니다. 서비스 상태, 참여 기간, 실험 범위, 개념 이미지 고지는 확인된 내용
  그대로 유지합니다. 개별 도식의 관계와 기술 사례는 기존 앵커에서 읽을 수
  있습니다.
- **AI 활용**은 전역·프로젝트 지침에 따른 절차를 아홉 줄의 도식으로 보여줍니다.
  개발은 독립 작업이 있을 때 추가 담당과 병렬로 진행하며, 디자인은 방향 선택부터
  시안의 사용자 확정까지 이어집니다. 회차마다 통과, 담당자 보완, 규칙 합의나
  방향 선택으로 돌아가는 경로를 차례로 보여줍니다. 현재 카드만 강조하고 점은
  연결선에서만 움직입니다. 모션 감소 설정에서는 선택한 경로가 정지 상태로
  보입니다.
- **프리뷰**는 별도 경로입니다. `/preview/classic`은 화이트보드와 프로젝트별
  설명, `/preview/diorama`는 3D 작업실, `/preview/emosave-editor`는 조작 가능한
  설명용 편집기입니다.

## 조작과 검증

광장의 모형은 이름이 있는 버튼입니다. Tab으로 이동하고 Enter·Space로 열 수
있습니다. 열 때 닫기 버튼으로 초점이 이동하며 Escape와 닫기 조작은 선택했던
모형으로 초점을 돌려줍니다. 이력 선택 상태는 버튼의 눌림 속성과 현재 주소의
해시에 반영합니다. 실제 탐색은 키보드·터치를 모두 지원하고 주요 조작의 최소
크기는 44×44px입니다.

390·744·1024·1440px에서 광장의 타일 비율과 프로젝트 이름표, 열린 패널, 이력의
선택 카드, 상세 도식과 AI 단계의 읽기 순서를 확인합니다.

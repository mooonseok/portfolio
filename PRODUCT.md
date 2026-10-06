# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **주 사용자: 채용 면접관·팀 리드.** Flutter 개발자 또는 앱·웹·서버 풀스택
  개발자 채용에서 서류를 본 뒤, 면접 전에 지원자가 실제로 무엇을 구현했고
  기술적으로 어디까지 설명할 수 있는지 확인하려고 들어온다.
- 데스크톱과 모바일 양쪽에서 읽는다(320px부터 1440px까지, 가로 모드 포함 QA
  대상).

## Product Purpose

박문석(Software Engineer, Flutter / Web / Backend)의 개인 포트폴리오다. 홈에서
5개 프로젝트(FarmFam+, APC, Smart Farm, IndianBob, Emosave)의 서비스와 담당
범위를 훑고, 프로젝트별 상세 페이지에서 기능 관계와 대표 구현 사례를 읽는다.

성공은 면접관이 프로젝트마다 "어떤 서비스였고, 이 사람이 어느 부분을 어떻게
만들었는지"를 짧은 시간에 파악하고, 면접에서 물을 질문을 정할 수 있는 상태다.

## Positioning

- **앱·웹·서버·기기를 하나의 흐름으로 연결한 경험.** Flutter 앱에서 관리자 웹,
  NestJS 서버, MQTT·ESP32 기기까지 이어지는 작업을 보여 준다. 현재 홈 헤드라인은
  "사용자 앱과 업무 시스템을 개발해 왔습니다."다.
- **현장 도메인 경험.** 농산물산지유통센터(APC) 현장 운영, 농산물 커머스,
  스마트팜 시험처럼 실제 업무에 맞춘 시스템을 다뤘다.
- **구조를 보여 주는 도식.** 기능 나열 대신 관계·흐름 도식으로 무엇을 어떻게
  만들었는지 설명한다. 도식의 선은 연결 관계를 뜻하고 실행 순서·병렬성·트랜잭션
  범위를 주장하지 않는다.

## Operating Context

- 정적 사이트다. CMS와 서버 API가 없고, 모든 문구·도식·이미지 참조는
  `src/content`에 있다. 라우트는 홈, `work/[slug]` 5개, not-found다.
- 경력 구성: 랩이오사(2021.09–2025.09, 분저장·인디언밥 외주), 아그리코어
  (2025.10–재직 중, FarmFam+·APC·Smart Farm).
- 배포는 Vercel로 할 예정이다. 공식 공개 URL(canonical origin)은 아직 확정되지
  않았고, 메타데이터는 빌드 시 `SITE_URL` / `SITE_INDEXABLE`로 정한다.
- 연락처: `mspark9696@Naver.com`, GitHub 프로필 `https://github.com/mooonseok`
  (프로필 링크이며 소개한 서비스의 원본 코드 링크가 아니다).

## Capabilities and Constraints

- **사실만 쓴다.** 확인되지 않은 성과 수치·사용자 수·성능 개선율·매출 기여를
  만들지 않는다. 팀 프로젝트를 혼자 한 것처럼 쓰지 않고, 동료 작업과 본인 작업의
  경계를 드러낸다. 기술 주장은 원본 저장소 코드로 확인된 것만 쓴다.
- **상태 표기는 의미가 있다.** `PRODUCT WORK`는 실제 제품에 구현한 작업이며 공개
  출시를 주장하지 않는다. Smart Farm MONITORING은 사무실 센서 시험 모듈,
  CONTROL은 별도 LED 제어 실험이며 둘 다 농장 적용을 주장하지 않는다.
- **비어 있으면 숨긴다.** 빈 문자열·배열은 해당 섹션을 렌더링하지 않는다.
  `TO WRITE` 같은 자리표시 문구를 남기지 않는다.
- **이미지와 도식은 재구성 자료다.** 실제 서비스 화면이 아니며, 그 사실을
  사이트에 표시한다.
- **선택은 방문자 조작으로만 바뀐다.** 스크롤로 도식의 선택 상태를 바꾸지
  않는다.
- 소개한 서비스의 원본 코드는 이 저장소에 없다. 이 저장소는 포트폴리오 사이트
  코드다.
- 본문 언어는 한국어, 섹션·상태 라벨은 영어 대문자 표기를 함께 쓴다.

## Brand Commitments

- 이름 표기 `PARK MOONSEOK`, 직함 `SOFTWARE ENGINEER`, 분야
  `Flutter / Web / Backend`, 범위 `Selected Work 2022—2026`.
- 디자인 기준(source of truth)은 Phase 1–4 **LOCKED** 캔버스다(HANDOFF.md).
- 파비콘은 사용자가 제공한 픽셀 초승달 이미지다(`src/app/favicon.ico`,
  `icon.png`, `apple-icon.png`).

## Evidence on Hand

- 프로젝트 콘텐츠: `src/content/projects/<slug>.ts`, `<slug>-case.ts`.
- 프로젝트 이미지: `public/images/projects/<project>/` (개념 재구성 이미지).
- 공개 앱 등록 페이지: 인디언밥, 분저장 Google Play 링크(README.md).
- 없는 것(만들지 않는다): 사용자 수·다운로드 수·트래픽, 성능 개선 수치, 추천사,
  고객 로고, 수상·언론 보도, 실제 서비스 화면 캡처.

## Product Principles

1. 담당 범위가 먼저 보인다: 서비스 설명 → 본인이 만든 흐름 → 그 근거가 되는 기술
   사례 순으로 읽힌다.
2. 면접에서 방어할 수 있는 문장만 쓴다: 코드로 확인되지 않거나 동료 몫인 내용은
   축소하거나 뺀다.
3. 흐름과 관계를 도식으로 설명하되, 도식이 실제보다 많은 것을 주장하지 않는다.
4. 시험·실험·미적용 작업은 상태로 구분해 제품 작업과 섞지 않는다.

## Accessibility & Inclusion

- 키보드만으로 메뉴·아코디언·탭·Contents·CTA를 모두 쓸 수 있고 포커스 링이
  보인다.
- 상태는 색만으로 구분하지 않는다(기호와 텍스트, 스크린리더용 표기).
- `prefers-reduced-motion`에서 본문과 도식이 바로 읽히고 움직임이 없다.
- 터치 대상은 최소 44×44px이다. 패널에 `aria-live`를 쓰지 않는다.
- 세부 기준은 HANDOFF.md §6을 따른다.

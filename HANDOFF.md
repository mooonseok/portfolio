# Park Moonseok Portfolio — Handoff

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · pnpm. 현재
공개 경로와 공통 디자인 토큰은 DESIGN.md에서 확인합니다.

```bash
pnpm install
pnpm dev --port 3100    # stop the development server before pnpm build
pnpm lint               # ESLint 9 flat config (eslint.config.mjs), 0 warnings allowed
pnpm typecheck
pnpm test               # selection, scroll position, history and scanner regression tests
pnpm check:anchors      # production HTML links and group IDs, after pnpm build
pnpm check:metadata     # after build, with the same SITE_URL / SITE_INDEXABLE values
pnpm check:perf         # after build, first-load JS per route vs perf-budget.json
pnpm check:boundaries   # architecture rules (see §2)
pnpm format             # Prettier + Tailwind class sorting
pnpm format:check
pnpm build
```

`pnpm lint` runs the ESLint CLI (`eslint . --max-warnings=0`) against
`eslint.config.mjs`, which pulls in `next/core-web-vitals` and `next/typescript`
through `FlatCompat`. `next lint` is deprecated in Next 15 and removed in 16, so
it is no longer used. `next.config.ts` pins `outputFileTracingRoot` to this
directory so a lockfile in a parent folder cannot be inferred as the workspace
root.

Claude Code runs Prettier automatically after every file edit
(`.claude/settings.json`, PostToolUse hook `.claude/hooks/format-file.mjs`).
Commit messages are checked by `.githooks/commit-msg`
(`git config core.hooksPath .githooks`, rules in
`scripts/harness/commit-message.mjs`).

---

## 1. File structure

```
src/
  app/            routes only: layout, page (activity home), portfolio (history), work/[slug], ai,
                  api/github-webhook, not-found
  sections/       one folder per page section
    <name>/<name>-container.tsx   reads content, builds view models
    <name>/<name>-view.tsx        props in, markup out
    <name>/components/*-view.tsx  section-only presentational parts
    case-studies/                 <project>-case.tsx (container) + <project>-case-view.tsx,
                                  ai-practice.tsx + ai-practice-view.tsx (/ai)
  components/     UI reused by 2+ sections/pages (Atomic Design)
    atoms/        layout primitives (Box Column Row Grid Text Heading List ListItem
                  Anchor NavLink Button LineBreak) + Cta, JumpLink, ChoiceDot,
                  StatusLabel, NotShipped
    molecules/    FlowDiagram, ProjectHeader, SectionHeading, ScopeList, StateSketch,
                  SurfaceRelation, FieldRows (presentational only)
    organisms/    ScrollScene, ConceptFrame, ConceptArt, SiteHeader,
                  MobileMenu, SiteFooter, TechNotes, ExperimentBlock,
                  DomainExplorer (APC case study)
    templates/    CaseStudyTemplate (frame, nav, meta, contents, next, footer only;
                  the view takes a plain header so /ai reuses it)
  hooks/          use-<name>.ts client logic called by containers
  dto/            *.dto.ts object shapes (interfaces / types only)
  constants/      as const enumerations (TAG, HEADING, TONE, FLOW_ORIENT, …)
  content/        projects/<slug>.ts (+ <slug>-case.ts) · site.ts · ai-practice.ts —
                  single source of truth
  lib/            content getters, navigation, has, cx
  styles/         globals.css (Tailwind theme, variants, base) · tokens.css ·
                  motion.css · components/*.css (selector-heavy rules only)
scripts/          check-boundaries.mjs + boundaries/{scan,rules,config}.mjs
```

Conventions: kebab-case files, PascalCase named exports, no barrel files, no
comments, ≤200 lines per file, no string-literal enumerated props (use
`src/constants`), no raw HTML tags outside `components/atoms`.

## 2. Architecture rules (enforced by `pnpm check:boundaries`)

- **Container–presentational.** Containers (`*-container.tsx`, route files,
  `<project>-case.tsx`, public organism entries) read `@/content`, `@/lib`, call
  hooks and pass props. Presentational files (`*-view.tsx`, atoms, molecules)
  may not import content/lib/hooks or call React hooks.
- **Dependency direction.**
  `app → sections → templates → organisms → molecules → atoms → hooks/lib → content → dto/constants`.
  A section never imports another section.
- **Raw tags, literals, comments, length.** JS/JSX and TS/TSX are checked; regex
  literals are recognized through the installed TypeScript parser, as are React
  createElement calls, imported hook aliases and reversed enum comparisons.
  Content imports are limited to content/dto/constants. Checked per file;
  exceptions go in `scripts/boundaries/config.mjs` (`LINE_ALLOW`), currently
  only the generated `src/styles/fonts.css`.
- **Server components by default.** `'use client'` only on containers that own
  browser state (ProjectPlaza, HistoryPicker, TechNotes, CaseContents,
  ScrollScene, MotionLayer, HistoryScroll, DomainExplorer and the explorer
  section components: FarmFam+ `RelationMap`, Smart Farm `ControlConditions`,
  IndianBob `HabitExplorer`).
- **Styling.** Utilities in className; Preflight is off (the editorial base in
  `globals.css` replaces it); custom variants
  `mob tab-only short-land fine coarse on-dark js inview reveal-pending`;
  breakpoints `tab` 744 · `lap` 1024 · `wide` 1440; `--spacing: 4px`. The site
  uses the plaza palette. The public surfaces, text and selection colors come
  from the role tokens in `src/styles/globals.css` and `src/styles/tokens.css`.

## 3. Data model (summary)

홈 `/`의 ActivityContainer는 GitHub GraphQL 결과를 활동 주제별로 묶어
ProjectPlaza에 전달합니다. `GITHUB_TOKEN`과 `github-activity` 캐시 태그, 3600초
갱신 및 `content/activity-snapshot.ts` 대체 경로를 사용합니다.
`app/api/github-webhook`은 `GITHUB_WEBHOOK_SECRET`으로 서명을 확인한 뒤 캐시를
갱신합니다. `content/activity-topics.ts`의 저장소 제외·그룹 규칙과 비공개 링크
처리도 두 데이터 경로에 동일하게 적용됩니다.

최근 작업은 별도 등록 없이 커밋 제목에서 가져옵니다.
`lib/activity/to-projects.ts`의 규칙으로 설정·검사·배포 등 내부 작업을
제외합니다. 제품의 알림 설정·입력 검증은 유지합니다. 패널에는 변경내역을 최대 세
개까지 표시하고 마지막 커밋 날짜를 한 번 적습니다. 공개 저장소에만 링크를
제공합니다.

광장의 고정 SVG 배경과 프로젝트 모형은 `public/plaza`에 있습니다. 모형은 실제
HTML 버튼으로 선택합니다. 공개 홈의 첫 화면은 프로젝트 광장입니다. 모바일은 별도
SVG와 좌표를 사용해 바닥 타일의 가로세로 대각선 비율 2:1을 유지합니다.
프로젝트가 없으면 이력 링크를 제공합니다.

이력 `/portfolio`는 `app/_home/workshop-home.tsx`에서 다섯 개 프로젝트의 선택
목록과 선택한 프로젝트의 이미지·소개·기간·담당 업무 링크를 표시합니다. 첫 항목이
기본 선택이며 `HistoryPicker`는 기존 프로젝트 앵커를 읽고 선택 시 현재 URL
해시를 갱신합니다. 아래에는 구현 사례·기술·AI 활용 소개와 푸터가 이어집니다.
클래식 구성은 `/preview/classic`, 3D 작업실은 `/preview/diorama`에서 따로
확인합니다. 두 프리뷰는 noindex입니다.

AI 활용 `/ai#work`는 디자인 요청의 시안 제작·검토와 개발 요청 예시별 담당을
보여줍니다. ‘버튼 배치 변경’은 화면 담당이 버튼을 옮겨 검사를 요청합니다. ‘상세
패널 펼치기’는 화면 담당이 패널을 배치하고 데이터 담당이 항목을 조회하며 모션
담당이 펼침 효과를 만듭니다. 세 작업은 검사 전에 합류합니다. 예시를 바꾸면
도식과 단계 설명, 선택할 수 있는 오류가 함께 바뀝니다. 오류를 고르면 해당 담당이
수정하고 같은 조건에서 다시 검사합니다. 각 요청의 상세 목록을 펼치면 담당과
작업, 재검토 조건을 읽을 수 있습니다. 경로별 단계와 검토 조건은
`content/ai-workflow.ts`에서 관리합니다. 바로 아래 `#plaza-case`에는 광장 이름표
겹침 5건을 발견한 조건, 패널 위치 수정, 같은 44가지 조건에서 0건 확인, 수정
종료를 순서대로 표시합니다. 전후 그림은 그 아래에서 펼칩니다. 본문은 이 두
섹션으로 구성합니다. 기존 `/ai#engineering` 링크는 광장 수정 사례로 이어집니다.

The Emosave case study at `/work/emosave#interaction` replaces its static
editing diagram with an explanatory 2D dome editor, also available independently
at `/preview/emosave-editor`. It has three original characters, single
selection, bounded movement, in-plane rotation, resizing, deletion and reset. It
is not an app screenshot or a reproduction of the original Flutter
implementation. Generated artwork and demonstration dialogue are identified as
newly composed examples; image prompts live in the asset provenance JSON and PNG
metadata. DOM image layers replace the former Three.js house renderer. Mouse
dragging and touch dragging of an already selected character share state with
keyboard controls. The separate movement, rotation and resize toolbar is
omitted; corner handles retain their keyboard alternatives. Empty taps clear
selection; unselected areas preserve vertical scrolling. Opposite corner handles
rotate and resize, with a third corner button for deletion. Selection never
enlarges an item. Handle activation and keyboard rotation use 15-degree steps;
resizing stays within 75–160% of original size and dome bounds. Reset restores
all three characters, including deleted ones. A character choice row allows
selection behind overlaps. Selection temporarily raises an item without changing
its permanent order. Rotated corners must remain inside the dome; rejected
rotation never silently changes position. Movement released outside the dome
keeps the bounded placement already shown; it does not roll back merely because
the pointer left the area. Explicit cancellation and interrupted gestures
restore the starting state. Speech bubbles alternate with timers, pause while
editing or offscreen, and retain the user's pause across reset. Reduced motion
starts paused. There is no idle RAF, React update per drag frame, camera
control, persistence or API call. The shared `organisms/emosave-editor`
component serves the case study and preview, with hooks and `lib/emosave-editor`
modules for state and input. The preview section owns its standalone page frame;
the case study retains its own heading and main landmark. Home does not load the
editor or its images. The preview remains noindex without a canonical URL or
sitemap entry. Image failure leaves an explanation and case link. Speech bubbles
use an editor-local 14px radius with one 3px corner and the shared hairline
border; near the top they appear below the character. Committed position,
rotation and size changes have screen-reader-only summaries. No per-frame
announcements are emitted.

`site.headline` introduces user apps and business systems. The classic preview
hero keeps a single introduction sentence; `site.about` describes collaboration
and delivery. Project summaries describe the service; three or four feature
descriptions explain concrete work. Device experiments stay in Smart Farm.
Content follows the owner-confirmed contribution, team size and verification
scope.

`/preview/classic`의 화이트보드는 다섯 프로젝트를 앱·관리자 웹·서버
API·DB·기기별로 보여 줍니다. 각 행은 `project.layers`에서 담당 여부, 기술, 업무
요약을 가져옵니다. 프로젝트를 선택하면 전체 담당 업무와 사례 링크를 엽니다.
1024px 미만에는 담당 영역을 칩으로 표시합니다.

`Project` →
`slug, num, title, category, period, tier, caseLength, status[], surfaces, boardService, layers[], summary, links?, home{features[], scope, scopeMobile, flows, areas?, zones?, cta}, visuals{}, case{…}`

`case`:
`role, roleSurfaces?, roleTracks?, stateScope?, contextProblem, systemFlows, domainsTitle?, domains?, monitoringFlow?, feature?, surfaceRelation?, controlExperiment?, work[], connections?, workParagraphs?, decisions[] (0–2), techIntro?, techNotes[] (flexible fields), relationMap?, engineeringNote?, experiment?, currentState, currentStateTracks?, interactionFocus? (withStates?), stateExample?`

공개 사례 페이지의 `ProjectScopeListView`는 업무 영역별 요약·구체적인
작업·기술을 한 카드에서 보여 줍니다. 실험에는 글자 표시가 붙습니다.
`VisualsNote`는 도식에 `visualsNoteKo` 고지를 표시합니다. 클래식 프리뷰에는
서비스 소개, 기능 요약, 참여 기간, 사례 링크와 구현 사례·기술 목록이 남아
있습니다.

IndianBob and Emosave include verified Google Play links in `project.links`,
shown beside the home detail action and below the case overview. The package IDs
match their local Android builds. Store listings identify the public apps; they
do not establish current backend availability or authorship of every feature.
Emosave is also identified by its public Korean name, 분저장. App Store links
are omitted until their direct availability is confirmed.

상세 사례의 `#overview`에는 이력으로 돌아가기, 프로젝트명·기간·상태·서비스
소개와 개념 이미지, 담당 역할·메타 정보·해당 스토어 링크가 있습니다. 이미지 바로
아래에 재구성 캡션을 표시합니다. 담당 업무 카드와 목차 뒤에는 각 사례의 업무,
관계·상호작용, 구현 사례, 해당하는 배운 점이 이어집니다. 다음 프로젝트 링크로
이어서 탐색할 수 있습니다.

- FarmFam+ `case.connections` compares group purchase and secret deal as
  separate sales paths. Work includes sales settings and order changes.
  `secret-deal-price` covers time-dependent pricing and order revalidation.
  `case.relationMap` is a cancellation example inside Engineering. Its
  `order-cancellation` heading anchor and separate regression check remain.
  External refund and inventory restoration are not claimed to share the
  group-purchase DB transaction.
- APC `case.domains` is A 입고·정산 / B 근태·현장 앱 / C 전자결재. The detail
  explorer uses static steps, implementation items and note links. Examples
  cover approval and settlement / ERP outbox; the device / APK note remains
  supplementary. Existing note anchors are retained.
- Smart Farm monitoring stays static. Five `controlExperiment.conditions` select
  the relevant safety explanation and preserve their old hash IDs. Control is a
  separate ESP32-S3 / LED single-channel PoC. The fan concept image is not used
  as evidence of controlled equipment. Experiment purpose, implementation scope
  and test boundary are outside the changing panel.
- IndianBob `case.feature` selects 해빗 이용 / 관리자 운영 / 팀 기능 and
  highlights related systems and connections. Three options are vertically
  stacked at every width. Two examples cover input validation and coordinating
  requirements / data across app, web and API. Apple Sign-in remains omitted.
- Emosave shows the shared interactive dome editor instead of the old static
  state comparison. Work covers emotion input, editing and save / share. The
  example identifies its newly composed art and lack of persistence;
  `editor-state` discusses the original Cubit and BlocBuilder placement without
  an unmeasured performance claim. The old `case.stateExample` data is retained
  but not rendered.

Lines in these diagrams show connection only, not execution order, parallelism
or transaction scope; each `note` / `caption` says so. No explorer claims a
sequence the content does not state.

Project flows use `FLOW_ROLE.STATIC`; scrolling does not change their selected
node. Stories are text-and-link summaries without repeated flow diagrams. 이력
및 사례 상단은 `ProjectConceptImage`로 각 프로젝트의 `visuals.home`을
렌더링합니다. 이미지가 있으면 `visual.alt`와 `visual.caption`을 제공하고
배포·운영 사진과 구분합니다. APC, IndianBob, Smart Farm, Emosave의 복원된 개념
이미지와 원본 파일은 `public/images/projects`에 있습니다.

Rules:

- **Empty values:** An empty string or array means the section is not rendered
  at all (`has()`). No TO WRITE text ever appears in the UI.
- **Decisions:** Empty for all five projects, so no Decisions section renders
  anywhere.
- **기간**은 이력과 사례 모두 `content/projects`에서 읽습니다. Emosave는
  2022–2023, IndianBob은 2024–2025이며 다른 세 프로젝트는 “2025—2026 중
  참여”입니다.
- **연락처**는 `site.contact`에서 읽습니다. 이메일과 GitHub 프로필은 푸터에서
  접근할 수 있습니다.

## 4. Content → UI mapping

| 데이터                                                                                    | 표시 위치                                         |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------- |
| GitHub activity / snapshot                                                                | 홈 광장의 프로젝트·최근 변경내역·마지막 커밋 날짜 |
| `summary`, `period`, `surfaces`, `visuals.home`                                           | 이력의 프로젝트 목록·선택 카드, 상세 소개         |
| `layers`, `case.role`, `work`                                                             | 상세 페이지의 담당 업무와 구현 설명               |
| `connections`, `relationMap`, `domains`, `monitoringFlow`, `controlExperiment`, `feature` | 해당 프로젝트 사례의 관계 및 동작 설명            |
| `techNotes`, `currentState`                                                               | 구현 사례와 해당하는 배운 점                      |
| `stories[].description`                                                                   | 이력의 대표 구현 사례                             |
| `home.features`                                                                           | 클래식 프리뷰의 서비스 기능 요약                  |

Items from the content brief that were **not shown in the UI** because they are
instructions to the writer, not visitor-facing text:

- FarmFam+ "실제 운영 지표나 매출·성능 개선 수치는 표시하지 않습니다"
- The "~로 표현하지 마세요" lines

Smart Farm monitoring describes an office sensor prototype, before farm
deployment. The LED control experiment remains a separate scope.

## 5. Motion (scroll-driven, CSS-variable based)

홈 광장은 정지 장면입니다. 포인터 호버와 키보드 초점에서 모형만 3px 올라갑니다.
모션 감소 설정에서는 이동과 전환을 해제합니다. 이력의 프로젝트 선택은
수동입니다. AI 도식은 선택한 요청과 검토 결과를 자동으로 반복 재생합니다. 각
구간은 가장 긴 이동 경로에 맞춰 1,050~3,200ms 동안 움직이며 단계의 도착점에서
다음 이동이 바로 이어집니다. 세 담당으로 갈라질 때는 같은 시계로 움직이고,
오류가 생기면 해당 담당의 점만 돌아와 다시 합류합니다. 마지막 단계에서는 점이
720ms 머물고 220ms에 걸쳐 사라집니다. 첫 단계에서는 다시 움직이면서 220ms에 걸쳐
나타납니다. 움직임 줄이기에서는 ‘다음 단계’를 누를 때만 이동하며 마지막 단계
다음은 첫 단계입니다. 자바스크립트가 꺼져 있으면 두 경로와 복귀 사유를 글로 읽을
수 있습니다.

상세 사례에서는 클릭·터치·키보드로 업무·조건을 고릅니다. 선택을 바꾸면 설명이
즉시 바뀌며 스크롤은 선택에 영향을 주지 않습니다. 기존 도식 첫 노출과 스크롤
효과는 `ScrollScene`과 CSS 변수가 관리합니다. 모션 감소 시 도식은 완성된 상태를
보여 줍니다. 콘텐츠의 해시 이동과 뒤로가기는 `HistoryScroll`이 처리합니다.

## 6. Accessibility

- One site banner per page, main includes h1, and a keyboard skip link targets
  main.
- Semantic headings: the page or project name is h1; sections are h2.
- Status is never color-only: symbol plus text, and screen readers also read
  "(experiment)" / "(current)".
- 공통 헤더에 작업·이력·AI 활용 링크가 직접 노출됩니다. 현재 경로는
  `aria-current`로 표시합니다.
- 광장의 프로젝트 버튼은 `aria-expanded`로 선택을 전달합니다. 열면 닫기 버튼에
  초점이 가고, Escape 또는 닫기 버튼으로 선택했던 모형에 돌아옵니다. 넓은
  화면에서는 오른쪽 칸에 패널 폭을 확보하고 모바일 세로 화면에서는 광장 아래에
  놓습니다.
- 이력의 선택 버튼은 `aria-pressed`와 `aria-controls`로 연결한 소개 카드를
  갱신합니다.

- Tech-note keyboard focus moves between the mobile toggle and desktop heading
  when crossing 744px; pointer users do not receive automatic focus.
- Accordion (<744):
  - `h3 > button[aria-expanded][aria-controls]`, rows are 52px.
  - First note open by default; several can be open at once.
  - Opens the matching note when the URL hash points to it.
- FarmFam+ relation map: ≥744 bordered `button[aria-pressed][aria-controls]`
  nodes in a `role="group"` plus one panel; <744 a tree of
  `button[aria-expanded]` with the explanation directly under the tapped node.
  Connectors are `aria-hidden`; the panel text carries the same relation.
- APC domains and IndianBob features: `tablist` / `tab` / `tabpanel`
  (`useTabKeys`), roving tabindex, Home/End and automatic activation. APC uses
  horizontal ←/→; IndianBob uses vertical ↑/↓ at every width. IndianBob's
  explanation panel stays keyboard-focusable. Emosave's editor exposes character
  selection, corner handles, reset and speech controls with keyboard
  alternatives.
- Smart Farm conditions: `button[aria-pressed]` chips; the drawing is
  `aria-hidden` and the panel states "▲ 설명 위치 · …" in text.
- Contents derives its current group from document positions on scroll, resize,
  hash changes and history restoration. The mobile disclosure closes on outside
  pointer input, Escape, or when its static list returns into view.
- Same-page hash links (Contents, note links, skip link) get the router's
  history state copied onto their new entry, so Back from another page returns
  to the right page instead of keeping the previous one.
- Reveal hiding is enabled per mounted scene, so failed hydration keeps server
  content visible; print always shows reveal items, diagram lines and every tech
  note.
- 이력과 상세의 개념 이미지에는 캡션을 표시하고, 사례 도식에는 재구성 안내를
  유지합니다.
- 404는 한국어 문구와 홈 링크를 제공합니다.
- 선택 패널의 상태는 버튼과 접근성 속성으로 전달합니다. 주요 조작 대상은 44×44px
  이상입니다.

- Safe areas are handled with `env(safe-area-inset-*)` and `svh`. There is no
  `100vh`.

## 7. Before launch

1. **Images:** Conceptual images live in `public/images/projects/<project>/` and
   are referenced by `src` (and optionally `srcMobile` for a mobile crop) on the
   matching entry in `visuals` in `content/projects/<slug>.ts`. All entries
   carry an image except **Smart Farm `monitor`** and **Emosave `store`**, which
   retain drawn SVG concept illustrations in `organisms/concept-art`. The
   current summary, focus and monitoring views do not mount those concept
   assets. The `brief` string is a development-only caption and never renders in
   a production build.
2. **Image captions:** Keep `visual.caption` concise and explicit about
   conceptual imagery; do not imply that an image documents an actual
   deployment.
3. **연락처.** 이메일과 GitHub 프로필의 원본은 `content/site.ts`입니다. 모든
   공개 경로의 푸터에서 확인할 수 있습니다.
4. **탐색.** 작업은 `/`, 이력은 `/portfolio`, AI 활용은 `/ai`입니다. 프로젝트
   상세의 상위 메뉴는 이력입니다.

5. **Fonts:** All three families are self-hosted from `public/fonts/`; see
   `public/fonts/README.md` for sources and licenses. Nothing is fetched from a
   third-party CDN at runtime and `pnpm build` needs no network access for
   fonts.
   - **General Sans** 400/500/600 — `@font-face` in `styles/fonts.css`;
     `GeneralSans-Medium.woff2` is preloaded from the document head because the
     hero and every project title use it.
   - **Pretendard Variable** — the upstream 92-file dynamic subset, also
     declared in `styles/fonts.css`, so a page downloads only the Korean subsets
     it renders (about 10 files on the homepage). The full family is never
     preloaded.
   - **IBM Plex Mono** 400 (latin subset) — `next/font/local` in
     `app/layout.tsx`. Weight 500 is not shipped: no `.mono` element resolves to
     a heavier weight on any page.

   Fallback stacks stay in the `@theme` block of `styles/globals.css`
   (`--font-sans`, `--font-mono`); `--font-mono` falls back to Pretendard
   Variable so Korean mono labels render in Pretendard. Every face uses
   `font-display: swap`.

6. **Publication metadata:** GitHub's homepage setting points to
   `https://portfolio-ten-umber-trj7j2b3qz.vercel.app`; verify that existing
   deployment before relying on it. The next release's canonical origin is still
   unconfirmed. Use `.env.example` as the configuration template. At build time,
   set `SITE_URL` to the confirmed HTTPS origin and `SITE_INDEXABLE=true` only
   for the public production site. Indexing requires both values; otherwise
   pages are `noindex`, robots permits crawling so search engines can read that
   directive, and the sitemap is empty. Canonical URLs are omitted when the
   origin is unset; invalid configured values raise a configuration error. Leave
   indexing unset or `false` for previews. Rebuild when these settings change.
   These settings do not provide access control.
7. **Social sharing:** Home, case pages and `/ai` use their own titles and
   descriptions with the common card `public/social/portfolio.png`. Check the
   actual deployment's canonical URLs, image URLs, robots and sitemap after its
   public URL is confirmed. Build-time configuration details are in README.
8. **Metadata verification:** After the build, run `pnpm check:metadata` with
   the same `SITE_URL` / `SITE_INDEXABLE` values used for that build. The
   checker does not load `.env.local`; supply the values through the shell
   environment. Verify both default non-indexable output and public-URL fixture
   output before release; fixture URLs are not deployment destinations.
9. **검증 실행 환경**. 현재 저장소에는 `.github/workflows/verify.yml`이
   없습니다. AGENTS.md §5의 검사는 로컬에서 실행하고 현재 변경 버전에 대한
   결과를 기록합니다. 공통 작업 흐름은 사용자 전역 `engineering-workflow`,
   프로젝트별 조건은 `pf-*` 진행표가 제공합니다. Codex의 `.agents/skills/pf-*`는
   `.claude/skills/pf-*` 원본을 가리킵니다. 빌드·검증 서버는 QA가 관리하고 독립
   검토 완료 후 정리합니다. 요청별 경로와 수정 한도는 AGENTS.md §7을 봅니다.

## 8. 화면 검증

390 · 744 · 1024 · 1440px에서 기본 및 선택 상태를 확인합니다. 광장의 모바일 경계
700px와 가로 모드도 확인합니다.

- [ ] 광장을 리사이즈해도 바닥 타일의 대각선 비율과 모형 비율이 유지됨
- [ ] 이름표 선택 후 상세 읽기, Escape와 닫기에서 초점 복귀
- [ ] 이력의 프로젝트 선택·해시 복원과 사례 링크가 같은 프로젝트를 가리킴
- [ ] AI 도식의 자동 반복과 요청·검토 결과 선택, 모션 감소 상태의 수동 진행를
      확인
- [ ] 743/744와 1023/1024에서 목록·목차·사례 도식 전환이 자연스러움

- [ ] Accordion defaults to only the first item open
- [ ] No important content depends on hover
- [ ] No overflow or clipping
- [ ] ● PRODUCT WORK / ◇ EXPERIMENT distinction is clear
- [ ] No TO WRITE, fake contact details or unverified numbers anywhere
- [ ] Keyboard only: navigation, plaza, accordion, Contents and CTAs all work;
      focus rings are visible

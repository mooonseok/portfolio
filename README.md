# Park Moonseok — Portfolio

Flutter 앱·관리자 웹·서버 API와 사무실 기기 실험에서 맡은 작업을 소개하는 개인
포트폴리오입니다. 홈 화이트보드에서 5개 프로젝트의 담당 영역과 기술을 비교하고,
이름을 선택해 영역별 작업과 사례 링크를 확인할 수 있습니다. 좁은 화면에서는
프로젝트별 목록으로 바뀝니다. 상세 페이지는 소개와 담당 범위 목록으로 시작하고,
기능 관계와 대표 구현 사례를 읽을 수 있습니다. 홈 소개는 사진 대신 담당 기능을
읽는 판면으로 구성하고, 상세 목록은 담당 영역·업무·확인된 기술을 정리합니다.

**이 저장소는 포트폴리오 사이트 코드입니다.** 소개한 서비스의 원본 구현은 별도
프로젝트에 있습니다. 이미지와 도식은 설명을 위한 재구성 자료입니다. 공식 제출용
URL은 아직 확정하지 않았습니다.

공개 앱 등록 페이지:

- [인디언밥 — Google Play](https://play.google.com/store/apps/details?id=com.connecto.indianbob&hl=ko)
- [분저장 — Google Play](https://play.google.com/store/apps/details?id=com.lab254.emosave&hl=ko)

## 빠르게 확인하기

| 확인할 내용                     | 경로                                                                     |
| ------------------------------- | ------------------------------------------------------------------------ |
| 5개 프로젝트의 소개와 담당 범위 | [프로젝트 콘텐츠](src/content/projects/)                                 |
| 탭·선택·닫힘·복원의 상태 처리   | [선택 로직](src/lib/selection.ts), [선택 훅](src/hooks/use-selection.ts) |
| 화면 구성과 콘텐츠의 분리       | [페이지 섹션](src/sections/), [공통 컴포넌트](src/components/)           |
| 회귀 테스트와 CI                | [테스트](scripts/tests/), [검증 workflow](.github/workflows/verify.yml)  |

CMS·서버 API 없이 콘텐츠를 정적으로 렌더링합니다. 문구·도식·이미지 참조는
`src/content`에서 관리합니다.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · pnpm.

Design and content decisions, the data model and the QA checklist are in
[HANDOFF.md](HANDOFF.md). Visual tokens and whiteboard component rules are in
[DESIGN.md](DESIGN.md), with preview extensions in `.impeccable/design.json`.
Branch, commit, verification and background-process rules for anyone (or any
agent) working in this repo are in [AGENTS.md](AGENTS.md); `CLAUDE.md` imports
it so Claude Code loads the same rules.

## 3D 미리보기

`pnpm dev --port 3100` 실행 후 `/preview/diorama`에서 Emosave, IndianBob,
FarmFam+, APC, Smart Farm의 개념 모형을 확인할 수 있습니다. 기존 홈과 상세
페이지는 유지하며, 미리보기는 검색 색인에서 제외합니다. 감정 기록과 마을 편집,
해빗 체크와 팀 참여, 상품 관리, 입고·결재, 센서·LED 시험을 프로젝트별 형태로
구분합니다. 정적 그림도 같은 개념을 표현합니다. 각 모형과 이름표는 기존
프로젝트의 담당 범위 전체 및 상세 페이지로 연결합니다.

이름표는 데스크톱에서 모형과 같은 3+2 순서로 배치하며, 좁은 화면에서는 선택한
이름표 바로 아래에 담당 업무를 펼칩니다. 설명은 한 곳에만 표시하고 상세 링크는
본문 아래에 하나만 제공합니다. 이름표는 키보드로 선택할 수 있고 Escape로 선택을
해제합니다. 모바일을 포함해 3D를 자동으로 불러오며, 로딩 중이거나 사용할 수 없는
환경에서는 정적 그림과 이름표로 담당 업무를 확인할 수 있습니다. 별도의 3D 전환
버튼은 표시하지 않습니다. Smart Farm의 센서 시험과 LED 제어는 별도 실험으로
표현합니다. 첫 방문에는 1.6초 오프닝을 표시합니다. 같은 브라우저의 방문 기록을
저장하여 재방문·새로고침·뒤로 가기에서는 자동 재생을 생략합니다. 해시 링크나
스크롤 복원 상태, 모션 줄이기 설정, 저장소 접근 실패에서도 생략합니다.
건너뛰기와 Escape로 즉시 닫거나 하단의 오프닝 다시 보기로 수동 재생할 수
있습니다.

## Emosave 배치 편집 미리보기

`pnpm dev --port 3100` 실행 후 `/preview/emosave-editor`에서 집 한 채를
선택·이동·회전하고 처음 배치로 복원할 수 있습니다. 실제 앱 화면이나 Flutter
구현을 재현한 것이 아닌 설명용 예시입니다. PC는 드래그 또는 선택 후 위치 클릭,
터치는 선택 후 위치 탭을 사용합니다. 방향 버튼과 키보드로도 조작할 수 있습니다.
저장·API 호출은 하지 않으며 새로고침하면 초기 상태로 돌아옵니다.

홈과 상세 페이지에서는 노출하거나 불러오지 않습니다. 전용 코드는
`src/sections/emosave-editor/`, `src/lib/emosave-editor/`,
`src/hooks/use-emosave-editor.ts`에 분리되어 있습니다. 이 미리보기 추가 커밋을
revert하면 기존 작업실 변경 없이 제거할 수 있습니다. 검색
색인·canonical·사이트맵에서 제외하며 WebGL을 사용할 수 없으면 안내와 실제 구현
사례 링크를 제공합니다.

## Requirements

- Node.js 22.18 or newer (verified on 24). `pnpm test` imports `.ts` files
  directly, which needs Node's built-in type stripping.
- pnpm (the repo pins `packageManager: pnpm@10.27.0`; use `corepack enable`)
- Network access for `pnpm install`. `pnpm build` needs none: General Sans,
  Pretendard and IBM Plex Mono are all self-hosted from `public/fonts` (see
  [public/fonts/README.md](public/fonts/README.md)).

## Commands

```bash
pnpm install
pnpm dev --port 3100    # development server (stop before pnpm build)
pnpm build              # production build
pnpm start --port 3100  # serve the production build locally

pnpm lint               # ESLint 9; excludes installed skill folders only, fails on warnings
pnpm typecheck          # tsc --noEmit
pnpm test               # selection, scroll position, history and scanner regression tests
pnpm check:anchors      # rendered IDs and content links; run after pnpm build
pnpm check:metadata     # built metadata; use the same SITE_URL / SITE_INDEXABLE as the build
pnpm check:boundaries   # architecture rules (scripts/check-boundaries.mjs)
pnpm format             # Prettier + Tailwind class sorting
pnpm format:check
```

## Folders

| Path                     | Role                                                              |
| ------------------------ | ----------------------------------------------------------------- |
| `src/app`                | Routes only: layout, home, `work/[slug]`, not-found               |
| `src/sections`           | One folder per page section: `*-container.tsx` + `*-view.tsx`     |
| `src/components`         | Atoms / molecules / organisms / templates shared by 2+ sections   |
| `src/hooks`              | Client-side logic (`use-*.ts`) called by containers               |
| `src/dto`                | Object shapes (types and interfaces only)                         |
| `src/constants`          | `as const` enumerations used instead of string-literal props      |
| `src/content`            | **The content source of truth** — see below                       |
| `src/lib`                | Content getters, navigation helpers, `has`, `cx`                  |
| `src/styles`             | `globals.css` (theme, variants, base), `tokens.css`, `motion.css` |
| `public/images/projects` | Project images, one folder per project                            |
| `public/fonts`           | Self-hosted webfonts and their licenses                           |
| `scripts`                | Architecture boundary checker                                     |

Containers read content and call hooks; `*-view.tsx` files take props and render
markup only. `pnpm check:boundaries` enforces that split, the import direction
and the per-file limits.

## Editing content

| What                                                    | Where                                 |
| ------------------------------------------------------- | ------------------------------------- |
| Name, role, contact, story cards, experience, tools     | `src/content/site.ts`                 |
| A project's meta, summary, home block, image references | `src/content/projects/<slug>.ts`      |
| A project's case study body                             | `src/content/projects/<slug>-case.ts` |
| Images                                                  | `public/images/projects/<project>/`   |

Two rules matter when editing:

- **Empty means hidden.** An empty string or array removes the whole section
  from the page. Never leave placeholder text such as `TO WRITE` in content.
- **Status wording is load-bearing.** `PRODUCT WORK` means work implemented in a
  real product; it does not claim a public launch. Smart Farm MONITORING is an
  office sensor prototype and CONTROL is a separate LED experiment; neither
  claims farm deployment. The APC OCR experiment is not displayed.

`site.contact.email` is `mspark9696@naver.com`; navigation, mobile menu and
footer expose the contact link. `site.contact.github` points to
[the GitHub profile](https://github.com/mooonseok), which is linked from the
intro, footer and mobile menu. It is a profile link, not a source-code link for
every featured service. Each contact link renders only if its own value is set.

## Publication metadata

The GitHub repository homepage currently points to
[the existing Vercel address](https://portfolio-ten-umber-trj7j2b3qz.vercel.app).
Verify that deployment before treating it as the current public site. The
canonical origin for the next release is not confirmed yet. Metadata uses the
following build-time environment variables:

| Variable         | Production value                                                 | Preview / local value |
| ---------------- | ---------------------------------------------------------------- | --------------------- |
| `SITE_URL`       | Confirmed public HTTPS origin, without a path, query or fragment | Unset                 |
| `SITE_INDEXABLE` | `true` when the public site is ready for indexing                | Unset or `false`      |

Use `.env.example` as the configuration template. Its defaults leave the URL
empty and indexing disabled. Set the confirmed production values in the
deployment environment; keep preview settings separate.

Indexing is enabled only when both a valid `SITE_URL` and the exact value
`SITE_INDEXABLE=true` are present. Without that combination, page metadata is
`noindex`, `robots.txt` permits crawling so search engines can read the noindex
directive and `sitemap.xml` contains no entries. Without `SITE_URL`, canonical
URLs are omitted. Invalid configured values raise a configuration error.
`SITE_URL` rejects credentials, paths, queries, fragments, localhost names,
.local names and all IP literal hosts; a trailing slash is normalized. This
format validation does not verify public DNS resolution. These controls concern
search discovery; they do not make a preview private.

Set the production values before `pnpm build` in the deployment environment.
Changing only the server runtime variables does not update already generated
metadata; rebuild after changing them. Keep indexing disabled for preview
deployments even if they inherit the public origin. A preview with a valid
`SITE_URL` still generates canonical and social-image URLs, but remains
`noindex` unless indexing is explicitly enabled.

Home and project pages use their own titles and descriptions, and share
`public/social/portfolio.png` as the Open Graph / Twitter image. After the
public URL is confirmed, verify canonical URLs, social-image URLs, robots and
sitemap output on that deployment.

Run `pnpm check:metadata` after `pnpm build`, with the same `SITE_URL` and
`SITE_INDEXABLE` values supplied to both commands. The check compares the
generated metadata, robots and sitemap against that configuration. Unlike the
Next.js build, the checker does not load `.env.local` automatically: export the
values in the shell or supply them to each command explicitly. CI provides both
values through the job environment.

## Continuous verification

There is currently no `.github/workflows/verify.yml` in this checkout. The
commands above provide local verification; this repository does not currently
provide the previously documented GitHub Actions verification matrix. Local
checks do not confirm remote CI or deployment success.

`pnpm check:metadata` also checks that all preview routes remain `noindex`, have
no canonical URL and stay out of the sitemap, including indexable builds.

## 홈 화면 전환

현재 홈은 프로젝트 작업실입니다. `src/constants/home.ts`의
`HOME.WORKSHOP_ENABLED`를 `false`로 바꾸고 다시 빌드하면 기존 홈으로 돌아갑니다.
기존 구성은 `src/app/_home/classic-home.tsx`에 보존하며 `/preview/classic`에서
비교할 수 있습니다. 작업실 구성은 `src/app/_home/workshop-home.tsx`, 공용 3D
UI는 `src/components/organisms/project-workshop/`에 있습니다.
`/preview/diorama`는 독립 작업실 미리보기로 유지합니다. 두 미리보기는 검색
색인을 차단합니다. 화면 전환은 콘텐츠와 프로젝트 상세 페이지를 바꾸지 않습니다.

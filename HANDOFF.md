# Park Moonseok Portfolio — Handoff

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · pnpm. The
design source of truth is the Phase 1–4 **LOCKED** canvases.

```bash
pnpm install
pnpm dev --port 3100    # stop the development server before pnpm build
pnpm lint               # ESLint 9 flat config (eslint.config.mjs), 0 warnings allowed
pnpm typecheck
pnpm test               # selection, scroll position, history and scanner regression tests
pnpm check:anchors      # production HTML links and group IDs, after pnpm build
pnpm check:metadata     # after build, with the same SITE_URL / SITE_INDEXABLE values
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
(`.claude/settings.json`, PostToolUse hook).

---

## 1. File structure

```
src/
  app/            routes only: layout, page (home), work/[slug], not-found
  sections/       one folder per page section
    <name>/<name>-container.tsx   reads content, builds view models
    <name>/<name>-view.tsx        props in, markup out
    <name>/components/*-view.tsx  section-only presentational parts
    case-studies/                 <project>-case.tsx (container) + <project>-case-view.tsx
  components/     UI reused by 2+ sections/pages (Atomic Design)
    atoms/        layout primitives (Box Column Row Grid Text Heading List ListItem
                  Anchor NavLink Button LineBreak) + Cta, JumpLink, ChoiceDot,
                  StatusLabel, NotShipped
    molecules/    FlowDiagram, ProjectHeader, SectionHeading, ScopeList, StateSketch,
                  SurfaceRelation, FieldRows (presentational only)
    organisms/    ScrollScene, ConceptFrame, ConceptArt, SiteHeader,
                  MobileMenu, SiteFooter, TechNotes, ExperimentBlock,
                  DomainExplorer (APC case study)
    templates/    CaseStudyTemplate (frame, nav, meta, contents, next, footer only)
  hooks/          use-<name>.ts client logic called by containers
  dto/            *.dto.ts object shapes (interfaces / types only)
  constants/      as const enumerations (TAG, HEADING, TONE, FLOW_ORIENT, …)
  content/        projects/<slug>.ts (+ <slug>-case.ts) · site.ts — single source of truth
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
  browser state (MobileMenu, SiteHeaderNav, TechNotes, CaseContents,
  ScrollScene, MotionLayer, HistoryScroll, DomainExplorer and the explorer
  section components: FarmFam+ `RelationMap`, Smart Farm `ControlConditions`,
  IndianBob `HabitExplorer`).
- **Styling.** Utilities in className; Preflight is off (the editorial base in
  `globals.css` replaces it); custom variants
  `mob tab-only short-land fine coarse on-dark js inview reveal-pending`;
  breakpoints `tab` 744 · `lap` 1024 · `wide` 1440; `--spacing: 4px`.

## 3. Data model (summary)

The active home uses the project workshop in `app/_home/workshop-home.tsx`.
`constants/home.ts` selects it with `HOME.WORKSHOP_ENABLED`; set it to false and
rebuild to restore the unchanged classic composition in
`app/_home/classic-home.tsx`. `/preview/classic` preserves the old home for
comparison. Both preview routes remain noindex. The workshop reuses
`components/organisms/project-workshop`, includes all project layer work in its
selection panels and links to the unchanged case studies. It replaces the
classic hero and repeated project rows, then renders the existing engineering
stories, tools and footer. Its opening makes the whole home chrome and content
inert. The unselected desktop panel lists each project and its owned areas with
direct case links. Selected panels retain all work sentences with separators
between areas. Stories and tools use compact section spacing only on the
workshop home. Workshop stories align with the main container rather than the
classic metadata rail. Selected notes have one case link below the work list. 3D
loads automatically at every viewport width, with a static illustration during
loading or failure and no user-facing 3D toggle. Both home variants leave 80px
below the tools table on mobile and 96px from tablet before the footer. On page
exit, the workshop saves its selection and scroll position to that browser
history entry. Returning or reloading restores the panel before scroll
placement; a fresh entry starts unselected. Existing router history fields are
preserved. The classic layout described below remains available through the
switch.

`/preview/emosave-editor` is an isolated explanatory placement editor with one
house, selection, bounded movement, quarter-turn rotation and reset. It is not
an app screenshot or a reproduction of the original Flutter implementation. The
fixed camera and item appearance inherit the workshop. Mouse dragging and
select-then-place share the same in-memory state as the DOM direction buttons;
touch uses taps with vertical scrolling preserved. Arrow keys are scoped to the
control group. Interrupted gestures restore the starting placement. Rendering is
requested only on change or resize; there is no motion interpolation or idle
animation, including with reduced motion. Dedicated section, hook and
`lib/emosave-editor` modules are imported only by its preview route. Home and
case studies do not link to or load it. It has no persistence or API calls and
remains noindex, without a canonical URL or sitemap entry. WebGL failure leaves
an explanation and the link to the existing Emosave implementation case.

`site.headline` introduces user apps and business systems. The hero keeps a
single introduction sentence; `site.about` describes collaboration and delivery.
Project summaries describe the service; three or four feature descriptions
explain concrete work. Device experiments stay in Smart Farm. Content follows
the owner-confirmed contribution, team size and verification scope.

The hero whiteboard (`organisms/whiteboard`, data from `project.layers`) has
five projects in start-year order and five layers (앱 / 관리자 웹 / 서버 API /
DB / 기기). At 1024px and above each built cell is a blue marker box showing its
technology and a dedicated `layers.summary`; layers the developer did not build
are faint dotted outlines; vertically adjacent built cells in one project are
joined by a short marker line (connection only, not order). Below 1024px each
project lists its owned layers as marker chips; unbuilt layers are hidden. Each
column header shows the service and participation period. Selecting a project
name draws a red marker loop and opens a yellow note below the matrix (the
matrix does not move) with layer-only headings and complete work sentences
(`layers.lines`) as separate list items, plus the case link. Technology names
are omitted from note headings consistently across projects. Period and product
status stay outside the note. Blue solid = 직접 개발·유지보수, green dashed =
experiment, red = current selection. The loop draws in 300ms and the note enters
in 180ms only when a pointer opens the first note; switching notes, keyboard and
reduced-motion selection are immediate. Selecting keeps the tapped title at the
same screen position. Experiment cells carry a screen-reader "(실험)" suffix.

`Project` →
`slug, num, title, category, period, tier, caseLength, status[], surfaces, boardService, layers[], summary, links?, home{features[], scope, scopeMobile, flows, areas?, zones?, cta}, visuals{}, case{…}`

`case`:
`role, roleSurfaces?, roleTracks?, stateScope?, contextProblem, systemFlows, domainsTitle?, domains?, monitoringFlow?, feature?, surfaceRelation?, controlExperiment?, work[], connections?, workParagraphs?, decisions[] (0–2), techIntro?, techNotes[] (flexible fields), relationMap?, engineeringNote?, experiment?, currentState, currentStateTracks?, interactionFocus? (withStates?), stateExample?`

Below the hero, the project order follows the board: Emosave → IndianBob →
FarmFam+ → APC → Smart Farm. Product projects use peer-level headings without
사용자 앱 / 업무 시스템 group titles; 센서·제어 실험 remains a separate heading.
Each project is a full-width editorial row: built-layer chips, service summary,
three or four static `home.features` on a light writing surface and one detail
link. Concept images, decorative section numbers, the SignalLine and footer
`200 OK` are no longer rendered. The Experience section is removed; the board
header carries the periods. The homepage intro includes GitHub; the former This
Website section is removed to keep the reading path focused on project work.
Case work rows and technical notes use 16px body text with 1.7 line height; a
single technical note uses one column. All home projects share the light paper
surface; APC case-study sections use the same light paper surface as the other
cases. Smart Farm has its own experiment heading. The `work` navigation anchor
starts at the project list and the `flutter-work` anchor remains available. Case
pages show a definition list of owned areas (`ProjectScopeListView`) after the
introduction. Each row pairs an area with its work summary and, when supplied,
technology. Only separators between rows remain; there is no board frame, tinted
box, connector or legend. Technology moves below the work summary on mobile;
tablet and wider use three columns. Experiment rows carry a visible experiment
label. The work sections below retain implementation detail. `VisualsNote`
renders the unchanged `visualsNoteKo` reconstruction notice beside the actual
diagrams in each case study. The home whiteboard and its connector explanation
are unchanged.

IndianBob and Emosave include verified Google Play links in `project.links`,
shown beside the home detail action and below the case overview. The package IDs
match their local Android builds. Store listings identify the public apps; they
do not establish current backend availability or authorship of every feature.
Emosave is also identified by its public Korean name, 분저장. App Store links
are omitted until their direct availability is confirmed.

Case studies start at `#overview` with the project title, one period/status row,
service introduction, full role text and any store links on one reading axis.
Titles use 36/48/56px at mobile/tablet/laptop sizes; summary text uses 18/20px
and role text keeps the body scale. The standalone overview number and duplicate
period sidebar are removed. Unique role metadata and scope limits remain. The
scope list follows after 32px on mobile and 48px from tablet. The reading order
is overview → work → connections / interaction → implementation examples →
optional learning / result. Duplicate Role / Scope and Context sections are
removed. Contents labels and numbers follow the actual section order. NEXT is a
single full-row link with a 20/24px project name, persistent underline, the NEXT
label and an arrow; its decorative project number is omitted.

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
- Emosave `case.stateExample` is a static DEFAULT / SELECTED / PLACED comparison
  beside the interaction content, with an explanatory-example caption. The
  drawing does not invent a drop-target indicator. Work covers emotion input,
  editing and save / share. `editor-state` discusses Cubit and BlocBuilder
  placement without an unmeasured performance claim.

Lines in these diagrams show connection only, not execution order, parallelism
or transaction scope; each `note` / `caption` says so. No explorer claims a
sequence the content does not state.

Project flows use `FLOW_ROLE.STATIC`; scrolling does not change their selected
node. Stories are text-and-link summaries without repeated flow diagrams.
Representative homepage images use `visual.caption` for an always-visible
figcaption below the image. The aspect ratio applies to the media box; captions
stay in normal flow (11px label / 13px description). APC, IndianBob, Smart Farm
and Emosave use `main-restored.png` clarity-restored concept assets, not
higher-resolution upscales; original JPGs are retained. Images use quality 85
with responsive Next.js WebP optimization. AVIF is disabled after the 750px
Smart Farm conversion stalled during local production-browser verification.
Spatial pins and hover metadata overlays are removed.

Rules:

- **Empty values:** An empty string or array means the section is not rendered
  at all (`has()`). No TO WRITE text ever appears in the UI.
- **Decisions:** Empty for all five projects, so no Decisions section renders
  anywhere.
- **Periods:** Read from `content/projects` only. The homepage and case studies
  use the same value. Emosave is 2022–2023; IndianBob is 2024–2025. The other
  projects say "2025—2026 중 참여" rather than asserting individual start/end
  years. The home board header shows these participation periods.
- **Contact:** `site.contact.email` is `mspark9696@naver.com`; CONTACT
  navigation, mobile-menu email and footer email are visible. GitHub remains
  empty.

## 4. Content → UI mapping

| Data                                   | Homepage                             | Case study                                         |
| -------------------------------------- | ------------------------------------ | -------------------------------------------------- |
| `summary`                              | Service introduction                 | Introduction before overview                       |
| `period` · `status` · `surfaces`       | Project header                       | Header and overview metadata                       |
| `home.features`                        | Three static feature summaries       | —                                                  |
| `case.role`                            | —                                    | Overview before hero                               |
| `work`                                 | —                                    | Broad feature scope before diagrams                |
| `connections` · `relationMap`          | —                                    | FarmFam+ sales comparison and cancellation example |
| `domains`                              | —                                    | APC business explorer                              |
| `monitoringFlow` · `controlExperiment` | —                                    | Static monitoring and separate control PoC         |
| `feature`                              | —                                    | IndianBob feature-to-system explorer               |
| `techNotes`                            | —                                    | Representative implementation examples             |
| `interactionFocus` · `stateExample`    | —                                    | Emosave illustrations and static state comparison  |
| `stories[].description`                | Three text summaries with case links | —                                                  |
| `currentState`                         | —                                    | Optional learning / result                         |

Items from the content brief that were **not shown in the UI** because they are
instructions to the writer, not visitor-facing text:

- FarmFam+ "실제 운영 지표나 매출·성능 개선 수치는 표시하지 않습니다"
- The "~로 표현하지 마세요" lines

Smart Farm monitoring describes an office sensor prototype, before farm
deployment. The LED control experiment remains a separate scope.

## 5. Motion (scroll-driven, CSS-variable based)

The five project blocks and case sections render `ScrollScene steps={false}` and
none of the new diagrams carry `[data-flow]`, so scrolling never changes a
selection or lights a node. Selections change only on click, tap or keyboard,
live in component state (no storage) and survive scrolling and breakpoint
changes. Emphasis (background, border, connector 1px → 2px) changes in 150ms;
panel content changes immediately without remount fades. APC domain panels and
Smart Farm condition panels reserve the tallest content with a grid stack,
including mobile. Inactive content is hidden and inactive links are inert. Tabs
and condition chips use `--dur-press` / `--ease-out` press feedback. Board
keyboard selection reveals its note without smooth animation. For in-page links:
`HistoryScroll` sets `html[data-smooth-scroll]` on the first pointer or key
input and removes it on back/forward, so landing on a URL hash and history
restoration jump straight to their position. Hash-link clicks that open
elsewhere (modifier keys, `target`, `download`) or are cancelled are not
remembered. The Smart Farm monitoring flow is `FLOW_ROLE.STATIC` (first-reveal
line draw only). Stories cover IndianBob team admission policy and permission,
Emosave editor state, and FarmFam+ secret-deal price validation. The hero CTA
jumps to `#work`. Engineering is labeled 대표 구현 사례; IndianBob and Emosave
retain 배운 점 without changing their current-state anchor IDs.

Sections emit data attributes; the client organisms drive them. No React state
changes per scroll frame: IntersectionObserver gates each rAF loop, values are
written as CSS variables / attributes.

| Element            | Behavior                                                                                                                                                                                                               | Reduced motion                 |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `ScrollScene`      | `data-ready` after hydration, `data-inview` once (30% of min(height, viewport)); optional step mode moves `data-active` along `[data-flow="primary"] [data-step]`; secondary flows follow later with ink emphasis only | first node active, no stepping |
| Flow diagram       | segments draw 600ms / 80ms stagger (≥1024), 400 / 60 (<1024), nodes fade in order; active ● signal, experiment ◇ ink-filled (never green)                                                                              | complete immediately           |
| Reveal             | `data-reveal-item="title"` 8px / 400ms, `visual` 12px / 600ms, `meta` opacity 250ms +150ms — titles, visuals and rails only                                                                                            | visible, no transform          |
| Parallax / pointer | Retained ConceptFrame supports pointer shift ≤6px / 300ms; current home summaries and case scope lists do not mount it                                                                                                 | none                           |
| Image caption      | static figcaption below representative images, visible on touch and desktop                                                                                                                                            | same                           |
| Status pulse       | ● ring once on first reveal (border ring, no shadow)                                                                                                                                                                   | none                           |
| CTA                | arrow +4px, underline → signal, 150ms; focus offset 6px                                                                                                                                                                | color only                     |

## 6. Accessibility

- One site banner per page, main includes h1 and Overview, and a keyboard skip
  link targets main.
- Semantic headings: the hero or project name is h1; sections are h2.
- Status is never color-only: symbol plus text, and screen readers also read
  "(experiment)" / "(current)".
- Mobile menu:
  - `role="dialog"`, `aria-modal`, `aria-expanded` / `aria-controls`.
  - Background siblings are inert while open; Tab/Shift+Tab stay in the dialog.
  - ESC/close restore the menu button, same-page links focus their section, and
    resizing focuses a visible primary navigation link. Scroll unlock is
    instant.
  - Closes when a link is selected, and closes automatically at ≥744px.
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
  explanation panel stays keyboard-focusable. Emosave's state examples are
  static and do not add focus stops.
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
- Case boards retain `visualsNoteKo` and the connector explanation. Concept
  photos are not mounted in home summaries, Emosave focus cards or Smart Farm
  monitoring; remaining explanatory diagrams retain their local captions.
- The 404 page uses Korean copy, the board surface and a home return link.
- No panel is `aria-live`; the tab / pressed relationship announces changes.
- Touch targets are at least 44×44px (MENU, CLOSE, CTA, menu links 64px,
  accordion 52px, Contents links, WORK AREAS rows 60px, relation nodes 60px+,
  tabs and condition chips 44px+).
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
3. **Contact:** Email is already configured in `site.contact.email`; the CONTACT
   nav item and footer email are visible. GitHub is configured as
   `https://github.com/mooonseok` and appears in the homepage intro and every
   footer and mobile menu, labeled GitHub 프로필. The README distinguishes this
   site repository from the separate service projects.
4. **ABOUT nav:** It currently points to `#about`, which is the Tools / Scope
   section. Change it if you add a separate About section.
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
   (`--font-sans`, `--font-mono`); every face uses `font-display: swap`.

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
7. **Social sharing:** Home and case pages use their own titles and descriptions
   with the common card `public/social/portfolio.png`. Check the actual
   deployment's canonical URLs, image URLs, robots and sitemap after its public
   URL is confirmed. Build-time configuration details are in README.
8. **Metadata verification:** After the build, run `pnpm check:metadata` with
   the same `SITE_URL` / `SITE_INDEXABLE` values used for that build. The
   checker does not load `.env.local`; supply the values through the shell
   environment. Verify both default non-indexable output and public-URL fixture
   output before release; fixture URLs are not deployment destinations.
9. **CI:** `.github/workflows/verify.yml` runs for pull requests, pushes to
   `develop` / `main`, and manual dispatch. Node.js 24 and pinned pnpm run the
   six required checks plus anchors and metadata for both configurations. This
   workflow does not deploy. Local passing results and a successful GitHub
   Actions run are separate evidence; check the pushed commit's run.

## 8. QA (same checklist as Phase 4 LOCKED)

Widths: 320 · 360 · 375 · 390 · 430 · 743 · 744 · 834 · 1023 · 1024 · 1280 ·
1440

- [ ] Date ranges (2022—2026) never break
- [ ] No mobile → sequences; small flows become vertical
- [ ] No title line with only one word
- [ ] Portrait menu is a single vertical list; landscape (height ≤500) is 2
      columns
- [ ] At 743/744 and 1023/1024: nav, meta rail, board, Featured, Tools, diagrams
      and case-study layout all transition cleanly
- [ ] Accordion defaults to only the first item open
- [ ] No important content depends on hover
- [ ] No overflow or clipping
- [ ] ● PRODUCT WORK / ◇ EXPERIMENT distinction is clear
- [ ] No TO WRITE, fake contact details or unverified numbers anywhere
- [ ] Keyboard only: menu, accordion, Contents and CTAs all work; focus rings
      are visible

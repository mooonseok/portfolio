# Park Moonseok Portfolio — Handoff

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · pnpm. The
design source of truth is the Phase 1–4 **LOCKED** canvases.

```bash
pnpm install
pnpm dev --port 3100    # stop the development server before pnpm build
pnpm lint               # ESLint 9 flat config (eslint.config.mjs), 0 warnings allowed
pnpm typecheck
pnpm test               # selection, scroll position and scanner regression tests
pnpm check:anchors      # production HTML links and group IDs, after pnpm build
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
    organisms/    ScrollScene, SignalLine, ConceptFrame, ConceptArt, SiteHeader,
                  MobileMenu, SiteFooter, TechNotes, ExperimentBlock,
                  DomainExplorer (APC home + case study)
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
  ScrollScene, SignalLine, MotionLayer, DomainExplorer and the explorer section
  components: FarmFam+ `WorkAreas` / `RelationMap`, Smart Farm
  `ControlConditions`, IndianBob `HabitExplorer`, Emosave `StateExample`).
- **Styling.** Utilities in className; Preflight is off (the editorial base in
  `globals.css` replaces it); custom variants
  `mob tab-only short-land fine coarse on-dark js inview reveal-pending`;
  breakpoints `tab` 744 · `lap` 1024 · `wide` 1440; `--spacing: 4px`.

## 3. Data model (summary)

`Project` →
`slug, num, title, category, period, tier, caseLength, status[], surfaces, summary, home{scope, scopeMobile, flows, areas?, zones?, cta}, visuals{}, case{…}`

`case`:
`role, rolePhases?, roleSurfaces?, roleTracks?, stateScope?, contextProblem, systemFlows, domainsTitle?, domains?, monitoringFlow?, feature?, surfaceRelation?, controlExperiment?, work[], workParagraphs?, decisions[] (0–2), techIntro?, techNotes[] (flexible fields), relationMap?, engineeringNote?, experiment?, currentState, currentStateTracks?, interactionFocus? (withStates?), stateExample?`

`surfaceRelation` (`{ label, rows }`) is the single definition of IndianBob's
USER → MOBILE APP → API → DATA relation with the ADMIN branch. The homepage
Featured block and the case study `System / Flow` section both read it; the
homepage container only adds the per-row `sub` captions from `roleSurfaces`, and
the case study renders the same rows with `showSubs={false}`.

Every project diagram is now either static or changed only by the visitor
(click, tap, keyboard). Nothing is selected by scrolling. The explorer data:

- FarmFam+ `home.areas` (`{ id, label, sub, title, body, related[], to }`) —
  WORK AREAS: one focus per area (entry point / group-purchase consistency /
  restore + regression), each linking to its case-study anchor (`to.target`:
  `context`, `transaction-boundaries`, `regression-protection`). `home.flows` is
  `[]`.
- FarmFam+ `case.stateScope` — the static "주문이 영향을 주는 상태 · 처리 순서
  아님" list in Role / Scope that replaced the old 5-step sequence and reverse
  path.
- FarmFam+ `case.relationMap`
  (`{ id, label, title, hint, hintMobile, note, origin, targets[], check }`) —
  02 SYSTEM, right after Context / Problem. Each node carries `why` (관계의
  의미), `work` (실제 작업), optional `scope` (the only confirmed transaction
  range: active group purchase + quantity progress) and optional `note`. `check`
  is the separate "관련 변경과 테스트" block, not a node. The map `id`
  (`order-cancellation`) stays the heading id, so the old `#order-cancellation`
  link still works; no tech note reuses it.
- APC `case.domains` (`content/projects/apc-domains.ts`) — A 물류·재고 / B QR
  근태 / C 전자결재, each with static `steps`, `impl`, optional `aside`
  (fingerprint fallback) / `checks` (approval server checks) and a `note`
  target. The same data feeds the home (`EXPLORER_MODE.HOME`: title, lead,
  steps, link) and the case study (`EXPLORER_MODE.DETAIL`: adds impl list,
  aside, checks, note link). `home.flows` is `[]`.
- Smart Farm `home.zones` — MONITORING · PRODUCT WORK and CONTROL · EXPERIMENT
  as two unconnected static areas. `case.controlExperiment.conditions`
  (`content/projects/smart-farm-control.ts`) — the five safety conditions that
  used to be tech notes. Each condition keeps its old note id as the button id,
  so `#command-expiry`, `#fail-safe`, … still land on the section and select
  that condition; `#mqtt` is the MQTT caption. `zone` marks what the logic
  relates to (command receive / equipment operation / whole controller); the
  location text only claims "제어기 안전 로직", not a firmware module.
- IndianBob `case.feature` (`content/projects/indian-bob-feature.ts`) — HABIT
  areas with the related `systems` and `edges` to emphasise. Edges mean
  "connected", not call order.
- IndianBob `engineeringNote.links` / `footnote` — labels on the Apple Sign-in
  arrows; code exchange is a footnote because its location is unconfirmed.
- Emosave `case.stateExample` — DEFAULT / SELECTED / PLACED copy for the drawn
  `StateSketch` model (home: static comparison, case: state tabs next to
  Customization).

Lines in these diagrams show connection only, not execution order, parallelism
or transaction scope; each `note` / `caption` says so. No explorer claims a
sequence the content does not state.

Project flows and Stories use `FLOW_ROLE.STATIC` and read `state` from data;
scrolling does not change their selected node. Pins carry per-breakpoint
coordinates (`x/y`, `tablet`, `mobile`, `hideOnMobile`, `hideOnTablet`) because
each range crops the image differently.

Rules:

- **Empty values:** An empty string or array means the section is not rendered
  at all (`has()`). No TO WRITE text ever appears in the UI.
- **Decisions:** Empty for all five projects, so no Decisions section renders
  anywhere.
- **Periods:** Read from `content/projects` only. The homepage, case studies and
  hover meta all use the same value.
- **Contact:** `site.contact` has empty email and github, so the CONTACT nav
  item, the menu contact links and the footer contact block are all hidden.
  `200 OK` stays in the footer.

## 4. Content → UI mapping

| Data                                                       | Homepage                                               | Case study                                                              |
| ---------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------- |
| `summary`                                                  | Project description                                    | Overview lead                                                           |
| `period` · `status` · `surfaces`                           | Meta rail, hover meta bar                              | Header rail, meta list                                                  |
| `home.scope` (+`scopeMobile` list)                         | SCOPE keywords (explicit shorter list on mobile)       | FarmFam+ Role/Scope keyword row                                         |
| `home.areas`                                               | FarmFam+ WORK AREAS (tabs ≥744, accordion <744)        | —                                                                       |
| `home.zones`                                               | Smart Farm MONITORING / CONTROL areas                  | —                                                                       |
| `domains`                                                  | APC FIELD WORK tabs                                    | APC System (same data + impl, aside, checks, note link)                 |
| `stateScope` · `relationMap`                               | —                                                      | FarmFam+ Role / Scope list · 02 System relation map                     |
| `case.role` · `roleSurfaces` · `rolePhases` · `roleTracks` | —                                                      | Role / Scope (Smart Farm: Status / Scope in 2 columns)                  |
| `case.contextProblem`                                      | —                                                      | Context / Problem                                                       |
| `systemFlows` · `monitoringFlow`                           | —                                                      | System group                                                            |
| `controlExperiment` (rows + `conditions`)                  | —                                                      | Smart Farm Control Experiment (Engineering), dashed, condition selector |
| `feature`                                                  | —                                                      | IndianBob 02 System HABIT explorer                                      |
| `work` (`track`)                                           | —                                                      | What I Worked On (Smart Farm grouped ● / ◇)                             |
| `techNotes`                                                | —                                                      | Engineering group, flexible fields, no STACK block                      |
| `engineeringNote`                                          | —                                                      | IndianBob Apple Sign-in dark card                                       |
| `experiment`                                               | S03 story (homepage uses `site.stories`)               | APC OCR: static flow, NOT SHIPPED + `conclusion` once, under the title  |
| `stories[].description`                                    | Story card body, under title and flow                  | —                                                                       |
| `surfaceRelation`                                          | IndianBob Featured relation (with `roleSurfaces` subs) | IndianBob Role / Scope overview (with subs)                             |
| `currentState` · `currentStateTracks`                      | —                                                      | Current State (Smart Farm: 2 columns, stated once)                      |
| `interactionFocus` · `stateExample` · `workParagraphs`     | Emosave static state comparison                        | Emosave Interaction (state tabs beside Customization) / Work            |

Items from the content brief that were **not shown in the UI** because they are
instructions to the writer, not visitor-facing text:

- FarmFam+ "실제 운영 지표나 매출·성능 개선 수치는 표시하지 않습니다"
- APC "OCR은 … 미적용 실험으로 표시합니다"
- The "~로 표현하지 마세요" lines

Smart Farm Control's current state "실제 제품 운영 적용 여부는 확정된 사실로
표현하지 않습니다" is shown with the same meaning as **"실제 제품 운영 적용
여부는 확정되지 않았습니다."**

## 5. Motion (scroll-driven, CSS-variable based)

The five project blocks and case sections render `ScrollScene steps={false}` and
none of the new diagrams carry `[data-flow]`, so scrolling never changes a
selection or lights a node. Selections change only on click, tap or keyboard,
live in component state (no storage) and survive scrolling and breakpoint
changes. Emphasis (background, border, connector 1px → 2px) changes in 150ms;
the new panel text fades in over 150ms (`fade-in` keyframes, `motion-safe`
only). The OCR flow and the Smart Farm monitoring flow are `FLOW_ROLE.STATIC`
(first-reveal line draw only). Stories S01–S03 keep their original flows.

Sections emit data attributes; the client organisms drive them. No React state
changes per scroll frame: IntersectionObserver gates each rAF loop, values are
written as CSS variables / attributes.

| Element            | Behavior                                                                                                                                                                                                                                                                                           | Reduced motion                    |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `ScrollScene`      | `data-ready` after hydration, `data-inview` once (30% of min(height, viewport)); optional step mode moves `data-active` along `[data-flow="primary"] [data-step]`; secondary flows follow later with ink emphasis only; pins `[data-node]` and `[data-link]` light with the node of the same label | first node active, no stepping    |
| Flow diagram       | segments draw 600ms / 80ms stagger (≥1024), 400 / 60 (<1024), nodes fade in order; active ● signal, experiment ◇ ink-filled (never green)                                                                                                                                                          | complete immediately              |
| Signal line        | 1px graphite; passed part ink (paper over dark); one 9px marker per `[data-signal-anchor]` — current = signal, inside dark = ON DARK, else open; Tools branches `[data-passed]` (≥744); ends at the footer's `● 200 OK` (`[data-signal-end]`)                                                      | fully drawn, markers still switch |
| Reveal             | `data-reveal-item="title"` 8px / 400ms, `visual` 12px / 600ms, `meta` opacity 250ms +150ms — titles, visuals and rails only                                                                                                                                                                        | visible, no transform             |
| Parallax / pointer | `ConceptFrame parallax` FarmFam 10 · APC 20 · Smart Farm 10 · others 12; pointer shift ≤6px / 300ms; only fine pointer ≥1024                                                                                                                                                                       | none                              |
| Hover meta         | period · surfaces bar, 200ms, fine pointer only                                                                                                                                                                                                                                                    | same                              |
| Status pulse       | ● ring once on first reveal (border ring, no shadow)                                                                                                                                                                                                                                               | none                              |
| CTA                | arrow +4px, underline → signal, 150ms; focus offset 6px                                                                                                                                                                                                                                            | color only                        |

## 6. Accessibility

- One site banner per page, main includes h1 and Overview, and a keyboard skip
  link targets main. Desktop Experience items include their year for screen
  readers.
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
- Accordion (<744):
  - `h3 > button[aria-expanded][aria-controls]`, rows are 52px.
  - First note open by default; several can be open at once.
  - Opens the matching note when the URL hash points to it.
- FarmFam+ WORK AREAS:
  - ≥744: `tablist` / `tab` / `tabpanel` with roving tabindex, ←/→ (wrapping),
    Home/End and automatic activation. Panels are stacked in one grid cell, so
    the block does not change height between areas.
  - <744: `h4 > button[aria-expanded][aria-controls]` + `role="region"`. One
    item at most is open; tapping the open item closes it. The tapped title
    keeps its screen position when the item above collapses.
  - Both structures share one choice (`useChoiceGroup`): when every item is
    closed the tabs show the last valid choice (order if none). The hidden copy
    is `display: none`; if focus was inside when the breakpoint flips, it moves
    to the matching visible control without scrolling.
- FarmFam+ relation map: ≥744 bordered `button[aria-pressed][aria-controls]`
  nodes in a `role="group"` plus one panel; <744 a tree of
  `button[aria-expanded]` with the explanation directly under the tapped node.
  Connectors are `aria-hidden`; the panel text carries the same relation.
- APC domains, IndianBob HABIT, Emosave states: `tablist` / `tab` / `tabpanel`
  (`useTabKeys`). APC and Emosave are horizontal (←/→). IndianBob is vertical at
  ≥1024 (`aria-orientation="vertical"`, ↑/↓) and a 2×2 grid below (←/→ move in
  reading order, ↑/↓ move by row). Home/End everywhere.
- Smart Farm conditions: `button[aria-pressed]` chips; the drawing is
  `aria-hidden` and the panel states "▲ 설명 위치 · …" in text.
- Contents derives its current group from document positions on scroll, resize,
  hash changes and history restoration. The mobile disclosure closes on outside
  pointer input, Escape, or when its static list returns into view.
- Reveal hiding is enabled per mounted scene, so failed hydration keeps server
  content visible; print always shows reveal items and diagram lines.
- The Korean conceptual-visual notice appears below every case hero.
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
   render the drawn SVG concept illustrations in `organisms/concept-art` — those
   two are finished illustrations, not empty placeholders. The `brief` string is
   a development-only caption and never renders in a production build.
2. **Pin positions:** Adjust `pins[].x/y` in `content/projects/<slug>.ts` for
   each image.
3. **Contact:** Fill in `site.contact.email` / `github`. The CONTACT nav item
   and the footer contact block then appear automatically.
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

## 8. QA (same checklist as Phase 4 LOCKED)

Widths: 320 · 360 · 375 · 390 · 430 · 743 · 744 · 834 · 1023 · 1024 · 1280 ·
1440

- [ ] Date ranges (2022—2026) never break
- [ ] No mobile → sequences; small flows become vertical
- [ ] No title line with only one word
- [ ] Portrait menu is a single vertical list; landscape (height ≤500) is 2
      columns
- [ ] At 743/744 and 1023/1024: nav, meta rail, Featured, Experience, Tools,
      diagrams and case-study layout all transition cleanly
- [ ] Accordion defaults to only the first item open
- [ ] No important content depends on hover
- [ ] No overflow or clipping
- [ ] ● PRODUCT WORK / ◇ EXPERIMENT distinction is clear
- [ ] No TO WRITE, fake contact details or unverified numbers anywhere
- [ ] Keyboard only: menu, accordion, Contents and CTAs all work; focus rings
      are visible

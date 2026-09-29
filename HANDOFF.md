# Park Moonseok Portfolio — Handoff

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · pnpm. The
design source of truth is the Phase 1–4 **LOCKED** canvases.

```bash
pnpm install
pnpm dev                # http://localhost:3000
pnpm typecheck
pnpm check:boundaries   # architecture rules (see §2)
pnpm format             # Prettier + Tailwind class sorting
pnpm build
```

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
                  Anchor NavLink Button LineBreak) + Cta, StatusLabel, NotShipped
    molecules/    FlowDiagram, ProjectHeader, SectionHeading, ScopeList, StateTokens,
                  SurfaceRelation, FieldRows (presentational only)
    organisms/    ScrollScene, SignalLine, ConceptFrame, ConceptArt, SiteHeader,
                  MobileMenu, SiteFooter, TechNotes, ExperimentBlock
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
- **Raw tags, literals, comments, length.** Checked per file; exceptions go in
  `scripts/boundaries/config.mjs` (`LINE_ALLOW`), currently none.
- **Server components by default.** `'use client'` only on containers that own
  browser state (MobileMenu, SiteHeaderNav, TechNotes, CaseContents,
  ScrollScene, SignalLine, MotionLayer).
- **Styling.** Utilities in className; Preflight is off (the editorial base in
  `globals.css` replaces it); custom variants
  `mob tab-only short-land fine coarse on-dark js inview reveal-pending`;
  breakpoints `tab` 744 · `lap` 1024 · `wide` 1440; `--spacing: 4px`.

## 3. Data model (summary)

`Project` →
`slug, num, title, category, period, tier, caseLength, status[], surfaces, summary, home{scope, scopeMobile, flows, cta}, visuals{}, case{…}`

`case`:
`role, rolePhases?, roleSurfaces?, roleTracks?, contextProblem, systemFlows, reverseFlow?, monitoringFlow?, featureFlow?, controlExperiment?, work[], workParagraphs?, decisions[] (0–2), techIntro?, techNotes[] (flexible fields), engineeringNote?, experiment?, currentState, currentStateTracks?, interactionFocus?, stateFlow?, stateFlowNote?`

Flow nodes carry no `active` state (the active node follows scroll); only
`FLOW_ROLE.STATIC` diagrams such as Stories S01 read `state` from data. Pins
carry per-breakpoint coordinates (`x/y`, `tablet`, `mobile`, `hideOnMobile`,
`hideOnTablet`) because each range crops the image differently.

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

| Data                                                                 | Homepage                                                | Case study                                                                   |
| -------------------------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `summary`                                                            | Project description                                     | Overview lead                                                                |
| `period` · `status` · `surfaces`                                     | Meta rail, hover meta bar                               | Header rail, meta list                                                       |
| `home.scope` (+`scopeMobile` list)                                   | SCOPE keywords (explicit shorter list on mobile)        | FarmFam+ Role/Scope keyword row                                              |
| `home.flows`                                                         | FarmFam+ 5 steps (3 on mobile) / APC A·B·C / Smart Farm | APC System reuses the same data                                              |
| `case.role` · `roleSurfaces` · `rolePhases` · `roleTracks`           | —                                                       | Role / Scope (Smart Farm: Status / Scope in 2 columns)                       |
| `case.contextProblem`                                                | —                                                       | Context / Problem                                                            |
| `systemFlows` · `reverseFlow` · `monitoringFlow` · `featureFlow`     | —                                                       | System group                                                                 |
| `controlExperiment` (WHY · PROTOTYPE · FINDING)                      | —                                                       | Smart Farm Control Experiment, dashed                                        |
| `work` (`track`)                                                     | —                                                       | What I Worked On (Smart Farm grouped ● / ◇)                                  |
| `techNotes`                                                          | —                                                       | Engineering group, flexible fields, no STACK block                           |
| `engineeringNote`                                                    | —                                                       | IndianBob Apple Sign-in dark card                                            |
| `experiment`                                                         | S03 story (homepage uses `site.stories`)                | APC OCR: flow ends at DECISION, NOT SHIPPED appears once in the DECISION row |
| `currentState` · `currentStateTracks`                                | —                                                       | Current State (Smart Farm: 2 columns, stated once)                           |
| `interactionFocus` · `stateFlow` · `workParagraphs` · `currentState` | Emosave state tokens                                    | Emosave Interaction / Work / Current State                                   |

Items from the content brief that were **not shown in the UI** because they are
instructions to the writer, not visitor-facing text:

- FarmFam+ "실제 운영 지표나 매출·성능 개선 수치는 표시하지 않습니다"
- APC "OCR은 … 미적용 실험으로 표시합니다"
- The "~로 표현하지 마세요" lines

Smart Farm Control's current state "실제 제품 운영 적용 여부는 확정된 사실로
표현하지 않습니다" is shown with the same meaning as **"실제 제품 운영 적용
여부는 확정되지 않았습니다."**

## 5. Motion (scroll-driven, CSS-variable based)

Sections emit data attributes; the client organisms drive them. No React state
changes per scroll frame: IntersectionObserver gates each rAF loop, values are
written as CSS variables / attributes.

| Element            | Behavior                                                                                                                                                                                                                                                                          | Reduced motion                    |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `ScrollScene`      | `data-inview` once (30% of min(height, viewport)), `--progress`, `--active-index`; moves `data-active` along `[data-flow="primary"] [data-step]`; secondary flows follow later with ink emphasis only; pins `[data-node]` and `[data-link]` light with the node of the same label | first node active, no stepping    |
| Flow diagram       | segments draw 600ms / 80ms stagger (≥1024), 400 / 60 (<1024), nodes fade in order; active ● signal, experiment ◇ ink-filled (never green)                                                                                                                                         | complete immediately              |
| Signal line        | 1px graphite; passed part ink (paper over dark); one 9px marker per `[data-signal-anchor]` — current = signal, inside dark = ON DARK, else open; Tools branches `[data-passed]` (≥744); ends at the footer's `● 200 OK` (`[data-signal-end]`)                                     | fully drawn, markers still switch |
| Reveal             | `data-reveal-item="title"` 8px / 400ms, `visual` 12px / 600ms, `meta` opacity 250ms +150ms — titles, visuals and rails only                                                                                                                                                       | visible, no transform             |
| Parallax / pointer | `ConceptFrame parallax` FarmFam 10 · APC 20 · Smart Farm 10 · others 12; pointer shift ≤6px / 300ms; only fine pointer ≥1024                                                                                                                                                      | none                              |
| Hover meta         | period · surfaces bar, 200ms, fine pointer only                                                                                                                                                                                                                                   | same                              |
| Status pulse       | ● ring once on first reveal (border ring, no shadow)                                                                                                                                                                                                                              | none                              |
| CTA                | arrow +4px, underline → signal, 150ms; focus offset 6px                                                                                                                                                                                                                           | color only                        |

## 6. Accessibility

- Semantic headings: the hero or project name is h1; sections are h2.
- Status is never color-only: symbol plus text, and screen readers also read
  "(experiment)" / "(current)".
- Mobile menu:
  - `role="dialog"`, `aria-modal`, `aria-expanded` / `aria-controls`.
  - Focus trap, ESC to close, body scroll lock that preserves scroll position.
  - Closes when a link is selected, and closes automatically at ≥744px.
- Accordion (<744):
  - `h3 > button[aria-expanded][aria-controls]`, rows are 52px.
  - First note open by default; several can be open at once.
  - Opens the matching note when the URL hash points to it.
- Touch targets are at least 44×44px (MENU, CLOSE, CTA, menu links 64px,
  accordion 52px, Contents links).
- Safe areas are handled with `env(safe-area-inset-*)` and `svh`. There is no
  `100vh`.

## 7. Before launch

1. **Images:** Drop conceptual images into `public/visuals/…` and set `src` (and
   `srcMobile` for mobile crops) on the matching entry in `visuals` in
   `content/projects/<slug>.ts`. Without `src`, the project's conceptual
   fallback (`organisms/concept-art`) renders; the brief text only shows in
   development.
2. **Pin positions:** Adjust `pins[].x/y` in `content/projects/<slug>.ts` for
   each image.
3. **Contact:** Fill in `site.contact.email` / `github`. The CONTACT nav item
   and the footer contact block then appear automatically.
4. **ABOUT nav:** It currently points to `#about`, which is the Tools / Scope
   section. Change it if you add a separate About section.
5. **Fonts:** No font files ship with the repo. General Sans (Fontshare) and
   Pretendard (jsDelivr) load from CDNs, IBM Plex Mono via `next/font`. Fallback
   stacks are in the `@theme` block of `styles/globals.css`. To self-host, add
   the files and switch to `next/font/local`.

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

# Park Moonseok — Portfolio

Personal portfolio site for a software engineer: a home page with five projects
and one case study page per project. Static, content-driven, no CMS and no
backend — every string, flow diagram and image reference lives in `src/content`.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · pnpm.

Design and content decisions, the data model and the QA checklist are in
[HANDOFF.md](HANDOFF.md).

## Requirements

- Node.js 20 or newer
- pnpm (the repo pins `packageManager: pnpm@10.27.0`; use `corepack enable`)
- Network access for `pnpm install`. `pnpm build` needs none: General Sans,
  Pretendard and IBM Plex Mono are all self-hosted from `public/fonts` (see
  [public/fonts/README.md](public/fonts/README.md)).

## Commands

```bash
pnpm install
pnpm dev                # dev server on http://localhost:3000
pnpm build              # production build
pnpm start              # serve the production build

pnpm lint               # ESLint 9 flat config, fails on any warning
pnpm typecheck          # tsc --noEmit
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
  real product; it does not claim a public launch. Smart Farm MONITORING stays
  PRODUCT WORK and CONTROL stays EXPERIMENT; the APC OCR work stays EXPERIMENT /
  NOT SHIPPED.

`site.contact.email` and `site.contact.github` are both intentionally empty, so
the CONTACT nav item, the menu contact block and the footer contact block do not
render. Filling in either one is enough to make all three appear; each link then
renders only if its own value is set.

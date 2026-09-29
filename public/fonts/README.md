# Self-hosted fonts

Every typeface used by the site is served from this folder. No font is fetched
from a third-party CDN at runtime, and the production build needs no network
access for fonts.

| Family                   | Files                                                               | Source                                                                          | License                                                             |
| ------------------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| General Sans 400/500/600 | `general-sans/*.woff2`                                              | Fontshare (Indian Type Foundry), <https://www.fontshare.com/fonts/general-sans> | ITF Free Font License, <https://www.fontshare.com/licenses/itf-ffl> |
| Pretendard Variable      | `pretendard/PretendardVariable.subset.*.woff2` (92 dynamic subsets) | orioncactus/pretendard v1.3.9 via jsDelivr                                      | SIL OFL 1.1 — `pretendard/OFL.txt`                                  |
| IBM Plex Mono 400        | `ibm-plex-mono/*-latin.woff2` (latin subset)                        | Google Fonts distribution of IBM Plex Mono v20                                  | SIL OFL 1.1 — `ibm-plex-mono/OFL.txt`                               |

How they are wired:

- `src/styles/fonts.css` declares the General Sans and Pretendard `@font-face`
  rules and is imported by `src/styles/globals.css`. Pretendard keeps the
  upstream dynamic-subset split with its `unicode-range` values, so a page only
  downloads the Korean subsets it actually renders — the full family is never
  preloaded.
- IBM Plex Mono is loaded through `next/font/local` in `src/app/layout.tsx`,
  which fingerprints the file, emits the `--font-plex` variable and preloads it.
  Only weight 400 ships: no `.mono` element on any page resolves to a heavier
  weight, so a second file would be preloaded and never used. The latin subset
  is the same one `next/font/google` produced before, so glyph coverage is
  unchanged.
- `GeneralSans-Medium.woff2` is preloaded from the document head because the
  hero and every project title use it.
- All faces use `font-display: swap`; the fallback stacks live in the `@theme`
  block of `src/styles/globals.css`.

To update a family, replace the files here and adjust `src/styles/fonts.css` (or
the `localFont` call) to match.

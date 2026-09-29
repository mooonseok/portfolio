export const TAG = {
  DIV: 'div',
  SPAN: 'span',
  P: 'p',
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  UL: 'ul',
  OL: 'ol',
  LI: 'li',
  DL: 'dl',
  DT: 'dt',
  DD: 'dd',
  SECTION: 'section',
  ARTICLE: 'article',
  NAV: 'nav',
  HEADER: 'header',
  FOOTER: 'footer',
  MAIN: 'main',
  ASIDE: 'aside',
  FIGURE: 'figure',
  FIGCAPTION: 'figcaption',
  DETAILS: 'details',
  SUMMARY: 'summary',
  PICTURE: 'picture',
  SOURCE: 'source',
  A: 'a',
  BUTTON: 'button',
  BR: 'br',
} as const;

export type Tag = (typeof TAG)[keyof typeof TAG];

export type BoxTag =
  | typeof TAG.DIV
  | typeof TAG.SPAN
  | typeof TAG.SECTION
  | typeof TAG.ARTICLE
  | typeof TAG.NAV
  | typeof TAG.HEADER
  | typeof TAG.FOOTER
  | typeof TAG.MAIN
  | typeof TAG.ASIDE
  | typeof TAG.FIGURE
  | typeof TAG.FIGCAPTION
  | typeof TAG.DETAILS
  | typeof TAG.SUMMARY
  | typeof TAG.PICTURE
  | typeof TAG.SOURCE
  | typeof TAG.UL
  | typeof TAG.OL
  | typeof TAG.LI
  | typeof TAG.DL
  | typeof TAG.DT
  | typeof TAG.DD
  | typeof TAG.P;

export type TextTag =
  | typeof TAG.P
  | typeof TAG.SPAN
  | typeof TAG.DT
  | typeof TAG.DD
  | typeof TAG.FIGCAPTION
  | typeof TAG.SUMMARY;

export const HEADING = {
  H1: TAG.H1,
  H2: TAG.H2,
  H3: TAG.H3,
  H4: TAG.H4,
} as const;

export type HeadingLevel = (typeof HEADING)[keyof typeof HEADING];

export const LIST_TAG = {
  UL: TAG.UL,
  OL: TAG.OL,
} as const;

export type ListTag = (typeof LIST_TAG)[keyof typeof LIST_TAG];

export const BUTTON_TYPE = {
  BUTTON: 'button',
  SUBMIT: 'submit',
  RESET: 'reset',
} as const;

export type ButtonType = (typeof BUTTON_TYPE)[keyof typeof BUTTON_TYPE];

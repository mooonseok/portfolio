export const LAYERS = ['atoms', 'molecules', 'organisms', 'templates'];

export const BASE = ['content', 'dto', 'constants', 'lib', 'hooks', 'styles'];

export const UI = ['components', 'sections', 'app'];

export const ONLY_FROM = {
  constants: ['constants'],
  dto: ['dto', 'constants'],
};

export const PRESENTATIONAL_DIRS = [
  ['components', 'atoms'],
  ['components', 'molecules'],
];

export const PRESENTATIONAL_FILE = /-view\.tsx$/;

export const DATA_IMPORTS = [
  /^content(\/|$)/,
  /^lib\/content$/,
  /^lib\/navigation$/,
  /^hooks(\/|$)/,
];

export const HOOK_CALL = /\buse[A-Z]\w*\s*\(/g;

export const RAW_TAGS = new Set([
  'div',
  'span',
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'ul',
  'ol',
  'li',
  'dl',
  'dt',
  'dd',
  'section',
  'article',
  'nav',
  'header',
  'footer',
  'main',
  'aside',
  'figure',
  'figcaption',
  'a',
  'button',
  'br',
  'hr',
  'details',
  'summary',
  'picture',
  'source',
  'img',
  'strong',
  'em',
  'small',
  'b',
  'i',
  'label',
  'input',
  'form',
  'table',
  'thead',
  'tbody',
  'tr',
  'th',
  'td',
]);

export const RAW_ALLOWED = [['components', 'atoms']];

export const SVG_ONLY = [['components', 'organisms', 'concept-art']];

export const LINK_ALLOWED = [['components', 'atoms']];

export const ENUM_PROPS = new Set([
  'as',
  'size',
  'orient',
  'tone',
  'kind',
  'level',
  'variant',
  'depth',
  'layout',
  'space',
  'rule',
  'titleSize',
  'category',
  'cols',
  'railFrom',
  'labelFrom',
  'fs',
  'sizes',
  'surfaceLabel',
  'current',
  'state',
  'track',
]);

export const PROP_OWNER = {
  role: ['FlowDiagram'],
  cols: ['TechNotes'],
};

export const NUMERIC_ENUM_PROPS = new Set(['depth', 'space', 'cols']);

export const ENUM_KEYS =
  'kind|state|track|tier|caseLength|variant|orient|tone|size|layout|rule|slug|labelFrom|railFrom';

export const COMPARE = new RegExp(
  `(?:\\.|\\b)(?:${ENUM_KEYS})\\s*[!=]==?\\s*['"\`]`,
  'g'
);

export const OBJECT_KEY = new RegExp(
  `\\b(?:${ENUM_KEYS})\\??\\s*:\\s*['"\`]`,
  'g'
);

export const LITERAL_CALL =
  /\b(?:requireProject|getProject|getNext|groupTags|g|trackCol|matchMedia|useMediaQuery)\(\s*['"`]/g;

export const LITERAL_EXEMPT = [['constants']];

export const MAX_LINES = 200;

// fonts.css is a generated @font-face manifest: 3 General Sans faces plus the
// 92 Pretendard dynamic subsets, each with its upstream unicode-range.
export const LINE_ALLOW = new Set(['src/styles/fonts.css']);

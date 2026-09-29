export const RULE = {
  INK: 'ink',
  HAIRLINE: 'hairline',
  DASHED: 'dashed',
  DARK: 'dark',
  NONE: 'none',
  MOBILE: 'mobile',
} as const;

export type Rule = (typeof RULE)[keyof typeof RULE];

export type CaseRule = Exclude<Rule, typeof RULE.MOBILE>;

export type HeadingRule = boolean | typeof RULE.MOBILE;

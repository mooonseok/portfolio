export const SIZE = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;

export type Size = (typeof SIZE)[keyof typeof SIZE];

export type FlowSize = typeof SIZE.MD | typeof SIZE.SM;


export type CaseTitleSize = Size;

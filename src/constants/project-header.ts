export const CATEGORY_PLACEMENT = {
  BELOW: 'below',
  INLINE: 'inline',
} as const;

export type CategoryPlacement =
  (typeof CATEGORY_PLACEMENT)[keyof typeof CATEGORY_PLACEMENT];

export const TITLE_FS = {
  CASE: '--fs-case-title',
  APC: '--fs-apc',
  FARM: '--fs-farm',
} as const;

export type TitleFs = (typeof TITLE_FS)[keyof typeof TITLE_FS];

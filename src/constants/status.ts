export const STATUS_KIND = {
  PRODUCT: 'product',
  EXPERIMENT: 'experiment',
} as const;

export type StatusKind = (typeof STATUS_KIND)[keyof typeof STATUS_KIND];

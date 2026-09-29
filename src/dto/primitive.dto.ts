import type { ComponentPropsWithRef, ElementType } from 'react';
import type { BoxTag, TAG } from '@/constants/tag';

export type PolymorphicProps<T extends ElementType, P = object> = P & {
  as?: T;
} & Omit<ComponentPropsWithRef<T>, keyof P | 'as'>;

export type LayoutProps<T extends BoxTag = typeof TAG.DIV> = PolymorphicProps<
  T,
  { className?: string }
>;

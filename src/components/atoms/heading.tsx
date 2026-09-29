import type { ComponentPropsWithRef } from 'react';
import type { HeadingLevel, TAG } from '@/constants/tag';

export type HeadingProps = { level: HeadingLevel } & ComponentPropsWithRef<
  typeof TAG.H2
>;

export function Heading({ level: Tag, ...rest }: HeadingProps) {
  return <Tag {...rest} />;
}

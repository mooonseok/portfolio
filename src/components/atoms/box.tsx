import type { ComponentType } from 'react';
import { TAG, type BoxTag } from '@/constants/tag';
import type { PolymorphicProps } from '@/dto/primitive.dto';

export type BoxProps<T extends BoxTag = typeof TAG.DIV> = PolymorphicProps<T>;

export function Box<T extends BoxTag = typeof TAG.DIV>({
  as,
  ...rest
}: BoxProps<T>) {
  const Tag = (as ?? TAG.DIV) as unknown as ComponentType<
    Record<string, unknown>
  >;
  return <Tag {...rest} />;
}

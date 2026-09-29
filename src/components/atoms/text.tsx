import type { ComponentType } from 'react';
import { TAG, type TextTag } from '@/constants/tag';
import type { PolymorphicProps } from '@/dto/primitive.dto';

export type TextProps<T extends TextTag = typeof TAG.P> = PolymorphicProps<T>;

export function Text<T extends TextTag = typeof TAG.P>({
  as,
  ...rest
}: TextProps<T>) {
  const Tag = (as ?? TAG.P) as unknown as ComponentType<
    Record<string, unknown>
  >;
  return <Tag {...rest} />;
}

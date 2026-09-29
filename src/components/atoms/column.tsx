import type { ComponentType } from 'react';
import { TAG, type BoxTag } from '@/constants/tag';
import { cx } from '@/lib/cx';
import type { LayoutProps } from '@/dto/primitive.dto';

export function Column<T extends BoxTag = typeof TAG.DIV>({
  as,
  className,
  ...rest
}: LayoutProps<T>) {
  const Tag = (as ?? TAG.DIV) as unknown as ComponentType<
    Record<string, unknown>
  >;
  return <Tag className={cx('flex flex-col', className)} {...rest} />;
}

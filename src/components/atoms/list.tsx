import type { ComponentPropsWithRef, ComponentType } from 'react';
import { LIST_TAG, type ListTag, type TAG } from '@/constants/tag';
import type { PolymorphicProps } from '@/dto/primitive.dto';

export type ListProps<T extends ListTag = typeof LIST_TAG.UL> =
  PolymorphicProps<T>;

export function List<T extends ListTag = typeof LIST_TAG.UL>({
  as,
  ...rest
}: ListProps<T>) {
  const Tag = (as ?? LIST_TAG.UL) as unknown as ComponentType<
    Record<string, unknown>
  >;
  return <Tag {...rest} />;
}

export type ListItemProps = ComponentPropsWithRef<typeof TAG.LI>;

export function ListItem(props: ListItemProps) {
  return <li {...props} />;
}

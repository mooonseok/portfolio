import type { ComponentPropsWithRef } from 'react';
import type { TAG } from '@/constants/tag';

export type AnchorProps = ComponentPropsWithRef<typeof TAG.A> & {
  href: string;
};

export function Anchor(props: AnchorProps) {
  return <a {...props} />;
}

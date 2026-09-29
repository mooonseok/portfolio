import type { ComponentPropsWithRef } from 'react';
import type { TAG } from '@/constants/tag';

export type LineBreakProps = ComponentPropsWithRef<typeof TAG.BR>;

export function LineBreak(props: LineBreakProps) {
  return <br {...props} />;
}

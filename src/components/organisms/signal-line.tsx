'use client';

import { SignalLineView } from './signal-line-view';
import { useSignalLine } from '@/hooks/use-signal-line';

export function SignalLine() {
  const { root, line, markers } = useSignalLine();
  return <SignalLineView rootRef={root} lineRef={line} markers={markers} />;
}

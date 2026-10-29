'use client';

import type { OpenerCopy } from '@/dto/activity-copy.dto';
import { useOpener } from '@/hooks/use-opener';
import { OpenerView } from './opener-view';

export function Opener({ copy }: { copy: OpenerCopy }) {
  const opener = useOpener();
  return <OpenerView copy={copy} {...opener} />;
}

'use client';

import { useAnchorTarget } from '@/hooks/use-anchor-target';
import { useSelection } from '@/hooks/use-selection';

export function useHashSelection(ids: readonly string[]) {
  const { selected, select } = useSelection(ids);
  useAnchorTarget(ids, select);
  return { selected, select };
}

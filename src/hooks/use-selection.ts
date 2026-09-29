'use client';

import { useState } from 'react';
import { pickValid } from '@/lib/selection';

export function useSelection(ids: readonly string[]) {
  const [picked, setPicked] = useState<string | undefined>(undefined);
  return { selected: pickValid(ids, picked), select: setPicked };
}

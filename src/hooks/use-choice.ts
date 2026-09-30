'use client';

import { useState } from 'react';
import {
  type Choice,
  initialChoice,
  openChoice,
  pickChoice,
  shownChoice,
  toggleChoice,
} from '@/lib/selection';

export function useChoice(ids: readonly string[]) {
  const [choice, setChoice] = useState<Choice>(() => initialChoice(ids));
  return {
    shown: shownChoice(ids, choice),
    open: openChoice(ids, choice),
    pick: (id: string) => setChoice((c) => pickChoice(ids, c, id)),
    toggle: (id: string) => setChoice((c) => toggleChoice(ids, c, id)),
  };
}

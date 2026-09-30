'use client';

import { type KeyboardEvent, useRef } from 'react';
import { SELECT_KEY } from '@/constants/aria';
import { moveBy } from '@/lib/selection';

const MOVES: Record<string, [number, number]> = {
  [SELECT_KEY.NEXT]: [1, 0],
  [SELECT_KEY.PREV]: [-1, 0],
  [SELECT_KEY.DOWN]: [0, 1],
  [SELECT_KEY.UP]: [0, -1],
};

export const keyStep = (
  ids: readonly string[],
  current: string | undefined,
  key: string,
  cols: number
) => {
  if (key === SELECT_KEY.FIRST) return ids[0];
  if (key === SELECT_KEY.LAST) return ids[ids.length - 1];
  const move = MOVES[key];
  return move ? moveBy(ids, current, move[0], move[1], cols) : undefined;
};

export function useTabKeys(
  ids: readonly string[],
  current: string | undefined,
  select: (id: string) => void,
  cols: number = ids.length
) {
  const refs = useRef(new Map<string, HTMLButtonElement>());

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const next = keyStep(ids, current, e.key, cols);
    if (!next) return;
    e.preventDefault();
    select(next);
    refs.current.get(next)?.focus();
  };

  const tabRef = (id: string) => (el: HTMLButtonElement | null) => {
    if (el) refs.current.set(id, el);
    else refs.current.delete(id);
  };

  return { onKeyDown, tabRef, refs };
}

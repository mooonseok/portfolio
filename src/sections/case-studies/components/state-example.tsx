'use client';

import { StateExampleView } from './state-example-view';
import type { StateExample as StateExampleContent } from '@/dto/state-example.dto';
import { useSelection } from '@/hooks/use-selection';
import { useTabKeys } from '@/hooks/use-tabs';

export function StateExample({ example }: { example: StateExampleContent }) {
  const ids = example.states.map((s) => s.id);
  const { selected, select } = useSelection(ids);
  const { onKeyDown, tabRef } = useTabKeys(ids, selected, select);
  const current = example.states.find((s) => s.id === selected);
  if (!current) return null;
  return (
    <StateExampleView
      example={example}
      current={current}
      onSelect={select}
      onKeyDown={onKeyDown}
      tabRef={tabRef}
    />
  );
}

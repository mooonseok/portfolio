'use client';

import { HabitExplorerView } from './habit-explorer-view';
import type { Feature } from '@/dto/feature.dto';
import { ORIENTATION } from '@/constants/aria';
import { useSelection } from '@/hooks/use-selection';
import { useTabKeys } from '@/hooks/use-tabs';

export function HabitExplorer({
  feature,
  labelId,
}: {
  feature: Feature;
  labelId: string;
}) {
  const ids = feature.steps.map((s) => s.id);
  const { selected, select } = useSelection(ids);
  const { onKeyDown, tabRef } = useTabKeys(ids, selected, select, 1);
  const current = feature.steps.find((s) => s.id === selected);
  if (!current) return null;
  return (
    <HabitExplorerView
      feature={feature}
      labelId={labelId}
      current={current}
      orientation={ORIENTATION.VERTICAL}
      onSelect={select}
      onKeyDown={onKeyDown}
      tabRef={tabRef}
    />
  );
}

'use client';

import { HabitExplorerView } from './habit-explorer-view';
import type { Feature } from '@/dto/feature.dto';
import { MEDIA } from '@/constants/breakpoint';
import { ORIENTATION } from '@/constants/aria';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useSelection } from '@/hooks/use-selection';
import { useTabKeys } from '@/hooks/use-tabs';

const GRID_COLS = 2;

export function HabitExplorer({
  feature,
  labelId,
}: {
  feature: Feature;
  labelId: string;
}) {
  const ids = feature.steps.map((s) => s.id);
  const { selected, select } = useSelection(ids);
  const vertical = useMediaQuery(MEDIA.DESKTOP_UP);
  const { onKeyDown, tabRef } = useTabKeys(
    ids,
    selected,
    select,
    vertical ? 1 : GRID_COLS
  );
  const current = feature.steps.find((s) => s.id === selected);
  if (!current) return null;
  return (
    <HabitExplorerView
      feature={feature}
      labelId={labelId}
      current={current}
      orientation={vertical ? ORIENTATION.VERTICAL : undefined}
      onSelect={select}
      onKeyDown={onKeyDown}
      tabRef={tabRef}
    />
  );
}

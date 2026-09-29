'use client';

import { WorkAreaListView } from './work-area-list-view';
import { WorkAreaTabsView } from './work-area-tabs-view';
import { Box } from '@/components/atoms/box';
import type { WorkAreasProps } from '@/dto/explorer.dto';
import { useWorkAreas } from '@/hooks/use-work-areas';

export function WorkAreas({ labelId, items }: WorkAreasProps) {
  const { rootRef, selected, ...rest } = useWorkAreas(items.map((a) => a.id));
  if (!selected) return null;
  const view = { labelId, items, selected, ...rest };
  return (
    <Box ref={rootRef}>
      <WorkAreaTabsView {...view} />
      <WorkAreaListView {...view} />
    </Box>
  );
}

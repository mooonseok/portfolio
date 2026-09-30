'use client';

import { DomainExplorerView } from './domain-explorer-view';
import type { DomainExplorerProps } from '@/dto/domain.dto';
import { useSelection } from '@/hooks/use-selection';
import { useTabKeys } from '@/hooks/use-tabs';

export function DomainExplorer(props: DomainExplorerProps) {
  const ids = props.items.map((d) => d.id);
  const { selected, select } = useSelection(ids);
  const { onKeyDown, tabRef } = useTabKeys(ids, selected, select);
  if (!selected) return null;
  return (
    <DomainExplorerView
      {...props}
      selected={selected}
      onSelect={select}
      onKeyDown={onKeyDown}
      tabRef={tabRef}
    />
  );
}

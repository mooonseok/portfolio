'use client';

import { RelationMapView } from './relation-map-view';
import type { RelationMapProps } from '@/dto/explorer.dto';
import { useChoiceGroup } from '@/hooks/use-choice-group';

export function RelationMap(props: RelationMapProps) {
  const { selected, open, onSelect, onToggle, tabRef, toggleRef, rootRef } =
    useChoiceGroup([props.origin.id, ...props.targets.map((t) => t.id)]);
  if (!selected) return null;
  return (
    <RelationMapView
      {...props}
      rootRef={rootRef}
      selected={selected}
      open={open}
      onSelect={onSelect}
      onToggle={onToggle}
      buttonRef={tabRef}
      toggleRef={toggleRef}
    />
  );
}

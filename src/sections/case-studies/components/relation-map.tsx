'use client';

import { RelationMapView } from './relation-map-view';
import type { RelationMapProps } from '@/dto/explorer.dto';
import { useSelection } from '@/hooks/use-selection';

export function RelationMap(props: RelationMapProps) {
  const { selected, select } = useSelection([
    props.origin.id,
    ...props.targets.map((t) => t.id),
  ]);
  if (!selected) return null;
  return <RelationMapView {...props} selected={selected} onSelect={select} />;
}

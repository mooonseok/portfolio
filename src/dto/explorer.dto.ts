import type { KeyboardEvent } from 'react';

export interface WorkArea {
  id: string;
  label: string;
  sub: string;
  title: string;
  body: string;
  related: string[];
}

export interface RelationNode {
  id: string;
  label: string;
  sub: string;
  title: string;
  body: string[];
}

export interface RelationMap {
  id: string;
  label: string;
  title: string;
  note: string;
  origin: RelationNode;
  targets: RelationNode[];
}

export interface WorkAreaItem extends WorkArea {
  num: string;
  relatedText: string;
  hasRelated: boolean;
  tabId: string;
  panelId: string;
  toggleId: string;
  regionId: string;
}

export interface WorkAreasProps {
  labelId: string;
  items: WorkAreaItem[];
}

export type ElementRef = (id: string) => (el: HTMLButtonElement | null) => void;

export interface WorkAreasViewProps extends WorkAreasProps {
  selected: string;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
  onTabKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
  tabRef: ElementRef;
  toggleRef: ElementRef;
}

export interface RelationItem extends RelationNode {
  descId: string;
}

export interface RelationMapProps {
  titleId: string;
  noteId: string;
  note: string;
  hasNote: boolean;
  origin: RelationItem;
  targets: RelationItem[];
}

export interface RelationMapViewProps extends RelationMapProps {
  selected: string;
  onSelect: (id: string) => void;
}

export interface RelationSection {
  title: string;
  label: string;
  map: RelationMapProps;
}

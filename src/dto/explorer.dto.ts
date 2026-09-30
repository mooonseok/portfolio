import type { KeyboardEvent, RefObject } from 'react';
import type { NoteRef } from '@/dto/link.dto';

export interface WorkArea {
  id: string;
  label: string;
  sub: string;
  title: string;
  body: string;
  related: string[];
  to: NoteRef;
}

export interface RelationNode {
  id: string;
  code: string;
  label: string;
  rel: string;
  why: string;
  work: string;
  scope?: string;
  note?: NoteRef;
}

export interface RelationCheck {
  label: string;
  title: string;
  body: string;
  note?: NoteRef;
}

export interface RelationMap {
  id: string;
  label: string;
  title: string;
  hint: string;
  hintMobile: string;
  note: string;
  origin: RelationNode;
  targets: RelationNode[];
  check?: RelationCheck;
}

export interface StateScope {
  label: string;
  note: string;
  items: string[];
}

export interface WorkAreaItem extends WorkArea {
  num: string;
  hasRelated: boolean;
  href: string;
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
  open: string | null;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
  onTabKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
  tabRef: ElementRef;
  toggleRef: ElementRef;
}

export interface RelationItem extends RelationNode {
  buttonId: string;
  regionId: string;
  noteHref?: string;
}

export interface RelationCheckItem extends RelationCheck {
  noteHref?: string;
}

export interface RelationMapProps {
  titleId: string;
  noteId: string;
  panelId: string;
  hint: string;
  hintMobile: string;
  note: string;
  origin: RelationItem;
  targets: RelationItem[];
  check?: RelationCheckItem;
}

export interface RelationMapViewProps extends RelationMapProps {
  rootRef: RefObject<HTMLDivElement | null>;
  selected: string;
  open: string | null;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
  buttonRef: ElementRef;
  toggleRef: ElementRef;
}

export interface RelationSection {
  title: string;
  label: string;
  map: RelationMapProps;
}

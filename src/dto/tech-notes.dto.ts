import type { RefObject } from 'react';
import type { TechCols } from '@/constants/case';
import type { SurfaceTone } from '@/constants/tone';
import type { Field, TechNote } from '@/dto/field.dto';

export interface TechNotesProps {
  notes: TechNote[];
  cols?: TechCols;
  tone?: SurfaceTone;
}

export interface TechNoteItem {
  id: string;
  panelId: string;
  title: string;
  open: boolean;
  fields: Field[];
}

export interface TechNotesViewProps {
  rootRef: RefObject<HTMLDivElement | null>;
  items: TechNoteItem[];
  cols: TechCols;
  tone: SurfaceTone;
  onToggle: (id: string) => void;
  panelRef: (id: string) => (el: HTMLDivElement | null) => void;
}

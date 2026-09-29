'use client';

import { TechNotesView } from './tech-notes-view';
import { useTechNotes } from '@/hooks/use-tech-notes';
import type { TechNotesProps } from '@/dto/tech-notes.dto';
import { TECH_COLS } from '@/constants/case';
import { TONE } from '@/constants/tone';

export function TechNotes({
  notes,
  cols = TECH_COLS.TWO,
  tone = TONE.PAPER,
}: TechNotesProps) {
  const { isOpen, toggle, panelRef } = useTechNotes(notes);
  if (!notes.length) return null;
  const items = notes.map((n) => ({
    id: n.id,
    panelId: `${n.id}-panel`,
    title: n.title.toUpperCase(),
    open: isOpen(n.id),
    fields: n.fields,
  }));
  return (
    <TechNotesView
      items={items}
      cols={cols}
      tone={tone}
      onToggle={toggle}
      panelRef={panelRef}
    />
  );
}

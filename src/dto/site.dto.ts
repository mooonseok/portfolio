export interface Contact {
  email: string;
  github: string;
}

export interface YearRange {
  label: string;
  years: string;
}

import type { BoardCopy } from '@/dto/board.dto';

export interface Site {
  name: string;
  role: string;
  disciplines: string;
  headline: string;
  primaryAction: { href: string; label: string };
  introduction: string;
  about: string;
  range: YearRange;
  contact: Contact;
  visualsNote: string;
  visualsNoteKo: string;
  board: BoardCopy;
}

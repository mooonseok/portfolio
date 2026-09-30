import type { KeyboardEvent } from 'react';
import type { ExplorerMode } from '@/constants/explorer';
import type { NoteRef } from '@/dto/link.dto';

export interface DomainStep {
  code: string;
  sub: string;
}

export interface DomainAside {
  label: string;
  body: string;
}

export interface DomainChecks {
  label: string;
  items: string[];
}

export interface Domain {
  id: string;
  code: string;
  label: string;
  title: string;
  lead: string;
  steps: DomainStep[];
  aside?: DomainAside;
  checks?: DomainChecks;
  implLabel: string;
  impl: string[];
  note: NoteRef;
}

export interface DomainItem extends Domain {
  tabId: string;
  panelId: string;
  noteHref: string;
  linkLabel: string;
}

export interface DomainExplorerProps {
  label: string;
  items: DomainItem[];
  mode: ExplorerMode;
}

export interface DomainExplorerViewProps extends DomainExplorerProps {
  selected: string;
  onSelect: (id: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
  tabRef: (id: string) => (el: HTMLButtonElement | null) => void;
}

import type { LinkItem } from '@/dto/link.dto';

export interface OpenerCopy {
  label: string;
  line: string[];
  kicker: string;
  name: string[];
  tag: string;
  skip: string;
}

export interface ActivityCopy {
  heading: string;
  close: string;
  panelLabel: string;
  instruction: string;
  fallbackInstruction: string;
  recentWork: string;
  moreWork: string;
  lessWork: string;
  lastCommit: string;
  repo: string;
  open: string;
  repoSuffix: string;
  newTab: string;
  privateNote: string;
  empty: string;
  history: LinkItem;
  opener: OpenerCopy;
}

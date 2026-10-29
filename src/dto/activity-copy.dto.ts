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
  panelLabel: string;
  lastCommit: string;
  recent: string;
  countPrefix: string;
  countSuffix: string;
  repo: string;
  open: string;
  repoSuffix: string;
  newTab: string;
  privateNote: string;
  stale: string;
  empty: string;
  history: LinkItem;
  opener: OpenerCopy;
}

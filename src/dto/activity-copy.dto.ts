import type { LinkItem } from '@/dto/link.dto';

export interface ActivityCopy {
  label: string;
  summary: string;
  legend: string;
  asOf: string;
  commitCount: string;
  commitUnit: string;
  lastCommit: string;
  open: string;
  newTab: string;
  privateLabel: string;
  privateNote: string;
  skip: string;
  skipLabel: string;
  loading: string;
  stale: string;
  empty: string;
  listHeading: string;
  history: LinkItem;
}

import type { Floor } from '@/constants/floor';
import type { StatusKind } from '@/constants/status';

export interface BoardBox {
  floor: Floor;
  label: string;
  lit: boolean;
  kind?: StatusKind;
  experiment: boolean;
  tech?: string;
  lines: string[];
  path: string;
  joinNext?: string;
}

export interface BoardColumn {
  slug: string;
  title: string;
  service: string;
  href: string;
  period: string;
  kind: StatusKind;
  statusLabel: string;
  boxes: BoardBox[];
  loop: string;
}

export interface BoardCopy {
  label: string;
  hint: string;
  show: string;
  hide: string;
  legendEmpty: string;
  read: string;
  legendBuilt: string;
  legendExperiment: string;
  experiment: string;
  note: string;
}

export interface WhiteboardProps {
  floors: { floor: Floor; label: string }[];
  columns: BoardColumn[];
  copy: BoardCopy;
}

export interface WhiteboardViewProps extends WhiteboardProps {
  selected: string | null;
  animate: boolean;
  onSelect: (slug: string, pointer: boolean) => void;
}

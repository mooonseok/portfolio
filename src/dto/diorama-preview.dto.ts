import type { KeyboardEvent, MouseEvent, RefObject } from 'react';

export interface DioramaLayer {
  label: string;
  summary: string;
  lines: string[];
}

export interface DioramaPreviewProps {
  title: string;
  summary: string;
  period: string;
  href: string;
  layers: DioramaLayer[];
  features: { title: string; body: string[] }[];
  hostRef: RefObject<HTMLDivElement | null>;
  labelRef: RefObject<HTMLButtonElement | null>;
  selected: boolean;
  enabled: boolean;
  ready: boolean;
  failed: boolean;
  reduced: boolean;
  onSelect: (event: MouseEvent<HTMLButtonElement>) => void;
  onClose: () => void;
  onToggle: () => void;
  onKeyDown: (event: KeyboardEvent) => void;
}

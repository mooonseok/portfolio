import type { MouseEvent, PointerEvent, Ref } from 'react';
import type { OrbitSkin } from '@/constants/orbit';
import type { LinkItem } from '@/dto/link.dto';

export interface OrbitBody {
  skin: OrbitSkin;
  count: number;
}

export interface OrbitRepoLink {
  label: string;
  href: string;
  aria: string;
}

export interface OrbitProjectView {
  key: string;
  title: string;
  sub: string;
  skin: OrbitSkin;
  tag: string | null;
  last: string;
  count: string;
  repos: OrbitRepoLink[];
  privateNote: string | null;
  commits: string[];
  aria: string;
}

export interface OrbitCopy {
  heading: string;
  panelLabel: string;
  lastCommit: string;
  recent: string;
  repo: string;
  empty: string;
  stale: string | null;
  history: LinkItem;
}

export interface OrbitHomeProps {
  projects: OrbitProjectView[];
  bodies: OrbitBody[];
  copy: OrbitCopy;
}

export interface OrbitHandlers {
  select: (index: number) => void;
  enter: (index: number) => (event: PointerEvent) => void;
  leave: () => void;
  focus: (index: number) => void;
  blur: () => void;
  press: (event: PointerEvent) => void;
  drag: (event: PointerEvent) => void;
  release: () => void;
  pick: (index: number) => (event: MouseEvent) => void;
}

export interface OrbitViewProps extends OrbitHomeProps {
  active: number;
  handlers: OrbitHandlers;
  refs: {
    root: Ref<HTMLDivElement>;
    host: Ref<HTMLDivElement>;
    panel: Ref<HTMLElement>;
    history: Ref<HTMLAnchorElement>;
    ticks: Ref<SVGPathElement>;
    reticle: Ref<SVGPathElement>;
    label: (index: number) => Ref<HTMLDivElement>;
    name: (index: number) => Ref<HTMLSpanElement>;
  };
}

export interface OrbitPanelViewProps {
  projects: OrbitProjectView[];
  active: number;
  copy: OrbitCopy;
  panelRef: Ref<HTMLElement>;
}

import type { Ref } from 'react';
import type { OpenerCopy } from '@/dto/activity-copy.dto';

export interface OpenerElements {
  root: HTMLDivElement | null;
  line: HTMLDivElement | null;
  name: HTMLDivElement | null;
  block: HTMLDivElement | null;
  kicker: HTMLSpanElement | null;
  tag: HTMLSpanElement | null;
  frame: HTMLSpanElement | null;
  tagText: HTMLSpanElement | null;
  dot: HTMLSpanElement | null;
  skip: HTMLButtonElement | null;
  wipe: HTMLDivElement | null;
  end: SVGSVGElement | null;
  moon: SVGGElement | null;
  chunks: (HTMLDivElement | null)[];
  rings: (HTMLSpanElement | null)[];
  syllables: (HTMLSpanElement | null)[];
  sats: (HTMLDivElement | null)[];
  orbits: (SVGEllipseElement | null)[];
}

export interface OpenerRefs {
  root: Ref<HTMLDivElement>;
  line: Ref<HTMLDivElement>;
  name: Ref<HTMLDivElement>;
  block: Ref<HTMLDivElement>;
  kicker: Ref<HTMLSpanElement>;
  tag: Ref<HTMLSpanElement>;
  frame: Ref<HTMLSpanElement>;
  tagText: Ref<HTMLSpanElement>;
  dot: Ref<HTMLSpanElement>;
  skip: Ref<HTMLButtonElement>;
  wipe: Ref<HTMLDivElement>;
  end: Ref<SVGSVGElement>;
  moon: Ref<SVGGElement>;
  chunk: (index: number) => Ref<HTMLDivElement>;
  ring: (index: number) => Ref<HTMLSpanElement>;
  syllable: (index: number) => Ref<HTMLSpanElement>;
  sat: (index: number) => Ref<HTMLDivElement>;
  orbit: (index: number) => Ref<SVGEllipseElement>;
}

export interface OpenerViewProps {
  copy: OpenerCopy;
  refs: OpenerRefs;
  skip: () => void;
  shown: boolean;
}

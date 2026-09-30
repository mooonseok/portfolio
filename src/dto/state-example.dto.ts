import type { EmoState } from '@/constants/emo-state';

export interface StateExampleItem {
  id: EmoState;
  label: string;
  code: string;
  title: string;
  body: string;
}

export interface StateExample {
  label: string;
  intro: string;
  caption: string;
  homeCaption: string;
  slotLabel: string;
  trayLabel: string;
  states: StateExampleItem[];
}

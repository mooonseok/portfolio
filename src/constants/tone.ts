export const TONE = {
  DEFAULT: 'default',
  SIGNAL: 'signal',
  INK: 'ink',
  PAPER: 'paper',
  DARK: 'dark',
  MUTED: 'muted',
  DARK_MUTED: 'dark-muted',
} as const;

export type Tone = (typeof TONE)[keyof typeof TONE];

export type AccentTone = typeof TONE.SIGNAL | typeof TONE.INK;

export type SurfaceTone = typeof TONE.PAPER | typeof TONE.DARK;

export type FlowTone =
  | typeof TONE.DEFAULT
  | typeof TONE.DARK
  | typeof TONE.MUTED
  | typeof TONE.DARK_MUTED;

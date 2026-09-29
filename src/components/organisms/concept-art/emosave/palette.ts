import { hair, tone } from '../art-svg';

export const c = {
  tile: '#E9E7E1',
  peach: '#E2CFC3',
  blue: '#C8D1D5',
  sand: '#DCD2BF',
  mauve: '#D3CAD2',
  sage: '#CDD1C6',
  roof: '#C9B8AC',
  path: '#DDD6C8',
} as const;
export const fine = {
  ...hair,
  stroke: tone.ink,
  strokeWidth: 1,
  strokeOpacity: 0.28,
};
export const line = {
  ...hair,
  stroke: tone.ink,
  strokeWidth: 1,
  strokeOpacity: 0.7,
};

export const CELL = 80;

export const at = (col: number, row: number) => ({
  x: col * CELL,
  y: 10 + row * CELL,
});
export const mid = (col: number, row: number) => ({
  x: col * CELL + CELL / 2,
  y: 10 + row * CELL + CELL / 2,
});

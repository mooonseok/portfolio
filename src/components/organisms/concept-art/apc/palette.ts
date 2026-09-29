import { hair, tone } from '../art-svg';

export const W = 640;
export const HORIZON = 150;
export const VP = 320;
export const rule = { ...hair, stroke: tone.darkRule, strokeWidth: 1 };
export const accent = {
  ...hair,
  stroke: tone.paper,
  strokeWidth: 1,
  strokeOpacity: 0.34,
};
export const accentStrong = {
  ...hair,
  stroke: tone.paper,
  strokeWidth: 1,
  strokeOpacity: 0.6,
};

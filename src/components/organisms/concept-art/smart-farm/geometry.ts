import type { ArtVec } from '@/dto/art.dto';

const VP: ArtVec = [320, 196];
export const toward = ([x, y]: ArtVec, k: number): ArtVec => [
  VP[0] + (x - VP[0]) * k,
  VP[1] + (y - VP[1]) * k,
];
export const pts = (list: ArtVec[]) => list.map((p) => p.join(',')).join(' ');

export const GABLE: ArtVec[] = [
  [-60, 420],
  [-60, 96],
  [320, 6],
  [700, 96],
  [700, 420],
];
export const DEPTHS = [1, 0.7, 0.5, 0.36, 0.26, 0.19, 0.14];

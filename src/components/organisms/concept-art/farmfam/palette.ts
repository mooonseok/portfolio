import { hair, tone } from '../art-svg';
import type { BoxTones } from '@/dto/art.dto';

export const kraft: BoxTones = {
  top: '#D8C8AA',
  left: '#CDBA97',
  right: '#B8A480',
  line: '#A08D6C',
};
export const tray: BoxTones = {
  top: tone.paper,
  left: '#E9E7E0',
  right: '#D9D6CD',
  line: tone.hairline,
};
export const produce = '#CBBB9D';
export const ink = {
  ...hair,
  stroke: tone.ink,
  strokeWidth: 1,
  strokeOpacity: 0.55,
};
export const soft = {
  ...hair,
  stroke: tone.ink,
  strokeWidth: 1,
  strokeOpacity: 0.28,
};

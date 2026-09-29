import { tone } from '../art-svg';
import { accent, accentStrong } from './palette';
import type { ArtPoint } from '@/dto/art.dto';

export function Tablet({ x, y }: ArtPoint) {
  return (
    <g>
      <rect x={x + 21} y={y + 40} width={4} height={150} fill={tone.darkRule} />
      <rect x={x + 8} y={y + 188} width={30} height={4} fill={tone.darkRule} />
      <rect x={x} y={y} width={46} height={34} rx={3} fill={tone.dark2} />
      <rect x={x} y={y} width={46} height={34} rx={3} {...accentStrong} />
      <rect x={x + 4} y={y + 4} width={38} height={26} fill={tone.dark} />
      <rect x={x + 18} y={y + 34} width={10} height={7} fill={tone.darkRule} />
    </g>
  );
}

export function Desk({ x, y }: ArtPoint) {
  return (
    <g>
      <rect x={x} y={y} width={96} height={5} fill={tone.darkRule} />
      <rect x={x + 6} y={y + 5} width={3} height={52} fill={tone.darkLine} />
      <rect x={x + 87} y={y + 5} width={3} height={52} fill={tone.darkLine} />
      <path d={`M${x + 10} ${y} l6 -9 h30 l-4 9 Z`} fill={tone.darkRule} />
      <path d={`M${x + 10} ${y} l6 -9 h30 l-4 9 Z`} {...accent} />
      <path d={`M${x + 50} ${y} l4 -10 h28 l2 10 Z`} fill={tone.darkLine} />
      <path d={`M${x + 50} ${y} l4 -10 h28 l2 10 Z`} {...accent} />
      <rect
        x={x + 62}
        y={y - 12}
        width={8}
        height={3}
        fill={tone.darkSub}
        fillOpacity={0.6}
      />
    </g>
  );
}

import { hair } from './art-svg';
import type { BoxTones } from '@/dto/art.dto';

export const floor = (x: number, y: number) => `matrix(1 .5 -1 .5 ${x} ${y})`;
const faceU = (x: number, y: number) => `matrix(1 .5 0 1 ${x} ${y})`;
const faceV = (x: number, y: number) => `matrix(-1 .5 0 1 ${x} ${y})`;

export function IsoBox({
  x,
  y,
  a,
  b,
  h,
  tones,
  top,
  left,
  right,
}: {
  x: number;
  y: number;
  a: number;
  b: number;
  h: number;
  tones: BoxTones;
  top?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
}) {
  const line = tones.line
    ? { ...hair, stroke: tones.line, strokeWidth: 1 }
    : null;
  return (
    <g>
      <g transform={faceU(x - b, y + b / 2)}>
        <rect width={a} height={h} fill={tones.left} />
        {left}
        {line ? <rect width={a} height={h} {...line} /> : null}
      </g>
      <g transform={faceV(x + a, y + a / 2)}>
        <rect width={b} height={h} fill={tones.right} />
        {right}
        {line ? <rect width={b} height={h} {...line} /> : null}
      </g>
      <g transform={floor(x, y)}>
        <rect width={a} height={b} fill={tones.top} />
        {top}
        {line ? <rect width={a} height={b} {...line} /> : null}
      </g>
    </g>
  );
}

import { tone } from '../art-svg';
import { ink, soft } from './palette';
import type { ArtRect } from '@/dto/art.dto';

export function Label({ x, y, w, h }: ArtRect) {
  const rows = [0.3, 0.46, 0.62];
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={tone.label} />
      <rect x={x} y={y} width={w} height={h} {...soft} />
      <line
        x1={x + w * 0.1}
        x2={x + w * 0.9}
        y1={y + h * 0.16}
        y2={y + h * 0.16}
        {...ink}
      />
      {rows.map((r, i) => (
        <line
          key={r}
          x1={x + w * 0.1}
          x2={x + w * (i === 2 ? 0.46 : 0.62)}
          y1={y + h * r}
          y2={y + h * r}
          {...soft}
        />
      ))}
      {[0, 3, 5, 9, 11, 14, 17, 19, 23].map((o) => (
        <rect
          key={o}
          x={x + w * 0.1 + o * (w / 60)}
          y={y + h * 0.74}
          width={w / 60}
          height={h * 0.14}
          fill={tone.ink}
          fillOpacity={0.5}
        />
      ))}
    </g>
  );
}

export function InventoryTag({ w = 46, h = 22 }: { w?: number; h?: number }) {
  const d = `M${h * 0.5} 0 H${w} V${h} H${h * 0.5} L0 ${h / 2} Z`;
  return (
    <g>
      <path d={d} fill={tone.label} />
      <path d={d} {...soft} />
      <circle cx={h * 0.55} cy={h / 2} r={h * 0.14} {...ink} />
      <line x1={h * 1.1} x2={w - 6} y1={h * 0.4} y2={h * 0.4} {...soft} />
      <line x1={h * 1.1} x2={w - 14} y1={h * 0.64} y2={h * 0.64} {...soft} />
    </g>
  );
}

export function Slip({ w, h }: { w: number; h: number }) {
  return (
    <g>
      <rect width={w} height={h} fill={tone.label} />
      <rect width={w} height={h} {...soft} />
      {[0.22, 0.4, 0.56, 0.72].map((r) => (
        <line
          key={r}
          x1={w * 0.1}
          x2={w * 0.9}
          y1={h * r}
          y2={h * r}
          {...soft}
        />
      ))}
      <line x1={w * 0.62} x2={w * 0.62} y1={h * 0.4} y2={h * 0.72} {...soft} />
    </g>
  );
}

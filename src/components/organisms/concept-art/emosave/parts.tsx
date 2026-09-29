import { tone } from '../art-svg';
import { CELL, c, fine, line } from './palette';
import type { ArtPoint } from '@/dto/art.dto';

export function TileGrid({
  cols,
  rows,
  ox = 0,
  oy = 0,
}: {
  cols: number;
  rows: number;
  ox?: number;
  oy?: number;
}) {
  return (
    <g transform={`translate(${ox} ${oy})`}>
      {Array.from({ length: cols * rows }, (_, i) => (
        <rect
          key={i}
          x={(i % cols) * CELL + 4}
          y={Math.floor(i / cols) * CELL + 4}
          width={CELL - 8}
          height={CELL - 8}
          rx={14}
          fill={c.tile}
        />
      ))}
    </g>
  );
}

export function House({ x, y, tint = c.peach }: ArtPoint & { tint?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={9} y={10} width={62} height={58} rx={12} fill={tint} />
      <rect
        x={9}
        y={10}
        width={62}
        height={29}
        rx={12}
        fill={c.roof}
        fillOpacity={0.5}
      />
      <line x1={16} x2={64} y1={39} y2={39} {...fine} />
      <rect x={33} y={62} width={14} height={9} rx={3} fill={tone.paper} />
    </g>
  );
}

export function Tree({ x, y, r = 20 }: ArtPoint & { r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={c.sage} />
      <circle
        cx={x - r * 0.3}
        cy={y - r * 0.25}
        r={r * 0.42}
        fill={tone.paper}
        fillOpacity={0.35}
      />
    </g>
  );
}

export function Pond({ x, y }: ArtPoint) {
  return (
    <rect x={x + 10} y={y + 18} width={60} height={44} rx={22} fill={c.blue} />
  );
}

export function Bench({ x, y }: ArtPoint) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={16} y={30} width={48} height={16} rx={6} fill={c.sand} />
      <line x1={22} x2={58} y1={38} y2={38} {...fine} />
    </g>
  );
}

export function Token({ x, y, r = 24 }: ArtPoint & { r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={tone.paper} />
      <circle r={r} {...line} />
      <circle cx={-r * 0.32} cy={-r * 0.12} r={r * 0.08} fill={tone.ink} />
      <circle cx={r * 0.32} cy={-r * 0.12} r={r * 0.08} fill={tone.ink} />
      <path
        d={`M${-r * 0.22} ${r * 0.24} Q0 ${r * 0.42} ${r * 0.22} ${r * 0.24}`}
        {...line}
      />
    </g>
  );
}

export function Lane({ row }: { row: number }) {
  return (
    <>
      {Array.from({ length: 7 }, (_, i) => (
        <rect
          key={i}
          x={(i - 1) * CELL + 4}
          y={10 + row * CELL + 4}
          width={CELL - 8}
          height={CELL - 8}
          rx={14}
          fill={c.path}
        />
      ))}
    </>
  );
}

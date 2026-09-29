import { tone } from '../art-svg';
import { rule } from './palette';
import type { ArtRect } from '@/dto/art.dto';

function Qr({ x, y, s }: { x: number; y: number; s: number }) {
  const f = s * 0.3;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={s}
        height={s}
        fill={tone.darkSub}
        fillOpacity={0.82}
      />
      {[
        [0.1, 0.1],
        [0.6, 0.1],
        [0.1, 0.6],
      ].map(([fx, fy]) => (
        <rect
          key={`${fx}${fy}`}
          x={x + s * fx}
          y={y + s * fy}
          width={f}
          height={f}
          fill={tone.dark}
        />
      ))}
      <rect
        x={x + s * 0.62}
        y={y + s * 0.62}
        width={s * 0.12}
        height={s * 0.12}
        fill={tone.dark}
      />
    </g>
  );
}

function Crate({ x, y, w, h, qr }: ArtRect & { qr?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={tone.darkLine} />
      <rect x={x} y={y} width={w} height={h} {...rule} />
      <rect
        x={x + w * 0.36}
        y={y + h * 0.16}
        width={w * 0.28}
        height={h * 0.14}
        rx={h * 0.07}
        fill={tone.dark}
      />
      <line
        x1={x + w * 0.06}
        x2={x + w * 0.94}
        y1={y + h * 0.5}
        y2={y + h * 0.5}
        {...rule}
      />
      {[0.25, 0.5, 0.75].map((r) => (
        <line
          key={r}
          x1={x + w * r}
          x2={x + w * r}
          y1={y + h * 0.56}
          y2={y + h * 0.92}
          {...rule}
        />
      ))}
      {qr ? <Qr x={x + w * 0.08} y={y + h * 0.56} s={h * 0.34} /> : null}
    </g>
  );
}

export function CrateStack({
  x,
  base,
  w,
  levels,
  cols = 1,
  qr = [],
}: {
  x: number;
  base: number;
  w: number;
  levels: number;
  cols?: number;
  qr?: number[];
}) {
  const ph = w * cols * 0.1;
  const ch = w * 0.62;
  const pw = w * cols;
  return (
    <g>
      <rect x={x} y={base - ph} width={pw} height={ph} fill={tone.darkRule} />
      {[0.08, 0.46, 0.84].map((r) => (
        <rect
          key={r}
          x={x + pw * r - pw * 0.04}
          y={base - ph * 0.55}
          width={pw * 0.16}
          height={ph * 0.55}
          fill={tone.dark2}
        />
      ))}
      {Array.from({ length: levels * cols }, (_, i) => {
        const lv = Math.floor(i / cols);
        const c = i % cols;
        return (
          <Crate
            key={i}
            x={x + c * w}
            y={base - ph - (lv + 1) * ch}
            w={w}
            h={ch}
            qr={c === 0 && qr.includes(lv)}
          />
        );
      })}
    </g>
  );
}

import { tone } from '../art-svg';
import { bed, leaf, rib } from './palette';

export function SoftBeds({ w, h }: { w: number; h: number }) {
  return (
    <>
      <rect
        x={-w}
        y={h * 0.62}
        width={w * 3}
        height={h}
        fill={tone.placeholder}
      />
      <rect x={-w} y={h * 0.56} width={w * 3} height={h * 0.08} fill={bed} />
      {Array.from({ length: 9 }, (_, i) => (
        <ellipse
          key={i}
          cx={i * (w / 8)}
          cy={h * 0.56}
          rx={w * 0.05}
          ry={h * 0.03}
          fill={leaf}
        />
      ))}
      <line x1={-w} x2={w * 2} y1={h * 0.18} y2={h * 0.18} {...rib} />
      {[0.12, 0.5, 0.88].map((r) => (
        <line key={r} x1={w * r} x2={w * r} y1={-h} y2={h * 0.56} {...rib} />
      ))}
    </>
  );
}

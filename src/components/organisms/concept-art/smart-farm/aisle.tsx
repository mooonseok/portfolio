import { tone } from '../art-svg';
import { DEPTHS, GABLE, pts, toward } from './geometry';
import { bed, bedSide, leaf, rib } from './palette';

export function Aisle() {
  const far = GABLE.map((p) => toward(p, DEPTHS[DEPTHS.length - 1]));
  const bedEdge = (x: number, k: number) => toward([x, 420], k);
  const beds = [
    [-60, 150],
    [490, 700],
  ];
  return (
    <>
      <polygon points={pts(far)} fill={tone.paper} />
      <polygon
        points={pts([
          toward([-60, 420], 1),
          toward([-60, 420], 0.14),
          toward([700, 420], 0.14),
          toward([700, 420], 1),
        ])}
        fill={tone.placeholder}
      />
      {beds.map(([x0, x1]) => {
        const nearTop = 360;
        const top = [
          toward([x0, nearTop], 1),
          toward([x0, nearTop], 0.16),
          toward([x1, nearTop], 0.16),
          toward([x1, nearTop], 1),
        ];
        const inner = x0 < 0 ? x1 : x0;
        const side = [
          toward([inner, nearTop], 1),
          toward([inner, nearTop], 0.16),
          bedEdge(inner, 0.16),
          bedEdge(inner, 1),
        ];
        return (
          <g key={x0}>
            <polygon points={pts(side)} fill={bedSide} />
            <polygon points={pts(top)} fill={bed} />
            {DEPTHS.slice(0, -1).flatMap((k, i) => {
              const k2 = DEPTHS[i + 1];
              return [0.35, 0.65].map((f) => {
                const [cx, cy] = toward(
                  [x0 + (x1 - x0) * f, nearTop - 8],
                  (k + k2) / 2
                );
                const r = 26 * ((k + k2) / 2);
                return (
                  <ellipse
                    key={`${k}${f}`}
                    cx={cx}
                    cy={cy}
                    rx={r * 1.3}
                    ry={r * 0.7}
                    fill={leaf}
                  />
                );
              });
            })}
          </g>
        );
      })}
      {GABLE.map((p, i) => (
        <line
          key={i}
          x1={p[0]}
          y1={p[1]}
          x2={far[i][0]}
          y2={far[i][1]}
          {...rib}
        />
      ))}
      {DEPTHS.map((k) => (
        <polyline
          key={k}
          points={pts(GABLE.map((p) => toward(p, k)))}
          {...rib}
          strokeWidth={k > 0.6 ? 2 : 1}
        />
      ))}
    </>
  );
}

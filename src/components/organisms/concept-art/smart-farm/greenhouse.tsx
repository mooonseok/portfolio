import { ArtSvg, tone } from '../art-svg';
import { Aisle } from './aisle';
import { pts, toward } from './geometry';
import { fine, glass, metal, white } from './palette';

function RoofVent() {
  const a = toward([40, 72], 1);
  const b = toward([200, 34], 1);
  const c = toward([200, 34], 0.8);
  const d = toward([40, 72], 0.8);
  const lift = 16;
  return (
    <g>
      <polygon points={pts([a, b, c, d])} fill={tone.placeholder} />
      <polygon
        points={pts([a, b, [c[0], c[1] - lift], [d[0], d[1] - lift]])}
        fill={white}
      />
      <polygon
        points={pts([a, b, [c[0], c[1] - lift], [d[0], d[1] - lift]])}
        {...fine}
      />
      <line
        x1={(a[0] + b[0]) / 2}
        y1={(a[1] + b[1]) / 2 + 20}
        x2={(c[0] + d[0]) / 2}
        y2={(c[1] + d[1]) / 2 - lift}
        {...fine}
      />
    </g>
  );
}

function WallFan({ cx, cy, s }: { cx: number; cy: number; s: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) skewY(-14) scale(0.55 1)`}>
      <rect x={-s} y={-s} width={s * 2} height={s * 2} fill={white} />
      <rect x={-s} y={-s} width={s * 2} height={s * 2} {...fine} />
      <circle r={s * 0.8} fill={tone.placeholder} />
      <circle r={s * 0.8} {...fine} />
      {[0, 120, 240].map((r) => (
        <ellipse
          key={r}
          rx={s * 0.18}
          ry={s * 0.62}
          transform={`rotate(${r}) translate(0 ${-s * 0.34})`}
          fill={metal}
        />
      ))}
      <circle r={s * 0.12} fill={tone.graphite} />
    </g>
  );
}

function Greenhouse() {
  return (
    <>
      <Aisle />
      <RoofVent />
      <WallFan cx={120} cy={236} s={34} />
    </>
  );
}

export function SmartHome() {
  return (
    <ArtSvg viewBox='0 0 640 420' bg={glass}>
      <Greenhouse />
    </ArtSvg>
  );
}

export function SmartHero() {
  return (
    <ArtSvg viewBox='0 20 640 380' bg={glass}>
      <Greenhouse />
    </ArtSvg>
  );
}

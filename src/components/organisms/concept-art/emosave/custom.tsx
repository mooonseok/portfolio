import { ArtSvg, tone } from '../art-svg';
import { c, line } from './palette';
import { House, Pond, TileGrid, Tree } from './parts';

export function EmosaveCustom() {
  return (
    <ArtSvg viewBox='0 0 400 400' bg={tone.placeholder}>
      <TileGrid cols={6} rows={6} ox={-40} oy={-40} />
      <House x={40} y={40} tint={c.mauve} />
      <Tree x={280} y={80} />
      <Pond x={200} y={280} />
      <rect
        x={124}
        y={124}
        width={72}
        height={72}
        rx={14}
        {...line}
        strokeDasharray='4 5'
      />
      <g transform='translate(212 150) rotate(-6)'>
        <rect x={0} y={0} width={80} height={80} rx={16} fill={c.peach} />
        <rect
          x={14}
          y={14}
          width={52}
          height={24}
          rx={8}
          fill={c.roof}
          fillOpacity={0.55}
        />
        <rect x={-8} y={-8} width={96} height={96} rx={20} {...line} />
        {[
          [-8, -8],
          [88, -8],
          [-8, 88],
          [88, 88],
        ].map(([hx, hy]) => (
          <rect
            key={`${hx}${hy}`}
            x={hx - 4}
            y={hy - 4}
            width={8}
            height={8}
            rx={2}
            fill={tone.paper}
            stroke={tone.ink}
            strokeOpacity={0.7}
            vectorEffect='non-scaling-stroke'
          />
        ))}
      </g>
      <path
        d='M162 160 C 180 150, 196 150, 208 162'
        {...line}
        strokeDasharray='2 4'
      />
    </ArtSvg>
  );
}

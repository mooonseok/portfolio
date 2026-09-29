import { ArtSvg, tone } from '../art-svg';
import { c, line } from './palette';
import { Token } from './parts';

export function EmosaveStore() {
  const tints = [
    c.peach,
    c.blue,
    c.sand,
    c.mauve,
    c.sage,
    c.peach,
    c.sand,
    c.blue,
    c.mauve,
  ];
  return (
    <ArtSvg viewBox='0 0 400 400' bg={tone.placeholder}>
      {tints.map((t, i) => {
        const x = 50 + (i % 3) * 104;
        const y = 50 + Math.floor(i / 3) * 104;
        return (
          <g key={i}>
            <rect x={x} y={y} width={92} height={92} rx={20} fill={t} />
            <Token x={x + 46} y={y + 46} r={i === 4 ? 26 : 22} />
            {i === 4 ? (
              <rect
                x={x - 6}
                y={y - 6}
                width={104}
                height={104}
                rx={24}
                {...line}
              />
            ) : null}
          </g>
        );
      })}
    </ArtSvg>
  );
}

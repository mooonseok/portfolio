import { ArtSvg } from '../art-svg';
import { fine, glass, metal, white } from './palette';
import { SoftBeds } from './soft-beds';

export function SmartSensor() {
  return (
    <ArtSvg viewBox='0 0 400 400' bg={glass}>
      <SoftBeds w={400} h={400} />
      <rect x={194} y={60} width={12} height={400} fill={metal} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect
            x={154 - i * 2}
            y={70 + i * 14}
            width={92 + i * 4}
            height={8}
            rx={4}
            fill={white}
          />
          <rect
            x={154 - i * 2}
            y={70 + i * 14}
            width={92 + i * 4}
            height={8}
            rx={4}
            {...fine}
          />
        </g>
      ))}
      <rect x={146} y={160} width={108} height={120} rx={6} fill={white} />
      <rect x={146} y={160} width={108} height={120} rx={6} {...fine} />
      <line x1={146} x2={254} y1={182} y2={182} {...fine} />
      <circle cx={200} cy={236} r={12} {...fine} />
      <rect x={186} y={280} width={28} height={10} fill={metal} />
      <path d='M214 290 C 232 300, 226 330, 208 346 L208 400' {...fine} />
      <rect x={138} y={208} width={8} height={40} fill={metal} />
      <rect x={254} y={208} width={8} height={40} fill={metal} />
    </ArtSvg>
  );
}

import { ArtSvg, tone } from '../art-svg';
import { glass, fine, metal } from './palette';
import { SoftBeds } from './soft-beds';

export function SmartMonitor() {
  return (
    <ArtSvg viewBox='0 0 400 400' bg={glass}>
      <SoftBeds w={400} h={400} />
      <rect x={-400} y={300} width={1200} height={400} fill={tone.hairline} />
      <rect x={193} y={250} width={14} height={52} fill={metal} />
      <rect x={160} y={298} width={80} height={8} fill={metal} />
      <rect
        x={82}
        y={96}
        width={236}
        height={158}
        rx={6}
        fill={tone.graphite}
      />
      <rect x={90} y={104} width={220} height={142} fill={tone.paper} />
      <rect x={90} y={104} width={220} height={142} {...fine} />
    </ArtSvg>
  );
}

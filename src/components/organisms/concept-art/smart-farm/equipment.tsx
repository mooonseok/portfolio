import { ArtSvg, tone } from '../art-svg';
import { fine, glass, metal, white } from './palette';

export function SmartEquipment() {
  return (
    <ArtSvg viewBox='0 0 400 440' bg={glass}>
      <rect
        x={-400}
        y={300}
        width={1200}
        height={500}
        fill={tone.placeholder}
      />
      <rect x={60} y={60} width={170} height={170} fill={white} />
      <rect x={60} y={60} width={170} height={170} {...fine} />
      <circle cx={145} cy={145} r={70} fill={tone.placeholder} />
      <circle cx={145} cy={145} r={70} {...fine} />
      {[20, 140, 260].map((r) => (
        <ellipse
          key={r}
          cx={145}
          cy={145}
          rx={16}
          ry={52}
          transform={`rotate(${r} 145 145) translate(0 -26)`}
          fill={metal}
        />
      ))}
      <circle cx={145} cy={145} r={10} fill={tone.graphite} />
      {[80, 110, 140, 170, 200].map((x) => (
        <line
          key={x}
          x1={x}
          x2={x}
          y1={60}
          y2={230}
          {...fine}
          strokeOpacity={0.12}
        />
      ))}
      <rect x={262} y={70} width={100} height={12} fill={metal} />
      <polygon
        points='262,82 362,82 350,150 250,150'
        fill={white}
        transform='rotate(-10 262 82)'
      />
      <polygon
        points='262,82 362,82 350,150 250,150'
        {...fine}
        transform='rotate(-10 262 82)'
      />
      <rect x={300} y={170} width={16} height={60} fill={tone.hairline} />
      <line x1={308} x2={320} y1={170} y2={132} {...fine} strokeWidth={2} />
      <rect x={-60} y={316} width={520} height={20} fill={metal} />
      <rect x={-60} y={316} width={520} height={20} {...fine} />
      <rect x={176} y={300} width={60} height={52} rx={4} fill={white} />
      <rect x={176} y={300} width={60} height={52} rx={4} {...fine} />
      <rect x={196} y={262} width={20} height={38} fill={tone.hairline} />
      <rect x={180} y={244} width={52} height={20} rx={3} fill={white} />
      <rect x={180} y={244} width={52} height={20} rx={3} {...fine} />
      <rect x={110} y={336} width={12} height={80} fill={metal} />
      <rect x={290} y={336} width={12} height={80} fill={metal} />
    </ArtSvg>
  );
}

import { tone } from '../art-svg';
import { HORIZON, VP, W, rule } from './palette';

export function Floor() {
  const rays = [-400, -160, 0, 160, 260, 380, 480, 640, 800, 1040];
  return (
    <>
      <rect
        x={-W}
        y={-360}
        width={W * 3}
        height={360 + HORIZON}
        fill={tone.dark}
      />
      <rect x={-W} y={HORIZON} width={W * 3} height={600} fill={tone.dark2} />
      <path
        d={`M${VP - 70} ${HORIZON + 6} L${VP + 70} ${HORIZON + 6} L${VP + 230} 380 L${VP - 230} 380 Z`}
        fill='#1D211E'
      />
      <line x1={-W} x2={W * 2} y1={HORIZON} y2={HORIZON} {...rule} />
      {rays.map((r) => (
        <line
          key={r}
          x1={VP}
          y1={HORIZON}
          x2={r}
          y2={400}
          {...rule}
          strokeOpacity={0.55}
        />
      ))}
      {[176, 212, 268].map((y) => (
        <line
          key={y}
          x1={-W}
          x2={W * 2}
          y1={y}
          y2={y}
          {...rule}
          strokeOpacity={0.4}
        />
      ))}
      <rect
        x={VP - 60}
        y={30}
        width={120}
        height={3}
        fill={tone.paper}
        fillOpacity={0.5}
      />
      <line x1={VP} x2={VP} y1={-20} y2={30} {...rule} />
      <rect x={40} y={62} width={120} height={88} fill={tone.dark2} />
      {[74, 86, 98, 110, 122, 134].map((y) => (
        <line key={y} x1={40} x2={160} y1={y} y2={y} {...rule} />
      ))}
      <rect x={40} y={62} width={120} height={88} {...rule} />
      <rect x={470} y={70} width={140} height={80} fill={tone.dark2} />
      <rect x={470} y={70} width={140} height={80} {...rule} />
    </>
  );
}

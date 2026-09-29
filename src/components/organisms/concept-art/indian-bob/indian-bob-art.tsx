import { ArtSvg, hair, tone } from '../art-svg';
import type { ArtRect } from '@/dto/art.dto';

const alu = '#D3D3CE';
const aluEdge = '#B9BAB5';
const screen = '#FAF9F5';
const block = tone.placeholder;
const shared = '#C9CBC6';
const fine = { ...hair, stroke: tone.ink, strokeWidth: 1, strokeOpacity: 0.3 };
const link = { ...hair, stroke: tone.ink, strokeWidth: 1, strokeOpacity: 0.55 };

const TILT = 'matrix(0.95 -0.2 0.3 0.76 0 0)';

function Admin({ x, y, w, h }: ArtRect) {
  const side = w * 0.2;
  const rows = [0.3, 0.44, 0.58, 0.72];
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect y={8} width={w} height={h} rx={6} fill={aluEdge} />
      <rect width={w} height={h} rx={6} fill={alu} />
      <rect x={10} y={10} width={w - 20} height={h - 20} fill={screen} />
      <rect x={10} y={10} width={side} height={h - 20} fill={block} />
      <rect
        x={side + 22}
        y={22}
        width={(w - side) * 0.4}
        height={h * 0.08}
        fill={block}
      />
      {rows.map((r, i) => (
        <rect
          key={r}
          x={side + 22}
          y={h * r}
          width={w - side - 44}
          height={h * 0.08}
          fill={i === 1 ? shared : block}
        />
      ))}
      <rect x={10} y={10} width={w - 20} height={h - 20} {...fine} />
    </g>
  );
}

function Phone({ x, y, w, h }: ArtRect) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect y={6} width={w} height={h} rx={w * 0.16} fill={aluEdge} />
      <rect width={w} height={h} rx={w * 0.16} fill={alu} />
      <rect
        x={6}
        y={6}
        width={w - 12}
        height={h - 12}
        rx={w * 0.12}
        fill={screen}
      />
      <rect
        x={w * 0.16}
        y={h * 0.12}
        width={w * 0.5}
        height={h * 0.06}
        fill={block}
      />
      <rect
        x={w * 0.16}
        y={h * 0.24}
        width={w * 0.68}
        height={h * 0.2}
        rx={4}
        fill={block}
      />
      <rect
        x={w * 0.16}
        y={h * 0.5}
        width={w * 0.68}
        height={h * 0.08}
        fill={shared}
      />
      <rect
        x={w * 0.16}
        y={h * 0.62}
        width={w * 0.68}
        height={h * 0.08}
        fill={block}
      />
      <circle cx={w / 2} cy={h * 0.86} r={w * 0.07} fill={block} />
      <rect
        x={6}
        y={6}
        width={w - 12}
        height={h - 12}
        rx={w * 0.12}
        {...fine}
      />
    </g>
  );
}

export function IndianBobHome() {
  return (
    <ArtSvg viewBox='0 0 480 360' bg={tone.placeholder}>
      <g transform='translate(240 180) scale(1.2) translate(-251 -141)'>
        <g transform={TILT}>
          <g transform='translate(40 150)'>
            <Admin x={50} y={0} w={260} h={184} />
            <Phone x={-10} y={-12} w={92} h={194} />
            <line x1={68} x2={132} y1={93} y2={93} {...link} />
            <circle
              cx={132}
              cy={93}
              r={2.5}
              fill={tone.ink}
              fillOpacity={0.55}
            />
          </g>
        </g>
      </g>
    </ArtSvg>
  );
}

export function IndianBobApp() {
  return (
    <ArtSvg viewBox='0 0 360 480' bg={tone.placeholder}>
      <g transform='translate(180 240) scale(1.15) translate(-232 -184)'>
        <g transform={TILT}>
          <g transform='translate(40 110)'>
            <Admin x={150} y={40} w={300} h={196} />
            <Phone x={30} y={0} w={170} h={346} />
          </g>
        </g>
      </g>
    </ArtSvg>
  );
}

export function IndianBobAdmin() {
  return (
    <ArtSvg viewBox='0 0 480 360' bg={tone.placeholder}>
      <g transform='translate(240 180) scale(0.95) translate(-325 -146)'>
        <g transform={TILT}>
          <g transform='translate(40 110)'>
            <Admin x={20} y={20} w={400} h={262} />
            <Phone x={-10} y={150} w={70} h={144} />
          </g>
        </g>
      </g>
    </ArtSvg>
  );
}

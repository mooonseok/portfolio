import { ORBIT_SKIN, type OrbitSkin } from '@/constants/orbit';

const R = 5;
const C = 7;

const chord = (offset: number) =>
  Math.sqrt(Math.max(0, R * R - offset * offset));

const across = (offsets: number[]) =>
  offsets.map((y) => {
    const x = chord(y);
    return `M${C - x} ${C + y}H${C + x}`;
  });

const down = (offsets: number[]) =>
  offsets.map((x) => {
    const y = chord(x);
    return `M${C + x} ${C - y}V${C + y}`;
  });

const slant = (offsets: number[]) =>
  offsets.map((d) => {
    const half = chord(d) / Math.SQRT2;
    const cx = C + d / Math.SQRT2;
    const cy = C + d / Math.SQRT2;
    return `M${cx - half} ${cy + half}L${cx + half} ${cy - half}`;
  });

const PATHS: Record<OrbitSkin, string> = {
  [ORBIT_SKIN.SITE]: [...across([-1.8, 1.6]), ...down([-1.6, 1.8])].join(''),
  [ORBIT_SKIN.TEXT]: across([-2.5, 0, 2.5]).join(''),
  [ORBIT_SKIN.ALBUM]: '',
  [ORBIT_SKIN.CANDLE]: slant([-2.6, 0, 2.6]).join(''),
};

const DOTS: Record<OrbitSkin, [number, number][]> = {
  [ORBIT_SKIN.SITE]: [],
  [ORBIT_SKIN.TEXT]: [[13, 2.5]],
  [ORBIT_SKIN.ALBUM]: [
    [5, 5.5],
    [9, 5.5],
    [7, 9],
    [13, 2.5],
    [13.6, 11],
    [0.6, 7],
  ],
  [ORBIT_SKIN.CANDLE]: [],
};

export function OrbitSwatchView({
  skin,
  className,
}: {
  skin: OrbitSkin;
  className?: string;
}) {
  return (
    <svg
      viewBox='0 0 14 14'
      className={className}
      aria-hidden='true'
      fill='none'
      stroke='currentColor'
      strokeWidth='1'
      vectorEffect='non-scaling-stroke'
    >
      <circle cx={C} cy={C} r={R} />
      {PATHS[skin] ? <path d={PATHS[skin]} /> : null}
      {DOTS[skin].map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r='1.2'
          fill='currentColor'
          stroke='none'
        />
      ))}
      {skin === ORBIT_SKIN.SITE ? (
        <ellipse cx={C} cy={C} rx='7.6' ry='2.2' transform='rotate(-18 7 7)' />
      ) : null}
      {skin === ORBIT_SKIN.CANDLE ? (
        <path d='M7 -0.5V0.8M14.5 7H13.2M7 14.5V13.2M-0.5 7H0.8' />
      ) : null}
    </svg>
  );
}

import { ORBIT_SKIN, type OrbitSkin } from '@/constants/orbit';

const MOONS: Record<OrbitSkin, [number, number][]> = {
  [ORBIT_SKIN.SITE]: [],
  [ORBIT_SKIN.TEXT]: [[12, 2]],
  [ORBIT_SKIN.ALBUM]: [
    [2, 3],
    [12, 4],
    [10, 12],
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
      strokeWidth='0.8'
      strokeLinecap='round'
      strokeLinejoin='round'
      vectorEffect='non-scaling-stroke'
    >
      <circle cx='7' cy='7' r='4' fill='currentColor' fillOpacity='0.08' />
      <path d='M4.5 5.5A3 3 0 0 1 7 4' opacity='0.6' />
      {skin === ORBIT_SKIN.SITE ? (
        <ellipse cx='7' cy='7' rx='6.5' ry='1.7' transform='rotate(-24 7 7)' />
      ) : null}
      {skin === ORBIT_SKIN.TEXT ? (
        <path d='M3.3 6.5Q7 8.5 10.8 6.8' opacity='0.45' />
      ) : null}
      {skin === ORBIT_SKIN.CANDLE ? (
        <ellipse cx='7' cy='7' rx='5.8' ry='1.4' transform='rotate(62 7 7)' />
      ) : null}
      {MOONS[skin].map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r='0.8'
          fill='currentColor'
          stroke='none'
        />
      ))}
    </svg>
  );
}

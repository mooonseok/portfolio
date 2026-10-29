import type { OpenerViewProps } from '@/dto/opener.dto';
import styles from './opener-end.module.css';

const ORBITS = [
  [150, 56],
  [260, 96],
  [370, 137],
  [480, 178],
];

const HATCH = Array.from({ length: 21 }, (_, k) => -70 + k * 7);

export function OpenerEndView({ refs }: Pick<OpenerViewProps, 'refs'>) {
  return (
    <svg
      ref={refs.end}
      className={styles.end}
      viewBox='-550 -260 1100 520'
      aria-hidden='true'
    >
      <line className={styles.spoke} x1='-520' y1='0' x2='520' y2='0' />
      <line className={styles.spoke} x1='0' y1='-200' x2='0' y2='200' />
      <ellipse className={styles.tick} rx='520' ry='193' />
      {ORBITS.map(([rx, ry], index) => (
        <ellipse
          key={rx}
          ref={refs.orbit(index)}
          className={styles.orbit}
          rx={rx}
          ry={ry}
          data-ry={ry}
        />
      ))}
      <defs>
        <clipPath id='opener-moon'>
          <circle r='46' />
        </clipPath>
        <clipPath id='opener-lit'>
          <circle cx='22' cy='-10' r='46' />
        </clipPath>
      </defs>
      <g ref={refs.moon}>
        <circle r='46' className={styles.body} />
        <g clipPath='url(#opener-moon)'>
          <g clipPath='url(#opener-lit)'>
            <g className={styles.hatch} transform='rotate(-45)'>
              {HATCH.map((offset) => (
                <line key={offset} x1='-70' y1={offset} x2='70' y2={offset} />
              ))}
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

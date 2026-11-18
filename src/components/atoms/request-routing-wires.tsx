import type { RefObject } from 'react';
import styles from './request-routing-wires.module.css';
interface Props {
  boardRef: RefObject<SVGSVGElement | null>;
  branches: readonly { id: string }[];
  drawn: boolean;
  done: boolean;
  returning: boolean;
  issueOwner?: string;
}
export function RequestRoutingWires({
  boardRef,
  branches,
  drawn,
  done,
  returning,
  issueOwner,
}: Props) {
  return (
    <svg
      className={styles.wires}
      ref={boardRef}
      aria-hidden='true'
      focusable='false'
      data-drawn={drawn}
      data-ended={done}
    >
      <defs>
        <marker
          id='routing-return-tip'
          viewBox='0 0 10 10'
          refX='5'
          refY='5'
          markerWidth='6'
          markerHeight='6'
        >
          <path
            d='M 1 8 L 5 2 L 9 8'
            fill='none'
            stroke='var(--circuit-return)'
            strokeWidth='1.5'
          />
        </marker>
      </defs>
      <path data-edge='entry' />
      {branches.map(({ id }) => (
        <g
          key={id}
          data-branch={id}
          data-repair={returning && id === issueOwner}
        >
          <path data-edge={`in-${id}`} />
          <path
            data-edge={`join-${id}`}
            markerStart={
              returning && id === issueOwner
                ? 'url(#routing-return-tip)'
                : undefined
            }
          />
        </g>
      ))}
      <path data-edge='exit' />
      <g className={styles.dots} data-repair={returning}>
        {branches.map(({ id }) => (
          <g key={id} data-packet={id} display='none'>
            <circle r='7.5' opacity='.16' />
            <circle r='3.4' />
          </g>
        ))}
      </g>
    </svg>
  );
}

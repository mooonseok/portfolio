import type { RefObject } from 'react';
import styles from './request-routing-wires.module.css';
interface Props {
  boardRef: RefObject<SVGSVGElement | null>;
  branches: readonly { id: string }[];
  drawn: boolean;
  done: boolean;
  repairing: boolean;
  issueOwner?: string;
}
export function RequestRoutingWires({
  boardRef,
  branches,
  drawn,
  done,
  repairing,
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
      <path data-edge='rim' stroke='none' />
      {branches.map(({ id }) => (
        <g
          key={id}
          data-branch={id}
          data-repair={repairing && id === issueOwner}
        >
          <path data-edge={`in-${id}`} />
          <path
            data-edge={`join-${id}`}
            markerStart={
              repairing && id === issueOwner
                ? 'url(#routing-return-tip)'
                : undefined
            }
          />
          <path data-edge={`out-${id}`} stroke='none' />
        </g>
      ))}
      <path data-edge='exit' />
      <path data-edge='finish' stroke='none' />
      <g className={styles.dots} data-repair={repairing}>
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

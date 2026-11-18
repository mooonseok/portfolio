import type { RefObject } from 'react';
import styles from './request-routing-wires.module.css';

interface Props {
  boardRef: RefObject<SVGSVGElement | null>;
  branches: readonly { id: string }[];
  done: boolean;
  returning: boolean;
  issueOwner?: string;
}

export function RequestRoutingWires({
  boardRef,
  branches,
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
      data-ended={done}
    >
      <path data-edge='restart' className={styles.cycle} />
      <path data-edge='judge' stroke='none' />
      {branches.map(({ id }) => (
        <g
          key={id}
          data-branch={id}
          data-repair={returning && id === issueOwner}
        >
          <path data-edge={`in-${id}`} />
          <path data-edge={`work-${id}`} stroke='none' />
          {id === issueOwner && <path data-edge={`fix-${id}`} stroke='none' />}
          <path data-edge={`join-${id}`} />
        </g>
      ))}
      <path data-edge='review' stroke='none' />
      <path data-edge='exit' />
      <path data-edge='result' stroke='none' />
      <g className={styles.dots} data-repair={returning}>
        {branches.map(({ id }) => (
          <g key={id} data-packet={id} display='none'>
            <circle r='6' opacity='.16' />
            <circle r='3' />
          </g>
        ))}
      </g>
    </svg>
  );
}

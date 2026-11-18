import type { RefObject } from 'react';
import styles from './request-routing-wires.module.css';

interface Props {
  boardRef: RefObject<SVGSVGElement | null>;
  branches: readonly { id: string }[];
  done: boolean;
  returning: boolean;
  repairActive: boolean;
  returningToPlan: boolean;
  issueOwner?: string;
}

export function RequestRoutingWires({
  boardRef,
  branches,
  done,
  returning,
  repairActive,
  returningToPlan,
  issueOwner,
}: Props) {
  const markerId = `routing-return-${issueOwner}`;
  return (
    <svg
      className={styles.wires}
      ref={boardRef}
      aria-hidden='true'
      focusable='false'
      data-ended={done}
    >
      {issueOwner && (
        <defs>
          <marker
            id={`${markerId}-start`}
            viewBox='0 0 8 8'
            markerWidth='7'
            markerHeight='7'
            markerUnits='userSpaceOnUse'
            refX='4'
            refY='4'
          >
            <circle cx='4' cy='4' r='2.4' className={styles.source} />
          </marker>
          <marker
            id={`${markerId}-end`}
            viewBox='0 0 8 8'
            markerWidth='8'
            markerHeight='8'
            markerUnits='userSpaceOnUse'
            refX='7'
            refY='4'
            orient={
              !returningToPlan &&
              branches.length > 1 &&
              branches[0].id === issueOwner
                ? 0
                : 180
            }
          >
            <path d='M0 0.5 7 4 0 7.5Z' className={styles.arrow} />
          </marker>
        </defs>
      )}
      <path data-edge='restart' className={styles.cycle} />
      <path data-edge='prepare-link' />
      {branches.map(({ id }) => (
        <g key={id} data-branch={id}>
          <path data-edge={`in-${id}`} />
          <path data-edge={`task-${id}`} />
          <path data-edge={`join-${id}`} />
          {id === issueOwner && (
            <path
              data-edge={`back-${id}`}
              className={styles.correction}
              data-active={repairActive}
              markerStart={`url(#${markerId}-start)`}
              markerEnd={`url(#${markerId}-end)`}
            />
          )}
        </g>
      ))}
      <path data-edge='verify-link' />
      <path data-edge='inspect-link' />
      <path data-edge='decide-link' />
      <path data-edge='exit' />
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

import type { RefCallback } from 'react';
import type { WorkflowRequest } from '@/dto/ai-workflow.dto';
import { circuitRim } from './circuit-rim';
import { WorkflowCircuitIcon } from './workflow-circuit-icons';
import styles from './workflow-circuit.module.css';

export interface CircuitTrack {
  pathRef: RefCallback<SVGPathElement>;
  dotRef: RefCallback<SVGGElement>;
}

export interface WorkflowCircuitProps extends CircuitTrack {
  request: WorkflowRequest;
  source?: number;
  target?: number;
  active: number;
  returning: boolean;
}

export function WorkflowCircuit({
  request,
  source,
  target,
  active,
  returning,
  pathRef,
  dotRef,
  width,
}: WorkflowCircuitProps & { width: number }) {
  const center = width / 2;
  const density = Math.max(0, Math.min(1, (width - 275) / 325));
  const compact = Math.max(0, Math.min(1, (440 - width) / 80));
  const firstRow = 107 - 10 * compact;
  const rowGap = 68 - 11 * compact;
  const rowY = (stage: number) => firstRow + (stage - 1) * rowGap;
  const stages = request.stages.slice(1);
  const lastRow = rowY(stages.length);
  const nodeWidth = Math.min(182, width - 76);
  const halfWidth = nodeWidth / 2;
  const halfHeight = 22 + 4 * density;
  const height = lastRow + halfHeight + 12;
  const iconScale = 0.76 + density * 0.46;
  const iconX = -halfWidth + 7 + 10 * density + 16 * iconScale;
  const labelX = iconX + 16 * iconScale + 6 + 7 * density;
  const labelSize = (width < 275 ? 12 : 14) + 3 * density;
  const currentColor = 'var(--circuit-design)';
  const side = center - halfWidth;
  const edge = side - Math.min(34, side - 9);
  const bend = Math.min((side - edge) / 2, 9);
  const rim = (stage: number) =>
    circuitRim(center, rowY(stage), halfWidth, halfHeight, -1, 6);
  const reviewY = rowY(source ?? stages.length);
  const targetY = target === undefined ? undefined : rowY(target);
  return (
    <svg
      className={styles.chart}
      viewBox={`0 0 ${width} ${height}`}
      height={height}
      role='img'
      aria-labelledby='circuit-title circuit-description'
      textAnchor='middle'
      data-circuit
    >
      <title id='circuit-title'>디자인 요청의 제작과 검토</title>
      <desc id='circuit-description'>
        요청은 선택한 작업의 검토를 거칩니다. 문제가 발견되면 원인이 있는 단계로
        돌아가 수정하고 다시 검토합니다.
      </desc>
      <g data-lane={request.id} data-selected='true'>
        {stages.map((stage, j) => {
          const next = rim(j + 1);
          const previous = rim(j);
          const route =
            j === 0
              ? `M${center} 40V${next.entry}`
              : previous.dock + previous.depart + `V${next.entry}`;
          return (
            <path
              key={stage.label}
              data-current={!returning && active === j + 1}
              d={route + next.arrive}
              className={styles.route}
              ref={!returning && active === j + 1 ? pathRef : undefined}
            />
          );
        })}
        {targetY !== undefined && (
          <g className={styles.feedback}>
            <path
              ref={returning ? pathRef : undefined}
              data-return
              data-current={returning}
              strokeDasharray='3 4'
              d={`M${side} ${reviewY}H${edge + bend}Q${edge} ${reviewY} ${edge} ${reviewY - bend}V${targetY + bend}Q${edge} ${targetY} ${edge + bend} ${targetY}H${side}`}
            />
            <path d={`M${edge - 3} ${(reviewY + targetY) / 2 + 3}l3-5 3 5`} />
          </g>
        )}
        {stages.map((stage, j) => (
          <g
            key={stage.label}
            data-stage={j + 1}
            data-active={active === j + 1}
            data-returning={returning && active === j + 1}
            transform={`translate(${center} ${rowY(j + 1)})`}
          >
            <rect
              data-rim
              className={styles.rim}
              x={-halfWidth}
              y={-halfHeight}
              width={nodeWidth}
              height={halfHeight * 2}
              rx='6'
            />
            <g
              className={styles.icon}
              transform={`translate(${iconX} 0) scale(${iconScale})`}
            >
              <WorkflowCircuitIcon index={j} />
            </g>
            <text
              className={styles.stepName}
              textAnchor='start'
              x={labelX}
              y={labelSize * 0.34}
              fontSize={labelSize}
            >
              {stage.label}
            </text>
          </g>
        ))}
      </g>
      <text className={styles.originName} x={center} y='19'>
        {request.stages[0].label}
      </text>
      <circle
        cx={center}
        cy='40'
        r='5'
        className={styles.origin}
        stroke={currentColor}
      />
      <g
        ref={dotRef}
        data-packet
        transform={`translate(${center} 40)`}
        fill={returning ? 'var(--circuit-return)' : currentColor}
        pointerEvents='none'
      >
        <circle r='9' opacity='.19' />
        <circle r='4' />
      </g>
    </svg>
  );
}

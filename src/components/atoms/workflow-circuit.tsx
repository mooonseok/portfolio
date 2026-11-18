import type { RefCallback } from 'react';
import { WorkflowCircuitIcon } from './workflow-circuit-icons';
import styles from './workflow-circuit.module.css';

export interface WorkflowCircuitProps {
  lanes: { id: string; label: string; stages: { label: string }[] }[];
  lane: string;
  source?: number;
  target?: number;
  active: number;
  returning: boolean;
  pathRef: RefCallback<SVGPathElement>;
  dotRef: RefCallback<SVGGElement>;
}

export function WorkflowCircuit({
  lanes,
  lane,
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
  const lastRow = rowY(
    Math.max(...lanes.map((item) => item.stages.length - 1))
  );
  const nodeWidth = Math.min(182, width * 0.415);
  const halfWidth = nodeWidth / 2;
  const halfHeight = 22 + 4 * density;
  const height = lastRow + halfHeight + 12;
  const iconScale = 0.76 + density * 0.46;
  const iconX = -halfWidth + 7 + 10 * density + 16 * iconScale;
  const labelX = iconX + 16 * iconScale + 6 + 7 * density;
  const labelSize = (width < 275 ? 12 : 14) + 3 * density;
  const currentColor =
    lane === lanes[0].id
      ? 'var(--circuit-design)'
      : 'var(--circuit-development)';
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
      <title id='circuit-title'>디자인과 개발 요청이 나뉘는 경로</title>
      <desc id='circuit-description'>
        요청은 선택한 작업의 검토를 거칩니다. 문제가 발견되면 원인이 있는 단계로
        돌아가 수정하고 다시 검토합니다.
      </desc>
      <path
        d={`M${center} ${firstRow - 30}V${lastRow + halfHeight}`}
        className={styles.divider}
      />
      {lanes.map((item, i) => {
        const selected = item.id === lane;
        const sign = i === 0 ? -1 : 1;
        const x = center + sign * width * 0.235;
        const side = x + sign * halfWidth;
        const outerSpace = Math.min(side, width - side) - 9;
        const gutter = Math.min(34, outerSpace);
        const bend = Math.min(gutter / 2, 9);
        const edge = side + sign * gutter;
        const stages = item.stages.slice(1);
        const reviewY = rowY(source ?? stages.length - 1);
        const targetY = target === undefined ? undefined : rowY(target);
        return (
          <g key={item.id} data-lane={item.id} data-selected={selected}>
            {stages.map((stage, j) => {
              const y = rowY(j + 1);
              const route =
                j === 0
                  ? `M${center} 40C${center} 65 ${x} 42 ${x} ${y - halfHeight}`
                  : `M${x} ${rowY(j) + halfHeight}V${y - halfHeight}`;
              return (
                <path
                  key={stage.label}
                  d={route}
                  className={styles.route}
                  ref={
                    selected && !returning && active === j + 1
                      ? pathRef
                      : undefined
                  }
                />
              );
            })}
            {selected && targetY !== undefined && (
              <g className={styles.feedback}>
                <path
                  ref={returning ? pathRef : undefined}
                  data-return
                  strokeDasharray='3 4'
                  d={`M${side} ${reviewY}H${edge - sign * bend}Q${edge} ${reviewY} ${edge} ${reviewY - bend}V${targetY + bend}Q${edge} ${targetY} ${edge - sign * bend} ${targetY}H${side}`}
                />
                <path
                  d={`M${edge - 3} ${(reviewY + targetY) / 2 + 3}l3-5 3 5`}
                />
              </g>
            )}
            <text
              className={styles.laneName}
              textAnchor={i === 0 ? 'start' : 'end'}
              x={side - sign * 4}
              y={firstRow - 39}
            >
              {item.label}
            </text>
            {stages.map((stage, j) => (
              <g
                key={stage.label}
                data-stage={j + 1}
                data-active={selected && active === j + 1}
                data-returning={selected && returning && active === j + 1}
                transform={`translate(${x} ${rowY(j + 1)})`}
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
                  <WorkflowCircuitIcon design={i === 0} index={j} />
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
        );
      })}
      <text className={styles.originName} x={center} y='19'>
        {lanes[0].stages[0].label}
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

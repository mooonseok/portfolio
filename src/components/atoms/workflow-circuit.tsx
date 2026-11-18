import type { RefCallback } from 'react';
import { WorkflowCircuitIcon } from './workflow-circuit-icons';
import styles from './workflow-circuit.module.css';

export interface WorkflowCircuitProps {
  lanes: { id: string; label: string; stages: { label: string }[] }[];
  lane: string;
  target?: number;
  active: number;
  returning: boolean;
  pathRef: RefCallback<SVGPathElement>;
  dotRef: RefCallback<SVGGElement>;
}

const levels = [119, 194, 269, 344];
const radius = 21;

export function WorkflowCircuit({
  lanes,
  lane,
  target,
  active,
  returning,
  pathRef,
  dotRef,
  width,
}: WorkflowCircuitProps & { width: number }) {
  const center = width / 2;
  const currentColor =
    lane === lanes[0].id
      ? 'var(--circuit-design)'
      : 'var(--circuit-development)';
  return (
    <svg
      className={styles.chart}
      viewBox={`0 0 ${width} 388`}
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
      <path d={`M${center} 89V369`} className={styles.divider} />
      {lanes.map((item, i) => {
        const selected = item.id === lane;
        const sign = i === 0 ? -1 : 1;
        const x = center + sign * width * 0.235;
        const edge = x + sign * Math.min(width * 0.164, 112);
        const reviewY = levels[2];
        const targetY = target === undefined ? undefined : levels[target - 1];
        return (
          <g key={item.id} data-lane={item.id} data-selected={selected}>
            {levels.map((y, j) => {
              const route =
                j === 0
                  ? `M${center} 40C${center} 80 ${x} 46 ${x} ${y - radius}`
                  : `M${x} ${levels[j - 1] + radius}V${y - radius}`;
              return (
                <path
                  key={y}
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
                  d={`M${x + sign * radius} ${reviewY}H${edge - sign * 10}Q${edge} ${reviewY} ${edge} ${reviewY - 10}V${targetY + 10}Q${edge} ${targetY} ${edge - sign * 10} ${targetY}H${x + sign * radius}`}
                />
                <path
                  d={`M${edge - 3} ${(reviewY + targetY) / 2 + 3}l3-5 3 5`}
                />
              </g>
            )}
            <text className={styles.laneName} x={x} y='80'>
              {item.label}
            </text>
            {item.stages.slice(1).map((stage, j) => (
              <g
                key={stage.label}
                data-stage={j + 1}
                data-active={selected && active === j + 1}
                data-returning={selected && returning && active === j + 1}
                transform={`translate(${x} ${levels[j]})`}
              >
                <circle className={styles.rim} r={radius} />
                <g className={styles.icon}>
                  <WorkflowCircuitIcon design={i === 0} index={j} />
                </g>
                <text className={styles.stepName} y='36'>
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

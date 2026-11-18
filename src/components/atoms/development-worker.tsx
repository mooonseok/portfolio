import type { WorkflowOwner } from '@/dto/ai-workflow.dto';
import styles from './development-circuit.module.css';

interface Props {
  id: WorkflowOwner;
  label: string;
  task: string;
  x: number;
  y: number;
  width: number;
  height: number;
  active: number;
  repair: boolean;
  owner?: WorkflowOwner;
}

const stateNames = {
  waiting: '대기',
  working: '작업 중',
  repairing: '수정 중',
  done: '완료',
} as const;

export function DevelopmentWorker({
  id,
  label,
  task,
  x,
  y,
  width,
  height,
  active,
  repair,
  owner,
}: Props) {
  const state =
    active < 3
      ? 'waiting'
      : active > 3
        ? 'done'
        : !repair
          ? 'working'
          : owner === id
            ? 'repairing'
            : 'done';
  return (
    <g
      transform={`translate(${x} ${y})`}
      className={styles.worker}
      data-stage={3}
      data-worker={id}
      data-state={state}
      data-active={active === 3 && (!repair || owner === id)}
    >
      <rect
        data-rim
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        rx='6'
      />
      <text className={styles.workerName} y='-12'>
        {label}
      </text>
      <text className={styles.workerTask} y='6'>
        {task}
      </text>
      <text className={styles.workerState} y='23'>
        {stateNames[state]}
      </text>
    </g>
  );
}

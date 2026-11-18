import type { WorkflowOwner } from '@/dto/ai-workflow.dto';
import styles from './request-routing-board.module.css';

interface Props {
  x: number;
  y: number;
  width: number;
  title: string;
  detail: string;
  active: boolean;
  repair?: boolean;
  worker?: WorkflowOwner;
}

export function RequestRoutingNode({
  x,
  y,
  width,
  title,
  detail,
  active,
  repair,
  worker,
}: Props) {
  return (
    <g
      className={styles.node}
      transform={`translate(${x} ${y})`}
      data-worker={worker}
      data-state={repair ? 'repair' : active ? 'active' : 'waiting'}
    >
      <rect x={-width / 2} width={width} height={worker ? 58 : 56} rx='7' />
      <text className={styles.label} y='23'>
        {title}
      </text>
      <text className={styles.detail} y='43'>
        {detail}
      </text>
    </g>
  );
}

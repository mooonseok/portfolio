import type { ReactNode } from 'react';
import styles from './request-routing-board.module.css';

interface RowProps {
  label: string;
  status?: string;
  correction?: boolean;
  children: ReactNode;
}

export function RequestRoutingRow({
  label,
  status,
  correction,
  children,
}: RowProps) {
  return (
    <li
      className={styles.row}
      aria-current={status ? 'step' : undefined}
      data-correction={correction || undefined}
    >
      <div className={styles.stageName}>
        <span>{label}</span>
        {status && <strong>{status}</strong>}
      </div>
      <div className={styles.body}>{children}</div>
    </li>
  );
}

interface NodeProps {
  id: string;
  heading: string;
  children?: ReactNode;
  status?: string;
  correction?: boolean;
}

export function RequestRoutingNode({
  id,
  heading,
  children,
  status,
  correction,
}: NodeProps) {
  return (
    <div
      data-node={id}
      className={styles.node}
      data-correction={correction || undefined}
    >
      <strong className={styles.nodeTitle}>{heading}</strong>
      {children && <div className={styles.detail}>{children}</div>}
      {status && <span className={styles.taskState}>{status}</span>}
    </div>
  );
}

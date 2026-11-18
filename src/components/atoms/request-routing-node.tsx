import type { ReactNode } from 'react';
import styles from './request-routing-board.module.css';

interface RowProps {
  label: string;
  status?: string;
  anchor?: string;
  correction?: boolean;
  children: ReactNode;
}

export function RequestRoutingRow({
  label,
  anchor,
  status,
  correction,
  children,
}: RowProps) {
  return (
    <li
      id={anchor}
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
  standby?: string;
  children?: ReactNode;
  status?: string;
  showStatus?: boolean;
  correction?: boolean;
}

export function RequestRoutingNode({
  id,
  heading,
  standby,
  children,
  status,
  showStatus,
  correction,
}: NodeProps) {
  return (
    <div
      data-node={id}
      className={styles.node}
      data-correction={correction || undefined}
    >
      {standby && <span className={styles.standby}>{standby}</span>}
      <div
        className={styles.nodeContent}
        aria-hidden={standby ? true : undefined}
      >
        <strong className={styles.nodeTitle}>{heading}</strong>
        {children && <div className={styles.detail}>{children}</div>}
        {status && (
          <span className={styles.taskState} aria-hidden={!showStatus}>
            {status}
          </span>
        )}
      </div>
    </div>
  );
}

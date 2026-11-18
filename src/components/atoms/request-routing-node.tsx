import type { ReactNode } from 'react';
import styles from './request-routing-board.module.css';

interface RowProps {
  label?: string;
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
        {label && <span>{label}</span>}
        {status && <strong>{status}</strong>}
      </div>
      <div className={styles.body}>{children}</div>
    </li>
  );
}

interface NodeProps {
  id: string;
  heading: string;
  eyebrow?: string;
  incoming?: string;
  children?: ReactNode;
  correction?: boolean;
}

export function RequestRoutingNode({
  id,
  heading,
  eyebrow,
  incoming,
  children,
  correction,
}: NodeProps) {
  return (
    <div
      data-node={id}
      className={styles.node}
      data-correction={correction || undefined}
    >
      {incoming && <span className={styles.passLabel}>{incoming}</span>}
      {eyebrow && <span className={styles.roleLabel}>{eyebrow}</span>}
      <strong className={styles.nodeTitle}>{heading}</strong>
      {children && <div className={styles.detail}>{children}</div>}
    </div>
  );
}

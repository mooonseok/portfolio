import { StatusLabel } from '@/components/atoms/status-label';
import { cx } from '@/lib/cx';
import { STATUS_KIND, type StatusKind } from '@/constants/status';
import { TONE } from '@/constants/tone';

export const tracksClass =
  'grid grid-cols-[1fr] gap-6 tab:grid-cols-2 tab:gap-(--gutter)';

export const trackCol = (kind: StatusKind) =>
  cx(
    'flex flex-col gap-3 pt-3.5',
    kind === STATUS_KIND.EXPERIMENT
      ? '[border-top:1px_dashed_var(--ink)]'
      : 'border-t border-t-ink'
  );

export const headTitle =
  'text-[length:clamp(22px,6.5vw,28px)] leading-[1.2] tracking-[-0.01em] tab:text-d2 tab:tracking-[-0.012em]';

export function MonitoringMarkView() {
  return (
    <StatusLabel
      kind={STATUS_KIND.EXPERIMENT}
      label='MONITORING'
      tone={TONE.INK}
    />
  );
}

export function ControlMarkView() {
  return (
    <StatusLabel
      kind={STATUS_KIND.EXPERIMENT}
      label='CONTROL'
      tone={TONE.INK}
    />
  );
}

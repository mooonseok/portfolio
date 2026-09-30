import { cx } from '@/lib/cx';

export function ChoiceDot({
  on,
  className,
}: {
  on: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden='true'
      data-on={on || undefined}
      className={cx(
        'size-[9px] flex-none rounded-[50%] border-[1.25px] border-graphite bg-transparent [transition:background-color_150ms_var(--ease),border-color_150ms_var(--ease)] data-on:border-signal data-on:bg-signal',
        className
      )}
    />
  );
}

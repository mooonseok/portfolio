import { cx } from '@/lib/cx';

export function MarkerPathView({
  d,
  className,
}: {
  d: string;
  className?: string;
}) {
  return (
    <svg
      viewBox='0 0 100 100'
      preserveAspectRatio='none'
      aria-hidden='true'
      focusable='false'
      className={cx('marker-svg', className)}
    >
      <path d={d} pathLength={100} />
    </svg>
  );
}

export const OPENER_ICON = { APP: 0, WEB: 1, SERVER: 2 } as const;

const INNER = [
  'M9 6.5h6v11H9zM11 15.2h2',
  'M6 8h12v8.5H6zM6 10.6h12',
  'M6.5 7h11v4.2h-11zM6.5 12.8h11V17h-11zM8.5 9.1H10M8.5 14.9H10',
];

export function OpenerIconView({
  index,
  className,
}: {
  index: number;
  className?: string;
}) {
  return (
    <svg
      viewBox='0 0 24 24'
      className={className}
      aria-hidden='true'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.3'
      strokeLinejoin='miter'
    >
      <circle cx='12' cy='12' r='10' />
      <path d='M12 0v1.6M24 12h-1.6M12 24v-1.6M0 12h1.6' strokeWidth='1' />
      <path d={INNER[index]} />
    </svg>
  );
}

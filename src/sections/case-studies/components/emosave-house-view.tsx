export function EmosaveHouseView({ ghost = false }: { ghost?: boolean }) {
  return (
    <g
      fill={ghost ? 'var(--board-white)' : 'var(--marker-blue)'}
      stroke={ghost ? 'var(--marker-ghost)' : 'var(--marker-blue)'}
      strokeWidth='1.5'
      strokeLinejoin='round'
      strokeDasharray={ghost ? '3 3' : undefined}
    >
      <path d='M-30-30 2-14 2 20-30 4Z' />
      <path d='M2-14 32-29 32 5 2 20Z' />
      <path
        d='M2-14 32-29 32 5 2 20Z'
        fill='var(--ink)'
        fillOpacity={ghost ? 0 : 0.18}
      />
      <path d='M-30-30-14-52 2-14Z' fill='var(--board-white)' />
      <path d='M-14-52 16-67 36-31 2-14Z' />
      <path
        d='M-14-52 16-67 36-31 2-14Z'
        fill='var(--board-white)'
        fillOpacity={ghost ? 1 : 0.16}
      />
      {ghost ? null : (
        <g fill='var(--board-white)' stroke='none'>
          <path d='M-22-13-12-8-12 13-22 8Z' />
          <path d='M12-11 23-16 23-5 12 0Z' />
        </g>
      )}
      <path d='M11-52 11-68 18-71 24-68 24-51 18-48Z' />
      <path
        d='M11-68 18-71 24-68 18-65Z'
        fill='var(--board-white)'
        fillOpacity={ghost ? 1 : 0.65}
      />
    </g>
  );
}

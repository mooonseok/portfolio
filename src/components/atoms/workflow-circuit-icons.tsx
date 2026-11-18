const independentReview = (
  <>
    <path d='M-15 0Q0-18 15 0Q0 18-15 0z' />
    <circle r='4' />
  </>
);

const designIcons = [
  <>
    <rect x='-14' y='-9' width='19' height='15' rx='2' />
    <rect x='-5' y='-5' width='19' height='15' rx='2' />
    <path d='M-1 5l4-4 4 3 3-2' fill='none' />
  </>,
  <>
    <rect x='-15' y='-10' width='30' height='20' rx='2' />
    <path d='M-15-4h30M-9 0v6h6V0zM1 0h9M1 5h6' />
  </>,
  <>
    <rect x='-15' y='-10' width='23' height='16' rx='2' />
    <path d='M-4 6v5m-6 0h9' />
    <rect x='4' y='-5' width='10' height='17' rx='2' />
    <path d='M8 8h2' />
  </>,
  <>
    <path d='M-13-6h26M-13 6h26' />
    <rect x='-7' y='-10' width='5' height='8' rx='1' />
    <rect x='3' y='2' width='5' height='8' rx='1' />
  </>,
  independentReview,
  <path
    key='approval'
    d='M-10-10H5l6 6v15h-21zM5-10v6h6M-5 3l3 3 7-7'
    fill='none'
  />,
];

export function WorkflowCircuitIcon({ index }: { index: number }) {
  return (
    <g strokeWidth='1.4' strokeLinecap='round' strokeLinejoin='round'>
      {designIcons[index]}
    </g>
  );
}

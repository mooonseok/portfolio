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
    <rect x='-15' y='-10' width='22' height='18' rx='2' />
    <path d='M-11-5h12M-11 0h6' />
    <circle cx='7' cy='4' r='6' />
    <path d='m11 9 5 5' />
  </>,
  <path
    key='approval'
    d='M-10-10H5l6 6v15h-21zM5-10v6h6M-5 3l3 3 7-7'
    fill='none'
  />,
];

const developmentIcons = [
  <>
    <rect x='-16' y='-5' width='9' height='10' rx='2' />
    <path d='M-7 0h7m0-7V7m0-14h7M0 7h7' />
    <rect x='7' y='-11' width='9' height='8' rx='1' />
    <rect x='7' y='3' width='9' height='8' rx='1' />
  </>,
  <>
    <rect x='-15' y='-10' width='30' height='20' rx='2' />
    <path d='m-6-3-4 4 4 4m12-8 4 4-4 4M2-4-2 6' fill='none' />
  </>,
  <>
    <rect x='-15' y='-10' width='30' height='20' rx='2' />
    <path d='m-11-4 2 2 3-4M-3-4h13m-21 8 2 2 3-4M-3 4h10' fill='none' />
  </>,
  <path
    key='delivery'
    d='m-13-4 13-7 13 7v12l-13 6-13-6zM-13-4l13 6 13-6M0 2v12m-7-21 13 6'
  />,
];

export function WorkflowCircuitIcon({
  design,
  index,
}: {
  design: boolean;
  index: number;
}) {
  return (
    <g strokeWidth='1.4' strokeLinecap='round' strokeLinejoin='round'>
      {(design ? designIcons : developmentIcons)[index]}
    </g>
  );
}

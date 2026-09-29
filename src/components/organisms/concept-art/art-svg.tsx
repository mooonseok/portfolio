export const tone = {
  paper: '#F3F2ED',
  label: '#FAF9F5',
  placeholder: '#E4E3DD',
  hairline: '#D6D5CF',
  graphite: '#868A86',
  ink: '#161817',
  dark: '#111412',
  dark2: '#181B19',
  darkLine: '#2A2E2B',
  darkRule: '#3A3E3B',
  darkSub: '#A9ADA9',
} as const;

export const hair = {
  vectorEffect: 'non-scaling-stroke',
  fill: 'none',
} as const;

const svgStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  display: 'block',
};

export function ArtSvg({
  viewBox,
  bg,
  children,
}: {
  viewBox: string;
  bg: string;
  children: React.ReactNode;
}) {
  const [x, y, w, h] = viewBox.split(' ').map(Number);
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio='xMidYMid slice'
      aria-hidden='true'
      focusable='false'
      style={svgStyle}
    >
      <rect x={x - w} y={y - h} width={w * 3} height={h * 3} fill={bg} />
      {children}
    </svg>
  );
}

export function circuitRim(
  x: number,
  y: number,
  halfWidth: number,
  halfHeight: number,
  side: number,
  corner: number
) {
  const edge = x + side * halfWidth;
  const inner = edge - side * corner;
  const turn = x + side * 4;
  const top = y - halfHeight;
  const bottom = y + halfHeight;
  return {
    entry: top - 4,
    exit: bottom + 4,
    dock: `M${edge} ${y}`,
    arrive: `Q${x} ${top} ${turn} ${top}H${inner}Q${edge} ${top} ${edge} ${top + corner}V${y}`,
    depart: `V${bottom - corner}Q${edge} ${bottom} ${inner} ${bottom}H${turn}Q${x} ${bottom} ${x} ${bottom + 4}`,
  };
}

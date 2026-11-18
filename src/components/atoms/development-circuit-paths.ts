import { circuitRim } from './circuit-rim';

export function developmentPaths(
  width: number,
  ownerIndex: number,
  source?: number
) {
  const compact = width < 440;
  const center = width / 2;
  const rows = compact
    ? [30, 69, 123, 208, 292, 349, 406, 463]
    : [34, 79, 141, 245, 347, 413, 479, 545];
  const radius = compact ? 16 : 19;
  const half = compact ? 56 : 69;
  const workerHeight = compact ? 34 : 37;
  const spread = Math.min(194, (width - 20) / 3);
  const workerWidth = Math.min(spread - 12, 138);
  const side = ownerIndex === 0 ? -1 : 1;
  const xFor = (index: number) => center + (index - 1) * spread;
  const stageRim = (i: number) =>
    circuitRim(center, rows[i], half, radius, side, 5);
  const workerRim = (i: number) =>
    circuitRim(
      xFor(i),
      rows[3],
      workerWidth / 2,
      workerHeight,
      i === 0 ? -1 : 1,
      6
    );
  const fork = stageRim(2);
  const join = stageRim(4);
  const rail =
    center + side * Math.min(width / 2 - 6, spread + workerWidth / 2 + 14);
  const targetSide = xFor(ownerIndex) + (side * workerWidth) / 2;
  const reviewY = rows[source ?? 5];
  const fromReview = `M${center + side * half} ${reviewY}H${rail - side * 4}q${side * 4} 0 ${side * 4} -4`;
  const feedback =
    ownerIndex === 1
      ? `${fromReview}V${rows[3] + workerHeight + 16}q0 -4 -4 -4H${targetSide + 10}q-4 0 -4 -4V${rows[3] + 4}q0 -4 -4 -4H${targetSide}`
      : `${fromReview}V${rows[3] + 3}q0 -3 ${-side * 3} -3H${targetSide}`;
  function forward(i: number) {
    const next = stageRim(i);
    const previous = stageRim(i - 1);
    const from =
      i === 1
        ? `M${center} ${rows[0]}`
        : i === 5
          ? `M${center} ${join.entry}` + join.arrive + join.depart
          : previous.dock + previous.depart;
    const route = from + `V${next.entry}` + next.arrive;
    return i === 2 ? route + fork.depart : route;
  }
  function arm(index: number) {
    const x = xFor(index);
    const rim = workerRim(index);
    const splitY = (fork.exit + rim.entry) / 2;
    const joinY = (rim.exit + join.entry) / 2;
    return {
      split: `M${center} ${fork.exit}C${center} ${splitY} ${x} ${splitY} ${x} ${rim.entry}${rim.arrive}`,
      join: `${rim.dock}${rim.depart}C${x} ${joinY} ${center} ${joinY} ${center} ${join.entry}`,
    };
  }
  return {
    forward,
    arm,
    feedback,
    xFor,
    center,
    compact,
    rows,
    radius,
    half,
    workerWidth,
    workerHeight,
  };
}

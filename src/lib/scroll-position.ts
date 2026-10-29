export const lastPassed = (positions: readonly number[], line: number) => {
  let current = 0;
  positions.forEach((top, index) => {
    if (top <= line) current = index;
  });
  return current;
};

export const anchorLine = (
  scrollPadding: number,
  scrollMargin: number,
  floor = 80,
  slack = 8
) => {
  const offset =
    (Number.isFinite(scrollPadding) ? scrollPadding : 0) +
    (Number.isFinite(scrollMargin) ? scrollMargin : 0);
  return Math.max(floor, offset + slack);
};
